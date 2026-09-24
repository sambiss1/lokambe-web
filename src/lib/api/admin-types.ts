import type {BlogCategoryId} from '@/content/blog';
import type {ApplicationStatus, ContactKind, NeedType, Sector} from '@/lib/constants';

/**
 * Formes renvoyées par les routes back-office de l'API.
 *
 * Recopiées au plus près du contrat réel, champ par champ. Les champs notés
 * facultatifs sont **absents** de la réponse quand ils ne sont pas renseignés
 * (Mongoose ne stocke pas `undefined`) : les composants doivent donc prévoir
 * leur absence, pas une chaîne vide.
 */

export type Locale = 'fr' | 'en';

/** Enveloppe commune aux deux listes paginées. */
export type Page<T> = {
  items: T[];
  /** Total correspondant au filtre, toutes pages confondues. */
  total: number;
  page: number;
  limit: number;
};

export type ApplicationFile = {
  fileId: string;
  filename: string;
  mimeType: string;
  size: number;
};

/** Les sous-documents de l'API n'ont pas d'identifiant : ne pas s'en servir comme clé React. */
export type StatusEntry = {
  status: ApplicationStatus;
  changedAt: string;
  /** Absent pour l'entrée créée par le formulaire public. */
  changedBy?: string;
  comment?: string;
};

export type ApplicationNote = {
  text: string;
  author: string;
  createdAt: string;
};

/** Ce que renvoie la liste : l'historique et les notes en sont écartés. */
export type AdminApplicationSummary = {
  id: string;
  reference: string;
  locale: Locale;
  applicant: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    city: string;
    commune?: string;
  };
  business: {
    name: string;
    sector: Sector;
    /** Renseigné seulement quand `sector` vaut `autre`. */
    sectorOther?: string;
    isFormal: boolean;
    rccm?: string;
    foundedYear?: number;
    employeesCount: number;
    monthlyRevenueUsd?: number;
    description: string;
  };
  need: {
    type: NeedType;
    amountUsd: number;
    useOfFunds: string;
  };
  files: ApplicationFile[];
  status: ApplicationStatus;
  consentAt: string;
  createdAt: string;
  updatedAt: string;
};

/** Le détail, et ce que renvoient les routes d'écriture : le document entier. */
export type AdminApplication = AdminApplicationSummary & {
  statusHistory: StatusEntry[];
  notes: ApplicationNote[];
};

export type AdminContact = {
  id: string;
  kind: ContactKind;
  fullName: string;
  organization?: string;
  email: string;
  phone?: string;
  message: string;
  locale: Locale;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminStats = {
  /** Les huit statuts sont toujours présents, zéro compris. */
  applicationsByStatus: Record<ApplicationStatus, number>;
  applicationsTotal: number;
  unreadContacts: number;
  applicationsLast30Days: number;
  /** Trente entrées, du plus ancien au plus récent, jours vides compris. */
  applicationsPerDay: {date: string; count: number}[];
};

export type ApplicationFilters = {
  status?: ApplicationStatus;
  sector?: Sector;
  q?: string;
  page?: number;
};

export type ContactFilters = {
  kind?: ContactKind;
  isRead?: boolean;
  page?: number;
};

/** Filtres de la liste des articles du back-office. */
export type ArticleFilters = {
  status?: 'brouillon' | 'publie';
  category?: BlogCategoryId;
  page?: number;
};
