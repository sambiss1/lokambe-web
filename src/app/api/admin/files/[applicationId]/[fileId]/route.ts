import {proxyAdminRequest} from '@/lib/api/admin';

/**
 * Relais de téléchargement d'une pièce jointe.
 *
 * Le navigateur ne peut pas appeler l'API directement : il faudrait lui confier
 * le jeton. Il demande donc le fichier au site, qui le récupère en signant la
 * requête et repasse le flux tel quel — sans le charger en mémoire.
 */
export async function GET(
  _request: Request,
  context: {params: Promise<{applicationId: string; fileId: string}>},
) {
  const {applicationId, fileId} = await context.params;

  const response = await proxyAdminRequest(
    `/admin/applications/${encodeURIComponent(applicationId)}/files/${encodeURIComponent(fileId)}`,
  );

  if (!response.ok) {
    return new Response(null, {status: response.status});
  }

  // Les en-têtes de l'API portent déjà le type et le nom du fichier.
  return new Response(response.body, {
    status: 200,
    headers: {
      'Content-Type': response.headers.get('Content-Type') ?? 'application/octet-stream',
      'Content-Disposition': response.headers.get('Content-Disposition') ?? 'attachment',
      // Un dossier peut changer : ce fichier ne doit jamais être mis en cache
      // par un intermédiaire.
      'Cache-Control': 'private, no-store',
    },
  });
}
