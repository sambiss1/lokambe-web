import type {AdminApplication, AdminApplicationSummary, AdminContact, Page} from '@/lib/api/admin-types';
import type {
  ApiFaqEntry,
  ApiJobPosting,
  ApiMedia,
  ApiPartner,
  ApiPortfolioCompany,
  ApiTeamMember,
} from '@/lib/api/content-types';
import type {ApiArticle} from '@/lib/blog/article';

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

export function anApplicationSummary(overrides: Partial<AdminApplicationSummary> = {}): AdminApplicationSummary {
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

/** Article tel que l'API le renvoie au back-office. */
export function anArticle(overrides: Partial<ApiArticle> = {}): ApiArticle {
  return {
    id: 'article-01',
    slug: 'tenir-un-livre-de-caisse',
    title: 'Tenir un livre de caisse qui tient la route',
    excerpt: 'Un cahier, une règle, et la même minute chaque soir.',
    content: '<p>Écrire ce qui entre et ce qui sort.</p>',
    category: 'entrepreneuriat',
    author: 'L’équipe LOKAMBE',
    status: 'publie',
    publishedAt: '2026-02-10T09:00:00.000Z',
    readingMinutes: 5,
    isExample: false,
    locale: 'fr',
    createdAt: '2026-02-08T09:00:00.000Z',
    updatedAt: '2026-02-10T09:00:00.000Z',
    ...overrides,
  };
}

/* ----------------------------------------- médiathèque et collections ----- */

/** Photo de la bibliothèque. Décrite : c'est le cas nominal. */
export function aMediaImage(overrides: Partial<ApiMedia> = {}): ApiMedia {
  return {
    id: 'media-image-01',
    fileId: '64b7f00000000000000000a1',
    filename: 'boutique.webp',
    originalName: 'boutique.webp',
    mimeType: 'image/webp',
    kind: 'image',
    size: 184_320,
    title: 'Boutique de quartier',
    alt: 'Une commerçante devant son étal',
    width: 1600,
    height: 1200,
    uploadedBy: 'Administrateur',
    createdAt: '2026-10-01T08:00:00.000Z',
    updatedAt: '2026-10-01T08:00:00.000Z',
    ...overrides,
  };
}

/** Vidéo, sans image d'attente ni texte alternatif : les cas à prévoir. */
export function aMediaVideo(overrides: Partial<ApiMedia> = {}): ApiMedia {
  return {
    id: 'media-video-01',
    fileId: '64b7f00000000000000000b2',
    filename: 'presentation.mp4',
    originalName: 'presentation.mp4',
    mimeType: 'video/mp4',
    kind: 'video',
    size: 24_117_248,
    title: 'Présentation LOKAMBE',
    width: 1920,
    height: 1080,
    durationSeconds: 102.4,
    uploadedBy: 'Administrateur',
    createdAt: '2026-10-02T08:00:00.000Z',
    updatedAt: '2026-10-02T08:00:00.000Z',
    ...overrides,
  };
}

/** Le socle partagé par les cinq collections. */
const publishable = {
  status: 'publie' as const,
  order: 0,
  createdAt: '2026-10-01T08:00:00.000Z',
  updatedAt: '2026-10-01T08:00:00.000Z',
};

export function aPortfolioCompany(overrides: Partial<ApiPortfolioCompany> = {}): ApiPortfolioCompany {
  return {
    ...publishable,
    id: 'portfolio-01',
    slug: 'bradamada',
    name: 'Bradamada',
    legacyImagePath: '/images/portfolio/bradamada.webp',
    fr: {
      sector: 'Restauration',
      status: 'En développement',
      description: 'Un concept de restauration rapide expérientielle, immersive et mémorable.',
    },
    en: {
      sector: 'Restaurants and catering',
      status: 'In development',
      description: 'An experiential fast-food concept, immersive and memorable.',
    },
    ...overrides,
  };
}

/** Partenaire sans description : NIWALI n'en a pas aujourd'hui. */
export function aPartner(overrides: Partial<ApiPartner> = {}): ApiPartner {
  return {
    ...publishable,
    id: 'partner-01',
    slug: 'niwali',
    name: 'NIWALI',
    legacyImagePath: '/images/partners/niwali.webp',
    ...overrides,
  };
}

/** Rôle anonyme : seul le dirigeant est nommé, les autres n'ont qu'un monogramme. */
export function aTeamMember(overrides: Partial<ApiTeamMember> = {}): ApiTeamMember {
  return {
    ...publishable,
    id: 'team-01',
    slug: 'operations-et-developpement',
    initials: 'OPS',
    fr: {
      title: 'Responsable des opérations & du développement',
      summary: 'Assure la coordination du fonctionnement quotidien de LOKAMBE et contribue à son développement.',
    },
    ...overrides,
  };
}

export function aJobPosting(overrides: Partial<ApiJobPosting> = {}): ApiJobPosting {
  return {
    ...publishable,
    id: 'job-01',
    slug: 'analyste-investissement',
    location: 'Kinshasa',
    contractType: 'cdi',
    fr: {
      title: 'Analyste investissement',
      summary: 'Analyser les dossiers reçus et préparer les notes d’investissement.',
      missions: ['Instruire les candidatures reçues', 'Préparer les notes d’investissement'],
      profile: ['Trois ans en analyse financière', 'Français courant'],
    },
    ...overrides,
  };
}

export function aFaqEntry(overrides: Partial<ApiFaqEntry> = {}): ApiFaqEntry {
  return {
    ...publishable,
    id: 'faq-01',
    slug: 'qui-peut-soumettre-un-projet',
    fr: {
      question: 'Qui peut soumettre un projet à LOKAMBE ?',
      answer: 'Les entrepreneurs qui développent une activité réelle en RDC, avec un besoin précis.',
    },
    ...overrides,
  };
}
