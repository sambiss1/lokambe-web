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
 * Copie exacte de `PHONE_REGEX` côté API. Le site doit refuser ce que l'API
 * refuse : sa regex acceptait le point et le `+` en milieu de chaîne, si bien
 * qu'un numéro saisi « +243 810.000.141 » passait le formulaire et revenait
 * en 400.
 */
export const PHONE_REGEX = /^\+?[0-9 ()-]{6,20}$/;

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
