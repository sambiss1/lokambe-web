'use client';

import {useRouter} from 'next/navigation';
import {useEffect, useRef, useState, useTransition} from 'react';
import {createUploadTicket, registerUploadedMedia} from '@/lib/api/content-actions';
import {MAX_MEDIA_IMAGE_BYTES, MAX_MEDIA_VIDEO_BYTES} from '@/lib/constants';
import {MEDIA_ACCEPT, MediaUploadError, inspectFile, uploadMedia} from '@/lib/media/upload';
import type {LocalMedia} from '@/lib/media/upload';
import {formatDuration, formatMediaSize} from '@/lib/media/url';
import {AdminButton} from '../AdminButton';
import {AdminField} from '../form/AdminField';
import {FormFeedback} from '../form/FormFeedback';
import {MediaEmpty, MediaPreview} from '../form/MediaPreview';
import {TextInput} from '../form/inputs';
import type {Feedback} from '../form/useResourceForm';
import {Surface} from '../Surface';

/**
 * Téléverser une photo ou une vidéo dans la médiathèque.
 *
 * Le fichier est **montré avant d'être envoyé** : une photo s'affiche, une
 * vidéo se lit dans un vrai lecteur, et ses caractéristiques (format,
 * dimensions, durée, poids) sont lues dans le navigateur. On vérifie donc qu'on
 * a pris le bon fichier avant de le poser dans la bibliothèque, ce que le
 * client a explicitement demandé.
 *
 * L'envoi part **du navigateur vers l'API**, autorisé par un ticket de courte
 * durée : une fonction Vercel plafonne le corps d'une requête bien en dessous
 * d'une vidéo. Voir `src/lib/media/upload.ts`.
 */
export function MediaUploader() {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [local, setLocal] = useState<LocalMedia | null>(null);
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [pending, startTransition] = useTransition();

  // L'adresse locale du fichier retient de la mémoire tant qu'elle existe.
  useEffect(() => () => {
    if (local) URL.revokeObjectURL(local.objectUrl);
  });

  function choose(file: File) {
    setFeedback(null);
    void (async () => {
      try {
        const inspected = await inspectFile(file);
        setLocal((previous) => {
          if (previous) URL.revokeObjectURL(previous.objectUrl);
          return inspected;
        });
        // Le nom du fichier est un titre de départ raisonnable.
        setTitle(file.name.replace(/\.[^.]+$/, '').slice(0, 200));
      } catch (cause) {
        setFeedback({
          tone: 'erreur',
          text: cause instanceof MediaUploadError ? cause.message : 'Fichier refusé.',
        });
      }
    })();
  }

  function send() {
    if (!local) return;
    setFeedback(null);
    startTransition(async () => {
      const ticket = await createUploadTicket();
      if (!ticket.ok) {
        setFeedback({
          tone: 'erreur',
          text:
            ticket.reason === 'session'
              ? 'Votre session a expiré. Reconnectez-vous puis réessayez.'
              : 'Impossible d’obtenir l’autorisation de téléversement.',
        });
        return;
      }
      try {
        const media = await uploadMedia(ticket.data.ticket, local, {title, alt});
        URL.revokeObjectURL(local.objectUrl);
        await registerUploadedMedia(media.id);
        router.push(`/admin/medias/${media.id}`);
        router.refresh();
      } catch (cause) {
        setFeedback({
          tone: 'erreur',
          text: cause instanceof MediaUploadError ? cause.message : 'Téléversement impossible.',
        });
      }
    });
  }

  const imageLimit = Math.round(MAX_MEDIA_IMAGE_BYTES / (1024 * 1024));
  const videoLimit = Math.round(MAX_MEDIA_VIDEO_BYTES / (1024 * 1024));

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <Surface className="p-5 sm:p-6">
        {local ? (
          <div className="grid gap-5">
            <MediaPreview
              media={{
                kind: local.kind,
                mimeType: local.file.type as never,
                size: local.file.size,
                width: local.width,
                height: local.height,
                durationSeconds: local.durationSeconds,
              }}
              src={local.objectUrl}
            />

            <dl className="grid gap-1 text-xs text-ink-soft">
              <div className="flex gap-2">
                <dt className="font-bold">Fichier</dt>
                <dd className="truncate">{local.file.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-bold">Caractéristiques</dt>
                <dd>
                  {[
                    local.kind === 'video' ? 'Vidéo' : 'Photo',
                    local.file.type.split('/')[1]?.toUpperCase(),
                    local.width && local.height ? `${local.width} × ${local.height} px` : null,
                    local.durationSeconds !== undefined ? formatDuration(local.durationSeconds) : null,
                    formatMediaSize(local.file.size),
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </dd>
              </div>
            </dl>

            <AdminField label="Titre" hint="Pour retrouver le média dans la bibliothèque." optionalLabel="recommandé">
              {({id, describedBy}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  value={title}
                  disabled={pending}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Boutique de quartier, Kinshasa"
                />
              )}
            </AdminField>

            <AdminField
              label="Texte alternatif"
              hint="Lu par les lecteurs d’écran. Décrivez ce qu’on voit, pas le fichier."
              optionalLabel="recommandé"
            >
              {({id, describedBy}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  value={alt}
                  disabled={pending}
                  onChange={(event) => setAlt(event.target.value)}
                  placeholder="Une commerçante devant son étal"
                />
              )}
            </AdminField>
          </div>
        ) : (
          <div className="grid gap-4">
            <MediaEmpty label="Choisissez une photo ou une vidéo pour en voir l’aperçu ici." />
            <p className="text-sm text-ink-soft">
              Photos : JPEG, PNG ou WebP, {imageLimit} Mo au maximum. Vidéos : MP4 ou WebM, {videoLimit} Mo au maximum.
              Au-delà, une vidéo n’a plus sa place dans la base : il faut un hébergeur de vidéo.
            </p>
          </div>
        )}
      </Surface>

      <Surface className="p-5 sm:p-6">
        <h2 className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Téléversement</h2>

        <div className="mt-4 grid gap-2.5">
          <AdminButton tone="neutre" disabled={pending} onClick={() => fileInput.current?.click()}>
            {local ? 'Choisir un autre fichier' : 'Choisir un fichier'}
          </AdminButton>

          {local ? (
            <AdminButton disabled={pending} onClick={send}>
              {pending ? 'Téléversement…' : 'Téléverser'}
            </AdminButton>
          ) : null}
        </div>

        <FormFeedback feedback={feedback} className="mt-4" />

        <p className="mt-4 text-xs text-ink-soft">
          Le fichier part directement vers l’API, sans passer par le site : c’est le seul moyen d’envoyer une vidéo sans
          buter sur le plafond d’une fonction Vercel.
        </p>

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
      </Surface>
    </div>
  );
}
