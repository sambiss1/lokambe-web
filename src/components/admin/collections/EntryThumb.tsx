import type {ApiMedia, ApiPublishable} from '@/lib/api/content-types';
import {cx} from '@/lib/cx';
import {MediaThumb} from '../form/MediaPreview';

/**
 * La vignette d'une ligne de liste : le média téléversé s'il y en a un, sinon
 * l'image livrée avec le site, sinon rien — la liste montre alors le nom seul.
 *
 * Ce composant est rendu côté serveur et joint à la ligne comme élément déjà
 * construit : `CollectionBrowser` tourne dans le navigateur, et React refuse
 * qu'un composant serveur lui passe une fonction de rendu.
 */
export function EntryThumb({
  entry,
  library,
  fit = 'contain',
}: {
  entry: Pick<ApiPublishable, 'mediaId' | 'legacyImagePath'>;
  /** Les médias déjà chargés par l'écran, indexés par identifiant. */
  library: Map<string, ApiMedia>;
  /** « contain » pour un logo, « cover » pour un portrait. */
  fit?: 'contain' | 'cover';
}) {
  const media = entry.mediaId ? library.get(entry.mediaId) : undefined;
  if (media) return <MediaThumb media={media} />;
  if (!entry.legacyImagePath) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- image livrée avec le site, déjà optimisée
    <img
      src={entry.legacyImagePath}
      alt=""
      className={cx(
        'aspect-square w-full rounded-xl bg-lokambe-peach-soft',
        fit === 'contain' ? 'object-contain p-1' : 'object-cover',
      )}
    />
  );
}
