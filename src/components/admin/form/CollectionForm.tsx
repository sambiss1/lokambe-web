'use client';

import {useRouter} from 'next/navigation';
import type {ReactNode} from 'react';
import type {DefaultValues, FieldValues, UseFormReturn} from 'react-hook-form';
import type {ZodType} from 'zod';
import {createCollectionEntry, updateCollectionEntry} from '@/lib/api/content-actions';
import {collectionAdminPath} from '@/lib/api/content-types';
import type {CollectionEntry, CollectionKey} from '@/lib/api/content-types';
import type {PublicationStatus} from '@/lib/constants';
import {ResourceFormShell} from './ResourceFormShell';
import {useResourceForm} from './useResourceForm';

/**
 * Le formulaire d'une entrée de collection, quelle que soit la collection.
 *
 * Tout ce qui ne dépend pas du contenu est ici, écrit une fois : valider,
 * créer, mettre à jour, publier, dépublier, aller sur la fiche après une
 * création, mener à la page de suppression. Chaque collection n'apporte que son
 * schéma, ses valeurs de départ et ses champs.
 *
 * C'est pour cela qu'une sixième collection ne demanderait presque rien :
 * une ligne dans `COLLECTIONS`, un schéma, des champs, cinq pages minces.
 */

type Props<K extends CollectionKey, V extends FieldValues> = {
  collection: K;
  /** Absent en création. */
  entry?: CollectionEntry[K];
  schema: ZodType;
  defaultValues: DefaultValues<V>;
  /** Met les valeurs du formulaire au format attendu par l'API. */
  toPayload: (values: V) => Record<string, unknown>;
  /** Les champs de la fiche. */
  fields: (context: {form: UseFormReturn<V>; disabled: boolean}) => ReactNode;
  /** Panneaux latéraux : image, classement, réglages propres à la collection. */
  aside?: (context: {form: UseFormReturn<V>; disabled: boolean}) => ReactNode;
  notes?: {draft: string; published: string; creating: string};
};

export function CollectionForm<K extends CollectionKey, V extends FieldValues>({
  collection,
  entry,
  schema,
  defaultValues,
  toPayload,
  fields,
  aside,
  notes,
}: Props<K, V>) {
  const router = useRouter();
  const {form, pending, feedback, submit} = useResourceForm<V>({
    schema,
    defaultValues,
  });
  const base = collectionAdminPath(collection);

  function save(nextStatus?: PublicationStatus) {
    submit(
      (values) => {
        const payload = {
          ...toPayload(values),
          ...(nextStatus ? {status: nextStatus} : {}),
        };
        return entry
          ? updateCollectionEntry(collection, entry.id, payload)
          : createCollectionEntry(collection, payload);
      },
      {
        okMessage: entry
          ? nextStatus === 'publie'
            ? 'Publié.'
            : nextStatus === 'brouillon'
              ? 'Repassé en brouillon.'
              : 'Enregistré.'
          : undefined,
        onSaved: (data) => {
          if (entry) {
            router.refresh();
            return;
          }
          // L'entrée existe désormais : on passe sur sa fiche.
          router.push(`${base}/${(data as {id: string}).id}`);
          router.refresh();
        },
      },
    );
  }

  return (
    <ResourceFormShell
      status={entry?.status}
      pending={pending}
      feedback={feedback}
      onSave={() => save()}
      onPublish={entry ? () => save('publie') : undefined}
      onUnpublish={entry ? () => save('brouillon') : undefined}
      deleteHref={entry ? `${base}/${entry.id}/supprimer` : undefined}
      notes={notes}
      aside={aside?.({form, disabled: pending})}
    >
      {fields({form, disabled: pending})}
    </ResourceFormShell>
  );
}
