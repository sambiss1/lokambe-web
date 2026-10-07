import {cx} from '@/lib/cx';
import type {Feedback} from './useResourceForm';

/**
 * Le message d'un écran d'écriture.
 *
 * Une erreur est annoncée par `role="alert"` — un lecteur d'écran l'interrompt —
 * et une confirmation par `role="status"`, qui attend une pause. Les deux
 * étaient en `status` dans l'ancien formulaire d'article : un échec
 * d'enregistrement passait inaperçu.
 */
export function FormFeedback({feedback, className}: {feedback: Feedback | null; className?: string}) {
  if (!feedback) return null;
  const erreur = feedback.tone === 'erreur';
  return (
    <p
      role={erreur ? 'alert' : 'status'}
      className={cx(
        'rounded-xl px-3.5 py-2.5 text-sm font-medium',
        erreur ? 'bg-lokambe-red/10 text-lokambe-red-strong' : 'bg-lokambe-peach-soft text-ink-soft',
        className,
      )}
    >
      {feedback.text}
    </p>
  );
}
