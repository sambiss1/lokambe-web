'use client';

import {useRouter} from 'next/navigation';
import {useState, useTransition} from 'react';
import {ACTION_FAILURES} from '@/lib/api/action-result';
import {setCollectionEntryStatus} from '@/lib/api/content-actions';
import type {CollectionKey} from '@/lib/api/content-types';
import type {PublicationStatus} from '@/lib/constants';
import {AdminButton} from '../AdminButton';
import {FormFeedback} from './FormFeedback';
import type {Feedback} from './useResourceForm';

/**
 * Publier ou dépublier depuis la fiche « voir », sans passer par le formulaire.
 *
 * La fiche se lit : on doit pouvoir mettre une entrée en ligne sans ouvrir
 * l'écran de modification et sans réenregistrer des champs qu'on n'a pas
 * touchés.
 */
export function EntryStatusActions({
  collection,
  id,
  status,
}: {
  collection: CollectionKey;
  id: string;
  status: PublicationStatus;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function change(next: PublicationStatus) {
    setFeedback(null);
    startTransition(async () => {
      const result = await setCollectionEntryStatus(collection, id, next);
      if (result.ok) {
        setFeedback({
          tone: 'ok',
          text: next === 'publie' ? 'Publié.' : 'Repassé en brouillon.',
        });
        router.refresh();
        return;
      }
      setFeedback({tone: 'erreur', text: ACTION_FAILURES[result.reason]});
    });
  }

  return (
    <div className="grid gap-2.5">
      {status === 'publie' ? (
        <AdminButton tone="neutre" disabled={pending} onClick={() => change('brouillon')}>
          Repasser en brouillon
        </AdminButton>
      ) : (
        <AdminButton tone="rouge" disabled={pending} onClick={() => change('publie')}>
          Publier
        </AdminButton>
      )}
      <FormFeedback feedback={feedback} />
    </div>
  );
}
