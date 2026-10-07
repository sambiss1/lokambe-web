'use client';

import type {ApiMedia, ApiTeamMember} from '@/lib/api/content-types';
import {teamFormSchema} from '@/lib/forms/content-schemas';
import type {TeamFormValues} from '@/lib/forms/content-schemas';
import {CollectionForm} from '../form/CollectionForm';
import {AdminField} from '../form/AdminField';
import {MediaPicker} from '../form/MediaPicker';
import {Surface} from '../Surface';
import {TextArea, TextInput} from '../form/inputs';

/**
 * Création et reprise d’un membre de l’équipe.
 *
 * Tout ce qui ne dépend pas du membre — valider, enregistrer, publier, mener à
 * la page de suppression — vient de `CollectionForm`. Ici, seulement les
 * champs, leurs valeurs de départ, et la mise au format de l’API.
 *
 * Le nom est facultatif : la page publique présente des rôles, et seul le
 * dirigeant est nommé aujourd’hui. Les autres restent anonymes, portés par leur
 * intitulé et leur monogramme.
 */

type Props = {
  member?: ApiTeamMember;
  library: ApiMedia[];
  media?: ApiMedia | null;
};

function defaults(member?: ApiTeamMember): TeamFormValues {
  return {
    name: member?.name ?? '',
    initials: member?.initials ?? '',
    slug: member?.slug ?? '',
    mediaId: member?.mediaId ?? null,
    frTitle: member?.fr.title ?? '',
    frSummary: member?.fr.summary ?? '',
    frPhotoAlt: member?.fr.photoAlt ?? '',
    enTitle: member?.en?.title ?? '',
    enSummary: member?.en?.summary ?? '',
    enPhotoAlt: member?.en?.photoAlt ?? '',
  };
}

export function TeamForm({member, library, media}: Props) {
  return (
    <CollectionForm<'team', TeamFormValues>
      collection="team"
      entry={member}
      schema={teamFormSchema}
      defaultValues={defaults(member)}
      notes={{
        draft: 'Brouillon : ce rôle n’apparaît pas sur la page « Notre équipe ».',
        published: 'Publié : visible sur la page « Notre équipe ».',
        creating: 'Le nouveau membre est créé en brouillon.',
      }}
      toPayload={(values) => ({
        // `null` retire le nom ; absent, il resterait tel quel.
        name: values.name || null,
        initials: values.initials,
        slug: values.slug || undefined,
        mediaId: values.mediaId,
        fr: {
          title: values.frTitle,
          summary: values.frSummary,
          photoAlt: values.frPhotoAlt || undefined,
        },
        en: {
          title: values.enTitle || undefined,
          summary: values.enSummary || undefined,
          photoAlt: values.enPhotoAlt || undefined,
        },
      })}
      fields={({form, disabled}) => {
        const {register, formState} = form;
        const errors = formState.errors;
        return (
          <>
            <AdminField
              label="Nom"
              hint="Laissé vide, le rôle reste anonyme : seul le dirigeant est nommé aujourd’hui."
              optionalLabel="facultatif"
              error={errors.name?.message}
            >
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="Olivier M. Fwamba"
                  {...register('name')}
                />
              )}
            </AdminField>

            <AdminField
              label="Monogramme"
              hint="Deux à quatre lettres. Affichées en monogramme tant qu’aucun portrait n’est posé."
              error={errors.initials?.message}
            >
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="OPS"
                  {...register('initials')}
                />
              )}
            </AdminField>

            <AdminField
              label="Adresse de la fiche"
              hint="Laissée vide, elle est déduite du nom ou du titre."
              optionalLabel="facultatif"
              error={errors.slug?.message}
            >
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="operations-et-developpement"
                  {...register('slug')}
                />
              )}
            </AdminField>

            <fieldset className="grid gap-5 border-t border-line pt-5">
              <legend className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Français</legend>

              <AdminField label="Titre" error={errors.frTitle?.message}>
                {({id, describedBy, invalid}) => (
                  <TextInput
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    placeholder="Responsable des opérations & du développement"
                    {...register('frTitle')}
                  />
                )}
              </AdminField>

              <AdminField label="Présentation" error={errors.frSummary?.message}>
                {({id, describedBy, invalid}) => (
                  <TextArea
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    rows={6}
                    {...register('frSummary')}
                  />
                )}
              </AdminField>

              <AdminField
                label="Description du portrait"
                hint="Lue par les lecteurs d’écran. Décrivez le portrait."
                optionalLabel="facultatif"
                error={errors.frPhotoAlt?.message}
              >
                {({id, describedBy, invalid}) => (
                  <TextInput
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    placeholder="Portrait du Responsable des opérations & du développement de LOKAMBE"
                    {...register('frPhotoAlt')}
                  />
                )}
              </AdminField>
            </fieldset>

            <fieldset className="grid gap-5 border-t border-line pt-5">
              <legend className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Anglais</legend>
              <p className="text-xs text-ink-soft">
                Chaque champ laissé vide reprend le français sur la version anglaise du site.
              </p>

              <AdminField label="Titre" optionalLabel="facultatif" error={errors.enTitle?.message}>
                {({id, describedBy, invalid}) => (
                  <TextInput
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    placeholder="Head of operations & development"
                    {...register('enTitle')}
                  />
                )}
              </AdminField>

              <AdminField label="Présentation" optionalLabel="facultatif" error={errors.enSummary?.message}>
                {({id, describedBy, invalid}) => (
                  <TextArea
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    rows={6}
                    {...register('enSummary')}
                  />
                )}
              </AdminField>

              <AdminField label="Description du portrait" optionalLabel="facultatif" error={errors.enPhotoAlt?.message}>
                {({id, describedBy, invalid}) => (
                  <TextInput
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    placeholder="Portrait of LOKAMBE’s head of operations & development"
                    {...register('enPhotoAlt')}
                  />
                )}
              </AdminField>
            </fieldset>
          </>
        );
      }}
      aside={({form, disabled}) => (
        <Surface className="p-5 sm:p-6">
          <MediaPicker
            label="Portrait"
            hint="Sans portrait, le site affiche le monogramme : il tient la place jusqu’à la pose de la photo."
            emptyLabel="Aucun portrait"
            fit="cover"
            library={library}
            current={media}
            legacyImagePath={member?.legacyImagePath}
            value={form.watch('mediaId')}
            onChange={(next) => form.setValue('mediaId', next, {shouldDirty: true})}
            disabled={disabled}
          />
        </Surface>
      )}
    />
  );
}
