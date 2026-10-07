'use client';

import {useRef, useState, useTransition} from 'react';
import Link from 'next/link';
import {createUploadTicket, registerUploadedMedia} from '@/lib/api/content-actions';
import type {ApiMedia} from '@/lib/api/content-types';
import {entryImageUrl, mediaFileUrl} from '@/lib/media/url';
import {MEDIA_ACCEPT, MediaUploadError, inspectFile, uploadMedia} from '@/lib/media/upload';
import type {LocalMedia} from '@/lib/media/upload';
import {cx} from '@/lib/cx';
import {AdminButton} from '../AdminButton';
import {AdminField} from './AdminField';
import {TextInput} from './inputs';
import {MediaEmpty, MediaFacts, MediaPreview, MediaThumb} from './MediaPreview';

/**
 * Choisir l'image d'une fiche : téléverser un fichier, ou reprendre un média
 * déjà dans la bibliothèque.
 *
 * **Ce n'est pas une fenêtre modale.** La bibliothèque s'ouvre comme un panneau
 * dans la page, sous le bouton : rien ne recouvre le formulaire, on peut
 * revenir aux champs sans « fermer » quoi que ce soit, et l'écran se teste sans
 * détourner `window`. La médiathèque complète reste une page à part.
 *
 * L'aperçu est montré **avant** l'envoi, dès que le fichier est choisi, photo
 * comme vidéo : on vérifie qu'on a pris le bon fichier avant de le poser.
 */

type Props = {
  /** Média actuellement posé, s'il y en a un. */
  value: string | null;
  onChange: (mediaId: string | null) => void;
  /** Fiche du média posé, pour l'aperçu. Absente si l'on vient de le choisir. */
  current?: ApiMedia | null;
  /** Image livrée avec le site, affichée tant qu'aucun média n'est posé. */
  legacyImagePath?: string;
  /** La bibliothèque, chargée par l'écran serveur. */
  library: ApiMedia[];
  label: string;
  hint?: string;
  /** « contain » pour un logo, « cover » pour une photo. */
  fit?: 'contain' | 'cover';
  emptyLabel: string;
  disabled?: boolean;
};

export function MediaPicker({
  value,
  onChange,
  current,
  legacyImagePath,
  library,
  label,
  hint,
  fit = 'cover',
  emptyLabel,
  disabled,
}: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [browsing, setBrowsing] = useState(false);
  const [local, setLocal] = useState<LocalMedia | null>(null);
  const [alt, setAlt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [uploading, startUpload] = useTransition();

  /** Le média posé : celui passé par l'écran, sinon celui pris dans la liste. */
  const posed = current?.id === value ? current : (library.find((item) => item.id === value) ?? null);

  function choose(file: File) {
    setError(null);
    void (async () => {
      try {
        const inspected = await inspectFile(file);
        setLocal((previous) => {
          if (previous) URL.revokeObjectURL(previous.objectUrl);
          return inspected;
        });
        setAlt('');
      } catch (cause) {
        setError(cause instanceof MediaUploadError ? cause.message : 'Fichier refusé.');
      }
    })();
  }

  function send() {
    if (!local) return;
    setError(null);
    startUpload(async () => {
      const ticket = await createUploadTicket();
      if (!ticket.ok) {
        setError(
          ticket.reason === 'session'
            ? 'Votre session a expiré. Reconnectez-vous puis réessayez.'
            : 'Impossible d’obtenir l’autorisation de téléversement.',
        );
        return;
      }
      try {
        const media = await uploadMedia(ticket.data.ticket, local, {alt});
        URL.revokeObjectURL(local.objectUrl);
        setLocal(null);
        setAlt('');
        onChange(media.id);
        await registerUploadedMedia(media.id);
      } catch (cause) {
        setError(cause instanceof MediaUploadError ? cause.message : 'Téléversement impossible.');
      }
    });
  }

  function cancelLocal() {
    if (local) URL.revokeObjectURL(local.objectUrl);
    setLocal(null);
    setAlt('');
    setError(null);
  }

  /* ----- un fichier est choisi, pas encore envoyé : aperçu et validation --- */
  if (local) {
    return (
      <div className="grid gap-3">
        <p className="text-xs font-bold tracking-[0.08em] text-ink-soft uppercase">{label}</p>

        <MediaPreview
          media={{
            kind: local.kind,
            mimeType: local.file.type as ApiMedia['mimeType'],
            size: local.file.size,
            width: local.width,
            height: local.height,
            durationSeconds: local.durationSeconds,
          }}
          src={local.objectUrl}
          fit={fit}
        />

        <p className="text-xs text-ink-soft">
          {local.file.name}
          {local.width && local.height ? ` · ${local.width} × ${local.height} px` : ''}
        </p>

        <AdminField
          label="Description de l’image"
          hint="Lue par les lecteurs d’écran. Décrivez ce qu’on voit."
          optionalLabel="recommandé"
        >
          {({id, describedBy}) => (
            <TextInput
              id={id}
              aria-describedby={describedBy}
              value={alt}
              onChange={(event) => setAlt(event.target.value)}
              placeholder="Commerçante devant son étal"
            />
          )}
        </AdminField>

        {error ? (
          <p role="alert" className="text-xs font-bold text-lokambe-red-strong">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <AdminButton disabled={uploading} onClick={send}>
            {uploading ? 'Téléversement…' : 'Téléverser ce fichier'}
          </AdminButton>
          <AdminButton tone="neutre" disabled={uploading} onClick={cancelLocal}>
            Choisir un autre fichier
          </AdminButton>
        </div>
      </div>
    );
  }

  const legacyUrl = !posed && legacyImagePath ? legacyImagePath : undefined;

  return (
    <div className="grid gap-3">
      <p className="text-xs font-bold tracking-[0.08em] text-ink-soft uppercase">{label}</p>

      {posed ? (
        <>
          <MediaPreview
            media={posed}
            src={mediaFileUrl(posed.id)}
            poster={posed.posterMediaId ? mediaFileUrl(posed.posterMediaId) : undefined}
            fit={fit}
          />
          <MediaFacts media={posed} />
          <Link
            href={`/admin/medias/${posed.id}`}
            className="w-fit text-xs font-bold text-lokambe-blue hover:underline"
          >
            Voir ce média dans la médiathèque
          </Link>
        </>
      ) : legacyUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- image livrée avec le site, déjà optimisée, hors next/image pour éviter une dépendance au domaine */}
          <img
            src={legacyUrl}
            alt=""
            className={cx(
              'aspect-16/10 w-full rounded-xl bg-lokambe-peach-soft',
              fit === 'contain' ? 'object-contain p-3' : 'object-cover',
            )}
          />
          <p className="text-xs text-ink-soft">
            Image livrée avec le site ({legacyImagePath}). Téléversez-en une pour la remplacer.
          </p>
        </>
      ) : (
        <MediaEmpty label={emptyLabel} />
      )}

      {hint ? <p className="text-xs text-ink-soft">{hint}</p> : null}

      {error ? (
        <p role="alert" className="text-xs font-bold text-lokambe-red-strong">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <AdminButton tone="neutre" disabled={disabled} onClick={() => fileInput.current?.click()}>
          Téléverser un fichier
        </AdminButton>
        <AdminButton
          tone="neutre"
          disabled={disabled || library.length === 0}
          aria-expanded={browsing}
          onClick={() => setBrowsing((open) => !open)}
        >
          {browsing ? 'Masquer la bibliothèque' : 'Choisir dans la bibliothèque'}
        </AdminButton>
        {posed ? (
          <AdminButton tone="danger" disabled={disabled} onClick={() => onChange(null)}>
            Retirer
          </AdminButton>
        ) : null}
      </div>

      {browsing ? (
        <div className="rounded-xl border border-line p-3">
          <p className="mb-2.5 text-xs text-ink-soft">
            {library.length} média{library.length > 1 ? 's' : ''} dans la bibliothèque.
          </p>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {library.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(item.id);
                    setBrowsing(false);
                  }}
                  aria-pressed={item.id === value}
                  className={cx(
                    'block w-full rounded-xl border p-1 transition-colors',
                    item.id === value ? 'border-lokambe-blue' : 'border-transparent hover:border-ink-soft/40',
                  )}
                >
                  <MediaThumb media={item} />
                  <span className="mt-1 block truncate text-[0.7rem] text-ink-soft">
                    {item.title ?? item.originalName}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <input
        ref={fileInput}
        type="file"
        accept={MEDIA_ACCEPT}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (file) choose(file);
        }}
      />
    </div>
  );
}

/** L'image d'une ligne de liste : le média, sinon l'image du site, sinon rien. */
export function entryThumbUrl(entry: {mediaId?: string; legacyImagePath?: string}): string | undefined {
  return entryImageUrl(entry);
}
