'use client';

import type {ApiFaqEntry} from '@/lib/api/content-types';
import {faqFormSchema} from '@/lib/forms/content-schemas';
import type {FaqFormValues} from '@/lib/forms/content-schemas';
import {CollectionForm} from '../form/CollectionForm';
import {AdminField} from '../form/AdminField';
import {TextArea, TextInput} from '../form/inputs';

/**
 * Création et reprise d'une question fréquente.
 *
 * Tout ce qui ne dépend pas de la question — valider, enregistrer, publier,
 * mener à la page de suppression — vient de `CollectionForm`. Ici, seulement
 * les champs, leurs valeurs de départ, et la mise au format de l'API.
 *
 * C'est la seule des cinq collections sans image : pas de `MediaPicker`, donc
 * pas de panneau latéral.
 */

type Props = {
  entry?: ApiFaqEntry;
};

function defaults(entry?: ApiFaqEntry): FaqFormValues {
  return {
    slug: entry?.slug ?? '',
    // Le socle est commun aux cinq collections et porte un média ; une question
    // n'a pas d'illustration aujourd'hui. On laisse le champ tel quel — il reste
    // `null` — plutôt que de sortir cette collection du mécanisme partagé.
    mediaId: entry?.mediaId ?? null,
    frQuestion: entry?.fr.question ?? '',
    frAnswer: entry?.fr.answer ?? '',
    enQuestion: entry?.en?.question ?? '',
    enAnswer: entry?.en?.answer ?? '',
  };
}

export function FaqForm({entry}: Props) {
  return (
    <CollectionForm<'faq', FaqFormValues>
      collection="faq"
      entry={entry}
      schema={faqFormSchema}
      defaultValues={defaults(entry)}
      notes={{
        draft: 'Brouillon : cette question n’apparaît pas sur la page Contact.',
        published: 'Publiée : visible dans les questions fréquentes, sous le formulaire de la page Contact.',
        creating: 'La nouvelle question est créée en brouillon.',
      }}
      toPayload={(values) => ({
        slug: values.slug || undefined,
        mediaId: values.mediaId,
        fr: {
          question: values.frQuestion,
          answer: values.frAnswer,
        },
        en: {
          question: values.enQuestion || undefined,
          answer: values.enAnswer || undefined,
        },
      })}
      fields={({form, disabled}) => {
        const {register, formState} = form;
        const errors = formState.errors;
        return (
          <>
            <AdminField
              label="Adresse de la fiche"
              hint="Laissée vide, elle est déduite de la question."
              optionalLabel="facultatif"
              error={errors.slug?.message}
            >
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="qui-peut-soumettre-un-projet"
                  {...register('slug')}
                />
              )}
            </AdminField>

            <fieldset className="grid gap-5 border-t border-line pt-5">
              <legend className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Français</legend>

              <AdminField label="Question" error={errors.frQuestion?.message}>
                {({id, describedBy, invalid}) => (
                  <TextInput
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    placeholder="Qui peut soumettre un projet à LOKAMBE ?"
                    {...register('frQuestion')}
                  />
                )}
              </AdminField>

              <AdminField label="Réponse" error={errors.frAnswer?.message}>
                {({id, describedBy, invalid}) => (
                  <TextArea
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    rows={5}
                    {...register('frAnswer')}
                  />
                )}
              </AdminField>
            </fieldset>

            <fieldset className="grid gap-5 border-t border-line pt-5">
              <legend className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Anglais</legend>
              <p className="text-xs text-ink-soft">
                Chaque champ laissé vide reprend le français sur la version anglaise du site.
              </p>

              <AdminField label="Question" optionalLabel="facultatif" error={errors.enQuestion?.message}>
                {({id, describedBy, invalid}) => (
                  <TextInput
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    placeholder="Who can submit a project to LOKAMBE?"
                    {...register('enQuestion')}
                  />
                )}
              </AdminField>

              <AdminField label="Réponse" optionalLabel="facultatif" error={errors.enAnswer?.message}>
                {({id, describedBy, invalid}) => (
                  <TextArea
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    rows={5}
                    {...register('enAnswer')}
                  />
                )}
              </AdminField>
            </fieldset>
          </>
        );
      }}
    />
  );
}
