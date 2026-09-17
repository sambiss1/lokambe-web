import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {AdminApiError, callAdminApi, fetchAdminJson} from './server';
import {readSessionToken} from './session';
import type {
  AdminApplication,
  AdminApplicationSummary,
  AdminContact,
  AdminStats,
  ApplicationFilters,
  ContactFilters,
  Page,
} from './admin-types';

/**
 * Lectures du back-office, côté serveur.
 *
 * Le filtrage et la pagination sont faits par l'API : le site ne rapatrie
 * jamais la collection entière pour la trier lui-même.
 *
 * Attention en ajoutant un paramètre : l'API refuse tout paramètre qu'elle ne
 * déclare pas (`forbidNonWhitelisted`), un nom inventé ici vaut un 400.
 */

/** Nombre de lignes par page, aligné sur le défaut de l'API. */
export const PAGE_SIZE = 20;

/** Adresse réelle du visiteur, pour que l'API ne compte pas tout sur celle de l'hébergeur. */
async function forwardedFor(): Promise<string | null> {
  const store = await headers();
  const first = store.get('x-forwarded-for')?.split(',')[0]?.trim();
  return first && first !== '' ? first : store.get('x-real-ip');
}

/**
 * Jeton de la session, ou retour à la connexion.
 *
 * Le proxy a déjà écarté les visiteurs sans cookie ; on repasse ici parce que
 * le cookie a pu expirer entre-temps.
 */
async function requireToken(): Promise<string> {
  const token = await readSessionToken();
  if (!token) redirect('/admin/login');
  return token;
}

/**
 * Exécute une lecture et renvoie à la connexion si l'API refuse le jeton :
 * un jeton expiré ne doit pas afficher une page d'erreur, mais l'écran de
 * connexion.
 */
async function read<T>(path: string): Promise<T> {
  const token = await requireToken();
  try {
    return await fetchAdminJson<T>(path, {token, forwardedFor: await forwardedFor()});
  } catch (error) {
    if (error instanceof AdminApiError && error.kind === 'unauthorized') {
      redirect('/admin/login?expiree=1');
    }
    throw error;
  }
}

function query(params: Record<string, string | number | boolean | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === '') continue;
    search.set(key, String(value));
  }
  const rendered = search.toString();
  return rendered === '' ? '' : `?${rendered}`;
}

export async function getStats(): Promise<AdminStats> {
  return read<AdminStats>('/admin/stats');
}

export async function listApplications(
  filters: ApplicationFilters = {},
  limit: number = PAGE_SIZE,
): Promise<Page<AdminApplicationSummary>> {
  return read<Page<AdminApplicationSummary>>(
    `/admin/applications${query({
      status: filters.status,
      sector: filters.sector,
      q: filters.q,
      page: filters.page,
      limit,
    })}`,
  );
}

/** `null` quand la candidature n'existe pas : au rendu, `notFound()`. */
export async function getApplication(id: string): Promise<AdminApplication | null> {
  try {
    return await read<AdminApplication>(`/admin/applications/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof AdminApiError && error.kind === 'not-found') return null;
    throw error;
  }
}

export async function listContacts(
  filters: ContactFilters = {},
  limit: number = PAGE_SIZE,
): Promise<Page<AdminContact>> {
  return read<Page<AdminContact>>(
    `/admin/contacts${query({
      kind: filters.kind,
      // L'API attend les chaînes « true »/« false » en paramètre d'URL ;
      // toute autre écriture vaut un 400.
      isRead: filters.isRead === undefined ? undefined : String(filters.isRead),
      page: filters.page,
      limit,
    })}`,
  );
}

/** Réponse brute de l'API, pour les routes relais (téléchargement, export). */
export async function proxyAdminRequest(path: string): Promise<Response> {
  const token = await readSessionToken();
  if (!token) {
    return new Response(null, {status: 401});
  }
  return callAdminApi(path, {token, forwardedFor: await forwardedFor()});
}
