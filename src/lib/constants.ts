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
