'use client';

import type {ApiMedia, ApiPortfolioCompany} from '@/lib/api/content-types';
import {portfolioFormSchema} from '@/lib/forms/content-schemas';
import type {PortfolioFormValues} from '@/lib/forms/content-schemas';
import {PORTFOLIO_SECTORS, PORTFOLIO_STATUSES, translateTerm} from '@/lib/vocabulary';
import {CollectionForm} from '../form/CollectionForm';
import {AdminField} from '../form/AdminField';
import {MediaPicker} from '../form/MediaPicker';
import {TranslatedField, VocabularyField} from '../form/VocabularyField';
import {Surface} from '../Surface';
import {TextArea, TextInput} from '../form/inputs';

/**
 * Création et reprise d'une entreprise du portefeuille.
 *
 * Tout ce qui ne dépend pas de l'entreprise — valider, enregistrer, publier,
 * mener à la page de suppression — vient de `CollectionForm`. Ici, seulement
 * les champs, leurs valeurs de départ, et la mise au format de l'API.
 */

type Props = {
  company?: ApiPortfolioCompany;
  library: ApiMedia[];
  media?: ApiMedia | null;
};

function defaults(company?: ApiPortfolioCompany): PortfolioFormValues {
  const frSector = company?.fr.sector ?? '';
  const frStatus = company?.fr.status ?? '';
  return {
    name: company?.name ?? '',
    slug: company?.slug ?? '',
    websiteUrl: company?.websiteUrl ?? '',
    mediaId: company?.mediaId ?? null,
    frSector,
    frStatus,
    frDescription: company?.fr.description ?? '',
    // Une fiche enregistrée avant les listes rattrape sa traduction au premier
    // affichage : le français est connu, l'anglais l'est donc aussi.
    enSector: translateTerm(PORTFOLIO_SECTORS, frSector) ?? company?.en?.sector ?? '',
    enStatus: translateTerm(PORTFOLIO_STATUSES, frStatus) ?? company?.en?.status ?? '',
    enDescription: company?.en?.description ?? '',
  };
}

export function PortfolioForm({company, library, media}: Props) {
  return (
    <CollectionForm<'portfolio', PortfolioFormValues>
      collection="portfolio"
      entry={company}
      schema={portfolioFormSchema}
      defaultValues={defaults(company)}
      notes={{
        draft: 'Brouillon : cette entreprise n’apparaît pas sur la page d’accueil.',
        published: 'Publiée : visible dans le portefeuille sur la page d’accueil.',
        creating: 'La nouvelle entreprise est créée en brouillon.',
      }}
      toPayload={(values) => ({
        name: values.name,
        slug: values.slug || undefined,
        // `null` retire le lien ; absent, il reste tel quel.
        websiteUrl: values.websiteUrl || null,
        mediaId: values.mediaId,
        fr: {
          sector: values.frSector,
          status: values.frStatus,
          description: values.frDescription,
        },
        en: {
          sector: values.enSector || undefined,
          status: values.enStatus || undefined,
          description: values.enDescription || undefined,
        },
      })}
      fields={({form, disabled}) => {
        const {register, formState} = form;
        const errors = formState.errors;
        return (
          <>
            <AdminField label="Nom de l’entreprise" error={errors.name?.message}>
              {({id, describedBy, invalid}) => (
                <TextInput
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  disabled={disabled}
                  placeholder="Bradamada"
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
                  placeholder="bradamada"
                  {...register('slug')}
                />
              )}
            </AdminField>

            <AdminField
              label="Site de l’entreprise"
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
                  placeholder="https://bradamada.cd"
                  {...register('websiteUrl')}
                />
              )}
            </AdminField>

            <fieldset className="grid gap-5 border-t border-line pt-5">
              <legend className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Français</legend>

              <VocabularyField
                label="Secteur"
                hint="Les sept secteurs prioritaires de LOKAMBE, tels que la page d’accueil les nomme."
                vocabulary={PORTFOLIO_SECTORS}
                placeholder="— Choisir un secteur —"
                otherPlaceholder="Restauration"
                requiredMessage="Choisissez un secteur."
                error={errors.frSector?.message}
                disabled={disabled}
                value={form.watch('frSector')}
                onChange={({fr, en}) => {
                  form.setValue('frSector', fr, {shouldDirty: true, shouldValidate: true});
                  // Hors liste, l’anglais redevient libre : on n’a rien à y mettre.
                  form.setValue('enSector', en ?? '', {shouldDirty: true});
                }}
              />

              <VocabularyField
                label="Statut du projet"
                hint="L’avancement, tel qu’il s’affiche sur la fiche."
                vocabulary={PORTFOLIO_STATUSES}
                placeholder="— Choisir un statut —"
                otherPlaceholder="En développement"
                requiredMessage="Choisissez un statut."
                error={errors.frStatus?.message}
                disabled={disabled}
                value={form.watch('frStatus')}
                onChange={({fr, en}) => {
                  form.setValue('frStatus', fr, {shouldDirty: true, shouldValidate: true});
                  form.setValue('enStatus', en ?? '', {shouldDirty: true});
                }}
              />

              <AdminField label="Description" error={errors.frDescription?.message}>
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

              <TranslatedField
                label="Secteur"
                vocabulary={PORTFOLIO_SECTORS}
                french={form.watch('frSector')}
                value={form.watch('enSector')}
                onChange={(next) => form.setValue('enSector', next, {shouldDirty: true})}
                error={errors.enSector?.message}
                placeholder="Restaurants and catering"
                disabled={disabled}
              />

              <TranslatedField
                label="Statut"
                vocabulary={PORTFOLIO_STATUSES}
                french={form.watch('frStatus')}
                value={form.watch('enStatus')}
                onChange={(next) => form.setValue('enStatus', next, {shouldDirty: true})}
                error={errors.enStatus?.message}
                placeholder="In development"
                disabled={disabled}
              />

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
            hint="Carré, fond clair. Sans logo, le site affiche les initiales de l’entreprise."
            emptyLabel="Aucun logo"
            fit="contain"
            library={library}
            current={media}
            legacyImagePath={company?.legacyImagePath}
            value={form.watch('mediaId')}
            onChange={(next) => form.setValue('mediaId', next, {shouldDirty: true})}
            disabled={disabled}
          />
        </Surface>
      )}
    />
  );
}
