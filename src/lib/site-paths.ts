export const PUBLIC_PATHS = [
  '/',
  '/a-propos',
  '/notre-modele',
  '/processus',
  '/secteurs-et-criteres',
  '/notre-equipe',
  '/impact',
  '/soumettre-un-projet',
  '/blog',
  '/carrieres',
  '/contact',
  '/mentions-legales',
  '/confidentialite',
] as const;

export type PublicPath = (typeof PUBLIC_PATHS)[number];

export function isPublicPath(value: string): value is PublicPath {
  return (PUBLIC_PATHS as readonly string[]).includes(value);
}
