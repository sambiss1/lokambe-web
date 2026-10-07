'use client';

import type {ReactNode} from 'react';
import {deleteCollectionEntry} from '@/lib/api/content-actions';
import type {CollectionKey} from '@/lib/api/content-types';
import {DeleteConfirm} from '../form/DeleteConfirm';

/**
 * La suppression d'une entrée de collection. Un seul composant pour les cinq :
 * seul le texte de la page change d'une collection à l'autre.
 */
export function DeleteEntry({
  collection,
  id,
  question,
  consequence,
  summary,
  doneHref,
  cancelHref,
}: {
  collection: CollectionKey;
  id: string;
  question: string;
  consequence: ReactNode;
  summary?: ReactNode;
  doneHref: string;
  cancelHref: string;
}) {
  return (
    <DeleteConfirm
      question={question}
      consequence={consequence}
      summary={summary}
      cancelHref={cancelHref}
      doneHref={doneHref}
      remove={() => deleteCollectionEntry(collection, id)}
    />
  );
}
