'use client';

import {useRouter} from 'next/navigation';
import {useState, useTransition} from 'react';
import {setArticleStatus} from '@/lib/api/admin-actions';
import {ACTION_FAILURES} from '@/lib/api/action-result';
import {AdminButton} from './AdminButton';
import {FormFeedback} from './form/FormFeedback';
import type {Feedback} from './form/useResourceForm';

/**
 * Publier ou dépublier un article depuis sa fiche, sans ouvrir l'éditeur.
 *
 * `setArticleStatus` n'envoie que le statut : republier ne réenregistre pas un
 * corps qu'on n'a pas touché, et la date de première publication ne bouge pas.
 */
export function ArticleStatusActions({id, status}: {id: string; status: 'brouillon' | 'publie'}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function change(next: 'brouillon' | 'publie') {
    setFeedback(null);
    startTransition(async () => {
      const result = await setArticleStatus(id, next);
      if (result.ok) {
        setFeedback({tone: 'ok', text: next === 'publie' ? 'Article publié.' : 'Repassé en brouillon.'});
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
