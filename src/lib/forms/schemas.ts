import {z} from 'zod';
import {
  ALLOWED_FILE_TYPES,
  CONTACT_KINDS,
  MAX_FILE_SIZE_BYTES,
  MAX_FILES,
  NEED_TYPES,
  PHONE_REGEX,
  SECTORS,
} from '@/lib/constants';

const required = (message: string) => z.string().trim().min(1, message);

export const applicantSchema = z.object({
  firstName: required('Indiquez votre prénom.'),
  lastName: required('Indiquez votre nom.'),
  phone: required('Indiquez un numéro de téléphone.').regex(PHONE_REGEX, 'Numéro de téléphone invalide.'),
  email: z.union([z.literal(''), z.string().trim().email('Adresse email invalide.')]).optional(),
  city: required('Indiquez votre ville.'),
  commune: z.string().trim().optional(),
});

export const businessSchema = z
  .object({
    name: required('Indiquez le nom de votre activité.'),
    sector: z.enum(SECTORS, {message: 'Choisissez un secteur.'}),
    sectorOther: z.string().trim().optional(),
    isFormal: z.boolean(),
    rccm: z.string().trim().optional(),
    foundedYear: z
      .union([z.literal(''), z.coerce.number().int().min(1950).max(new Date().getFullYear())])
      .optional(),
    employeesCount: z.coerce.number({message: 'Indiquez un nombre.'}).int().min(0, 'Indiquez un nombre.'),
    monthlyRevenueUsd: z.union([z.literal(''), z.coerce.number().min(0)]).optional(),
    description: required('Décrivez votre activité.').min(40, 'Décrivez votre activité en quelques phrases (40 caractères minimum).'),
  })
  .refine((value) => value.sector !== 'autre' || Boolean(value.sectorOther), {
    message: 'Précisez votre secteur.',
    path: ['sectorOther'],
  });

export const needSchema = z.object({
  type: z.enum(NEED_TYPES, {message: 'Choisissez un type de besoin.'}),
  amountUsd: z.coerce.number({message: 'Indiquez un montant en dollars.'}).positive('Indiquez un montant en dollars.'),
  useOfFunds: required('Expliquez l’utilisation prévue du capital.').min(
    30,
    'Expliquez en quelques phrases comment le capital sera utilisé (30 caractères minimum).',
  ),
});

export const consentSchema = z.object({
  consent: z.literal(true, {message: 'Votre accord est nécessaire pour étudier votre dossier.'}),
  /** Piège à robots : doit rester vide. */
  website: z.literal('').optional(),
});

export const applicationSchema = z.object({
  applicant: applicantSchema,
  business: businessSchema,
  need: needSchema,
  ...consentSchema.shape,
});

export type ApplicationValues = z.input<typeof applicationSchema>;
/** Ce que le formulaire produit une fois validé : c'est cela qu'on envoie à l'API. */
export type ApplicationParsed = z.output<typeof applicationSchema>;

export const contactSchema = z.object({
  kind: z.enum(CONTACT_KINDS, {message: 'Choisissez un objet.'}),
  fullName: required('Indiquez votre nom.'),
  organization: z.string().trim().optional(),
  email: required('Indiquez votre email.').email('Adresse email invalide.'),
  phone: z
    .union([z.literal(''), z.string().trim().regex(PHONE_REGEX, 'Numéro de téléphone invalide.')])
    .optional(),
  message: required('Écrivez votre message.').min(20, 'Votre message doit contenir au moins 20 caractères.'),
  website: z.literal('').optional(),
});

export type ContactValues = z.input<typeof contactSchema>;
export type ContactParsed = z.output<typeof contactSchema>;

export type FileError = {name: string; reason: string};

/** Valide une sélection de fichiers (type, taille, nombre). */
export function validateFiles(files: File[], existing: File[] = []): {accepted: File[]; errors: FileError[]} {
  const accepted: File[] = [];
  const errors: FileError[] = [];

  for (const file of files) {
    if (existing.length + accepted.length >= MAX_FILES) {
      errors.push({name: file.name, reason: `Maximum ${MAX_FILES} fichiers.`});
      continue;
    }
    if (!(ALLOWED_FILE_TYPES as readonly string[]).includes(file.type)) {
      errors.push({name: file.name, reason: 'Format non accepté (PDF, JPG, PNG ou WEBP).'});
      continue;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.push({name: file.name, reason: 'Fichier trop lourd (10 Mo maximum).'});
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
