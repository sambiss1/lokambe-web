'use client';

import {useRouter} from 'next/navigation';
import {updateMedia} from '@/lib/api/content-actions';
import type {ApiMedia} from '@/lib/api/content-types';
import {mediaFormSchema} from '@/lib/forms/content-schemas';
import type {MediaFormValues} from '@/lib/forms/content-schemas';
import {mediaFileUrl} from '@/lib/media/url';
import {AdminField} from '../form/AdminField';
import {MediaFacts, MediaPreview, MediaThumb} from '../form/MediaPreview';
import {ResourceFormShell} from '../form/ResourceFormShell';
import {TextInput} from '../form/inputs';
import {useResourceForm} from '../form/useResourceForm';
import {cx} from '@/lib/cx';
import {Surface} from '../Surface';

/**
 * Décrire un média : son titre interne et son texte alternatif, plus — pour une
 * vidéo — l'image d'attente affichée avant la lecture.
 *
 * Le fichier lui-même ne se remplace pas : un média est posé sur des fiches, et
 * changer son contenu sous elles passerait inaperçu. On en téléverse un nouveau,
 * et on le repose là où il faut.
 */
export function MediaForm({media, posters}: {media: ApiMedia; posters: ApiMedia[]}) {
  const router = useRouter();
  const {form, pending, feedback, submit} = useResourceForm<MediaFormValues>({
    schema: mediaFormSchema,
    defaultValues: {
      title: media.title ?? '',
      alt: media.alt ?? '',
      posterMediaId: media.posterMediaId ?? null,
    },
  });
  const {register, formState, watch, setValue} = form;
  const errors = formState.errors;
  const poster = watch('posterMediaId');

  function save() {
    submit(
      (values) =>
        updateMedia(media.id, {
          // `null` efface la valeur ; l'API refuse une chaîne vide.
          title: values.title.trim() === '' ? null : values.title.trim(),
          alt: values.alt.trim() === '' ? null : values.alt.trim(),
          ...(media.kind === 'video' ? {posterMediaId: values.posterMediaId} : {}),
        }),
      {okMessage: 'Enregistré.', onSaved: () => router.refresh()},
    );
  }

  return (
    <ResourceFormShell
      pending={pending}
      feedback={feedback}
      onSave={save}
      deleteHref={`/admin/medias/${media.id}/supprimer`}
      aside={
        <Surface className="p-5 sm:p-6">
          <h2 className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Aperçu</h2>
          <div className="mt-4 grid gap-3">
            <MediaPreview
              media={media}
              src={mediaFileUrl(media.id)}
              poster={poster ? mediaFileUrl(poster) : undefined}
            />
            <MediaFacts media={media} />
          </div>
        </Surface>
      }
    >
      <AdminField
        label="Titre"
        hint="Pour retrouver le média dans la bibliothèque. Il n’est jamais affiché sur le site."
        optionalLabel="facultatif"
        error={errors.title?.message}
      >
        {({id, describedBy, invalid}) => (
          <TextInput
            id={id}
            aria-describedby={describedBy}
            invalid={invalid}
            disabled={pending}
            {...register('title')}
          />
        )}
      </AdminField>

      <AdminField
        label="Texte alternatif"
        hint="Lu par les lecteurs d’écran. Décrivez ce qu’on voit, pas le fichier."
        optionalLabel="recommandé"
        error={errors.alt?.message}
      >
        {({id, describedBy, invalid}) => (
          <TextInput id={id} aria-describedby={describedBy} invalid={invalid} disabled={pending} {...register('alt')} />
        )}
      </AdminField>

      {media.kind === 'video' ? (
        <div className="grid gap-2.5 border-t border-line pt-5">
          <p className="text-xs font-bold tracking-[0.08em] text-ink-soft uppercase">Image d’attente</p>
          <p className="text-xs text-ink-soft">
            Affichée avant la lecture. Sans elle, le navigateur montre un cadre noir — ou, selon l’appareil, la première
            image de la vidéo.
          </p>

          {posters.length === 0 ? (
            <p className="text-xs text-ink-soft">
              Aucune photo dans la bibliothèque pour servir d’image d’attente. Téléversez-en une d’abord.
            </p>
          ) : (
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              <li>
                <button
                  type="button"
                  disabled={pending}
                  aria-pressed={poster === null}
                  onClick={() => setValue('posterMediaId', null, {shouldDirty: true})}
                  className={cx(
                    'flex aspect-square w-full items-center justify-center rounded-xl border p-1 text-xs text-ink-soft transition-colors',
                    poster === null ? 'border-lokambe-blue' : 'border-line hover:border-ink-soft/40',
                  )}
                >
                  Aucune
                </button>
              </li>
              {posters.map((candidate) => (
                <li key={candidate.id}>
                  <button
                    type="button"
                    disabled={pending}
                    aria-pressed={poster === candidate.id}
                    aria-label={`Image d’attente : ${candidate.title ?? candidate.originalName}`}
                    onClick={() => setValue('posterMediaId', candidate.id, {shouldDirty: true})}
                    className={cx(
                      'block w-full rounded-xl border p-1 transition-colors',
                      poster === candidate.id ? 'border-lokambe-blue' : 'border-transparent hover:border-ink-soft/40',
                    )}
                  >
                    <MediaThumb media={candidate} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </ResourceFormShell>
  );
}
