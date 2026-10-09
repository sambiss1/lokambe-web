'use client';

import type {ApiCity} from '@/lib/api/content-types';
import {cityFormSchema} from '@/lib/forms/content-schemas';
import type {CityFormValues} from '@/lib/forms/content-schemas';
import {CollectionForm} from '../form/CollectionForm';
import {AdminField} from '../form/AdminField';
import {TextInput} from '../form/inputs';

/**
 * Création et reprise d'une ville proposée par le formulaire de candidature.
 *
 * Une ville est une étiquette : son seul champ propre est son nom. Tout le
 * reste — valider, enregistrer, publier, mener à la page de suppression —
 * vient de `CollectionForm`, comme pour les autres collections.
 *
 * Cette liste **guide** la saisie du candidat, elle ne la verrouille pas : le
 * formulaire public offre « Autre » à côté, et l'API accepte n'importe quelle
 * ville écrite à la main.
 */

function defaults(entry?: ApiCity): CityFormValues {
  return {
    slug: entry?.slug ?? '',
    // Le socle commun porte un média ; une ville n'en a pas aujourd'hui. On
    // laisse le champ à `null` plutôt que de sortir du mécanisme partagé.
    mediaId: entry?.mediaId ?? null,
    frName: entry?.fr.name ?? '',
    enName: entry?.en?.name ?? '',
  };
}

export function CityForm({entry}: {entry?: ApiCity}) {
  return (
    <CollectionForm<'cities', CityFormValues>
      collection="cities"
      entry={entry}
      schema={cityFormSchema}
      defaultValues={defaults(entry)}
      notes={{
        draft: 'Brouillon : cette ville n’apparaît pas dans le formulaire de candidature.',
        published: 'Publiée : proposée dans le menu « Ville » du formulaire de candidature.',
        creating: 'La nouvelle ville est créée en brouillon.',
      }}
      toPayload={(values) => ({
        slug: values.slug || undefined,
        mediaId: values.mediaId,
        fr: {name: values.frName},
        en: {name: values.enName || undefined},
      })}
      fields={({form, disabled}) => {
        const {register, formState} = form;
        const errors = formState.errors;
        return (
          <>
            <AdminField label="Nom" error={errors.frName?.message}>
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="Kinshasa"
                  {...register('frName')}
                />
              )}
            </AdminField>

            <AdminField
              label="Nom en anglais"
              hint="Laissé vide, le nom français est repris sur la version anglaise du site."
              optionalLabel="facultatif"
              error={errors.enName?.message}
            >
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="Kinshasa"
                  {...register('enName')}
                />
              )}
            </AdminField>

            <AdminField
              label="Adresse de la fiche"
              hint="Laissée vide, elle est déduite du nom."
              optionalLabel="facultatif"
              error={errors.slug?.message}
            >
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="kinshasa"
                  {...register('slug')}
                />
              )}
            </AdminField>
          </>
        );
      }}
    />
  );
}
