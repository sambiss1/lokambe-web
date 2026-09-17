/**
 * Appels des formulaires publics vers l'API.
 *
 * Les deux formulaires appellent l'API **depuis le navigateur**, sans passer par
 * une route Next. Ce n'est pas un raccourci : une fonction Vercel plafonne le
 * corps d'une requête bien en dessous des cinq pièces jointes de 10 Mo qu'une
 * candidature peut porter, et un relais côté serveur masquerait l'adresse IP du
 * visiteur, dont l'API a besoin pour sa limitation de débit. L'API doit donc
 * déclarer le domaine du site dans son `CORS_ORIGIN`.
 *
 * Le back-office, lui, fait l'inverse : appels côté serveur, jeton gardé dans un
 * cookie httpOnly.
 */

import {normalizeBase} from './base';

/** Base des routes de l'API. Vide tant qu'elle n'est pas déployée. */
export const API_URL = normalizeBase(process.env.NEXT_PUBLIC_API_URL ?? '');

/**
 * Tant que l'API n'a pas d'adresse, les formulaires gardent leur écran de
 * démonstration : le site en ligne reste utilisable sans rien transmettre, et
 * l'avertissement « aucun dossier n'est réellement transmis » reste exact.
 */
export const isApiConfigured = API_URL !== '';

export type SubmitFailure =
  /** 400 : l'API a refusé les données. Décalage entre le site et l'API, ou fichier refusé. */
  | 'invalid'
  /** 429 : trop d'envois depuis cette adresse. */
  | 'too-many'
  /** 5xx, ou réponse illisible. */
  | 'server'
  /** La requête n'est jamais arrivée. */
  | 'network';

export class SubmitError extends Error {
  constructor(
    readonly kind: SubmitFailure,
    readonly status?: number,
  ) {
    super(`Échec d'envoi (${kind}${status ? ` ${status}` : ''})`);
    this.name = 'SubmitError';
  }
}

function failureFor(status: number): SubmitFailure {
  if (status === 429) return 'too-many';
  if (status >= 400 && status < 500) return 'invalid';
  return 'server';
}

async function send(path: string, body: BodyInit, headers?: HeadersInit): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {method: 'POST', body, headers});
  } catch {
    // Réseau coupé, DNS, CORS refusé : la requête n'a pas abouti.
    throw new SubmitError('network');
  }

  if (!response.ok) {
    throw new SubmitError(failureFor(response.status), response.status);
  }

  try {
    return await response.json();
  } catch {
    throw new SubmitError('server', response.status);
  }
}

/** Dépose une candidature. Renvoie la référence de dossier attribuée par l'API. */
export async function submitApplication(payload: unknown, files: File[]): Promise<string> {
  const form = new FormData();
  // L'API lit le dossier dans un champ texte `data` et les pièces dans `files`.
  form.append('data', JSON.stringify(payload));
  for (const file of files) {
    form.append('files', file, file.name);
  }

  // Surtout pas de Content-Type manuel : le navigateur doit poser lui-même la
  // frontière multipart.
  const result = await send('/applications', form);
  const reference = (result as {reference?: unknown})?.reference;
  if (typeof reference !== 'string' || reference === '') {
    throw new SubmitError('server');
  }
  return reference;
}

/** Envoie un message de contact. */
export async function submitContact(payload: unknown): Promise<void> {
  await send('/contacts', JSON.stringify(payload), {'Content-Type': 'application/json'});
}
