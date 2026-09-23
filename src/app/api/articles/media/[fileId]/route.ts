import {apiMediaUrl, isBlogApiConfigured} from '@/lib/api/articles';

/**
 * Relais public des images d'article.
 *
 * Les images vivent dans l'API (GridFS), mais le HTML des articles pointe vers
 * le site : même domaine pour le navigateur, et l'adresse de l'API peut changer
 * sans réécrire les articles déjà publiés.
 */
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

  return new Response(response.body, {
    status: 200,
    headers: {
      'Content-Type': response.headers.get('Content-Type') ?? 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
