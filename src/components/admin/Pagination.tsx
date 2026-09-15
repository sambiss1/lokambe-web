'use client';

import {cx} from '@/lib/cx';

type Props = {
  page: number;
  pages: number;
  total: number;
  /** Nom de l'objet paginé, au singulier (« candidature », « message »). */
  noun: string;
  onPageChange: (page: number) => void;
};

const buttonClass =
  'rounded-full border border-line px-4 py-2 text-sm font-bold transition-colors duration-200 ' +
  'hover:border-lokambe-blue hover:text-lokambe-blue disabled:cursor-not-allowed disabled:opacity-40 ' +
  'disabled:hover:border-line disabled:hover:text-ink';

export function Pagination({page, pages, total, noun, onPageChange}: Props) {
  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5"
    >
      <p className="text-sm text-ink-soft">
        <span className="font-bold text-ink tabular-nums">{total}</span> {noun}
        {total > 1 ? 's' : ''}
        {pages > 1 ? (
          <>
            {' · page '}
            <span className="tabular-nums">{page}</span> sur <span className="tabular-nums">{pages}</span>
          </>
        ) : null}
      </p>

      {pages > 1 ? (
        <div className="flex items-center gap-2">
          <button type="button" className={buttonClass} onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
            ← Précédent
          </button>
          <button
            type="button"
            className={cx(buttonClass)}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pages}
          >
            Suivant →
          </button>
        </div>
      ) : null}
    </nav>
  );
}
