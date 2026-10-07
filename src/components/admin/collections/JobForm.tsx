'use client';

import type {ApiJobPosting, ApiMedia} from '@/lib/api/content-types';
import {jobFormSchema} from '@/lib/forms/content-schemas';
import type {JobFormValues} from '@/lib/forms/content-schemas';
import {CONTRACT_TYPES, CONTRACT_TYPE_LABELS} from '@/lib/constants';
import {CollectionForm} from '../form/CollectionForm';
import {AdminField, AdminFieldset} from '../form/AdminField';
import {MediaPicker} from '../form/MediaPicker';
import {Surface} from '../Surface';
import {SelectInput, StringListInput, TextArea, TextInput} from '../form/inputs';

/**
 * Création et reprise d'une offre d'emploi.
 *
 * Tout ce qui ne dépend pas de l'offre — valider, enregistrer, publier, mener à
 * la page de suppression — vient de `CollectionForm`. Ici, seulement les
 * champs, leurs valeurs de départ, et la mise au format de l'API.
 *
 * Deux champs sortent du lot : les missions et le profil recherché sont des
 * listes de lignes, et non du texte libre. La page Carrières les affiche en
 * puces ; les saisir ligne par ligne évite d'avoir à deviner où couper un
 * paragraphe. `StringListInput` est contrôlé, donc ces quatre champs passent
 * par `watch` / `setValue` plutôt que par `register`.
 */

type Props = {
  job?: ApiJobPosting;
  library: ApiMedia[];
  media?: ApiMedia | null;
};

function defaults(job?: ApiJobPosting): JobFormValues {
  return {
    location: job?.location ?? '',
    // Le type de contrat n'a pas de valeur « vide » : le plus courant par défaut.
    contractType: job?.contractType ?? 'cdi',
    slug: job?.slug ?? '',
    mediaId: job?.mediaId ?? null,
    frTitle: job?.fr.title ?? '',
    frSummary: job?.fr.summary ?? '',
    // Une ligne vide, et non une liste vide : le champ s'ouvre déjà saisissable.
    frMissions: job?.fr.missions ?? [''],
    frProfile: job?.fr.profile ?? [''],
    enTitle: job?.en?.title ?? '',
    enSummary: job?.en?.summary ?? '',
    enMissions: job?.en?.missions ?? [''],
    enProfile: job?.en?.profile ?? [''],
  };
}

export function JobForm({job, library, media}: Props) {
  return (
    <CollectionForm<'jobs', JobFormValues>
      collection="jobs"
      entry={job}
      schema={jobFormSchema}
      defaultValues={defaults(job)}
      notes={{
        draft: 'Brouillon : cette offre n’apparaît pas sur la page Carrières.',
        published: 'Publiée : visible sur la page Carrières, ouverte aux candidatures.',
        // Aucune offre n'existe aujourd'hui : la première publiée sera la première en ligne.
        creating: 'La nouvelle offre est créée en brouillon. La page Carrières reste vide jusqu’à sa publication.',
      }}
      toPayload={(values) => {
        /**
         * Les listes anglaises sont omises quand elles sont vides : l'API refuse
         * un tableau de chaînes vides, et une traduction absente doit retomber
         * sur le français. Les listes françaises, elles, sont garanties non
         * vides par le schéma.
         */
        const lines = (list: string[]) => {
          const kept = list.map((line) => line.trim()).filter(Boolean);
          return kept.length > 0 ? kept : undefined;
        };

        return {
          location: values.location,
          contractType: values.contractType,
          slug: values.slug || undefined,
          mediaId: values.mediaId,
          fr: {
            title: values.frTitle,
            summary: values.frSummary,
            missions: values.frMissions,
            profile: values.frProfile,
          },
          en: {
            title: values.enTitle || undefined,
            summary: values.enSummary || undefined,
            missions: lines(values.enMissions),
            profile: lines(values.enProfile),
          },
        };
      }}
      fields={({form, disabled}) => {
        const {register, formState} = form;
        const errors = formState.errors;
        return (
          <>
            <AdminField label="Lieu" error={errors.location?.message}>
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="Kinshasa"
                  {...register('location')}
                />
              )}
            </AdminField>

            <AdminField label="Type de contrat" error={errors.contractType?.message}>
              {({id, describedBy, invalid}) => (
                <SelectInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  {...register('contractType')}
                >
                  {CONTRACT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {CONTRACT_TYPE_LABELS[type]}
                    </option>
                  ))}
                </SelectInput>
              )}
            </AdminField>

            <AdminField
              label="Adresse de la fiche"
              hint="Laissée vide, elle est déduite du titre."
              optionalLabel="facultatif"
              error={errors.slug?.message}
            >
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="charge-de-portefeuille"
                  {...register('slug')}
                />
              )}
            </AdminField>

            <fieldset className="grid gap-5 border-t border-line pt-5">
              <legend className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Français</legend>

              <AdminField label="Intitulé du poste" error={errors.frTitle?.message}>
                {({id, describedBy, invalid}) => (
                  <TextInput
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    placeholder="Chargé de portefeuille"
                    {...register('frTitle')}
                  />
                )}
              </AdminField>

              <AdminField label="Résumé" error={errors.frSummary?.message}>
                {({id, describedBy, invalid}) => (
                  <TextArea
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    rows={5}
                    {...register('frSummary')}
                  />
                )}
              </AdminField>

              <AdminFieldset
                label="Missions"
                hint="Une ligne par mission. Les lignes laissées vides sont ignorées."
                error={errors.frMissions?.message}
              >
                {({labelledBy, describedBy}) => (
                  <StringListInput
                    labelledBy={labelledBy}
                    describedBy={describedBy}
                    value={form.watch('frMissions')}
                    onChange={(next) => form.setValue('frMissions', next, {shouldDirty: true})}
                    placeholder="Instruire les dossiers de financement"
                    addLabel="Ajouter une mission"
                    itemLabel="Mission"
                    invalid={Boolean(errors.frMissions)}
                    disabled={disabled}
                  />
                )}
              </AdminFieldset>

              <AdminFieldset
                label="Profil recherché"
                hint="Une ligne par exigence. Les lignes laissées vides sont ignorées."
                error={errors.frProfile?.message}
              >
                {({labelledBy, describedBy}) => (
                  <StringListInput
                    labelledBy={labelledBy}
                    describedBy={describedBy}
                    value={form.watch('frProfile')}
                    onChange={(next) => form.setValue('frProfile', next, {shouldDirty: true})}
                    placeholder="Trois ans d’expérience en analyse de crédit"
                    addLabel="Ajouter une ligne"
                    itemLabel="Ligne"
                    invalid={Boolean(errors.frProfile)}
                    disabled={disabled}
                  />
                )}
              </AdminFieldset>
            </fieldset>

            <fieldset className="grid gap-5 border-t border-line pt-5">
              <legend className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Anglais</legend>
              <p className="text-xs text-ink-soft">
                Chaque champ laissé vide reprend le français sur la version anglaise du site.
              </p>

              <AdminField label="Intitulé du poste" optionalLabel="facultatif" error={errors.enTitle?.message}>
                {({id, describedBy, invalid}) => (
                  <TextInput
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    placeholder="Portfolio officer"
                    {...register('enTitle')}
                  />
                )}
              </AdminField>

              <AdminField label="Résumé" optionalLabel="facultatif" error={errors.enSummary?.message}>
                {({id, describedBy, invalid}) => (
                  <TextArea
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    rows={5}
                    {...register('enSummary')}
                  />
                )}
              </AdminField>

              <AdminFieldset
                label="Missions (facultatif)"
                hint="Une ligne par mission. Les lignes laissées vides sont ignorées."
                error={errors.enMissions?.message}
              >
                {({labelledBy, describedBy}) => (
                  <StringListInput
                    labelledBy={labelledBy}
                    describedBy={describedBy}
                    value={form.watch('enMissions')}
                    onChange={(next) => form.setValue('enMissions', next, {shouldDirty: true})}
                    placeholder="Review financing applications"
                    addLabel="Ajouter une mission"
                    itemLabel="Mission"
                    invalid={Boolean(errors.enMissions)}
                    disabled={disabled}
                  />
                )}
              </AdminFieldset>

              <AdminFieldset
                label="Profil recherché (facultatif)"
                hint="Une ligne par exigence. Les lignes laissées vides sont ignorées."
                error={errors.enProfile?.message}
              >
                {({labelledBy, describedBy}) => (
                  <StringListInput
                    labelledBy={labelledBy}
                    describedBy={describedBy}
                    value={form.watch('enProfile')}
                    onChange={(next) => form.setValue('enProfile', next, {shouldDirty: true})}
                    placeholder="Three years in credit analysis"
                    addLabel="Ajouter une ligne"
                    itemLabel="Ligne"
                    invalid={Boolean(errors.enProfile)}
                    disabled={disabled}
                  />
                )}
              </AdminFieldset>
            </fieldset>
          </>
        );
      }}
      aside={({form, disabled}) => (
        <Surface className="p-5 sm:p-6">
          <MediaPicker
            label="Visuel"
            hint="Repère de la liste du back-office : la page Carrières n’affiche pas d’image sur la fiche."
            emptyLabel="Aucun visuel"
            fit="cover"
            library={library}
            current={media}
            legacyImagePath={job?.legacyImagePath}
            value={form.watch('mediaId')}
            onChange={(next) => form.setValue('mediaId', next, {shouldDirty: true})}
            disabled={disabled}
          />
        </Surface>
      )}
    />
  );
}
