'use client';

import Link from 'next/link';
import {useMemo, useState} from 'react';
import {
  type AdminApplication,
  APPLICATION_STATUSES,
  type ApplicationFilters,
  applicationsToCsv,
  filterApplications,
  formatDate,
  formatUsd,
  paginate,
  SECTOR_LABELS,
  SECTORS,
  STATUS_LABELS,
  totalPages,
} from '@/lib/admin-mock';
import {cx} from '@/lib/cx';
import {Field, controlClass, selectChevronStyle, selectClass} from './Field';
import {Pagination} from './Pagination';
import {StatusBadge} from './StatusBadge';
import {Surface} from './Surface';

type Props = {applications: AdminApplication[]; initialFilters: ApplicationFilters};

const headCellClass = 'px-5 py-3 text-xs font-extrabold tracking-[0.08em] text-ink-soft uppercase';
const cellClass = 'px-5 py-4 align-middle';

export function ApplicationsBrowser({applications, initialFilters}: Props) {
  const [filters, setFilters] = useState<ApplicationFilters>(initialFilters);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => filterApplications(applications, filters), [applications, filters]);
  const pages = totalPages(filtered.length);
  const currentPage = Math.min(page, pages);
  const visible = paginate(filtered, currentPage);

  /** Toute modification de filtre renvoie à la première page. */
  function update(patch: Partial<ApplicationFilters>) {
    setFilters((previous) => ({...previous, ...patch}));
    setPage(1);
  }

  function reset() {
    setFilters({status: '', sector: '', q: ''});
    setPage(1);
  }

  /**
   * Export CSV des lignes filtrées, construit dans le navigateur.
   * TODO(api) : appeler GET /api/admin/export?<filtres> qui renverra le fichier de l'API.
   */
  function exportCsv() {
    const blob = new Blob([`﻿${applicationsToCsv(filtered)}`], {type: 'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'candidatures-lokambe.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const hasFilters = Boolean(filters.status || filters.sector || filters.q.trim());

  return (
    <div className="flex flex-col gap-6">
      <Surface className="p-5 sm:p-6">
        <div className="grid gap-4 min-[900px]:grid-cols-[2fr_1fr_1fr_auto] min-[900px]:items-end">
          <Field label="Recherche" htmlFor="filter-q">
            <input
              id="filter-q"
              type="search"
              value={filters.q}
              onChange={(event) => update({q: event.target.value})}
              placeholder="Référence, nom, activité, téléphone…"
              className={controlClass}
            />
          </Field>

          <Field label="Statut" htmlFor="filter-status">
            <select
              id="filter-status"
              value={filters.status}
              onChange={(event) => update({status: event.target.value})}
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
              value={filters.sector}
              onChange={(event) => update({sector: event.target.value})}
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
          <span className="font-bold text-ink tabular-nums">{filtered.length}</span> candidature
          {filtered.length > 1 ? 's' : ''}
          {hasFilters ? ' correspondant aux filtres' : ''}
        </p>
        <button
          type="button"
          onClick={exportCsv}
          disabled={filtered.length === 0}
          className="rounded-full px-5 py-2.5 text-sm font-bold text-lokambe-blue ring-2 ring-lokambe-blue/30 ring-inset transition-colors duration-200 hover:ring-lokambe-blue disabled:cursor-not-allowed disabled:opacity-40"
        >
          Exporter en CSV
        </button>
      </div>

      {filtered.length === 0 ? (
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
                {visible.map((application) => (
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
                      <span className="block text-xs text-ink-soft">{application.applicant.commune}</span>
                    </td>
                    <td className={cellClass}>{application.business.name}</td>
                    <td className={cx(cellClass, 'text-ink-soft')}>
                      {SECTOR_LABELS[application.business.sector]}
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
            {visible.map((application) => (
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
                    {application.applicant.commune}
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
                    <div>
                      <dt className="text-xs text-ink-soft">Secteur</dt>
                      <dd>{SECTOR_LABELS[application.business.sector]}</dd>
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
            page={currentPage}
            pages={pages}
            total={filtered.length}
            noun="candidature"
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
