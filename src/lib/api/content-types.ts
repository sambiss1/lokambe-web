import type {ContractType, MediaKind, MediaType, PublicationStatus} from '@/lib/constants';

/**
 * Formes renvoyées par l'API pour la médiathèque et les cinq collections
 * éditoriales — portefeuille, partenaires, équipe, offres d'emploi, questions
 * fréquentes.
 *
 * Recopiées au plus près du contrat réel. Comme pour `admin-types.ts`, un champ
 * noté facultatif est **absent** de la réponse quand il n'est pas renseigné :
 * prévoir son absence, pas une chaîne vide.
 */

/** Le socle commun aux cinq collections (`PublishableEntity` côté API). */
export type ApiPublishable = {
  id: string;
  /** Clé stable, utilisée dans les adresses du back-office et du site. */
  slug: string;
  status: PublicationStatus;
  /** Rang d'affichage, croissant. */
  order: number;
  /** Média téléversé, s'il y en a un. */
  mediaId?: string;
  /** Image livrée avec le site, sous `/images/…`, posée par le contenu de départ. */
  legacyImagePath?: string;
  createdAt: string;
  updatedAt: string;
};

/** La fiche complète d'un média, telle que la voit le back-office. */
export type ApiMedia = {
  id: string;
  fileId: string;
  filename: string;
  originalName: string;
  mimeType: MediaType;
  kind: MediaKind;
  size: number;
  title?: string;
  alt?: string;
  /** Mesurées par le navigateur au téléversement : affichage seulement. */
  width?: number;
  height?: number;
  /** Vidéos seulement. */
  durationSeconds?: number;
  /** Image d'attente d'une vidéo : un autre média de la bibliothèque. */
  posterMediaId?: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
};

/** Où un média est posé. Liste vide : il est supprimable. */
export type ApiMediaUsage = {label: string; count: number};

/** Un texte par langue : le français est écrit, l'anglais complète. */
export type PortfolioText = {
  sector: string;
  status: string;
  description: string;
};

export type ApiPortfolioCompany = ApiPublishable & {
  name: string;
  websiteUrl?: string;
  fr: PortfolioText;
  en?: Partial<PortfolioText>;
};

export type ApiPartner = ApiPublishable & {
  name: string;
  websiteUrl?: string;
  fr?: {description?: string};
  en?: {description?: string};
};

export type TeamText = {title: string; summary: string; photoAlt?: string};

export type ApiTeamMember = ApiPublishable & {
  /** Seul le dirigeant est nommé ; les autres rôles restent anonymes. */
  name?: string;
  /** Monogramme affiché tant qu'aucun portrait n'est posé. */
  initials: string;
  fr: TeamText;
  en?: Partial<TeamText>;
};

export type JobText = {
  title: string;
  summary: string;
  missions: string[];
  profile: string[];
};

export type ApiJobPosting = ApiPublishable & {
  location: string;
  contractType: ContractType;
  fr: JobText;
  en?: Partial<JobText>;
};

export type FaqText = {question: string; answer: string};

export type ApiFaqEntry = ApiPublishable & {
  fr: FaqText;
  en?: Partial<FaqText>;
};

export type ApiTheme = ApiPublishable & {
  fr: {name: string};
  en?: {name?: string};
};

export type ApiCity = ApiPublishable & {
  fr: {name: string};
  en?: {name?: string};
};

/** Filtres des listes du back-office : état de publication et page. */
export type CollectionFilters = {
  status?: PublicationStatus;
  page?: number;
};

export type MediaFilters = {
  kind?: MediaKind;
  q?: string;
  page?: number;
};

/**
 * Les collections éditoriales, désignées par la même clé partout : chemin de l'API,
 * adresse du back-office, étiquette de cache. Une seule table à tenir à jour.
 */
export const COLLECTIONS = {
  portfolio: {apiPath: 'portfolio', adminPath: 'portefeuille'},
  partners: {apiPath: 'partners', adminPath: 'partenaires'},
  team: {apiPath: 'team', adminPath: 'equipe'},
  jobs: {apiPath: 'jobs', adminPath: 'offres'},
  faq: {apiPath: 'faq', adminPath: 'questions'},
  themes: {apiPath: 'themes', adminPath: 'themes'},
  cities: {apiPath: 'cities', adminPath: 'villes'},
} as const;

export type CollectionKey = keyof typeof COLLECTIONS;

/** Racine des écrans d'une collection : `/admin/portefeuille`. */
export function collectionAdminPath(key: CollectionKey): string {
  return `/admin/${COLLECTIONS[key].adminPath}`;
}

/** Les documents de chaque collection, indexés par leur clé. */
export type CollectionEntry = {
  portfolio: ApiPortfolioCompany;
  partners: ApiPartner;
  team: ApiTeamMember;
  jobs: ApiJobPosting;
  faq: ApiFaqEntry;
  themes: ApiTheme;
  cities: ApiCity;
};

/** Comptes affichés sur le tableau de bord, ajoutés à `/admin/stats`. */
export type ContentCounts = Record<CollectionKey, {total: number; published: number}>;
