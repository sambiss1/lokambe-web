'use server';

import {revalidatePath, updateTag} from 'next/cache';
import {COLLECTIONS, collectionAdminPath} from './content-types';
import type {CollectionEntry, CollectionKey} from './content-types';
import type {ApiMedia} from './content-types';
import {collectionTag} from './content';
import {clean, writeAdmin} from './admin-write';
import type {ActionResult} from './admin-write';

/**
 * Écritures du back-office pour la médiathèque et les cinq collections.
 *
 * Une seule fonction par verbe, générique sur la collection : il n'y a qu'une
 * mécanique de création, une de mise à jour, une de suppression et une de
 * réordonnancement. Ajouter une collection ne demande rien ici — seulement une
 * ligne dans `COLLECTIONS` et un écran.
 *
 * Comme pour les articles, aucune ne lève : elles renvoient un résultat que
 * l'écran sait montrer, « votre session a expiré » comprise.
 */

/**
 * Le site public lit ces collections sous une étiquette de cache. `updateTag`
 * — et non `revalidateTag` — pour que la personne qui vient de publier voie le
 * changement tout de suite, pas une version encore en cache.
 */
function revalidateCollection(key: CollectionKey, id?: string): void {
  updateTag(collectionTag(key));
  const base = collectionAdminPath(key);
  revalidatePath(base);
  if (id) {
    revalidatePath(`${base}/${id}`);
    revalidatePath(`${base}/${id}/modifier`);
  }
  // Le tableau de bord compte les entrées de chaque collection.
  revalidatePath('/admin');
}

export async function createCollectionEntry<K extends CollectionKey>(
  key: K,
  input: Record<string, unknown>,
): Promise<ActionResult<CollectionEntry[K]>> {
  const result = await writeAdmin<CollectionEntry[K]>(`/admin/${COLLECTIONS[key].apiPath}`, 'POST', clean(input));
  if (result.ok) revalidateCollection(key);
  return result;
}

export async function updateCollectionEntry<K extends CollectionKey>(
  key: K,
  id: string,
  input: Record<string, unknown>,
): Promise<ActionResult<CollectionEntry[K]>> {
  const result = await writeAdmin<CollectionEntry[K]>(
    `/admin/${COLLECTIONS[key].apiPath}/${encodeURIComponent(id)}`,
    'PATCH',
    input,
  );
  if (result.ok) revalidateCollection(key, id);
  return result;
}

/** Publier ou repasser en brouillon, sans toucher au reste. */
export async function setCollectionEntryStatus<K extends CollectionKey>(
  key: K,
  id: string,
  status: 'brouillon' | 'publie',
): Promise<ActionResult<CollectionEntry[K]>> {
  return updateCollectionEntry(key, id, {status});
}

export async function deleteCollectionEntry<K extends CollectionKey>(
  key: K,
  id: string,
): Promise<ActionResult<{ok: true}>> {
  const result = await writeAdmin<{ok: true}>(
    `/admin/${COLLECTIONS[key].apiPath}/${encodeURIComponent(id)}`,
    'DELETE',
    undefined,
  );
  if (result.ok) revalidateCollection(key);
  return result;
}

/**
 * Nouvel ordre d'affichage. On envoie la liste entière plutôt qu'un rang par
 * appel : deux onglets qui déplacent deux lignes en même temps ne peuvent pas
 * produire deux entrées au même rang.
 */
export async function reorderCollection<K extends CollectionKey>(
  key: K,
  ids: string[],
): Promise<ActionResult<{ok: true}>> {
  const result = await writeAdmin<{ok: true}>(`/admin/${COLLECTIONS[key].apiPath}/order`, 'PATCH', {ids});
  if (result.ok) revalidateCollection(key);
  return result;
}

/* ------------------------------------------------------------ médiathèque */

function revalidateMedia(id?: string): void {
  revalidatePath('/admin/medias');
  if (id) {
    revalidatePath(`/admin/medias/${id}`);
    revalidatePath(`/admin/medias/${id}/modifier`);
  }
  revalidatePath('/admin');
}

/**
 * Le ticket qui autorise le navigateur à téléverser directement vers l'API.
 *
 * Le fichier ne passe pas par Next : une fonction Vercel plafonne le corps
 * d'une requête bien en dessous d'une vidéo. Le jeton de session vit dans un
 * cookie `httpOnly` que le navigateur ne peut pas lire, d'où ce ticket — dix
 * minutes, limité à ce seul usage, inutilisable sur le reste du back-office.
 */
export async function createUploadTicket(): Promise<ActionResult<{ticket: string; expiresIn: number}>> {
  return writeAdmin<{ticket: string; expiresIn: number}>('/admin/media/tickets', 'POST', undefined);
}

export async function updateMedia(
  id: string,
  input: {
    title?: string | null;
    alt?: string | null;
    posterMediaId?: string | null;
  },
): Promise<ActionResult<ApiMedia>> {
  const result = await writeAdmin<ApiMedia>(`/admin/media/${encodeURIComponent(id)}`, 'PATCH', input);
  if (result.ok) revalidateMedia(id);
  return result;
}

/**
 * Supprime un média. L'API refuse (409) si le média sert encore quelque part :
 * l'écran de confirmation montre alors où, plutôt que de casser une page
 * publiée en silence.
 */
export async function deleteMedia(id: string): Promise<ActionResult<{ok: true}>> {
  const result = await writeAdmin<{ok: true}>(`/admin/media/${encodeURIComponent(id)}`, 'DELETE', undefined);
  if (result.ok) {
    revalidateMedia();
    // Un média retiré peut avoir été l'image d'une entrée de collection.
    for (const key of Object.keys(COLLECTIONS) as CollectionKey[]) {
      updateTag(collectionTag(key));
    }
  }
  return result;
}

/** Le média vient d'être téléversé par le navigateur : rafraîchir les écrans. */
export async function registerUploadedMedia(id: string): Promise<void> {
  revalidateMedia(id);
}
