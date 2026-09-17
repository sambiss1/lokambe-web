import type {AdminApplication, AdminApplicationSummary, AdminContact, Page} from '@/lib/api/admin-types';

/**
 * Jeu d'essai du back-office, pour les tests d'interface.
 *
 * Calqué sur ce que l'API renvoie vraiment, y compris ses champs absents :
 * une candidature sans email ni commune, une entrée d'historique sans auteur,
 * des notes sans identifiant. C'est là que les écrans se cassent.
 *
 * Personnes, entreprises et coordonnées inventées (`example.cd`), montants sans
 * rapport avec une performance réelle de LOKAMBE.
 */

export function anApplicationSummary(
  overrides: Partial<AdminApplicationSummary> = {},
): AdminApplicationSummary {
  return {
    id: 'app-01',
    reference: 'LKB-4F2A81',
    locale: 'fr',
    applicant: {
      firstName: 'Bénédicte',
      lastName: 'Mwamba',
      phone: '+243 810 000 141',
      email: 'benedicte.mwamba@example.cd',
      city: 'Kinshasa',
      commune: 'Kalamu',
    },
    business: {
      name: 'Chez Bénédicte',
      sector: 'restauration',
      isFormal: false,
      employeesCount: 4,
      monthlyRevenueUsd: 1850,
      description: 'Maquis de quartier ouvert midi et soir, terrasse de 24 couverts.',
    },
    need: {
      type: 'equipements',
      amountUsd: 4500,
      useOfFunds: 'Congélateur, deux réchauds professionnels et groupe électrogène.',
    },
    files: [{fileId: '665f1c2e9b1d8a0012345678', filename: 'devis.pdf', mimeType: 'application/pdf', size: 312_000}],
    status: 'recu',
    consentAt: '2026-09-14T07:42:00.000Z',
    createdAt: '2026-09-14T07:42:00.000Z',
    updatedAt: '2026-09-14T07:42:00.000Z',
    ...overrides,
  };
}

export function anApplication(overrides: Partial<AdminApplication> = {}): AdminApplication {
  return {
    ...anApplicationSummary(),
    statusHistory: [
      // L'entrée créée par le formulaire public n'a ni auteur ni commentaire.
      {status: 'recu', changedAt: '2026-09-14T07:42:00.000Z'},
    ],
    notes: [],
    ...overrides,
  };
}

export function aContact(overrides: Partial<AdminContact> = {}): AdminContact {
  return {
    id: 'contact-01',
    kind: 'entrepreneur',
    fullName: 'Patrick Ilunga',
    email: 'patrick.ilunga@example.cd',
    message: 'Je porte une boulangerie à Limete et je souhaite vous rencontrer.',
    locale: 'fr',
    isRead: false,
    createdAt: '2026-09-13T09:10:00.000Z',
    updatedAt: '2026-09-13T09:10:00.000Z',
    ...overrides,
  };
}

/** Enveloppe paginée, telle que l'API la renvoie. */
export function aPage<T>(items: T[], overrides: Partial<Page<T>> = {}): Page<T> {
  return {items, total: items.length, page: 1, limit: 20, ...overrides};
}
