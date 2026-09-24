import {normalizeBase} from './base';

/**
 * Appels du back-office vers l'API, côté serveur uniquement.
 *
 * L'inverse des formulaires publics : ici le jeton doit rester hors du
 * navigateur, donc c'est le serveur Next qui appelle l'API, en signant chaque
 * requête avec le JWT lu dans le cookie de session.
 *
 * `API_INTERNAL_URL` permet de viser une adresse différente de celle annoncée au
 * navigateur. Sur Vercel il n'y a pas de réseau privé vers l'API : les deux
 * valeurs sont identiques, et l'une sert de repli à l'autre.
 */
export const ADMIN_API_URL = normalizeBase(
  process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? '',
);

/** Faux tant que l'API n'est pas déployée : le back-office reste alors sur ses données de démonstration. */
export const isAdminApiConfigured = ADMIN_API_URL !== '';

export type AdminFailure = 'unauthorized' | 'not-found' | 'invalid' | 'too-many' | 'server' | 'network';

export class AdminApiError extends Error {
  constructor(
    readonly kind: AdminFailure,
    readonly status?: number,
  ) {
    super(`Appel API refusé (${kind}${status ? ` ${status}` : ''})`);
    this.name = 'AdminApiError';
  }
}

function failureFor(status: number): AdminFailure {
  if (status === 401 || status === 403) return 'unauthorized';
  if (status === 404) return 'not-found';
  if (status === 429) return 'too-many';
  if (status >= 400 && status < 500) return 'invalid';
  return 'server';
}

type CallOptions = {
  method?: string;
  token?: string | null;
  body?: BodyInit;
  headers?: Record<string, string>;
  /** IP réelle du visiteur, à transmettre pour que l'API ne compte pas tout le trafic sur celle du serveur. */
  forwardedFor?: string | null;
};

/**
 * Appelle l'API et renvoie la réponse brute, sans l'interpréter : les routes
 * relais (téléchargement, export CSV) en ont besoin telle quelle.
 */
export async function callAdminApi(path: string, options: CallOptions = {}): Promise<Response> {
  if (!isAdminApiConfigured) {
    throw new AdminApiError('server');
  }

  const headers: Record<string, string> = {...options.headers};
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }
  if (options.forwardedFor) {
    // Sans cet en-tête, l'API compterait toutes les requêtes du site comme
    // venant d'une seule adresse : celle de l'hébergeur.
    headers['X-Forwarded-For'] = options.forwardedFor;
  }

  try {
    return await fetch(`${ADMIN_API_URL}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body: options.body,
      // Le back-office montre l'état courant des dossiers : jamais de cache.
      cache: 'no-store',
    });
  } catch {
    throw new AdminApiError('network');
  }
}

/** Appelle l'API et rend le JSON, en traduisant les statuts d'erreur. */
export async function fetchAdminJson<T>(path: string, options: CallOptions = {}): Promise<T> {
  const response = await callAdminApi(path, options);

  if (!response.ok) {
    throw new AdminApiError(failureFor(response.status), response.status);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new AdminApiError('server', response.status);
  }
}
