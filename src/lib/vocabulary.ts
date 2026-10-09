import {CONTRACT_TYPE_LABELS} from '@/lib/constants';
import type {ContractType} from '@/lib/constants';

/**
 * Les vocabulaires fermés du site, dans les deux langues.
 *
 * Un secteur, un statut de projet, un type de contrat : ce sont des listes
 * arrêtées, pas du texte libre. Les saisir à la main, c'est écrire « En
 * developpement » un jour et « en cours » le lendemain, puis devoir traduire
 * sept fois les trois mêmes mots. **La traduction d'une liste fermée est une
 * table, pas un service** : elle est ici, elle est exacte, elle ne coûte rien
 * et elle marche hors ligne.
 *
 * Le français reste la valeur enregistrée — la base garde ce qu'elle avait,
 * aucune reprise de données n'est nécessaire. L'anglais s'en déduit à
 * l'affichage comme à la saisie.
 *
 * Le texte libre (description, résumé, réponse) n'est pas concerné : il se
 * traduit à la main, dans les champs du bloc « Anglais ».
 */

export type Bilingual = {fr: string; en: string};

/**
 * Les sept secteurs prioritaires, repris mot pour mot de la section
 * « Secteurs » de la page d'accueil (`src/content/fr|en/home.ts`) : une fiche du
 * portefeuille et la grille des secteurs doivent nommer la même chose pareil.
 */
export const PORTFOLIO_SECTORS: Bilingual[] = [
  {fr: 'Restauration', en: 'Restaurants and catering'},
  {fr: 'Métiers de bouche', en: 'Food crafts'},
  {fr: 'Commerce et distribution', en: 'Trade and distribution'},
  {fr: 'Événementiel', en: 'Events'},
  {fr: 'Services', en: 'Services'},
  {fr: 'Médias et divertissement', en: 'Media and entertainment'},
  {fr: 'Éducation et formation', en: 'Education and training'},
];

/**
 * L'avancement d'un projet du portefeuille. Les trois états en usage
 * aujourd'hui sur la page d'accueil, et la sortie du portefeuille. En ajouter
 * un, c'est une ligne ici — et il est aussitôt traduit.
 */
export const PORTFOLIO_STATUSES: Bilingual[] = [
  {fr: 'En cours', en: 'Under way'},
  {fr: 'En développement', en: 'In development'},
  {fr: 'En pause', en: 'On hold'},
  {fr: 'Clôturé', en: 'Closed'},
];

/**
 * Le type de contrat d'une offre d'emploi. Le français vient de
 * `CONTRACT_TYPE_LABELS` : une seule source pour le libellé français.
 *
 * « CDI » et « CDD » sont des sigles du droit français et congolais : ils ne
 * disent rien à un lecteur anglophone, qui lisait pourtant « CDI » sur la page
 * Carrières en anglais.
 */
export const CONTRACT_TYPE_TEXTS: Record<ContractType, Bilingual> = {
  cdi: {fr: CONTRACT_TYPE_LABELS.cdi, en: 'Permanent contract'},
  cdd: {fr: CONTRACT_TYPE_LABELS.cdd, en: 'Fixed-term contract'},
  stage: {fr: CONTRACT_TYPE_LABELS.stage, en: 'Internship'},
  consultance: {fr: CONTRACT_TYPE_LABELS.consultance, en: 'Consulting'},
  alternance: {fr: CONTRACT_TYPE_LABELS.alternance, en: 'Apprenticeship'},
};

/**
 * La traduction anglaise d'une valeur française de la liste, ou `undefined` si
 * elle n'en fait pas partie — une valeur saisie en « Autre », ou enregistrée
 * avant que la liste n'existe.
 *
 * La comparaison ignore la casse et les espaces de bord : « en cours » retrouve
 * « En cours ». Elle ne va pas plus loin — déplier les accents ferait passer
 * une valeur approximative pour une valeur de la liste, et c'est précisément ce
 * qu'on veut arrêter.
 */
export function translateTerm(vocabulary: Bilingual[], fr: string): string | undefined {
  const needle = fr.trim().toLowerCase();
  return vocabulary.find((term) => term.fr.toLowerCase() === needle)?.en;
}

/** Vrai si la valeur française appartient au vocabulaire. */
export function isKnownTerm(vocabulary: Bilingual[], fr: string): boolean {
  return translateTerm(vocabulary, fr) !== undefined;
}
