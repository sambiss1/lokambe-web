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
