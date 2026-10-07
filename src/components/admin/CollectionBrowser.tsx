'use client';

import {ChevronDown, ChevronUp} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState, useTransition} from 'react';
import type {ReactNode} from 'react';
import {ACTION_FAILURES} from '@/lib/api/action-result';
import {reorderCollection} from '@/lib/api/content-actions';
import {collectionAdminPath} from '@/lib/api/content-types';
import type {ApiPublishable, CollectionKey} from '@/lib/api/content-types';
import {PUBLICATION_STATUS_LABELS} from '@/lib/constants';
import type {PublicationStatus} from '@/lib/constants';
import {cx} from '@/lib/cx';
import {FormFeedback} from './form/FormFeedback';
import type {Feedback} from './form/useResourceForm';
import {Surface} from './Surface';

/**
 * La liste d'une collection éditoriale : filtre par état, rang d'affichage,
 * accès à chaque fiche.
 *
 * Elle n'est pas paginée, volontairement : ces collections comptent quelques
 * entrées, et déplacer une ligne d'une page à l'autre n'aurait pas de sens. Le
 * réordonnancement envoie la liste entière, donc il doit la voir entière — un
 * avertissement s'affiche si jamais le total dépassait ce que l'écran a reçu.
 *
 * Le filtre vit dans l'adresse, pas dans un état local : un lien vers
 * « brouillons » se partage et survit à un rechargement.
 */

/**
 * Une ligne prête à afficher. `thumb` est un **élément déjà construit**, pas une
 * fonction : ce composant tourne dans le navigateur, et React refuse qu'un
 * composant serveur lui passe une fonction. L'écran serveur construit donc la
 * vignette de chaque ligne et la joint ici.
 */
type Row = ApiPublishable & {label: string; detail?: string; thumb?: ReactNode};

type Props = {
  collection: CollectionKey;
  rows: Row[];
  total: number;
  status?: PublicationStatus;
  /** Nom de l'objet au singulier : « entreprise », « question ». */
  noun: string;
  emptyLabel: string;
};

const FILTERS: {value?: PublicationStatus; label: string}[] = [
  {value: undefined, label: 'Tout'},
  {value: 'publie', label: 'Publiés'},
  {value: 'brouillon', label: 'Brouillons'},
];

export function CollectionBrowser({collection, rows, total, status, noun, emptyLabel}: Props) {
  const router = useRouter();
  const base = collectionAdminPath(collection);
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  /** Le rang se règle sur la liste complète, pas sur la liste filtrée. */
  const reorderable = status === undefined && rows.length > 1 && total === rows.length;

  function move(index: number, direction: -1 | 1) {
    const next = [...rows];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];

    setFeedback(null);
    startTransition(async () => {
      const result = await reorderCollection(
        collection,
        next.map((row) => row.id),
      );
      if (result.ok) {
        router.refresh();
        return;
      }
      setFeedback({tone: 'erreur', text: ACTION_FAILURES[result.reason]});
    });
  }

  return (
    <div className="mt-8 grid gap-5">
      <div role="group" aria-label="Filtrer par état" className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const active = filter.value === status;
          return (
            <Link
              key={filter.label}
              href={filter.value ? `${base}?status=${filter.value}` : base}
              aria-current={active ? 'true' : undefined}
              className={cx(
                'rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors duration-200',
                active
                  ? 'border-lokambe-blue bg-lokambe-blue text-white'
                  : 'border-line text-ink-soft hover:border-lokambe-blue hover:text-lokambe-blue',
              )}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <FormFeedback feedback={feedback} />

      {total > rows.length ? (
        <p role="status" className="rounded-xl bg-lokambe-peach-soft px-3.5 py-2.5 text-sm text-ink-soft">
          {total} {noun}s au total, {rows.length} affichés. Le classement par rang ne peut pas s’appliquer sur une liste
          partielle.
        </p>
      ) : null}

      <Surface>
        {rows.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-ink-soft">{emptyLabel}</p>
        ) : (
          <ul className="divide-y divide-line">
            {rows.map((row, index) => (
              <li key={row.id} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
                {row.thumb ? <div className="w-14 flex-none">{row.thumb}</div> : null}

                <div className="min-w-0 flex-1">
                  <Link
                    href={`${base}/${row.id}`}
                    className="block truncate text-[0.95rem] font-bold text-ink transition-colors hover:text-lokambe-blue"
                  >
                    {row.label}
                  </Link>
                  {row.detail ? <p className="mt-0.5 truncate text-xs text-ink-soft">{row.detail}</p> : null}
                </div>

                <StatusPill status={row.status} />

                {reorderable ? (
                  <div className="flex flex-none items-center gap-0.5">
                    <button
                      type="button"
                      disabled={pending || index === 0}
                      onClick={() => move(index, -1)}
                      aria-label={`Remonter « ${row.label} »`}
                      className={orderButton}
                    >
                      <ChevronUp aria-hidden="true" className="size-4" strokeWidth={2.4} />
                    </button>
                    <button
                      type="button"
                      disabled={pending || index === rows.length - 1}
                      onClick={() => move(index, 1)}
                      aria-label={`Descendre « ${row.label} »`}
                      className={orderButton}
                    >
                      <ChevronDown aria-hidden="true" className="size-4" strokeWidth={2.4} />
                    </button>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Surface>
    </div>
  );
}

const orderButton =
  'rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-lokambe-peach-soft hover:text-lokambe-blue ' +
  'disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink-soft';

/** Pastille d'état : publié ou brouillon. Les candidatures ont la leur. */
export function StatusPill({status, className}: {status: PublicationStatus; className?: string}) {
  return (
    <span
      className={cx(
        'flex-none rounded-full px-2.5 py-1 text-[0.7rem] font-extrabold tracking-[0.06em] uppercase',
        status === 'publie' ? 'bg-lokambe-blue/10 text-lokambe-blue' : 'bg-line/60 text-ink-soft',
        className,
      )}
    >
      {PUBLICATION_STATUS_LABELS[status]}
    </span>
  );
}
