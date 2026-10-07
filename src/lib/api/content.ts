import {apiUrlFrom} from './base';
import {COLLECTIONS} from './content-types';
import type {CollectionEntry, CollectionKey} from './content-types';

/**
 * Lecture publique des collections éditoriales.
 *
 * Même principe que le blog (`articles.ts`) : les appels partent du serveur
 * Next, le résultat est mis en cache sous une étiquette par collection, et les
 * écritures du back-office font expirer cette étiquette.
 *
 * **Si l'API ne répond pas, ou si la collection est vide, l'appelant garde le
 * contenu livré avec le site.** Une panne d'API ne doit jamais vider une page :
 * c'est pour cela que `listCollection` renvoie un tableau vide plutôt que de
 * lever, et que chaque page décide de son repli.
 */
const CONTENT_API_URL = apiUrlFrom(process.env.API_INTERNAL_URL, process.env.NEXT_PUBLIC_API_URL);

export const isContentApiConfigured = CONTENT_API_URL !== '';

/** Une étiquette de cache par collection : `contenu:portfolio`, etc. */
export function collectionTag(key: CollectionKey): string {
  return `contenu:${key}`;
}

/** Le contenu éditorial change rarement : cinq minutes absorbent le trafic. */
const REVALIDATE_SECONDS = 300;

/** Assez haut pour tout prendre : ces collections comptent des dizaines d'entrées, pas des milliers. */
const PAGE_SIZE = 100;

type Page<T> = {items: T[]; total: number};

/**
 * Les entrées publiées d'une collection, dans leur ordre d'affichage.
 * Tableau vide quand l'API est muette : l'appelant reprend son repli statique.
 */
export async function listCollection<K extends CollectionKey>(key: K): Promise<CollectionEntry[K][]> {
  if (!isContentApiConfigured) return [];
  try {
    const response = await fetch(`${CONTENT_API_URL}/${COLLECTIONS[key].apiPath}?limit=${PAGE_SIZE}`, {
      next: {revalidate: REVALIDATE_SECONDS, tags: [collectionTag(key)]},
    });
    if (!response.ok) return [];
    const page = (await response.json()) as Page<CollectionEntry[K]>;
    return Array.isArray(page.items) ? page.items : [];
  } catch {
    return [];
  }
}

/**
 * Le texte d'une entrée dans la langue demandée, champ par champ : l'anglais
 * complète le français au lieu de le remplacer. Une traduction partielle donne
 * donc une page cohérente, pas des trous.
 */
export function localized<T extends object>(fr: T, en: Partial<T> | undefined, locale: string): T {
  if (locale !== 'en' || !en) return fr;
  const merged = {...fr};
  for (const [field, value] of Object.entries(en)) {
    if (value === undefined || value === null) continue;
    if (typeof value === 'string' && value.trim() === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    (merged as Record<string, unknown>)[field] = value;
  }
  return merged;
}
