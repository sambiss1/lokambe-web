'use client';

import type {ApiMedia, ApiPartner} from '@/lib/api/content-types';
import {partnerFormSchema} from '@/lib/forms/content-schemas';
import type {PartnerFormValues} from '@/lib/forms/content-schemas';
import {CollectionForm} from '../form/CollectionForm';
import {AdminField} from '../form/AdminField';
import {MediaPicker} from '../form/MediaPicker';
import {Surface} from '../Surface';
import {TextArea, TextInput} from '../form/inputs';

/**
 * Création et reprise d'un partenaire.
 *
 * Tout ce qui ne dépend pas du partenaire — valider, enregistrer, publier,
 * mener à la page de suppression — vient de `CollectionForm`. Ici, seulement
 * les champs, leurs valeurs de départ, et la mise au format de l'API.
 *
 * Une fiche de partenaire est volontairement maigre : sur la page d'accueil,
 * le mur des partenaires ne montre que des logos. Seul le nom est exigé.
 */

type Props = {
  partner?: ApiPartner;
  library: ApiMedia[];
  media?: ApiMedia | null;
};

function defaults(partner?: ApiPartner): PartnerFormValues {
  return {
    name: partner?.name ?? '',
    slug: partner?.slug ?? '',
    websiteUrl: partner?.websiteUrl ?? '',
    mediaId: partner?.mediaId ?? null,
    frDescription: partner?.fr?.description ?? '',
    enDescription: partner?.en?.description ?? '',
  };
}

export function PartnerForm({partner, library, media}: Props) {
  return (
    <CollectionForm<'partners', PartnerFormValues>
      collection="partners"
      entry={partner}
      schema={partnerFormSchema}
      defaultValues={defaults(partner)}
      notes={{
        draft: 'Brouillon : ce partenaire n’apparaît pas sur la page d’accueil.',
        published: 'Publié : son logo paraît dans le mur des partenaires, sur la page d’accueil.',
        creating: 'Le nouveau partenaire est créé en brouillon.',
      }}
      toPayload={(values) => ({
        name: values.name,
        slug: values.slug || undefined,
        // `null` retire le lien ; absent, il reste tel quel.
        websiteUrl: values.websiteUrl || null,
        mediaId: values.mediaId,
        // Les deux langues sont facultatives : un partenaire peut n'être qu'un logo.
        fr: {description: values.frDescription || undefined},
        en: {description: values.enDescription || undefined},
      })}
      fields={({form, disabled}) => {
        const {register, formState} = form;
        const errors = formState.errors;
        return (
          <>
            <AdminField label="Nom du partenaire" error={errors.name?.message}>
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="NIWALI"
                  {...register('name')}
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
                  placeholder="niwali"
                  {...register('slug')}
                />
              )}
            </AdminField>

            <AdminField
              label="Site du partenaire"
              hint="Adresse complète, protocole compris."
              optionalLabel="facultatif"
              error={errors.websiteUrl?.message}
            >
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="https://niwali.cd"
                  {...register('websiteUrl')}
                />
              )}
            </AdminField>

            <fieldset className="grid gap-5 border-t border-line pt-5">
              <legend className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Français</legend>

              <AdminField
                label="Description"
                hint="Facultative : sur la page d’accueil, un partenaire peut n’être qu’un logo."
                optionalLabel="facultatif"
                error={errors.frDescription?.message}
              >
                {({id, describedBy, invalid}) => (
                  <TextArea
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    rows={5}
                    {...register('frDescription')}
                  />
                )}
              </AdminField>
            </fieldset>

            <fieldset className="grid gap-5 border-t border-line pt-5">
              <legend className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Anglais</legend>
              <p className="text-xs text-ink-soft">
                Chaque champ laissé vide reprend le français sur la version anglaise du site.
              </p>

              <AdminField label="Description" optionalLabel="facultatif" error={errors.enDescription?.message}>
                {({id, describedBy, invalid}) => (
                  <TextArea
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    disabled={disabled}
                    rows={5}
                    {...register('enDescription')}
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
            label="Logo"
            hint="Carré, fond clair. Sans logo, le site affiche les initiales du partenaire."
            emptyLabel="Aucun logo"
            fit="contain"
            library={library}
            current={media}
            legacyImagePath={partner?.legacyImagePath}
            value={form.watch('mediaId')}
            onChange={(next) => form.setValue('mediaId', next, {shouldDirty: true})}
            disabled={disabled}
          />
        </Surface>
      )}
    />
  );
}
