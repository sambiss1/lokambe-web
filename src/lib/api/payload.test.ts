import {describe, expect, it} from 'vitest';
import {applicationSchema, contactSchema} from '@/lib/forms/schemas';
import {toApplicationPayload, toContactPayload} from './payload';

/**
 * Ces tests partent de ce qu'un visiteur tape réellement, le font passer par le
 * schéma du formulaire, puis vérifient la forme envoyée à l'API. C'est le
 * chemin complet : c'est entre les deux que les décalages se logent.
 */

const filledApplication = {
  applicant: {
    firstName: 'Bénédicte',
    lastName: 'Mwamba',
    phone: '+243 810 000 141',
    email: 'benedicte@example.cd',
    city: 'Kinshasa',
    commune: 'Kalamu',
  },
  business: {
    name: 'Chez Bénédicte',
    sector: 'restauration',
    isFormal: true,
    rccm: 'CD/KIN/RCCM/00-A-0000',
    foundedYear: 2022,
    employeesCount: 4,
    monthlyRevenueUsd: 1850,
    description: 'Maquis de quartier ouvert midi et soir, deux salles et une terrasse.',
  },
  need: {
    type: 'equipements',
    amountUsd: 4500,
    useOfFunds: 'Achat d’un congélateur et de deux réchauds professionnels.',
  },
  consent: true,
  website: '',
};

/** Le même dossier, avec tous les champs facultatifs laissés vides. */
const sparseApplication = {
  ...filledApplication,
  applicant: {...filledApplication.applicant, email: '', commune: ''},
  business: {...filledApplication.business, rccm: '', foundedYear: '', monthlyRevenueUsd: ''},
};

describe('toApplicationPayload', () => {
  it('reprend les champs remplis et ajoute la langue', () => {
    const payload = toApplicationPayload(applicationSchema.parse(filledApplication));

    expect(payload.locale).toBe('fr');
    expect(payload.applicant.email).toBe('benedicte@example.cd');
    expect(payload.business.foundedYear).toBe(2022);
    expect(payload.business.monthlyRevenueUsd).toBe(1850);
    expect(payload.need.amountUsd).toBe(4500);
    expect(payload.consent).toBe(true);
  });

  it('omet les champs facultatifs vides plutôt que d’envoyer une chaîne vide', () => {
    const payload = toApplicationPayload(applicationSchema.parse(sparseApplication));
    const sent = JSON.parse(JSON.stringify(payload));

    // L'API valide dès que la clé est présente : `email: ''` vaut un 400.
    expect(sent.applicant).not.toHaveProperty('email');
    expect(sent.applicant).not.toHaveProperty('commune');
    expect(sent.business).not.toHaveProperty('rccm');
    expect(sent.business).not.toHaveProperty('foundedYear');
    expect(sent.business).not.toHaveProperty('monthlyRevenueUsd');
    // Les champs obligatoires, eux, restent là.
    expect(sent.applicant.phone).toBe('+243 810 000 141');
    expect(sent.business.employeesCount).toBe(4);
  });

  it('transmet le piège à robots au lieu de le filtrer', () => {
    const payload = toApplicationPayload(applicationSchema.parse(filledApplication));
    expect(payload).toHaveProperty('website');
  });
});

describe('toContactPayload', () => {
  const base = {
    kind: 'entrepreneur',
    fullName: 'Patrick Ilunga',
    email: 'patrick@example.cd',
    message: 'Je souhaite en savoir plus sur votre accompagnement.',
    website: '',
  };

  it('ajoute la langue et garde les champs remplis', () => {
    const payload = toContactPayload(
      contactSchema.parse({...base, organization: 'Le Régal', phone: '+243 815 000 207'}),
    );
    expect(payload.locale).toBe('fr');
    expect(payload.organization).toBe('Le Régal');
    expect(payload.phone).toBe('+243 815 000 207');
  });

  it('omet l’organisation et le téléphone laissés vides', () => {
    const sent = JSON.parse(
      JSON.stringify(toContactPayload(contactSchema.parse({...base, organization: '', phone: ''}))),
    );
    // `phone` est facultatif côté API mais validé s'il est présent : `''` vaut un 400.
    expect(sent).not.toHaveProperty('organization');
    expect(sent).not.toHaveProperty('phone');
    expect(sent.email).toBe('patrick@example.cd');
  });
});

describe('garde-fous partagés avec l’API', () => {
  it('refuse un téléphone que l’API rejetterait', () => {
    // La regex du site acceptait le point : le dossier partait, puis revenait en 400.
    const withDots = {
      ...filledApplication,
      applicant: {...filledApplication.applicant, phone: '+243 810.000.141'},
    };
    expect(applicationSchema.safeParse(withDots).success).toBe(false);
    expect(contactSchema.safeParse({kind: 'autre', fullName: 'X', email: 'x@example.cd', message: 'Un message assez long pour passer.', phone: '+243 810.000.141'}).success).toBe(
      false,
    );
  });
});
