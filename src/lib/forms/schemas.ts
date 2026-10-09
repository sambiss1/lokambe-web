import {z} from 'zod';
import {
  ALLOWED_FILE_TYPES,
  CONTACT_KINDS,
  MAX_FILE_SIZE_BYTES,
  MAX_FILES,
  NEED_TYPES,
  PHONE_MAX_LENGTH,
  PHONE_REGEX,
  SECTORS,
} from '@/lib/constants';

/**
 * Règles de validation des formulaires publics.
 *
 * Les messages ne sont pas écrits ici : ils viennent des fichiers de messages,
 * dans la langue de la page. Sans cela, un visiteur anglophone lirait « Indiquez
 * votre prénom. » sous un champ « First name ». Chaque schéma est donc construit
 * à la volée, avec le traducteur de la page.
 */

/** Ce qu'attend un schéma : la fonction `t` de next-intl, namespace `validation`. */
export type Translate = (key: string, values?: Record<string, string | number>) => string;

/** Traducteur d'attente : rend la clé. Il sert aux types et aux tests de contrat. */
export const identityTranslate: Translate = (key) => key;

const required = (message: string) => z.string().trim().min(1, message);

export function createApplicantSchema(t: Translate) {
  return z.object({
    firstName: required(t('firstName')),
    lastName: required(t('lastName')),
    phone: required(t('phone')).max(PHONE_MAX_LENGTH, t('phoneInvalid')).regex(PHONE_REGEX, t('phoneInvalid')),
    email: z.union([z.literal(''), z.string().trim().email(t('emailInvalid'))]).optional(),
    city: required(t('city')),
    commune: z.string().trim().optional(),
  });
}

export function createBusinessSchema(t: Translate) {
  return z
    .object({
      name: required(t('businessName')),
      sector: z.enum(SECTORS, {message: t('sector')}),
      sectorOther: z.string().trim().optional(),
      isFormal: z.boolean(),
      rccm: z.string().trim().optional(),
      foundedYear: z
        .union([z.literal(''), z.coerce.number().int().min(1950).max(new Date().getFullYear())])
        .optional(),
      employeesCount: z.coerce.number({message: t('number')}).int().min(0, t('number')),
      monthlyRevenueUsd: z.union([z.literal(''), z.coerce.number().min(0)]).optional(),
      description: required(t('description')).min(40, t('descriptionShort')),
    })
    .refine((value) => value.sector !== 'autre' || Boolean(value.sectorOther), {
      message: t('sectorOther'),
      path: ['sectorOther'],
    });
}

export function createNeedSchema(t: Translate) {
  return z.object({
    type: z.enum(NEED_TYPES, {message: t('needType')}),
    amountUsd: z.coerce.number({message: t('amount')}).positive(t('amount')),
    useOfFunds: required(t('useOfFunds')).min(30, t('useOfFundsShort')),
  });
}

export function createConsentSchema(t: Translate) {
  return z.object({
    consent: z.literal(true, {message: t('consent')}),
    /** Piège à robots : doit rester vide. */
    website: z.literal('').optional(),
  });
}

export function createApplicationSchema(t: Translate) {
  return z.object({
    applicant: createApplicantSchema(t),
    business: createBusinessSchema(t),
    need: createNeedSchema(t),
    ...createConsentSchema(t).shape,
  });
}

export function createContactSchema(t: Translate) {
  return z.object({
    kind: z.enum(CONTACT_KINDS, {message: t('kind')}),
    fullName: required(t('lastName')),
    organization: z.string().trim().optional(),
    email: required(t('email')).email(t('emailInvalid')),
    phone: z
      .union([
        z.literal(''),
        z.string().trim().max(PHONE_MAX_LENGTH, t('phoneInvalid')).regex(PHONE_REGEX, t('phoneInvalid')),
      ])
      .optional(),
    message: required(t('message')).min(20, t('messageShort')),
    website: z.literal('').optional(),
  });
}

export type ApplicationValues = z.input<ReturnType<typeof createApplicationSchema>>;
/** Ce que le formulaire produit une fois validé : c'est cela qu'on envoie à l'API. */
export type ApplicationParsed = z.output<ReturnType<typeof createApplicationSchema>>;

export type ContactValues = z.input<ReturnType<typeof createContactSchema>>;
export type ContactParsed = z.output<ReturnType<typeof createContactSchema>>;

export type FileError = {name: string; reason: string};

/** Valide une sélection de fichiers (type, taille, nombre). */
export function validateFiles(
  files: File[],
  existing: File[] = [],
  t: Translate = identityTranslate,
): {accepted: File[]; errors: FileError[]} {
  const accepted: File[] = [];
  const errors: FileError[] = [];

  for (const file of files) {
    if (existing.length + accepted.length >= MAX_FILES) {
      errors.push({name: file.name, reason: t('fileMax', {max: MAX_FILES})});
      continue;
    }
    if (!(ALLOWED_FILE_TYPES as readonly string[]).includes(file.type)) {
      errors.push({name: file.name, reason: t('fileFormat')});
      continue;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.push({name: file.name, reason: t('fileTooLarge', {max: MAX_FILE_SIZE_BYTES / (1024 * 1024)})});
      continue;
    }
    accepted.push(file);
  }

  return {accepted, errors};
}

/** Référence de dossier simulée, en attendant le branchement de l'API. */
export function mockReference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  let suffix = '';
  for (let index = 0; index < 6; index += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `LKB-${suffix}`;
}
