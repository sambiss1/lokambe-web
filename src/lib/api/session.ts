import {cookies} from 'next/headers';

/**
 * Session du back-office.
 *
 * Le jeton JWT de l'API ne descend jamais dans le navigateur : il vit dans un
 * cookie `httpOnly`, lu uniquement côté serveur pour signer les appels à l'API.
 * Un script injecté dans la page ne peut donc pas le lire.
 *
 * Ce module est de fait réservé au serveur : `next/headers` lève dès qu'on
 * l'importe dans un composant client.
 */

export const SESSION_COOKIE = 'lokambe_admin';

/** Même durée que le JWT émis par l'API (`JWT_EXPIRES_IN=8h`). */
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

/** Le jeton de la session en cours, ou `null` si personne n'est connecté. */
export async function readSessionToken(): Promise<string | null> {
  const store = await cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  return value && value !== '' ? value : null;
}

/**
 * Options du cookie de session. `secure` seulement hors développement : en
 * local le site tourne en http, un cookie `secure` n'y serait jamais renvoyé.
 */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // `lax` laisse passer la navigation depuis un lien externe, tout en
    // écartant les envois de formulaire inter-sites.
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
