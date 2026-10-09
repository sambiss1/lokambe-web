'use client';

import type {ApiTheme} from '@/lib/api/content-types';
import {themeFormSchema} from '@/lib/forms/content-schemas';
import type {ThemeFormValues} from '@/lib/forms/content-schemas';
import {CollectionForm} from '../form/CollectionForm';
import {AdminField} from '../form/AdminField';
import {TextInput} from '../form/inputs';

/**
 * Création et reprise d'un thème d'article.
 *
 * Un thème est une étiquette : son seul champ propre est son nom. Tout le
 * reste — valider, enregistrer, publier, mener à la page de suppression —
 * vient de `CollectionForm`, comme pour les cinq autres collections.
 *
 * Sans image, donc sans `MediaPicker` ni panneau latéral, à la manière de
 * `FaqForm`.
 */

function defaults(entry?: ApiTheme): ThemeFormValues {
  return {
    slug: entry?.slug ?? '',
    // Le socle commun porte un média ; un thème n'en a pas aujourd'hui. On
    // laisse le champ à `null` plutôt que de sortir du mécanisme partagé.
    mediaId: entry?.mediaId ?? null,
    frName: entry?.fr.name ?? '',
    enName: entry?.en?.name ?? '',
  };
}

export function ThemeForm({entry}: {entry?: ApiTheme}) {
  return (
    <CollectionForm<'themes', ThemeFormValues>
      collection="themes"
      entry={entry}
      schema={themeFormSchema}
      defaultValues={defaults(entry)}
      notes={{
        draft: 'Brouillon : ce thème n’apparaît pas dans les filtres du blog.',
        published: 'Publié : proposé dans les filtres du blog.',
        creating: 'Le nouveau thème est créé en brouillon.',
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
                  placeholder="Gouvernance & gestion"
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
                  placeholder="Governance & management"
                  {...register('enName')}
                />
              )}
            </AdminField>

            <AdminField
              label="Adresse du thème"
              hint="Laissée vide, elle est déduite du nom. C’est elle qui apparaît dans l’adresse du blog filtré."
              optionalLabel="facultatif"
              error={errors.slug?.message}
            >
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="gouvernance"
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
