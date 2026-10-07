import type {ReactNode} from 'react';
import {Pencil} from 'lucide-react';
import {AdminButtonLink} from '../AdminButton';
import {Panel, Surface} from '../Surface';

/**
 * La fiche « voir » d'une ressource : on la lit, on ne la modifie pas.
 *
 * Elle existe parce que le client l'a demandée — une page par cas, création,
 * consultation, modification — et parce qu'elle est utile : on vérifie ce qui
 * est enregistré, on voit l'aperçu du média, on publie, sans risquer de
 * modifier un champ au passage. « Modifier » mène à l'écran d'édition.
 */
export function EntryViewShell({
  children,
  aside,
  editHref,
  editLabel = 'Modifier',
}: {
  /** Les valeurs enregistrées, en général une suite de `DataRow`. */
  children: ReactNode;
  /** Panneaux latéraux : aperçu du média, publication, suppression. */
  aside?: ReactNode;
  editHref: string;
  editLabel?: string;
}) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <Surface className="p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Fiche</h2>
          <AdminButtonLink href={editHref} tone="neutre" className="px-3 py-1.5 text-sm">
            <Pencil aria-hidden="true" className="size-3.5" strokeWidth={2.2} />
            {editLabel}
          </AdminButtonLink>
        </div>
        <dl>{children}</dl>
      </Surface>
      {aside ? <div className="grid gap-6">{aside}</div> : null}
    </div>
  );
}

/** Le panneau « Publication » de la fiche : état, actions, suppression. */
export function EntryActionsPanel({children}: {children: ReactNode}) {
  return <Panel title="Publication">{children}</Panel>;
}
