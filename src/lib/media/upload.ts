import {DEFAULT_API_URL, normalizeBase} from '@/lib/api/base';
import type {ApiMedia} from '@/lib/api/content-types';
import {MAX_MEDIA_IMAGE_BYTES, MAX_MEDIA_VIDEO_BYTES, MEDIA_IMAGE_TYPES, MEDIA_VIDEO_TYPES} from '@/lib/constants';
import type {MediaKind} from '@/lib/constants';

/**
 * Téléversement d'un média **depuis le navigateur vers l'API**, sans passer par
 * Next.
 *
 * Même raison que les formulaires publics : une fonction Vercel plafonne le
 * corps d'une requête bien en dessous d'une vidéo. Le jeton de session vit dans
 * un cookie `httpOnly` illisible depuis la page, donc le back-office demande à
 * l'API un ticket de dix minutes, limité à ce seul usage, et le passe ici.
 *
 * Les dimensions et la durée sont mesurées ici, dans le navigateur : c'est le
 * seul endroit qui sait les lire sans dépendance côté serveur, et elles servent
 * aussi à montrer l'aperçu avant l'envoi.
 */
const UPLOAD_API_URL = normalizeBase(process.env.NEXT_PUBLIC_API_URL ?? '') || normalizeBase(DEFAULT_API_URL);

export const MEDIA_ACCEPT = [...MEDIA_IMAGE_TYPES, ...MEDIA_VIDEO_TYPES].join(',');

/** Un fichier choisi, inspecté, pas encore envoyé. */
export type LocalMedia = {
  file: File;
  kind: MediaKind;
  /** Adresse locale (`blob:`) pour l'aperçu. À révoquer quand on l'abandonne. */
  objectUrl: string;
  width?: number;
  height?: number;
  durationSeconds?: number;
};

export class MediaUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MediaUploadError';
  }
}

/** Messages des codes renvoyés par l'API, pour ne pas montrer un code brut. */
const API_MESSAGES: Record<string, string> = {
  FILE_REQUIRED: 'Aucun fichier n’a été envoyé.',
  FILE_TOO_LARGE: 'Fichier trop lourd pour la médiathèque.',
  FILE_TYPE_NOT_ALLOWED: 'Format refusé. Photos : JPEG, PNG, WebP. Vidéos : MP4, WebM.',
  TICKET_REQUIRED: 'Autorisation de téléversement manquante. Rechargez la page.',
  TICKET_INVALID: 'Autorisation de téléversement expirée. Rechargez la page.',
  TICKET_SCOPE: 'Autorisation de téléversement invalide. Rechargez la page.',
  POSTER_NOT_IMAGE: 'Une image d’attente doit être une photo.',
  POSTER_ON_IMAGE: 'Seule une vidéo peut porter une image d’attente.',
};

function kindOf(type: string): MediaKind | null {
  if (MEDIA_IMAGE_TYPES.includes(type as never)) return 'image';
  if (MEDIA_VIDEO_TYPES.includes(type as never)) return 'video';
  return null;
}

/** « 10 Mo », « 80 Mo » — le plafond selon le genre du fichier. */
export function ceilingFor(kind: MediaKind): number {
  return kind === 'image' ? MAX_MEDIA_IMAGE_BYTES : MAX_MEDIA_VIDEO_BYTES;
}

/**
 * Inspecte un fichier choisi : genre, dimensions, durée, et une adresse locale
 * pour l'aperçu. Lève un `MediaUploadError` lisible si le fichier ne convient
 * pas — l'API le refuserait de toute façon, autant le dire tout de suite.
 */
export async function inspectFile(file: File): Promise<LocalMedia> {
  const kind = kindOf(file.type);
  if (!kind) throw new MediaUploadError(API_MESSAGES.FILE_TYPE_NOT_ALLOWED);

  const ceiling = ceilingFor(kind);
  if (file.size > ceiling) {
    const limit = Math.round(ceiling / (1024 * 1024));
    throw new MediaUploadError(
      `Fichier trop lourd : ${limit} Mo au maximum pour ${kind === 'image' ? 'une photo' : 'une vidéo'}.`,
    );
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const measured = kind === 'image' ? await measureImage(objectUrl) : await measureVideo(objectUrl);
    return {file, kind, objectUrl, ...measured};
  } catch {
    // Le fichier s'enverra quand même : les dimensions ne sont qu'un confort.
    return {file, kind, objectUrl};
  }
}

function measureImage(src: string): Promise<{width: number; height: number}> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({width: image.naturalWidth, height: image.naturalHeight});
    image.onerror = () => reject(new Error('image illisible'));
    image.src = src;
  });
}

function measureVideo(src: string): Promise<{width: number; height: number; durationSeconds?: number}> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () =>
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        durationSeconds: Number.isFinite(video.duration) ? video.duration : undefined,
      });
    video.onerror = () => reject(new Error('vidéo illisible'));
    video.src = src;
  });
}

/** Envoie le fichier à l'API et renvoie la fiche du média créé. */
export async function uploadMedia(
  ticket: string,
  local: LocalMedia,
  describe: {title?: string; alt?: string} = {},
): Promise<ApiMedia> {
  const body = new FormData();
  body.append('file', local.file);
  if (describe.title?.trim()) body.append('title', describe.title.trim());
  if (describe.alt?.trim()) body.append('alt', describe.alt.trim());
  if (local.width) body.append('width', String(local.width));
  if (local.height) body.append('height', String(local.height));
  if (local.durationSeconds !== undefined) {
    // L'API accepte un nombre décimal ; deux chiffres suffisent à l'affichage.
    body.append('durationSeconds', local.durationSeconds.toFixed(2));
  }

  let response: Response;
  try {
    response = await fetch(`${UPLOAD_API_URL}/media/upload`, {
      method: 'POST',
      headers: {'X-Upload-Ticket': ticket},
      body,
    });
  } catch {
    throw new MediaUploadError('Téléversement interrompu. Vérifiez votre connexion, puis réessayez.');
  }

  if (!response.ok) {
    throw new MediaUploadError(await messageFor(response));
  }
  return (await response.json()) as ApiMedia;
}

async function messageFor(response: Response): Promise<string> {
  if (response.status === 429) {
    return 'Trop de téléversements d’affilée. Patientez quelques minutes.';
  }
  try {
    const body = (await response.json()) as {message?: string | string[]};
    const code = Array.isArray(body.message) ? body.message[0] : body.message;
    if (code && API_MESSAGES[code]) return API_MESSAGES[code];
    if (code) return code;
  } catch {
    // Réponse illisible : on retombe sur le message générique.
  }
  return response.status === 413 ? API_MESSAGES.FILE_TOO_LARGE : 'L’API a refusé le fichier.';
}
