/**
 * Lecture des paramètres d'adresse des écrans du back-office.
 *
 * Ces trois fonctions étaient recopiées dans chaque page de liste. Les filtres
 * vivent dans l'adresse plutôt que dans un état local : un lien vers
 * « brouillons, page 2 » se partage et survit à un rechargement.
 */

export type SearchParams = Record<string, string | string[] | undefined>;

/** La première valeur d'un paramètre, ou une chaîne vide. */
export function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? '';
}

/** Un numéro de page valable, 1 par défaut. */
export function pageNumber(value: string | string[] | undefined): number {
  const parsed = Number.parseInt(first(value), 10);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
}

/** La valeur si elle fait partie de la liste, sinon `undefined`. */
export function oneOf<T extends string>(value: string | string[] | undefined, allowed: readonly T[]): T | undefined {
  const raw = first(value);
  return allowed.includes(raw as T) ? (raw as T) : undefined;
}
