/**
 * Adresse de l'API en production, inscrite dans le code.
 *
 * Ce n'est pas un contournement des variables d'environnement :
 * `NEXT_PUBLIC_API_URL` et `API_INTERNAL_URL` restent prioritaires partout.
 * C'est un repli, pour que le site déployé parle à l'API même si personne n'a
 * posé la variable sur Vercel — sans elle, les formulaires repartent en mode
 * démonstration et `/admin` devient inaccessible, en silence. L'adresse d'une
 * API publique n'est pas un secret.
 */
export const DEFAULT_API_URL = 'https://lokambe-api-production.up.railway.app/api';

/**
 * Base des routes de l'API, préfixe `/api` compris, sans barre oblique finale.
 *
 * Les deux écritures sont acceptées — « https://api.lokambe.com » comme
 * « https://api.lokambe.com/api » : oublier le préfixe en configurant Vercel
 * ferait répondre 404 à tout, sans rien dire.
 */
export function normalizeBase(raw: string): string {
  const trimmed = raw.trim().replace(/\/+$/, '');
  if (trimmed === '') return '';
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

/**
 * La première adresse utilisable parmi les candidates, sinon celle de
 * production. Le repli ne vaut qu'en production : en local, on ne suppose rien
 * et le site garde son mode démonstration si l'API ne tourne pas.
 */
export function apiUrlFrom(...candidates: (string | undefined)[]): string {
  for (const candidate of candidates) {
    const normalized = normalizeBase(candidate ?? '');
    if (normalized !== '') return normalized;
  }
  return process.env.NODE_ENV === 'production' ? normalizeBase(DEFAULT_API_URL) : '';
}
