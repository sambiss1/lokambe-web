import {cookies} from 'next/headers';
import type {NextRequest} from 'next/server';
import {callAdminApi, isAdminApiConfigured} from '@/lib/api/server';
import {SESSION_COOKIE, sessionCookieOptions} from '@/lib/api/session';

/**
 * Connexion et déconnexion du back-office.
 *
 * Le navigateur ne voit jamais le JWT : il poste ici ses identifiants, cette
 * route interroge l'API, puis range le jeton dans un cookie `httpOnly`. Poser un
 * cookie n'est possible que depuis un route handler ou une server action, pas
 * pendant le rendu d'un composant serveur — d'où cette route.
 */

/** Adresse réelle du visiteur, telle que l'hébergeur la rapporte. */
function clientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  // L'en-tête peut lister plusieurs sauts : le premier est le client d'origine.
  const first = forwarded?.split(',')[0]?.trim();
  return first && first !== '' ? first : request.headers.get('x-real-ip');
}

export async function POST(request: NextRequest) {
  if (!isAdminApiConfigured) {
    return Response.json({error: 'api-absente'}, {status: 503});
  }

  let credentials: {email?: unknown; password?: unknown};
  try {
    credentials = await request.json();
  } catch {
    return Response.json({error: 'requete-illisible'}, {status: 400});
  }

  const email = typeof credentials.email === 'string' ? credentials.email.trim() : '';
  const password = typeof credentials.password === 'string' ? credentials.password : '';
  if (email === '' || password === '') {
    return Response.json({error: 'identifiants-manquants'}, {status: 400});
  }

  let response: Response;
  try {
    response = await callAdminApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
      forwardedFor: clientIp(request),
    });
  } catch {
    return Response.json({error: 'api-injoignable'}, {status: 502});
  }

  if (!response.ok) {
    // 401 (identifiants refusés) et 429 (trop de tentatives) sont repris tels
    // quels : ce sont les deux cas que l'écran de connexion sait expliquer.
    return Response.json({error: response.status === 429 ? 'trop-de-tentatives' : 'identifiants-refuses'}, {
      status: response.status === 429 ? 429 : 401,
    });
  }

  const {accessToken} = (await response.json()) as {accessToken?: string};
  if (!accessToken) {
    return Response.json({error: 'reponse-inattendue'}, {status: 502});
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, accessToken, sessionCookieOptions());
  return Response.json({ok: true});
}

/** Déconnexion : le cookie est supprimé, le jeton reste valide jusqu'à son expiration côté API. */
export async function DELETE() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return Response.json({ok: true});
}
