'use client';

import {Film, ImageIcon} from 'lucide-react';
import NextImage from 'next/image';
import {cx} from '@/lib/cx';
import type {ApiMedia} from '@/lib/api/content-types';
import {formatDuration, formatMediaSize, mediaFileUrl} from '@/lib/media/url';

/**
 * L'aperçu d'un média — **une photo comme une vidéo**.
 *
 * Une vidéo se regarde : elle est rendue dans un vrai lecteur, avec ses
 * commandes et son image d'attente, pas comme une ligne de liste portant un nom
 * de fichier. C'est la demande du client, et c'est aussi le seul moyen de
 * vérifier qu'on a téléversé le bon fichier.
 *
 * `poster` est l'adresse de l'image d'attente, que l'appelant résout : la fiche
 * du média ne porte que l'identifiant de cette image.
 */

type Props = {
  media: Pick<ApiMedia, 'kind' | 'mimeType' | 'alt' | 'width' | 'height' | 'durationSeconds' | 'size'> & {
    id?: string;
    title?: string;
  };
  /** Adresse du fichier. Permet d'afficher un fichier local avant téléversement. */
  src: string;
  poster?: string;
  /** « contain » pour un logo, « cover » pour une photo. */
  fit?: 'contain' | 'cover';
  className?: string;
  /** Vignette : pas de lecteur vidéo, seulement l'image d'attente et un repère. */
  compact?: boolean;
};

export function MediaPreview({media, src, poster, fit = 'cover', className, compact = false}: Props) {
  const frame = cx(
    'relative overflow-hidden rounded-xl bg-lokambe-peach-soft',
    compact ? 'aspect-square' : 'aspect-16/10',
    className,
  );

  if (media.kind === 'video') {
    if (compact) {
      return (
        <div className={frame}>
          {poster ? <NextImage src={poster} alt="" fill sizes="12rem" className="object-cover" unoptimized /> : null}
          <span className="absolute inset-0 flex items-center justify-center bg-ink/25 text-white">
            <Film aria-hidden="true" className="size-6" strokeWidth={2} />
            <span className="sr-only">Vidéo</span>
          </span>
          {media.durationSeconds ? (
            <span className="absolute right-1.5 bottom-1.5 rounded-md bg-ink/75 px-1.5 py-0.5 text-[0.7rem] font-bold text-white tabular-nums">
              {formatDuration(media.durationSeconds)}
            </span>
          ) : null}
        </div>
      );
    }

    return (
      <div className={cx('overflow-hidden rounded-xl bg-ink', className)}>
        <video
          src={src}
          poster={poster}
          controls
          preload="metadata"
          playsInline
          aria-label={media.alt ?? media.title ?? 'Vidéo téléversée'}
          className="aspect-16/10 w-full bg-ink object-contain"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <NextImage
        src={src}
        alt={media.alt ?? ''}
        fill
        sizes={compact ? '12rem' : '(min-width: 1024px) 30rem, 100vw'}
        className={fit === 'contain' ? 'object-contain p-3' : 'object-cover'}
        unoptimized
      />
    </div>
  );
}

/** Les caractéristiques d'un média, sous son aperçu. */
export function MediaFacts({media}: {media: ApiMedia}) {
  const facts = [
    media.kind === 'video' ? 'Vidéo' : 'Photo',
    media.mimeType.split('/')[1]?.toUpperCase(),
    media.width && media.height ? `${media.width} × ${media.height} px` : undefined,
    media.durationSeconds ? formatDuration(media.durationSeconds) : undefined,
    formatMediaSize(media.size),
  ].filter(Boolean);

  return (
    <p className="text-xs text-ink-soft">
      {facts.join(' · ')}
      {media.alt ? null : (
        <>
          {' · '}
          <span className="font-bold text-lokambe-red-strong">texte alternatif manquant</span>
        </>
      )}
    </p>
  );
}

/** Le cadre vide, quand aucun média n'est posé. */
export function MediaEmpty({label, className}: {label: string; className?: string}) {
  return (
    <div
      className={cx(
        'flex aspect-16/10 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-paper text-ink-soft',
        className,
      )}
    >
      <ImageIcon aria-hidden="true" className="size-6" strokeWidth={1.8} />
      <p className="px-4 text-center text-xs">{label}</p>
    </div>
  );
}

/** Vignette d'un média dans une grille ou une liste, aperçu compris. */
export function MediaThumb({media, className}: {media: ApiMedia; className?: string}) {
  return (
    <MediaPreview
      media={media}
      src={mediaFileUrl(media.id)}
      poster={media.posterMediaId ? mediaFileUrl(media.posterMediaId) : undefined}
      compact
      className={className}
    />
  );
}
