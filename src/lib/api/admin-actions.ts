'use server';

import {revalidatePath, updateTag} from 'next/cache';
import {headers} from 'next/headers';
import type {ApplicationStatus} from '@/lib/constants';
import type {ApiArticle} from '@/lib/blog/article';
import {ARTICLES_TAG} from './articles';
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

/* ---------------------------------------------------------------- articles */

/** Ce que le formulaire d'article envoie. Les champs vides sont omis, jamais vides. */
export type ArticleInput = {
  title: string;
  slug?: string;
  excerpt: string;
  /** HTML de l'éditeur. L'API le nettoie avant de l'enregistrer. */
  content: string;
  category: string;
  author?: string;
  status?: 'brouillon' | 'publie';
  coverFileId?: string | null;
  coverAlt?: string;
};

/**
 * Le blog public est mis en cache sous l'étiquette `articles`. `updateTag` —
 * et non `revalidateTag` — parce que la personne qui vient de publier doit voir
 * son article tout de suite, pas une version encore en cache.
 */
function revalidateArticles(id?: string): void {
  updateTag(ARTICLES_TAG);
  revalidatePath('/admin/articles');
  if (id) revalidatePath(`/admin/articles/${id}`);
}

export async function createArticle(input: ArticleInput): Promise<ActionResult<ApiArticle>> {
  const result = await write<ApiArticle>('/admin/articles', 'POST', clean(input));
  if (result.ok) revalidateArticles();
  return result;
}

export async function updateArticle(id: string, input: Partial<ArticleInput>): Promise<ActionResult<ApiArticle>> {
  const result = await write<ApiArticle>(`/admin/articles/${encodeURIComponent(id)}`, 'PATCH', clean(input));
  if (result.ok) revalidateArticles(id);
  return result;
}

/** Publier ou repasser en brouillon, sans toucher au reste. */
export async function setArticleStatus(
  id: string,
  status: 'brouillon' | 'publie',
): Promise<ActionResult<ApiArticle>> {
  const result = await write<ApiArticle>(`/admin/articles/${encodeURIComponent(id)}`, 'PATCH', {status});
  if (result.ok) revalidateArticles(id);
  return result;
}

export async function deleteArticle(id: string): Promise<ActionResult<{ok: true}>> {
  const result = await write<{ok: true}>(`/admin/articles/${encodeURIComponent(id)}`, 'DELETE', undefined);
  if (result.ok) revalidateArticles();
  return result;
}

/**
 * L'API refuse les champs qu'elle ne déclare pas et les chaînes vides : on
 * n'envoie que ce qui est renseigné. `coverFileId: null` fait exception, c'est
 * ainsi qu'on retire une couverture.
 */
function clean(input: Partial<ArticleInput>): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    if (typeof value === 'string' && value.trim() === '') continue;
    payload[key] = typeof value === 'string' ? value.trim() : value;
  }
  return payload;
}
