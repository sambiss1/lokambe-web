import type {ApplicationStatus, ContactKind, NeedType, Sector} from '@/lib/constants';

/**
 * Libellés et formatage du back-office.
 *
 * Séparés des données : ces fonctions servent aux écrans, qu'ils lisent l'API
 * ou un jeu d'essai.
 */

/* ---------------------------------------------------------------------- libellés */

export const SECTOR_LABELS: Record<Sector, string> = {
  restauration: 'Restauration',
  metiers_de_bouche: 'Métiers de bouche',
  commerce_distribution: 'Commerce & distribution',
  evenementiel: 'Événementiel',
  services: 'Services',
  medias_divertissement: 'Médias & divertissement',
  education_formation: 'Éducation & formation',
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
  croissance: 'Capital de croissance',
  equipements: 'Équipements productifs',
  expansion: 'Expansion',
  autre: 'Autre',
};

/** Secteur lisible, en dépliant le cas « autre ». */
export function sectorLabel(sector: Sector, sectorOther?: string): string {
  return sector === 'autre' && sectorOther ? `Autre : ${sectorOther}` : SECTOR_LABELS[sector];
}

/* --------------------------------------------------------------------- formatage */

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

/** Nombre de jours entiers écoulés depuis `iso`. */
export function daysAgo(iso: string, now: string | number = Date.now()): number {
  const ms = new Date(now).getTime() - new Date(iso).getTime();
  return Math.floor(ms / 86_400_000);
}

/** « il y a 3 jours », « aujourd’hui »… pour les listes. */
export function formatRelative(iso: string, now: string | number = Date.now()): string {
  const days = daysAgo(iso, now);
  if (days <= 0) return 'aujourd’hui';
  if (days === 1) return 'hier';
  if (days < 30) return `il y a ${days} jours`;
  const months = Math.floor(days / 30);
  return months === 1 ? 'il y a 1 mois' : `il y a ${months} mois`;
}

/** Nombre de pages pour un total et une taille de page donnés. */
export function totalPages(total: number, limit: number): number {
  return Math.max(1, Math.ceil(total / limit));
}
