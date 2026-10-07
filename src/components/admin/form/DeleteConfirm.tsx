'use client';

import {useRouter} from 'next/navigation';
import {useState, useTransition} from 'react';
import type {ReactNode} from 'react';
import {ACTION_FAILURES} from '@/lib/api/action-result';
import type {ActionResult} from '@/lib/api/action-result';
import {AdminButton, AdminButtonLink} from '../AdminButton';
import {Surface} from '../Surface';
import {FormFeedback} from './FormFeedback';
import type {Feedback} from './useResourceForm';

/**
 * L'écran de suppression — **une page, pas une fenêtre**.
 *
 * Le back-office demandait confirmation avec `window.confirm` : une boîte qu'on
 * ne peut ni habiller, ni traduire, ni tester autrement qu'en détournant
 * `window`, et qui ne dit rien de ce qu'on va perdre. Ici la page nomme ce qui
 * disparaît, et rappelle ce que la suppression entraîne.
 *
 * `blocked` sert au cas où la suppression est refusée d'avance : un média
 * encore posé sur une fiche, par exemple. Le bouton disparaît alors, remplacé
 * par l'explication.
 */

type Props = {
  /** Ce qu'on supprime, nommé : « Supprimer « Bradamada » ? ». */
  question: string;
  /** Ce que la suppression entraîne, en une ou deux phrases. */
  consequence: ReactNode;
  /** Récapitulatif de l'enregistrement, pour vérifier avant de confirmer. */
  summary?: ReactNode;
  /** Page de retour : la fiche, ou la liste. */
  cancelHref: string;
  cancelLabel?: string;
  confirmLabel?: string;
  /** Où aller après une suppression réussie. */
  doneHref: string;
  remove: () => Promise<ActionResult<unknown>>;
  /** Raison d'un refus connu d'avance : le bouton n'est pas proposé. */
  blocked?: ReactNode;
};

export function DeleteConfirm({
  question,
  consequence,
  summary,
  cancelHref,
  cancelLabel = 'Annuler',
  confirmLabel = 'Supprimer définitivement',
  doneHref,
  remove,
  blocked,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function confirm() {
    setFeedback(null);
    startTransition(async () => {
      const result = await remove();
      if (result.ok) {
        router.push(doneHref);
        router.refresh();
        return;
      }
      setFeedback({tone: 'erreur', text: ACTION_FAILURES[result.reason]});
    });
  }

  return (
    <Surface className="mt-8 max-w-2xl p-5 sm:p-6">
      <h2 className="display text-[clamp(1.1rem,2.2vw,1.35rem)]">{question}</h2>
      <p className="mt-3 text-sm text-ink-soft">{consequence}</p>

      {summary ? <div className="mt-5">{summary}</div> : null}

      {blocked ? (
        <div
          role="alert"
          className="mt-6 rounded-xl bg-lokambe-red/10 px-3.5 py-3 text-sm font-medium text-lokambe-red-strong"
        >
          {blocked}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <AdminButtonLink tone="neutre" href={cancelHref}>
          {cancelLabel}
        </AdminButtonLink>
        {blocked ? null : (
          <AdminButton tone="rouge" disabled={pending} onClick={confirm}>
            {pending ? 'Suppression…' : confirmLabel}
          </AdminButton>
        )}
      </div>

      <FormFeedback feedback={feedback} className="mt-4" />
    </Surface>
  );
}
