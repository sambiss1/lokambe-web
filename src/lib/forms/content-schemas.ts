import {z} from 'zod';
import {CONTRACT_TYPES} from '@/lib/constants';

/**
 * Les schémas des formulaires du back-office.
 *
 * Ils sont en français en dur, contrairement à ceux des formulaires publics
 * (`schemas.ts`) qui sont des fabriques prenant un traducteur : le back-office
 * n'existe qu'en français, et faire passer `next-intl` dans `/admin` pour cela
 * seul n'apporterait rien.
 *
 * **Les champs sont à plat**, `frSector` plutôt que `fr.sector` : les erreurs
 * s'affichent champ par champ sans chemin imbriqué, et chaque formulaire
 * reconstruit la forme attendue par l'API dans son `toPayload`. Les limites
 * recopient celles des DTO de l'API — ce que le site accepte, l'API l'accepte.
 */

/** Un texte obligatoire, borné comme côté API. */
export function requiredText(min: number, max: number) {
  return z
    .string()
    .trim()
    .min(min, min === 1 ? 'Ce champ est obligatoire.' : `${min} caractères minimum.`)
    .max(max, `${max} caractères maximum.`);
}

/**
 * Un texte facultatif : vide est accepté et sera omis de l'envoi. Sans ce
 * détour, `min()` refuserait la chaîne vide d'un champ qu'on a le droit de ne
 * pas remplir.
 */
export function optionalText(min: number, max: number) {
  return z
    .string()
    .trim()
    .refine((value) => value === '' || value.length >= min, `${min} caractères minimum.`)
    .refine((value) => value.length <= max, `${max} caractères maximum.`);
}

/** Laissé vide, le slug est déduit du nom ou du titre par l'API. */
export const optionalSlug = z
  .string()
  .trim()
  .refine((value) => value === '' || /^[a-z0-9-]+$/.test(value), 'Minuscules, chiffres et tirets uniquement.')
  .refine((value) => value === '' || value.length >= 2, 'Deux caractères minimum.')
  .refine((value) => value.length <= 80, '80 caractères maximum.');

/** L'API exige le protocole : « lokambe.com » seul serait refusé. */
export const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value === '' || /^https?:\/\/[^\s]+\.[^\s]+$/.test(value),
    'Adresse complète attendue, protocole compris : https://…',
  );

/** Le média posé sur une fiche. `null` veut dire « aucun ». */
export const mediaId = z.string().nullable();

/** Une liste de lignes : les vides sont ignorées, il en faut au moins une. */
export function requiredLines(label: string) {
  return z
    .array(z.string())
    .transform((lines) => lines.map((line) => line.trim()).filter((line) => line !== ''))
    .refine((lines) => lines.length > 0, `Ajoutez au moins une ${label}.`)
    .refine((lines) => lines.length <= 20, '20 lignes maximum.')
    .refine(
      (lines) => lines.every((line) => line.length >= 3 && line.length <= 400),
      'Chaque ligne fait entre 3 et 400 caractères.',
    );
}

/** La même liste, mais qu'on a le droit de laisser vide (traduction anglaise). */
export function optionalLines() {
  return z
    .array(z.string())
    .transform((lines) => lines.map((line) => line.trim()).filter((line) => line !== ''))
    .refine((lines) => lines.length <= 20, '20 lignes maximum.')
    .refine(
      (lines) => lines.every((line) => line.length >= 3 && line.length <= 400),
      'Chaque ligne fait entre 3 et 400 caractères.',
    );
}

/* ----------------------------------------------------------- portefeuille */

export const portfolioFormSchema = z.object({
  name: requiredText(2, 120),
  slug: optionalSlug,
  websiteUrl: optionalUrl,
  mediaId,
  frSector: requiredText(2, 80),
  frStatus: requiredText(2, 60),
  frDescription: requiredText(10, 800),
  enSector: optionalText(2, 80),
  enStatus: optionalText(2, 60),
  enDescription: optionalText(10, 800),
});

export type PortfolioFormValues = z.input<typeof portfolioFormSchema>;

/* ------------------------------------------------------------ partenaires */

export const partnerFormSchema = z.object({
  name: requiredText(2, 120),
  slug: optionalSlug,
  websiteUrl: optionalUrl,
  mediaId,
  frDescription: optionalText(10, 800),
  enDescription: optionalText(10, 800),
});

export type PartnerFormValues = z.input<typeof partnerFormSchema>;

/* ----------------------------------------------------------------- équipe */

export const teamFormSchema = z.object({
  name: optionalText(2, 120),
  initials: z
    .string()
    .trim()
    .min(2, 'Deux lettres minimum.')
    .max(4, 'Quatre lettres maximum.')
    .regex(/^[A-Za-z]+$/, 'Des lettres uniquement.'),
  slug: optionalSlug,
  mediaId,
  frTitle: requiredText(2, 140),
  frSummary: requiredText(10, 1200),
  frPhotoAlt: optionalText(2, 300),
  enTitle: optionalText(2, 140),
  enSummary: optionalText(10, 1200),
  enPhotoAlt: optionalText(2, 300),
});

export type TeamFormValues = z.input<typeof teamFormSchema>;

/* --------------------------------------------------------- offres d'emploi */

export const jobFormSchema = z.object({
  location: requiredText(2, 120),
  contractType: z.enum(CONTRACT_TYPES),
  slug: optionalSlug,
  mediaId,
  frTitle: requiredText(3, 160),
  frSummary: requiredText(10, 1200),
  frMissions: requiredLines('mission'),
  frProfile: requiredLines('ligne de profil'),
  enTitle: optionalText(3, 160),
  enSummary: optionalText(10, 1200),
  enMissions: optionalLines(),
  enProfile: optionalLines(),
});

export type JobFormValues = z.input<typeof jobFormSchema>;

/* --------------------------------------------------- questions fréquentes */

export const faqFormSchema = z.object({
  slug: optionalSlug,
  mediaId,
  frQuestion: requiredText(5, 300),
  frAnswer: requiredText(10, 2000),
  enQuestion: optionalText(5, 300),
  enAnswer: optionalText(10, 2000),
});

export type FaqFormValues = z.input<typeof faqFormSchema>;

/* ------------------------------------------------------------ médiathèque */

export const mediaFormSchema = z.object({
  title: optionalText(2, 200),
  alt: optionalText(2, 300),
  posterMediaId: z.string().nullable(),
});

export type MediaFormValues = z.input<typeof mediaFormSchema>;
