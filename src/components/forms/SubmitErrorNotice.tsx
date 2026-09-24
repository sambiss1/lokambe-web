import {TriangleAlert} from 'lucide-react';
import type {FormsContent} from '@/content/types';
import type {SubmitFailure} from '@/lib/api/client';

/**
 * Message affiché quand l'envoi n'aboutit pas. Il porte `role="alert"` : le
 * visiteur vient d'appuyer sur « Envoyer », le lecteur d'écran doit l'annoncer
 * sans qu'il ait à repartir en exploration.
 */
export function SubmitErrorNotice({
  kind,
  labels,
}: {
  kind: SubmitFailure;
  labels: FormsContent['common']['submitError'];
}) {
  const message: Record<SubmitFailure, string> = {
    invalid: labels.invalid,
    'too-many': labels.tooMany,
    server: labels.server,
    network: labels.network,
  };

  return (
    <div role="alert" className="mt-6 flex items-start gap-3 rounded-2xl bg-lokambe-red/8 p-4 ring-1 ring-lokambe-red/30 ring-inset">
      <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 flex-none text-lokambe-red" />
      <div>
        <p className="text-base font-semibold text-lokambe-red">{labels.title}</p>
        <p className="mt-1 max-w-[55ch] text-base leading-relaxed text-ink-soft">{message[kind]}</p>
      </div>
    </div>
  );
}
