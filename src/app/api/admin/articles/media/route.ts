import {callAdminApi} from '@/lib/api/server';
import {readSessionToken} from '@/lib/api/session';

/** Poids maximal accepté, aligné sur l'API : au-delà, inutile d'appeler. */
const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Relais de téléversement des images d'article.
 *
 * L'éditeur du back-office tourne dans le navigateur, qui n'a pas le jeton :
 * il envoie donc l'image au site, qui la transmet à l'API en signant l'appel et
 * rend l'URL publique à insérer dans l'article.
 */
export async function POST(request: Request) {
  const token = await readSessionToken();
  if (!token) return Response.json({error: 'session'}, {status: 401});

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({error: 'invalide'}, {status: 400});
  }

  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({error: 'fichier manquant'}, {status: 400});
  }
  if (file.size > MAX_BYTES) {
    return Response.json({error: 'image trop lourde (5 Mo maximum)'}, {status: 413});
  }

  const forward = new FormData();
  forward.append('file', file, file.name);

  try {
    const response = await callAdminApi('/admin/articles/media', {
      method: 'POST',
      token,
      body: forward,
    });
    if (!response.ok) {
      return Response.json({error: 'refusé par l’API'}, {status: response.status});
    }
    return Response.json(await response.json());
  } catch {
    return Response.json({error: 'API injoignable'}, {status: 502});
  }
}
