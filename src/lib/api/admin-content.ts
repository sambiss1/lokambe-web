import type {BlogCategory} from '@/content/blog';
import {COLLECTIONS} from './content-types';
import {readAdmin} from './admin';
import type {Page} from './admin-types';
import type {
  ApiMedia,
  ApiMediaUsage,
  CollectionEntry,
  CollectionFilters,
  CollectionKey,
  MediaFilters,
} from './content-types';

/**
 * Lectures du back-office pour la médiathèque et les cinq collections.
 *
 * Elles passent par le même `readAdmin` que les candidatures : jeton lu dans le
 * cookie, retour à l'écran de connexion si l'API le refuse, aucun cache.
 *
 * Attention en ajoutant un filtre : l'API refuse tout paramètre qu'elle ne
 * déclare pas (`forbidNonWhitelisted`), un nom inventé ici vaut un 400.
 */

/**
 * Les collections éditoriales ne sont pas paginées dans le back-office : elles
 * comptent quelques entrées, et le rang d'affichage se règle en déplaçant des
 * lignes — un déplacement d'une page à l'autre n'aurait pas de sens. La liste
 * prévient si jamais le total dépassait ce plafond.
 */
export const CONTENT_PAGE_SIZE = 100;

/** Assez de vignettes pour balayer la médiathèque sans trop charger la page. */
export const MEDIA_PAGE_SIZE = 24;

function query(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === '') continue;
    search.set(key, String(value));
  }
  const rendered = search.toString();
  return rendered === '' ? '' : `?${rendered}`;
}

export async function listCollectionAdmin<K extends CollectionKey>(
  key: K,
  filters: CollectionFilters = {},
  limit: number = CONTENT_PAGE_SIZE,
): Promise<Page<CollectionEntry[K]>> {
  return readAdmin<Page<CollectionEntry[K]>>(
    `/admin/${COLLECTIONS[key].apiPath}${query({
      status: filters.status,
      page: filters.page,
      limit,
    })}`,
  );
}

/** `null` quand l'entrée n'existe plus : au rendu, `notFound()`. */
export async function getCollectionEntry<K extends CollectionKey>(
  key: K,
  id: string,
): Promise<CollectionEntry[K] | null> {
  return readAdmin<CollectionEntry[K]>(`/admin/${COLLECTIONS[key].apiPath}/${encodeURIComponent(id)}`, {
    nullOnMissing: true,
  });
}

export async function listMedia(filters: MediaFilters = {}, limit: number = MEDIA_PAGE_SIZE): Promise<Page<ApiMedia>> {
  return readAdmin<Page<ApiMedia>>(
    `/admin/media${query({kind: filters.kind, q: filters.q, page: filters.page, limit})}`,
  );
}

/** `null` quand le média n'existe plus : au rendu, `notFound()`. */
export async function getMedia(id: string): Promise<ApiMedia | null> {
  return readAdmin<ApiMedia>(`/admin/media/${encodeURIComponent(id)}`, {
    nullOnMissing: true,
  });
}

/** Où ce média est posé. Liste vide : il est supprimable. */
export async function getMediaUsage(id: string): Promise<ApiMediaUsage[]> {
  return readAdmin<ApiMediaUsage[]>(`/admin/media/${encodeURIComponent(id)}/usage`);
}

/**
 * Les thèmes tels que le back-office doit les proposer : **brouillons
 * compris**. On prépare un thème avant de l'ouvrir au public, et l'article
 * qui l'attend doit pouvoir le choisir — l'API l'accepte d'ailleurs.
 *
 * Rendus sous la forme attendue par les écrans du blog, pour que le même
 * `getCategory` serve des deux côtés.
 */
export async function adminThemeOptions(): Promise<BlogCategory[]> {
  const page = await listCollectionAdmin('themes', {});
  return page.items.map((theme) => ({
    id: theme.slug,
    label: theme.fr.name,
    short: theme.fr.name,
  }));
}
