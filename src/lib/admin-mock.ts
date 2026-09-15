/**
 * Données de démonstration du back-office LOKAMBE.
 *
 * Cette passe est purement visuelle : aucune requête réseau n'est faite. Tous les
 * écrans lisent ce module et gardent leur état en mémoire React. Chaque endroit où
 * l'appel réel devra brancher est marqué par un commentaire `TODO(api)`.
 *
 * Les personnes, entreprises, téléphones et emails ci-dessous sont inventés
 * (domaines `example.cd` / `example.com`, numéros non attribués). Les montants et
 * compteurs ne décrivent aucune performance réelle de LOKAMBE : ce sont des
 * valeurs de maquette.
 */

/* ------------------------------------------------------------------ énumérations */

export const SECTORS = [
  'restauration',
  'metiers_de_bouche',
  'commerce_distribution',
  'evenementiel',
  'services',
  'autre',
] as const;
export type Sector = (typeof SECTORS)[number];

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
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const CONTACT_KINDS = ['investisseur', 'partenaire', 'expert', 'entrepreneur', 'autre'] as const;
export type ContactKind = (typeof CONTACT_KINDS)[number];

export const NEED_TYPES = ['equipement', 'stock', 'amenagement', 'fonds_de_roulement', 'autre'] as const;
export type NeedType = (typeof NEED_TYPES)[number];

/* ---------------------------------------------------------------------- libellés */

export const SECTOR_LABELS: Record<Sector, string> = {
  restauration: 'Restauration',
  metiers_de_bouche: 'Métiers de bouche',
  commerce_distribution: 'Commerce & distribution',
  evenementiel: 'Événementiel',
  services: 'Services',
  autre: 'Autre',
};

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  recu: 'Reçu',
  preselection: 'Présélection',
  visite: 'Visite terrain',
  analyse: 'Analyse',
  due_diligence: 'Due diligence',
  comite: 'Comité',
  finance: 'Financé',
  rejete: 'Rejeté',
};

export const CONTACT_KIND_LABELS: Record<ContactKind, string> = {
  investisseur: 'Investisseur',
  partenaire: 'Partenaire',
  expert: 'Expert',
  entrepreneur: 'Entrepreneur',
  autre: 'Autre',
};

export const NEED_TYPE_LABELS: Record<NeedType, string> = {
  equipement: 'Équipement',
  stock: 'Stock',
  amenagement: 'Aménagement',
  fonds_de_roulement: 'Fonds de roulement',
  autre: 'Autre',
};

/* ------------------------------------------------------------------------- types */

export type ApplicationFile = {fileId: string; filename: string; size: number};

export type StatusEntry = {
  status: ApplicationStatus;
  changedAt: string;
  changedBy: string;
  comment?: string;
};

export type ApplicationNote = {id: string; text: string; author: string; createdAt: string};

export type AdminApplication = {
  id: string;
  reference: string;
  createdAt: string;
  locale: 'fr' | 'en';
  status: ApplicationStatus;
  applicant: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    city: string;
    commune: string;
  };
  business: {
    name: string;
    sector: Sector;
    sectorOther?: string;
    isFormal: boolean;
    rccm?: string;
    foundedYear: number;
    employeesCount: number;
    monthlyRevenueUsd?: number;
    description: string;
  };
  need: {type: NeedType; amountUsd: number; useOfFunds: string};
  files: ApplicationFile[];
  statusHistory: StatusEntry[];
  notes: ApplicationNote[];
};

export type AdminContact = {
  id: string;
  createdAt: string;
  locale: 'fr' | 'en';
  kind: ContactKind;
  fullName: string;
  organization?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
};

/**
 * Date de référence figée : les écrans sont des maquettes, une date « maintenant »
 * réelle ferait varier les graphiques et casserait l'hydratation.
 */
export const MOCK_NOW = '2026-09-15T09:00:00.000Z';

/* ------------------------------------------------------------------- candidatures */

export const MOCK_APPLICATIONS: AdminApplication[] = [
  {
    id: 'app-01',
    reference: 'LKB-4F2A81',
    createdAt: '2026-09-14T07:42:00.000Z',
    locale: 'fr',
    status: 'recu',
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
      foundedYear: 2022,
      employeesCount: 4,
      monthlyRevenueUsd: 1850,
      description:
        "Maquis de quartier ouvert midi et soir, spécialisé dans le poulet mayo et le pondu. Deux salles, terrasse de 24 couverts sur l'avenue Kasa-Vubu.",
    },
    need: {
      type: 'equipement',
      amountUsd: 4500,
      useOfFunds:
        "Achat d'un congélateur horizontal, de deux réchauds professionnels et remplacement du groupe électrogène hors service depuis juin.",
    },
    files: [
      {fileId: 'f-01a', filename: 'photos-salle.pdf', size: 2_410_000},
      {fileId: 'f-01b', filename: 'releve-recettes-aout.pdf', size: 184_000},
    ],
    statusHistory: [{status: 'recu', changedAt: '2026-09-14T07:42:00.000Z', changedBy: 'Formulaire public'}],
    notes: [],
  },
  {
    id: 'app-02',
    reference: 'LKB-9C13E7',
    createdAt: '2026-09-11T13:05:00.000Z',
    locale: 'fr',
    status: 'preselection',
    applicant: {
      firstName: 'Patrick',
      lastName: 'Ilunga',
      phone: '+243 815 000 207',
      email: 'patrick.ilunga@example.cd',
      city: 'Kinshasa',
      commune: 'Limete',
    },
    business: {
      name: 'Boulangerie Le Régal',
      sector: 'metiers_de_bouche',
      isFormal: true,
      rccm: 'CD/KIN/RCCM/00-A-0000',
      foundedYear: 2019,
      employeesCount: 7,
      monthlyRevenueUsd: 5200,
      description:
        "Boulangerie-pâtisserie livrant six boutiques de la 7e rue. Production de nuit, deux fournées quotidiennes, clientèle d'habitués et de revendeuses.",
    },
    need: {
      type: 'equipement',
      amountUsd: 9800,
      useOfFunds:
        "Four rotatif d'occasion importé de Dubaï, pétrin de 50 kg et réfection du circuit électrique de l'atelier.",
    },
    files: [
      {fileId: 'f-02a', filename: 'rccm-le-regal.pdf', size: 640_000},
      {fileId: 'f-02b', filename: 'devis-four-rotatif.pdf', size: 312_000},
      {fileId: 'f-02c', filename: 'photos-atelier.jpg', size: 3_900_000},
    ],
    statusHistory: [
      {status: 'recu', changedAt: '2026-09-11T13:05:00.000Z', changedBy: 'Formulaire public'},
      {
        status: 'preselection',
        changedAt: '2026-09-12T08:20:00.000Z',
        changedBy: 'Équipe LOKAMBE',
        comment: 'Dossier complet, RCCM fourni. À planifier en visite la semaine prochaine.',
      },
    ],
    notes: [
      {
        id: 'n-02a',
        text: 'Joignable le matin avant 10h. Parle lingala et français.',
        author: 'Équipe LOKAMBE',
        createdAt: '2026-09-12T08:22:00.000Z',
      },
    ],
  },
  {
    id: 'app-03',
    reference: 'LKB-77B0D4',
    createdAt: '2026-09-08T10:31:00.000Z',
    locale: 'fr',
    status: 'visite',
    applicant: {
      firstName: 'Nadine',
      lastName: 'Kabongo',
      phone: '+243 820 000 318',
      email: 'nadine.kabongo@example.cd',
      city: 'Kinshasa',
      commune: 'Masina',
    },
    business: {
      name: 'Kin Fresh Market',
      sector: 'commerce_distribution',
      isFormal: true,
      rccm: 'CD/KIN/RCCM/00-A-0001',
      foundedYear: 2021,
      employeesCount: 5,
      monthlyRevenueUsd: 3400,
      description:
        "Dépôt de fruits et légumes approvisionné au marché de la Liberté, revente en demi-gros aux restaurants et aux vendeuses du quartier Sans-fil.",
    },
    need: {
      type: 'stock',
      amountUsd: 6200,
      useOfFunds:
        "Constitution d'un stock tampon de produits secs et location d'une chambre froide partagée pour réduire les pertes sur les légumes.",
    },
    files: [{fileId: 'f-03a', filename: 'inventaire-depot.pdf', size: 221_000}],
    statusHistory: [
      {status: 'recu', changedAt: '2026-09-08T10:31:00.000Z', changedBy: 'Formulaire public'},
      {status: 'preselection', changedAt: '2026-09-09T09:10:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {
        status: 'visite',
        changedAt: '2026-09-13T11:45:00.000Z',
        changedBy: 'Équipe LOKAMBE',
        comment: 'Visite du dépôt effectuée. Stock bien tenu, cahier de ventes à jour depuis janvier.',
      },
    ],
    notes: [
      {
        id: 'n-03a',
        text: "Pertes importantes sur les tomates faute de froid — c'est le vrai sujet, plus que le fonds de roulement.",
        author: 'Équipe LOKAMBE',
        createdAt: '2026-09-13T12:05:00.000Z',
      },
    ],
  },
  {
    id: 'app-04',
    reference: 'LKB-1D8E60',
    createdAt: '2026-09-05T15:58:00.000Z',
    locale: 'fr',
    status: 'analyse',
    applicant: {
      firstName: 'Serge',
      lastName: 'Mbuyi',
      phone: '+243 811 000 462',
      email: 'serge.mbuyi@example.cd',
      city: 'Kinshasa',
      commune: 'Gombe',
    },
    business: {
      name: 'Studio Éclat Événements',
      sector: 'evenementiel',
      isFormal: true,
      rccm: 'CD/KIN/RCCM/00-A-0002',
      foundedYear: 2020,
      employeesCount: 9,
      monthlyRevenueUsd: 4100,
      description:
        "Décoration et organisation de mariages, dots et anniversaires. Équipe de neuf personnes en intermittence, stock de mobilier et de tentures.",
    },
    need: {
      type: 'equipement',
      amountUsd: 7400,
      useOfFunds: "Achat de 200 chaises Napoléon, de deux tentes 6×12 m et d'un kit d'éclairage sur batterie.",
    },
    files: [
      {fileId: 'f-04a', filename: 'portfolio-evenements.pdf', size: 8_200_000},
      {fileId: 'f-04b', filename: 'contrats-signes-2026.pdf', size: 540_000},
    ],
    statusHistory: [
      {status: 'recu', changedAt: '2026-09-05T15:58:00.000Z', changedBy: 'Formulaire public'},
      {status: 'preselection', changedAt: '2026-09-06T08:40:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {status: 'visite', changedAt: '2026-09-09T14:15:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {
        status: 'analyse',
        changedAt: '2026-09-12T16:30:00.000Z',
        changedBy: 'Équipe LOKAMBE',
        comment: 'Carnet de commandes solide jusqu’en décembre. Analyse du plan de remboursement en cours.',
      },
    ],
    notes: [
      {
        id: 'n-04a',
        text: 'Saisonnalité forte : juin-septembre et décembre. Prévoir un différé sur les mois creux.',
        author: 'Équipe LOKAMBE',
        createdAt: '2026-09-12T16:35:00.000Z',
      },
      {
        id: 'n-04b',
        text: 'Demande un accompagnement sur la facturation client, pas seulement le capital.',
        author: 'Équipe LOKAMBE',
        createdAt: '2026-09-13T09:02:00.000Z',
      },
    ],
  },
  {
    id: 'app-05',
    reference: 'LKB-B35C29',
    createdAt: '2026-09-02T08:12:00.000Z',
    locale: 'fr',
    status: 'due_diligence',
    applicant: {
      firstName: 'Grâce',
      lastName: 'Tshibanda',
      phone: '+243 899 000 573',
      email: 'grace.tshibanda@example.cd',
      city: 'Kinshasa',
      commune: 'Ngaliema',
    },
    business: {
      name: 'Nettoyage Pro Kin',
      sector: 'services',
      isFormal: true,
      rccm: 'CD/KIN/RCCM/00-A-0003',
      foundedYear: 2018,
      employeesCount: 14,
      monthlyRevenueUsd: 6800,
      description:
        "Société de nettoyage de bureaux et de résidences, sous contrat avec quatre immeubles de la Gombe. Quatorze agents, deux équipes de nuit.",
    },
    need: {
      type: 'fonds_de_roulement',
      amountUsd: 12_000,
      useOfFunds:
        "Avance de trésorerie pour couvrir les salaires pendant les délais de paiement clients (60 à 90 jours) et achat de deux autolaveuses.",
    },
    files: [
      {fileId: 'f-05a', filename: 'contrats-clients.pdf', size: 1_120_000},
      {fileId: 'f-05b', filename: 'etats-financiers-2025.pdf', size: 760_000},
      {fileId: 'f-05c', filename: 'liste-personnel.pdf', size: 96_000},
    ],
    statusHistory: [
      {status: 'recu', changedAt: '2026-09-02T08:12:00.000Z', changedBy: 'Formulaire public'},
      {status: 'preselection', changedAt: '2026-09-03T07:55:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {status: 'visite', changedAt: '2026-09-05T10:20:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {status: 'analyse', changedAt: '2026-09-08T09:40:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {
        status: 'due_diligence',
        changedAt: '2026-09-11T15:10:00.000Z',
        changedBy: 'Comité d’investissement',
        comment: 'Vérification des contrats et de la conformité CNSS lancée.',
      },
    ],
    notes: [
      {
        id: 'n-05a',
        text: 'Le vrai risque est le délai de paiement des clients grands comptes, pas la demande.',
        author: 'Comité d’investissement',
        createdAt: '2026-09-11T15:20:00.000Z',
      },
    ],
  },
  {
    id: 'app-06',
    reference: 'LKB-6A0F92',
    createdAt: '2026-08-28T11:27:00.000Z',
    locale: 'fr',
    status: 'comite',
    applicant: {
      firstName: 'Josué',
      lastName: 'Kalonji',
      phone: '+243 816 000 684',
      email: 'josue.kalonji@example.cd',
      city: 'Kinshasa',
      commune: 'Lemba',
    },
    business: {
      name: 'Ateliers Kalonji',
      sector: 'autre',
      sectorOther: 'Artisanat & menuiserie',
      isFormal: false,
      foundedYear: 2017,
      employeesCount: 6,
      monthlyRevenueUsd: 2900,
      description:
        "Menuiserie sur mesure : lits, armoires et comptoirs pour particuliers et petits commerces. Atelier de 90 m² loué le long de l'avenue de l'Université.",
    },
    need: {
      type: 'equipement',
      amountUsd: 5600,
      useOfFunds: "Scie à ruban, raboteuse et aspirateur à copeaux pour arrêter la sous-traitance des découpes.",
    },
    files: [{fileId: 'f-06a', filename: 'realisations-atelier.jpg', size: 4_600_000}],
    statusHistory: [
      {status: 'recu', changedAt: '2026-08-28T11:27:00.000Z', changedBy: 'Formulaire public'},
      {status: 'preselection', changedAt: '2026-08-29T08:05:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {status: 'visite', changedAt: '2026-09-01T13:30:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {status: 'analyse', changedAt: '2026-09-04T10:00:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {status: 'due_diligence', changedAt: '2026-09-07T09:15:00.000Z', changedBy: 'Comité d’investissement'},
      {
        status: 'comite',
        changedAt: '2026-09-12T14:00:00.000Z',
        changedBy: 'Comité d’investissement',
        comment: 'Passage au comité du 18 septembre.',
      },
    ],
    notes: [
      {
        id: 'n-06a',
        text: 'Formalisation RCCM à accompagner en parallèle du financement.',
        author: 'Équipe LOKAMBE',
        createdAt: '2026-09-07T09:30:00.000Z',
      },
    ],
  },
  {
    id: 'app-07',
    reference: 'LKB-E5497B',
    createdAt: '2026-08-24T09:03:00.000Z',
    locale: 'fr',
    status: 'finance',
    applicant: {
      firstName: 'Christelle',
      lastName: 'Nkosi',
      phone: '+243 812 000 795',
      email: 'christelle.nkosi@example.cd',
      city: 'Kinshasa',
      commune: 'Matete',
    },
    business: {
      name: 'Le Petit Poulet Braisé',
      sector: 'restauration',
      isFormal: true,
      rccm: 'CD/KIN/RCCM/00-A-0004',
      foundedYear: 2021,
      employeesCount: 5,
      monthlyRevenueUsd: 2600,
      description:
        "Point de vente de poulet braisé et de brochettes en bord de route, ouvert de 16h à minuit. Forte clientèle de sortie de bureau.",
    },
    need: {
      type: 'amenagement',
      amountUsd: 3800,
      useOfFunds: "Couverture de la terrasse, comptoir en inox et raccordement à l'eau courante.",
    },
    files: [
      {fileId: 'f-07a', filename: 'devis-amenagement.pdf', size: 268_000},
      {fileId: 'f-07b', filename: 'photos-avant-travaux.jpg', size: 2_100_000},
    ],
    statusHistory: [
      {status: 'recu', changedAt: '2026-08-24T09:03:00.000Z', changedBy: 'Formulaire public'},
      {status: 'preselection', changedAt: '2026-08-25T08:30:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {status: 'visite', changedAt: '2026-08-27T15:00:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {status: 'analyse', changedAt: '2026-08-31T10:45:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {status: 'due_diligence', changedAt: '2026-09-02T11:20:00.000Z', changedBy: 'Comité d’investissement'},
      {status: 'comite', changedAt: '2026-09-05T14:30:00.000Z', changedBy: 'Comité d’investissement'},
      {
        status: 'finance',
        changedAt: '2026-09-10T10:00:00.000Z',
        changedBy: 'Comité d’investissement',
        comment: 'Décaissement en deux tranches, la seconde après réception des travaux.',
      },
    ],
    notes: [
      {
        id: 'n-07a',
        text: 'Suivi mensuel confié à l’accompagnement terrain. Premier point le 15 octobre.',
        author: 'Équipe LOKAMBE',
        createdAt: '2026-09-10T10:12:00.000Z',
      },
    ],
  },
  {
    id: 'app-08',
    reference: 'LKB-30CA15',
    createdAt: '2026-08-20T16:44:00.000Z',
    locale: 'fr',
    status: 'rejete',
    applicant: {
      firstName: 'Emmanuel',
      lastName: 'Lokesa',
      phone: '+243 897 000 806',
      city: 'Kinshasa',
      commune: 'Bandalungwa',
    },
    business: {
      name: 'Charcuterie Lokesa',
      sector: 'metiers_de_bouche',
      isFormal: false,
      foundedYear: 2025,
      employeesCount: 1,
      description:
        "Projet de charcuterie artisanale à domicile. Activité démarrée il y a quatre mois, pas encore de local ni de clientèle régulière.",
    },
    need: {
      type: 'equipement',
      amountUsd: 14_500,
      useOfFunds: "Chambre froide, trancheuse professionnelle et véhicule réfrigéré.",
    },
    files: [],
    statusHistory: [
      {status: 'recu', changedAt: '2026-08-20T16:44:00.000Z', changedBy: 'Formulaire public'},
      {
        status: 'rejete',
        changedAt: '2026-08-23T09:25:00.000Z',
        changedBy: 'Équipe LOKAMBE',
        comment:
          'Activité trop récente et montant demandé hors du ticket LOKAMBE. Réorientation vers un accompagnement pré-investissement.',
      },
    ],
    notes: [
      {
        id: 'n-08a',
        text: 'À recontacter dans six mois si l’activité se structure.',
        author: 'Équipe LOKAMBE',
        createdAt: '2026-08-23T09:30:00.000Z',
      },
    ],
  },
  {
    id: 'app-09',
    reference: 'LKB-52FD08',
    createdAt: '2026-09-13T18:22:00.000Z',
    locale: 'fr',
    status: 'recu',
    applicant: {
      firstName: 'Divine',
      lastName: 'Mukendi',
      phone: '+243 818 000 927',
      email: 'divine.mukendi@example.cd',
      city: 'Kinshasa',
      commune: 'Kintambo',
    },
    business: {
      name: 'Boutique Mukendi Cosmétiques',
      sector: 'commerce_distribution',
      isFormal: false,
      foundedYear: 2023,
      employeesCount: 2,
      monthlyRevenueUsd: 1400,
      description:
        "Boutique de cosmétiques et de produits capillaires au marché de Kintambo Magasin. Vente au comptoir et livraison par moto-taxi.",
    },
    need: {
      type: 'stock',
      amountUsd: 2800,
      useOfFunds: "Réassort de stock avant la période des fêtes et achat d'une vitrine sécurisée.",
    },
    files: [{fileId: 'f-09a', filename: 'photos-boutique.jpg', size: 1_700_000}],
    statusHistory: [{status: 'recu', changedAt: '2026-09-13T18:22:00.000Z', changedBy: 'Formulaire public'}],
    notes: [],
  },
  {
    id: 'app-10',
    reference: 'LKB-C8A743',
    createdAt: '2026-09-10T07:16:00.000Z',
    locale: 'fr',
    status: 'preselection',
    applicant: {
      firstName: 'Franck',
      lastName: 'Bofoe',
      phone: '+243 813 000 038',
      email: 'franck.bofoe@example.cd',
      city: 'Kinshasa',
      commune: 'N’djili',
    },
    business: {
      name: 'Sonorisation Bofoe',
      sector: 'evenementiel',
      isFormal: false,
      foundedYear: 2020,
      employeesCount: 3,
      monthlyRevenueUsd: 1600,
      description:
        "Location de sonorisation et animation DJ pour mariages, deuils et fêtes de quartier. Matériel transporté en tricycle.",
    },
    need: {
      type: 'equipement',
      amountUsd: 3200,
      useOfFunds: "Deux enceintes amplifiées, une table de mixage et un onduleur pour les coupures de courant.",
    },
    files: [{fileId: 'f-10a', filename: 'liste-materiel.pdf', size: 142_000}],
    statusHistory: [
      {status: 'recu', changedAt: '2026-09-10T07:16:00.000Z', changedBy: 'Formulaire public'},
      {
        status: 'preselection',
        changedAt: '2026-09-11T09:50:00.000Z',
        changedBy: 'Équipe LOKAMBE',
        comment: 'Dossier léger mais activité réelle et régulière. À voir sur place.',
      },
    ],
    notes: [],
  },
  {
    id: 'app-11',
    reference: 'LKB-A1746E',
    createdAt: '2026-09-06T12:39:00.000Z',
    locale: 'fr',
    status: 'visite',
    applicant: {
      firstName: 'Sandrine',
      lastName: 'Ngalula',
      phone: '+243 898 000 159',
      email: 'sandrine.ngalula@example.cd',
      city: 'Kinshasa',
      commune: 'Selembao',
    },
    business: {
      name: 'Couture Ngalula & Filles',
      sector: 'services',
      isFormal: false,
      foundedYear: 2016,
      employeesCount: 8,
      monthlyRevenueUsd: 2200,
      description:
        "Atelier de couture et de broderie sur pagne, avec formation de six apprenties. Commandes d'uniformes pour deux écoles du quartier.",
    },
    need: {
      type: 'equipement',
      amountUsd: 4100,
      useOfFunds: "Trois machines industrielles, une surjeteuse et un stock initial de tissu pour les uniformes.",
    },
    files: [
      {fileId: 'f-11a', filename: 'commandes-ecoles.pdf', size: 208_000},
      {fileId: 'f-11b', filename: 'photos-atelier-couture.jpg', size: 3_300_000},
    ],
    statusHistory: [
      {status: 'recu', changedAt: '2026-09-06T12:39:00.000Z', changedBy: 'Formulaire public'},
      {status: 'preselection', changedAt: '2026-09-07T10:05:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {
        status: 'visite',
        changedAt: '2026-09-14T11:00:00.000Z',
        changedBy: 'Équipe LOKAMBE',
        comment: 'Atelier propre, apprenties présentes, carnet de commandes vérifié.',
      },
    ],
    notes: [
      {
        id: 'n-11a',
        text: 'Modèle intéressant : le financement sert aussi à former. À remonter au comité.',
        author: 'Équipe LOKAMBE',
        createdAt: '2026-09-14T11:30:00.000Z',
      },
    ],
  },
  {
    id: 'app-12',
    reference: 'LKB-0B9D57',
    createdAt: '2026-08-31T14:51:00.000Z',
    locale: 'fr',
    status: 'analyse',
    applicant: {
      firstName: 'Alain',
      lastName: 'Mputu',
      phone: '+243 817 000 260',
      email: 'alain.mputu@example.cd',
      city: 'Kinshasa',
      commune: 'Barumbu',
    },
    business: {
      name: 'Poissonnerie Mputu',
      sector: 'metiers_de_bouche',
      isFormal: true,
      rccm: 'CD/KIN/RCCM/00-A-0005',
      foundedYear: 2019,
      employeesCount: 4,
      monthlyRevenueUsd: 3100,
      description:
        "Poissonnerie approvisionnée au port de Kinkole : poisson frais et fumé, vente au détail et aux restaurants du centre-ville.",
    },
    need: {
      type: 'equipement',
      amountUsd: 5900,
      useOfFunds: "Congélateur vitrine, bacs isothermes et fumoir maçonné pour remplacer le fumage à l'air libre.",
    },
    files: [{fileId: 'f-12a', filename: 'factures-approvisionnement.pdf', size: 430_000}],
    statusHistory: [
      {status: 'recu', changedAt: '2026-08-31T14:51:00.000Z', changedBy: 'Formulaire public'},
      {status: 'preselection', changedAt: '2026-09-01T08:15:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {status: 'visite', changedAt: '2026-09-04T16:20:00.000Z', changedBy: 'Équipe LOKAMBE'},
      {
        status: 'analyse',
        changedAt: '2026-09-09T13:35:00.000Z',
        changedBy: 'Équipe LOKAMBE',
        comment: 'Marges vérifiées sur trois mois. Chaîne du froid à sécuriser avant décaissement.',
      },
    ],
    notes: [],
  },
];

/* ------------------------------------------------------------------ messages */

export const MOCK_CONTACTS: AdminContact[] = [
  {
    id: 'msg-01',
    createdAt: '2026-09-15T06:48:00.000Z',
    locale: 'fr',
    kind: 'investisseur',
    fullName: 'Hélène Bosenge',
    organization: 'Bosenge Family Office (fictif)',
    email: 'helene.bosenge@example.com',
    phone: '+243 819 000 371',
    subject: 'Ticket d’entrée et horizon de sortie',
    message:
      "Bonjour,\n\nJe suis basée à Bruxelles et je suis le projet depuis l'annonce du pilote. J'aimerais comprendre le ticket d'entrée minimum et l'horizon de sortie envisagé pour les investisseurs de la diaspora.\n\nPouvons-nous prévoir un appel la semaine prochaine ?",
    isRead: false,
  },
  {
    id: 'msg-02',
    createdAt: '2026-09-14T15:12:00.000Z',
    locale: 'fr',
    kind: 'entrepreneur',
    fullName: 'Rachel Ntumba',
    email: 'rachel.ntumba@example.cd',
    phone: '+243 814 000 482',
    subject: 'Ma candidature est-elle bien arrivée ?',
    message:
      "Bonjour, j'ai envoyé mon dossier pour mon salon de coiffure à Ngiri-Ngiri mais je n'ai pas reçu de référence par SMS. Pouvez-vous vérifier ? Merci beaucoup.",
    isRead: false,
  },
  {
    id: 'msg-03',
    createdAt: '2026-09-13T09:27:00.000Z',
    locale: 'fr',
    kind: 'partenaire',
    fullName: 'Thierry Mabiala',
    organization: 'Coopérative des maraîchers de N’sele (fictif)',
    email: 'thierry.mabiala@example.cd',
    subject: 'Partenariat sur l’approvisionnement',
    message:
      "Nous regroupons 40 maraîchers et nous cherchons des débouchés stables. Vos restaurants financés pourraient être des acheteurs réguliers. Seriez-vous ouverts à une rencontre ?",
    isRead: false,
  },
  {
    id: 'msg-04',
    createdAt: '2026-09-11T11:05:00.000Z',
    locale: 'fr',
    kind: 'expert',
    fullName: 'Aimée Lukusa',
    organization: 'Consultante en hygiène alimentaire (fictif)',
    email: 'aimee.lukusa@example.com',
    phone: '+243 811 000 593',
    subject: 'Proposition d’accompagnement HACCP',
    message:
      "Bonjour,\n\nJe forme depuis douze ans des restaurateurs aux bonnes pratiques d'hygiène. Je serais ravie de contribuer bénévolement à l'accompagnement de vos premiers financés, puis sous convention si cela fonctionne.",
    isRead: true,
  },
  {
    id: 'msg-05',
    createdAt: '2026-09-09T17:33:00.000Z',
    locale: 'en',
    kind: 'investisseur',
    fullName: 'Daniel Ekofo',
    organization: 'Ekofo Ventures (fictif)',
    email: 'daniel.ekofo@example.com',
    subject: 'Reporting cadence for LPs',
    message:
      "Hello,\n\nCould you share how often you report to investors, and whether the reporting covers each financed business individually or only the portfolio? Thanks.",
    isRead: true,
  },
  {
    id: 'msg-06',
    createdAt: '2026-09-07T08:19:00.000Z',
    locale: 'fr',
    kind: 'entrepreneur',
    fullName: 'Blaise Mukanya',
    email: 'blaise.mukanya@example.cd',
    phone: '+243 890 000 604',
    subject: 'Est-ce que vous financez hors Kinshasa ?',
    message:
      "Bonjour, j'ai une boulangerie à Matadi. Est-ce que le pilote est réservé à Kinshasa ou puis-je déjà déposer un dossier ?",
    isRead: true,
  },
  {
    id: 'msg-07',
    createdAt: '2026-09-04T13:41:00.000Z',
    locale: 'fr',
    kind: 'partenaire',
    fullName: 'Nathalie Ebondo',
    organization: 'Microfinance Bomoko (fictif)',
    email: 'nathalie.ebondo@example.cd',
    phone: '+243 815 000 715',
    subject: 'Complémentarité crédit / capital',
    message:
      "Nous faisons du micro-crédit court terme et voyons beaucoup de dossiers trop gros pour nous. Une orientation croisée serait utile aux deux structures.",
    isRead: true,
  },
  {
    id: 'msg-08',
    createdAt: '2026-08-30T10:02:00.000Z',
    locale: 'fr',
    kind: 'autre',
    fullName: 'Joseph Kambale',
    email: 'joseph.kambale@example.cd',
    subject: 'Demande de stage',
    message:
      "Étudiant en finance à l'UNIKIN, je cherche un stage de six mois à partir de janvier. Je joins mon CV si vous avez une adresse pour l'envoyer.",
    isRead: true,
  },
];

/* ----------------------------------------------------------------- formatage */

const dateTimeFormatter = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Africa/Kinshasa',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Africa/Kinshasa',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const usdFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/** « 15/09/2026 10:42 » (heure de Kinshasa). */
export function formatDateTime(iso: string): string {
  return dateTimeFormatter.format(new Date(iso)).replace(',', '');
}

/** « 15/09/2026 » (heure de Kinshasa). */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatUsd(amount: number): string {
  return usdFormatter.format(amount);
}

export function formatBytes(size: number): string {
  return size < 1024 * 1024 ? `${Math.ceil(size / 1024)} Ko` : `${(size / (1024 * 1024)).toFixed(1)} Mo`;
}

/** Nombre de jours entiers écoulés depuis `iso`, par rapport à `MOCK_NOW`. */
export function daysAgo(iso: string, now: string = MOCK_NOW): number {
  const ms = new Date(now).getTime() - new Date(iso).getTime();
  return Math.floor(ms / 86_400_000);
}

/** « il y a 3 jours », « aujourd’hui »… pour les listes. */
export function formatRelative(iso: string, now: string = MOCK_NOW): string {
  const days = daysAgo(iso, now);
  if (days <= 0) return 'aujourd’hui';
  if (days === 1) return 'hier';
  if (days < 30) return `il y a ${days} jours`;
  const months = Math.floor(days / 30);
  return months === 1 ? 'il y a 1 mois' : `il y a ${months} mois`;
}

/* ------------------------------------------------------------------ recherche */

export type ApplicationFilters = {status: string; sector: string; q: string};

export const EMPTY_APPLICATION_FILTERS: ApplicationFilters = {status: '', sector: '', q: ''};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/** Filtre une liste de candidatures (statut, secteur, recherche plein texte). */
export function filterApplications(
  applications: readonly AdminApplication[],
  filters: ApplicationFilters,
): AdminApplication[] {
  const q = normalize(filters.q.trim());

  return applications.filter((application) => {
    if (filters.status && application.status !== filters.status) return false;
    if (filters.sector && application.business.sector !== filters.sector) return false;
    if (!q) return true;

    const haystack = normalize(
      [
        application.reference,
        application.applicant.firstName,
        application.applicant.lastName,
        application.applicant.phone,
        application.applicant.email ?? '',
        application.applicant.commune,
        application.business.name,
      ].join(' '),
    );
    return haystack.includes(q);
  });
}

export type ContactFilters = {kind: string; isRead: string};

export const EMPTY_CONTACT_FILTERS: ContactFilters = {kind: '', isRead: ''};

export function filterContacts(contacts: readonly AdminContact[], filters: ContactFilters): AdminContact[] {
  return contacts.filter((contact) => {
    if (filters.kind && contact.kind !== filters.kind) return false;
    if (filters.isRead === 'true' && !contact.isRead) return false;
    if (filters.isRead === 'false' && contact.isRead) return false;
    return true;
  });
}

/* ----------------------------------------------------------------- pagination */

export const PAGE_SIZE = 6;

export function totalPages(total: number, limit: number = PAGE_SIZE): number {
  return Math.max(1, Math.ceil(total / limit));
}

export function paginate<T>(items: readonly T[], page: number, limit: number = PAGE_SIZE): T[] {
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
}

/* --------------------------------------------------------------- statistiques */

export type AdminStats = {
  applicationsByStatus: Record<ApplicationStatus, number>;
  total: number;
  last30Days: number;
  unreadContacts: number;
  perDay: {date: string; count: number}[];
};

/** Agrège les compteurs du tableau de bord à partir des données en mémoire. */
export function computeStats(
  applications: readonly AdminApplication[],
  contacts: readonly AdminContact[],
  now: string = MOCK_NOW,
): AdminStats {
  const applicationsByStatus = Object.fromEntries(APPLICATION_STATUSES.map((status) => [status, 0])) as Record<
    ApplicationStatus,
    number
  >;
  for (const application of applications) applicationsByStatus[application.status] += 1;

  const perDayMap = new Map<string, number>();
  const reference = new Date(now);
  for (let offset = 29; offset >= 0; offset -= 1) {
    const day = new Date(reference.getTime() - offset * 86_400_000).toISOString().slice(0, 10);
    perDayMap.set(day, 0);
  }
  for (const application of applications) {
    const day = application.createdAt.slice(0, 10);
    if (perDayMap.has(day)) perDayMap.set(day, (perDayMap.get(day) ?? 0) + 1);
  }

  const perDay = [...perDayMap].map(([date, count]) => ({date, count}));

  return {
    applicationsByStatus,
    total: applications.length,
    last30Days: perDay.reduce((sum, entry) => sum + entry.count, 0),
    unreadContacts: contacts.filter((contact) => !contact.isRead).length,
    perDay,
  };
}

/** Les candidatures les plus récentes, pour le tableau de bord. */
export function recentApplications(applications: readonly AdminApplication[], count = 5): AdminApplication[] {
  return [...applications]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, count);
}

/* ----------------------------------------------------------------- export CSV */

const CSV_COLUMNS = [
  'Référence',
  'Date de réception',
  'Candidat',
  'Téléphone',
  'Email',
  'Commune',
  'Activité',
  'Secteur',
  'Type de besoin',
  'Montant (USD)',
  'Statut',
] as const;

function csvCell(value: string | number): string {
  const text = String(value);
  return /[";\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/**
 * Sérialise les candidatures filtrées en CSV (séparateur `;`, lisible par Excel FR).
 * La version connectée demandera ce fichier à l'API plutôt que de le construire ici.
 */
export function applicationsToCsv(applications: readonly AdminApplication[]): string {
  const rows = applications.map((application) =>
    [
      application.reference,
      formatDateTime(application.createdAt),
      `${application.applicant.firstName} ${application.applicant.lastName}`,
      application.applicant.phone,
      application.applicant.email ?? '',
      application.applicant.commune,
      application.business.name,
      application.business.sector === 'autre'
        ? (application.business.sectorOther ?? SECTOR_LABELS.autre)
        : SECTOR_LABELS[application.business.sector],
      NEED_TYPE_LABELS[application.need.type],
      application.need.amountUsd,
      STATUS_LABELS[application.status],
    ]
      .map(csvCell)
      .join(';'),
  );

  return [CSV_COLUMNS.join(';'), ...rows].join('\n');
}
