import type {Metadata} from 'next';
import type {PageMeta} from '@/content/types';

/** Métadonnées d'une page publique à partir de son contenu. */
export function pageMetadata(meta: PageMeta): Metadata {
  return {title: meta.title, description: meta.description};
}
