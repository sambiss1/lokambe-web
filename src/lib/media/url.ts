import {DEFAULT_API_URL, normalizeBase} from '@/lib/api/base';

/**
 * Adresses des médias téléversés.
 *
 * Les fichiers sont servis **directement par l'API**, pas par un relais Next :
 * une vidéo se lit par intervalles d'octets, et chaque image qui passerait par
 * une fonction Vercel coûterait une invocation sans rien apporter — l'API pose
 * déjà un cache d'un an et les identifiants sont imprévisibles.
 *
 * Ce module tourne aussi bien dans le navigateur que sur le serveur : il ne lit
 * que `NEXT_PUBLIC_API_URL`, figée au moment de la construction.
 */
const PUBLIC_API_URL = normalizeBase(process.env.NEXT_PUBLIC_API_URL ?? '') || normalizeBase(DEFAULT_API_URL);

/** Le fichier d'un média : à mettre dans un `src` d'image ou de vidéo. */
export function mediaFileUrl(mediaId: string): string {
  return `${PUBLIC_API_URL}/media/${encodeURIComponent(mediaId)}/file`;
}

/** La fiche publique d'un média (type, texte alternatif, dimensions, durée). */
export function mediaApiUrl(mediaId: string): string {
  return `${PUBLIC_API_URL}/media/${encodeURIComponent(mediaId)}`;
}

/**
 * L'image d'une entrée de collection : le média téléversé s'il existe, sinon
 * l'image livrée avec le site, sinon rien — l'appelant affiche alors son repli
 * (un monogramme, les initiales d'une entreprise).
 */
export function entryImageUrl(entry: {mediaId?: string; legacyImagePath?: string}): string | undefined {
  if (entry.mediaId) return mediaFileUrl(entry.mediaId);
  return entry.legacyImagePath;
}

/** « 4,2 Mo », « 812 ko ». */
export function formatMediaSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} Mo`;
}

/** « 1 min 42 s », « 8 s ». */
export function formatDuration(seconds: number): string {
  const whole = Math.round(seconds);
  if (whole < 60) return `${whole} s`;
  const minutes = Math.floor(whole / 60);
  const rest = whole % 60;
  return rest === 0 ? `${minutes} min` : `${minutes} min ${rest} s`;
}
