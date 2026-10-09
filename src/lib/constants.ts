/** Miroir des enums de l'API (`lokambe-api/src/common/constants.ts`). */
export const SECTORS = [
  'restauration',
  'metiers_de_bouche',
  'commerce_distribution',
  'evenementiel',
  'services',
  'medias_divertissement',
  'education_formation',
  'autre',
] as const;
export const NEED_TYPES = ['croissance', 'equipements', 'expansion', 'autre'] as const;
export const APPLICATION_STATUSES = [
  'recu',
  'preselection',
  'visite',
  'analyse',
  'due_diligence',
  'comite',
  'finance',
  'rejete',
] as const;
export const CONTACT_KINDS = ['investisseur', 'partenaire', 'expert', 'entrepreneur', 'autre'] as const;
export const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'] as const;
export const MAX_FILES = 5;
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

/**
 * Copie exacte de `PHONE_REGEX` côté API, et des bornes qui l'accompagnent. Le
 * site doit refuser ce que l'API refuse, sans quoi un numéro passe le
 * formulaire et revient en 400.
 *
 * Deux formes, et elles seules :
 *
 * - **avec indicatif** — un `+` puis 8 à 15 chiffres (le maximum d'un numéro
 *   dans la norme E.164). C'est la forme à préférer : un numéro étranger,
 *   celui d'un entrepreneur de la diaspora par exemple, passe sans rien
 *   changer. C'est elle que proposent le texte d'aide et l'exemple du champ.
 * - **sans indicatif** — un `0` puis 9 chiffres, le format national congolais.
 *
 * Espaces, parenthèses et tirets sont tolérés entre les chiffres et ne
 * comptent pas ; `PHONE_MAX_LENGTH` borne la chaîne brute pour qu'on ne
 * puisse pas la rallonger de séparateurs.
 */
export const PHONE_REGEX = /^(?:\+\d(?:[ ()-]*\d){7,14}|0(?:[ ()-]*\d){9})$/;

export const PHONE_MIN_LENGTH = 6;
export const PHONE_MAX_LENGTH = 20;

/** Ce qu'on retire de ce qui est tapé ou collé dans un champ téléphone. */
export const PHONE_DISALLOWED_CHARS = /[^0-9 ()+-]/g;

export type Sector = (typeof SECTORS)[number];
export type NeedType = (typeof NEED_TYPES)[number];
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type ContactKind = (typeof CONTACT_KINDS)[number];

/* ------------------------------------- médiathèque et contenu administrable */

export const MEDIA_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const MEDIA_VIDEO_TYPES = ['video/mp4', 'video/webm'] as const;
export const MEDIA_TYPES = [...MEDIA_IMAGE_TYPES, ...MEDIA_VIDEO_TYPES] as const;
export const MEDIA_KINDS = ['image', 'video'] as const;

export const MAX_MEDIA_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_MEDIA_VIDEO_BYTES = 80 * 1024 * 1024;

export const PUBLICATION_STATUSES = ['brouillon', 'publie'] as const;
export const CONTRACT_TYPES = ['cdi', 'cdd', 'stage', 'consultance', 'alternance'] as const;

export type MediaImageType = (typeof MEDIA_IMAGE_TYPES)[number];
export type MediaVideoType = (typeof MEDIA_VIDEO_TYPES)[number];
export type MediaType = (typeof MEDIA_TYPES)[number];
export type MediaKind = (typeof MEDIA_KINDS)[number];
export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];
export type ContractType = (typeof CONTRACT_TYPES)[number];

/** Libellés français : écrans du back-office et page Carrières. */
export const CONTRACT_TYPE_LABELS: Record<ContractType, string> = {
  cdi: 'CDI',
  cdd: 'CDD',
  stage: 'Stage',
  consultance: 'Consultance',
  alternance: 'Alternance',
};

export const PUBLICATION_STATUS_LABELS: Record<PublicationStatus, string> = {
  brouillon: 'Brouillon',
  publie: 'Publié',
};
