import type {NextRequest} from 'next/server';
import {proxyAdminRequest} from '@/lib/api/admin';

/**
 * Relais de l'export CSV des candidatures.
 *
 * Même raison que le téléchargement des pièces jointes : le jeton reste côté
 * serveur. Les filtres de l'écran sont repris tels quels.
 */

/** Seuls ces filtres existent côté API : tout autre paramètre y vaudrait un 400. */
const ALLOWED = ['status', 'sector', 'q'] as const;

export async function GET(request: NextRequest) {
  const search = new URLSearchParams();
  for (const name of ALLOWED) {
    const value = request.nextUrl.searchParams.get(name);
    if (value !== null && value !== '') search.set(name, value);
  }

  const rendered = search.toString();
  const response = await proxyAdminRequest(
    `/admin/applications/export.csv${rendered === '' ? '' : `?${rendered}`}`,
  );

  if (!response.ok) {
    return new Response(null, {status: response.status});
  }

  return new Response(response.body, {
    status: 200,
    headers: {
      'Content-Type': response.headers.get('Content-Type') ?? 'text/csv; charset=utf-8',
      'Content-Disposition':
        response.headers.get('Content-Disposition') ?? 'attachment; filename="candidatures.csv"',
      'Cache-Control': 'private, no-store',
    },
  });
}
