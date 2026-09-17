/**
 * Mise au format attendu par l'API.
 *
 * Le formulaire et l'API ne parlent pas tout à fait la même langue : le
 * formulaire laisse une chaîne vide dans les champs facultatifs qu'on n'a pas
 * remplis, alors que l'API les valide dès qu'ils sont présents — une chaîne
 * vide dans `email` ou `foundedYear` déclenche un 400. On omet donc purement et
 * simplement les champs vides, ce que `JSON.stringify` fait pour `undefined`.
 *
 * Le champ `website` est le piège à robots : l'API renvoie un succès factice
 * quand il est rempli. Il doit donc être transmis tel quel, jamais filtré ici.
 */

import type {ApplicationParsed, ContactParsed} from '@/lib/forms/schemas';

type Locale = 'fr' | 'en';

/** Chaîne non vide, sinon rien. */
function text(value: string | undefined | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Nombre réel, sinon rien : le formulaire met `''` dans un champ numérique vide. */
function num(value: number | '' | undefined | null): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

export type ApplicationPayload = ReturnType<typeof toApplicationPayload>;
export type ContactPayload = ReturnType<typeof toContactPayload>;

export function toApplicationPayload(values: ApplicationParsed, locale: Locale = 'fr') {
  const {applicant, business, need} = values;
  return {
    locale,
    applicant: {
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      phone: applicant.phone,
      email: text(applicant.email),
      city: applicant.city,
      commune: text(applicant.commune),
    },
    business: {
      name: business.name,
      sector: business.sector,
      sectorOther: text(business.sectorOther),
      isFormal: business.isFormal,
      rccm: text(business.rccm),
      foundedYear: num(business.foundedYear),
      employeesCount: business.employeesCount,
      monthlyRevenueUsd: num(business.monthlyRevenueUsd),
      description: business.description,
    },
    need: {
      type: need.type,
      amountUsd: need.amountUsd,
      useOfFunds: need.useOfFunds,
    },
    consent: true as const,
    website: values.website,
  };
}

export function toContactPayload(values: ContactParsed, locale: Locale = 'fr') {
  return {
    kind: values.kind,
    fullName: values.fullName,
    organization: text(values.organization),
    email: values.email,
    phone: text(values.phone),
    message: values.message,
    locale,
    website: values.website,
  };
}
