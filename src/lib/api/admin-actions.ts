'use server';

import {revalidatePath, updateTag} from 'next/cache';
import type {ApplicationStatus} from '@/lib/constants';
import type {ApiArticle} from '@/lib/blog/article';
import {clean, writeAdmin} from './admin-write';
import type {ActionFailure, ActionResult} from './admin-write';
import {ARTICLES_TAG} from './articles';
import type {AdminApplication, AdminContact} from './admin-types';

/**
 * Écritures du back-office.
 *
 * Une server action est joignable directement en POST : chacune vérifie donc
 * elle-même la session, sans se reposer sur la garde du proxy. Aucune ne lève :
 * elles renvoient un résultat que l'écran sait montrer, y compris « votre
 * session a expiré ».
 */

export type {ActionFailure, ActionResult};

/** Les écritures de ce module passent par le socle commun (`admin-write.ts`). */
const write = writeAdmin;

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

  const result = await write<AdminApplication>(`/admin/applications/${encodeURIComponent(id)}/notes`, 'POST', {
    text: trimmed,
  });

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
export async function setArticleStatus(id: string, status: 'brouillon' | 'publie'): Promise<ActionResult<ApiArticle>> {
  const result = await write<ApiArticle>(`/admin/articles/${encodeURIComponent(id)}`, 'PATCH', {status});
  if (result.ok) revalidateArticles(id);
  return result;
}

export async function deleteArticle(id: string): Promise<ActionResult<{ok: true}>> {
  const result = await write<{ok: true}>(`/admin/articles/${encodeURIComponent(id)}`, 'DELETE', undefined);
  if (result.ok) revalidateArticles();
  return result;
}
