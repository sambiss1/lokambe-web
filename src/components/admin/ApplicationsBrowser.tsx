'use client';

import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useRef, useState, useTransition} from 'react';
import {formatDate, formatUsd, sectorLabel, SECTOR_LABELS, STATUS_LABELS, totalPages} from '@/lib/admin-format';
import type {AdminApplicationSummary, ApplicationFilters, Page} from '@/lib/api/admin-types';
import {APPLICATION_STATUSES, SECTORS} from '@/lib/constants';
import {cx} from '@/lib/cx';
import {Field, controlClass, selectChevronStyle, selectClass} from './Field';
import {Pagination} from './Pagination';
import {StatusBadge} from './StatusBadge';
import {Surface} from './Surface';

type Props = {
  result: Page<AdminApplicationSummary>;
  filters: ApplicationFilters;
  pageSize: number;
};

const headCellClass = 'px-5 py-3 text-xs font-extrabold tracking-[0.08em] text-ink-soft uppercase';
const cellClass = 'px-5 py-4 align-middle';

/** Délai avant de relancer la recherche, pour ne pas appeler l'API à chaque touche. */
const SEARCH_DEBOUNCE_MS = 350;

export function ApplicationsBrowser({result, filters, pageSize}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  // La frappe reste locale ; l'URL ne suit qu'après une pause.
  const [search, setSearch] = useState(filters.q ?? '');

  /**
   * La recherche différée et les autres filtres écrivent dans la même URL. Une
   * minuterie déjà lancée doit donc partir avec l'état du moment où elle se
   * déclenche, jamais avec celui du rendu qui l'a programmée : sinon elle écrase
   * le filtre choisi entre-temps. D'où ces références, relues à l'échéance.
   */
  const filtersRef = useRef(filters);
  const searchRef = useRef(search);
  /** Recherche effectivement portée par l'URL, pour savoir s'il reste à écrire. */
  const committedSearch = useRef((filters.q ?? '').trim());
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mises à jour après le rendu, jamais pendant : les gestionnaires et la
  // minuterie s'exécutent ensuite, ils y trouveront l'état du moment.
  useEffect(() => {
    filtersRef.current = filters;
    searchRef.current = search;
  });

  const pages = totalPages(result.total, pageSize);
  const hasFilters = Boolean(filters.status || filters.sector || (filters.q ?? '').trim());

  function cancelPendingSearch() {
    if (searchTimer.current !== null) {
      clearTimeout(searchTimer.current);
      searchTimer.current = null;
    }
  }

  /** Réécrit l'URL : c'est elle qui porte l'état, le serveur refait la requête. */
  function apply(patch: Partial<ApplicationFilters> = {}, options: {keepPage?: boolean} = {}) {
    // Toute navigation explicite emporte la recherche en attente avec elle.
    cancelPendingSearch();
    const next = {...filtersRef.current, q: searchRef.current, ...patch};

    const params = new URLSearchParams();
    if (next.status) params.set('status', next.status);
    if (next.sector) params.set('sector', next.sector);
    const q = (next.q ?? '').trim();
    if (q) params.set('q', q);
    // Tout changement de filtre renvoie à la première page : la page 4 d'un
    // autre filtre n'existe probablement pas.
    const page = options.keepPage ? (next.page ?? 1) : 1;
    if (page > 1) params.set('page', String(page));

    committedSearch.current = q;
    const rendered = params.toString();
    startTransition(() => router.replace(rendered === '' ? pathname : `${pathname}?${rendered}`));
  }

  useEffect(() => {
    if (search.trim() === committedSearch.current) return;
    searchTimer.current = setTimeout(() => {
      searchTimer.current = null;
      apply();
    }, SEARCH_DEBOUNCE_MS);
    return cancelPendingSearch;
    // `apply` lit ses références : la reconstruire à chaque rendu ne change rien.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function reset() {
    setSearch('');
    searchRef.current = '';
    apply({status: undefined, sector: undefined, q: ''});
  }

  /** L'export passe par le site, qui signe l'appel : le jeton reste au serveur. */
  const exportParams = new URLSearchParams();
  if (filters.status) exportParams.set('status', filters.status);
  if (filters.sector) exportParams.set('sector', filters.sector);
  if (filters.q?.trim()) exportParams.set('q', filters.q.trim());
  const exportHref = `/api/admin/export${exportParams.toString() === '' ? '' : `?${exportParams}`}`;

  return (
    <div className={cx('flex flex-col gap-6', pending && 'opacity-70 transition-opacity')}>
      <Surface className="p-5 sm:p-6">
        <div className="grid gap-4 min-[900px]:grid-cols-[2fr_1fr_1fr_auto] min-[900px]:items-end">
          <Field label="Recherche" htmlFor="filter-q">
            <input
              id="filter-q"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Référence, nom, activité, téléphone…"
              className={controlClass}
            />
          </Field>

          <Field label="Statut" htmlFor="filter-status">
            <select
              id="filter-status"
              value={filters.status ?? ''}
              onChange={(event) => apply({status: (event.target.value || undefined) as ApplicationFilters['status']})}
              className={selectClass}
              style={selectChevronStyle}
            >
              <option value="">Tous les statuts</option>
              {APPLICATION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Secteur" htmlFor="filter-sector">
            <select
              id="filter-sector"
              value={filters.sector ?? ''}
              onChange={(event) => apply({sector: (event.target.value || undefined) as ApplicationFilters['sector']})}
              className={selectClass}
              style={selectChevronStyle}
            >
              <option value="">Tous les secteurs</option>
              {SECTORS.map((sector) => (
                <option key={sector} value={sector}>
                  {SECTOR_LABELS[sector]}
                </option>
              ))}
            </select>
          </Field>

          <button
            type="button"
            onClick={reset}
            disabled={!hasFilters}
            className="h-[2.85rem] rounded-full border border-line px-5 text-sm font-bold transition-colors duration-200 hover:border-lokambe-blue hover:text-lokambe-blue disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink"
          >
            Réinitialiser
          </button>
        </div>
      </Surface>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">
          <span className="font-bold text-ink tabular-nums">{result.total}</span> candidature
          {result.total > 1 ? 's' : ''}
          {hasFilters ? ' correspondant aux filtres' : ''}
        </p>
        <a
          href={exportHref}
          className={cx(
            'rounded-full px-5 py-2.5 text-sm font-bold text-lokambe-blue ring-2 ring-lokambe-blue/30 ring-inset transition-colors duration-200 hover:ring-lokambe-blue',
            result.total === 0 && 'pointer-events-none opacity-40',
          )}
          aria-disabled={result.total === 0 || undefined}
        >
          Exporter en CSV
        </a>
      </div>

      {result.items.length === 0 ? (
        <Surface className="px-6 py-16 text-center">
          <p className="font-bold">Aucune candidature ne correspond à ces critères.</p>
          <p className="mt-2 text-sm text-ink-soft">Élargissez la recherche ou réinitialisez les filtres.</p>
        </Surface>
      ) : (
        <>
          {/* Tableau à partir de 900 px. */}
          <Surface className="hidden overflow-hidden min-[900px]:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Liste des candidatures reçues</caption>
              <thead className="border-b border-line bg-[#fbfafc]">
                <tr>
                  <th scope="col" className={headCellClass}>
                    Référence
                  </th>
                  <th scope="col" className={headCellClass}>
                    Reçue le
                  </th>
                  <th scope="col" className={headCellClass}>
                    Candidat
                  </th>
                  <th scope="col" className={headCellClass}>
                    Activité
                  </th>
                  <th scope="col" className={headCellClass}>
                    Secteur
                  </th>
                  <th scope="col" className={cx(headCellClass, 'text-right')}>
                    Montant
                  </th>
                  <th scope="col" className={headCellClass}>
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {result.items.map((application) => (
                  <tr key={application.id} className="transition-colors duration-200 hover:bg-lokambe-peach-soft/45">
                    <td className={cx(cellClass, 'font-extrabold tabular-nums')}>
                      <Link
                        href={`/admin/candidatures/${application.id}`}
                        className="text-lokambe-blue underline underline-offset-4"
                      >
                        {application.reference}
                      </Link>
                    </td>
                    <td className={cx(cellClass, 'whitespace-nowrap tabular-nums')}>
                      {formatDate(application.createdAt)}
                    </td>
                    <td className={cellClass}>
                      {application.applicant.firstName} {application.applicant.lastName}
                      <span className="block text-xs text-ink-soft">
                        {application.applicant.commune ?? application.applicant.city}
                      </span>
                    </td>
                    <td className={cellClass}>{application.business.name}</td>
                    <td className={cx(cellClass, 'text-ink-soft')}>
                      {sectorLabel(application.business.sector, application.business.sectorOther)}
                    </td>
                    <td className={cx(cellClass, 'text-right font-bold whitespace-nowrap tabular-nums')}>
                      {formatUsd(application.need.amountUsd)}
                    </td>
                    <td className={cellClass}>
                      <StatusBadge status={application.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Surface>

          {/* Cartes en dessous de 900 px. */}
          <ul className="flex flex-col gap-4 min-[900px]:hidden">
            {result.items.map((application) => (
              <li key={application.id}>
                <Link
                  href={`/admin/candidatures/${application.id}`}
                  className="block rounded-[1.75rem] border border-line bg-white p-5 transition-colors duration-200 hover:border-lokambe-blue"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-extrabold tabular-nums">{application.reference}</span>
                    <StatusBadge status={application.status} />
                  </div>
                  <p className="mt-3 font-bold">{application.business.name}</p>
                  <p className="text-sm text-ink-soft">
                    {application.applicant.firstName} {application.applicant.lastName} ·{' '}
                    {application.applicant.commune ?? application.applicant.city}
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
                    <div>
                      <dt className="text-xs text-ink-soft">Secteur</dt>
                      <dd>{sectorLabel(application.business.sector, application.business.sectorOther)}</dd>
                    </div>
                    <div className="text-right">
                      <dt className="text-xs text-ink-soft">Montant</dt>
                      <dd className="font-bold tabular-nums">{formatUsd(application.need.amountUsd)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-soft">Reçue le</dt>
                      <dd className="tabular-nums">{formatDate(application.createdAt)}</dd>
                    </div>
                  </dl>
                </Link>
              </li>
            ))}
          </ul>

          <Pagination
            page={result.page}
            pages={pages}
            total={result.total}
            noun="candidature"
            onPageChange={(next) => apply({page: next}, {keepPage: true})}
          />
        </>
      )}
    </div>
  );
}
