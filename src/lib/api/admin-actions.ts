'use server';

import {revalidatePath} from 'next/cache';
import {headers} from 'next/headers';
import type {ApplicationStatus} from '@/lib/constants';
import {AdminApiError, fetchAdminJson} from './server';
import {readSessionToken} from './session';
import type {AdminApplication, AdminContact} from './admin-types';

/**
 * Écritures du back-office.
 *
 * Une server action est joignable directement en POST : chacune vérifie donc
 * elle-même la session, sans se reposer sur la garde du proxy. Aucune ne lève :
 * elles renvoient un résultat que l'écran sait montrer, y compris « votre
 * session a expiré ».
 */

export type ActionResult<T> = {ok: true; data: T} | {ok: false; reason: ActionFailure};

export type ActionFailure =
  /** La session a expiré ou n'existe pas : il faut se reconnecter. */
  | 'session'
  /** L'API a refusé la valeur envoyée. */
  | 'invalid'
  /** La candidature ou le message n'existe plus. */
  | 'introuvable'
  /** Panne, coupure réseau, API injoignable. */
  | 'indisponible';

function failureOf(error: unknown): ActionFailure {
  if (!(error instanceof AdminApiError)) return 'indisponible';
  if (error.kind === 'unauthorized') return 'session';
  if (error.kind === 'not-found') return 'introuvable';
  if (error.kind === 'invalid') return 'invalid';
  return 'indisponible';
}

async function write<T>(path: string, method: string, body: unknown): Promise<ActionResult<T>> {
  const token = await readSessionToken();
  if (!token) return {ok: false, reason: 'session'};

  const store = await headers();
  const forwardedFor = store.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;

  try {
    const data = await fetchAdminJson<T>(path, {
      method,
      token,
      forwardedFor,
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    });
    return {ok: true, data};
  } catch (error) {
    return {ok: false, reason: failureOf(error)};
  }
}

/** Change le statut d'une candidature. L'API renvoie le dossier entier, historique compris. */
export async function changeApplicationStatus(
  id: string,
  status: ApplicationStatus,
  comment?: string,
): Promise<ActionResult<AdminApplication>> {
  const trimmed = comment?.trim();
  const result = await write<AdminApplication>(
    `/admin/applications/${encodeURIComponent(id)}/status`,
    'PATCH',
    // `comment` absent plutôt que vide : l'API refuse les champs qu'elle ne
    // déclare pas, et une chaîne vide encombrerait l'historique.
    trimmed ? {status, comment: trimmed} : {status},
  );

  if (result.ok) {
    revalidatePath(`/admin/candidatures/${id}`);
    revalidatePath('/admin/candidatures');
    revalidatePath('/admin');
  }
  return result;
}

/** Ajoute une note interne à une candidature. */
export async function addApplicationNote(id: string, text: string): Promise<ActionResult<AdminApplication>> {
  const trimmed = text.trim();
  if (trimmed === '') return {ok: false, reason: 'invalid'};

  const result = await write<AdminApplication>(
    `/admin/applications/${encodeURIComponent(id)}/notes`,
    'POST',
    {text: trimmed},
  );

  if (result.ok) {
    revalidatePath(`/admin/candidatures/${id}`);
  }
  return result;
}

/** Marque un message comme lu ou non lu. */
export async function setContactRead(id: string, isRead: boolean): Promise<ActionResult<AdminContact>> {
  const result = await write<AdminContact>(`/admin/contacts/${encodeURIComponent(id)}`, 'PATCH', {isRead});

  if (result.ok) {
    revalidatePath('/admin/messages');
    // Le compteur de messages non lus est affiché sur le tableau de bord.
    revalidatePath('/admin');
  }
  return result;
}
