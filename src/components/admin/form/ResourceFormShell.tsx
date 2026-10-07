'use client';

import {Trash2} from 'lucide-react';
import type {ReactNode} from 'react';
import {AdminButton, AdminButtonLink} from '../AdminButton';
import {Surface} from '../Surface';
import {FormFeedback} from './FormFeedback';
import type {Feedback} from './useResourceForm';
import type {PublicationStatus} from '@/lib/constants';

/**
 * La charpente d'un écran d'écriture : les champs à gauche, la publication et
 * les actions à droite.
 *
 * Les cinq collections, la médiathèque et les articles s'en servent, donc les
 * boutons sont au même endroit partout, et « Supprimer » mène toujours à une
 * **page** de confirmation — jamais à une fenêtre qui se superpose.
 */

type Props = {
  /** Les champs de la fiche. */
  children: ReactNode;
  /** Panneaux latéraux propres à la ressource (classement, image, média). */
  aside?: ReactNode;
  /** Absent en création : l'entrée n'existe pas encore. */
  status?: PublicationStatus;
  pending: boolean;
  feedback: Feedback | null;
  onSave: () => void;
  /** Absent quand la ressource n'a pas d'état de publication. */
  onPublish?: () => void;
  onUnpublish?: () => void;
  /** Page de confirmation de suppression. Absent en création. */
  deleteHref?: string;
  /** Ce que dit le panneau de publication selon l'état. */
  notes?: {draft: string; published: string; creating: string};
  saveLabel?: string;
};

const DEFAULT_NOTES = {
  draft: 'Brouillon : personne ne le voit en dehors du back-office.',
  published: 'Publié : visible sur le site public.',
  creating: 'La nouvelle entrée est créée en brouillon.',
};

export function ResourceFormShell({
  children,
  aside,
  status,
  pending,
  feedback,
  onSave,
  onPublish,
  onUnpublish,
  deleteHref,
  notes = DEFAULT_NOTES,
  saveLabel = 'Enregistrer',
}: Props) {
  const published = status === 'publie';

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <Surface className="p-5 sm:p-6">
        <div className="grid gap-5">{children}</div>
      </Surface>

      <div className="grid gap-6">
        <Surface className="p-5 sm:p-6">
          <h2 className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Publication</h2>

          <p className="mt-3 text-sm text-ink-soft">
            {status === undefined ? notes.creating : published ? notes.published : notes.draft}
          </p>

          <div className="mt-4 grid gap-2.5">
            <AdminButton disabled={pending} onClick={onSave}>
              {pending ? 'Enregistrement…' : saveLabel}
            </AdminButton>

            {published && onUnpublish ? (
              <AdminButton tone="neutre" disabled={pending} onClick={onUnpublish}>
                Repasser en brouillon
              </AdminButton>
            ) : null}

            {!published && onPublish ? (
              <AdminButton tone="rouge" disabled={pending} onClick={onPublish}>
                Publier
              </AdminButton>
            ) : null}

            {deleteHref ? (
              <AdminButtonLink tone="danger" href={deleteHref}>
                <Trash2 aria-hidden="true" className="size-4" strokeWidth={2.2} />
                Supprimer
              </AdminButtonLink>
            ) : null}
          </div>

          <FormFeedback feedback={feedback} className="mt-4" />
        </Surface>

        {aside}
      </div>
    </div>
  );
}
