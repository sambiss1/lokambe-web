import {apiMediaUrl, isBlogApiConfigured} from '@/lib/api/articles';

/**
 * Relais public des images d'article.
 *
 * Les images vivent dans l'API (GridFS), mais le HTML des articles pointe vers
 * le site : même domaine pour le navigateur, et l'adresse de l'API peut changer
 * sans réécrire les articles déjà publiés.
 */
/**
 * Types servis, et eux seuls. L'API ne stocke que des images — elle reconnaît
 * le format aux octets de tête — mais ce relais sert le **domaine du site** :
 * un jour où l'API renverrait autre chose, un fichier interprété comme une page
 * s'exécuterait dans l'origine du site. On refuse plutôt que de faire confiance.
 */
const SERVABLE = ['image/jpeg', 'image/png', 'image/webp'];

export async function GET(_request: Request, context: {params: Promise<{fileId: string}>}) {
  const {fileId} = await context.params;
  if (!isBlogApiConfigured) return new Response(null, {status: 404});

  let response: Response;
  try {
    response = await fetch(apiMediaUrl(fileId), {
      // L'image ne change jamais : son identifiant change avec elle.
      next: {revalidate: 31_536_000},
    });
  } catch {
    return new Response(null, {status: 502});
  }

  if (!response.ok) return new Response(null, {status: response.status});

  const contentType = response.headers.get('Content-Type')?.split(';')[0]?.trim() ?? '';
  if (!SERVABLE.includes(contentType)) return new Response(null, {status: 415});

  return new Response(response.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      // Le navigateur ne doit pas deviner un autre type que celui annoncé.
      'X-Content-Type-Options': 'nosniff',
      'Content-Disposition': 'inline',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
