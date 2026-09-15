'use client';

import Link from 'next/link';
import {type FormEvent, useState} from 'react';
import {Button} from '@/components/ui/Button';
import {
  type AdminApplication,
  APPLICATION_STATUSES,
  type ApplicationNote,
  type ApplicationStatus,
  formatBytes,
  formatDateTime,
  formatUsd,
  MOCK_NOW,
  NEED_TYPE_LABELS,
  SECTOR_LABELS,
  type StatusEntry,
  STATUS_LABELS,
} from '@/lib/admin-mock';
import {Field, controlClass, selectChevronStyle, selectClass} from './Field';
import {StatusBadge} from './StatusBadge';
import {DataRow, Panel} from './Surface';

const CURRENT_USER = 'Équipe LOKAMBE';

export function ApplicationDetail({application}: {application: AdminApplication}) {
  const {applicant, business, need} = application;

  const [status, setStatus] = useState<ApplicationStatus>(application.status);
  const [history, setHistory] = useState<StatusEntry[]>(application.statusHistory);
  const [notes, setNotes] = useState<ApplicationNote[]>(application.notes);

  const [nextStatus, setNextStatus] = useState<ApplicationStatus>(application.status);
  const [comment, setComment] = useState('');
  const [statusFeedback, setStatusFeedback] = useState<{kind: 'ok' | 'error'; text: string} | null>(null);

  const [noteText, setNoteText] = useState('');
  const [noteError, setNoteError] = useState<string | null>(null);

  function onSubmitStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (nextStatus === status && !comment.trim()) {
      setStatusFeedback({kind: 'error', text: 'Choisissez un nouveau statut ou ajoutez un commentaire.'});
      return;
    }

    const entry: StatusEntry = {
      status: nextStatus,
      changedAt: MOCK_NOW,
      changedBy: CURRENT_USER,
      ...(comment.trim() ? {comment: comment.trim()} : {}),
    };

    // TODO(api) : PATCH /admin/applications/<id>/status puis revalidation de la page.
    setStatus(nextStatus);
    setHistory((previous) => [...previous, entry]);
    setComment('');
    setStatusFeedback({kind: 'ok', text: `Statut mis à jour : ${STATUS_LABELS[nextStatus]}.`});
  }

  function onSubmitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = noteText.trim();
    if (!text) {
      setNoteError('La note est vide.');
      return;
    }

    // TODO(api) : POST /admin/applications/<id>/notes.
    setNotes((previous) => [
      ...previous,
      {id: `note-${previous.length + 1}-${application.id}`, text, author: CURRENT_USER, createdAt: MOCK_NOW},
    ]);
    setNoteText('');
    setNoteError(null);
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <Link
          href="/admin/candidatures"
          className="w-fit text-sm font-bold text-lokambe-blue underline underline-offset-4 hover:text-lokambe-blue-deep"
        >
          ← Toutes les candidatures
        </Link>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <h1 className="display text-[clamp(1.9rem,4vw,2.6rem)] tabular-nums">{application.reference}</h1>
          <StatusBadge status={status} />
        </div>

        <p className="text-sm text-ink-soft">
          Reçue le {formatDateTime(application.createdAt)} · formulaire en {application.locale.toUpperCase()} ·{' '}
          {business.name}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <Panel title="Candidat">
            <dl>
              <DataRow label="Nom" value={`${applicant.firstName} ${applicant.lastName}`} />
              <DataRow
                label="Téléphone"
                value={
                  <a className="underline underline-offset-4" href={`tel:${applicant.phone.replace(/\s/g, '')}`}>
                    {applicant.phone}
                  </a>
                }
              />
              <DataRow
                label="Email"
                value={
                  applicant.email ? (
                    <a className="underline underline-offset-4" href={`mailto:${applicant.email}`}>
                      {applicant.email}
                    </a>
                  ) : undefined
                }
              />
              <DataRow label="Localisation" value={`${applicant.city} — ${applicant.commune}`} />
            </dl>
          </Panel>

          <Panel title="Activité">
            <dl>
              <DataRow label="Nom" value={business.name} />
              <DataRow
                label="Secteur"
                value={
                  business.sector === 'autre'
                    ? `Autre — ${business.sectorOther ?? 'non précisé'}`
                    : SECTOR_LABELS[business.sector]
                }
              />
              <DataRow
                label="Formalisée"
                value={business.isFormal ? `Oui${business.rccm ? ` · RCCM ${business.rccm}` : ''}` : 'Non'}
              />
              <DataRow label="Année de démarrage" value={<span className="tabular-nums">{business.foundedYear}</span>} />
              <DataRow label="Employés" value={<span className="tabular-nums">{business.employeesCount}</span>} />
              <DataRow
                label="Chiffre d’affaires mensuel"
                value={
                  business.monthlyRevenueUsd === undefined ? undefined : (
                    <span className="tabular-nums">{formatUsd(business.monthlyRevenueUsd)}</span>
                  )
                }
              />
              <DataRow label="Description" value={business.description} />
            </dl>
          </Panel>

          <Panel title="Besoin de financement">
            <dl>
              <DataRow label="Type" value={NEED_TYPE_LABELS[need.type]} />
              <DataRow
                label="Montant demandé"
                value={<span className="text-lg font-extrabold tabular-nums">{formatUsd(need.amountUsd)}</span>}
              />
              <DataRow label="Utilisation des fonds" value={need.useOfFunds} />
            </dl>
          </Panel>

          <Panel title={`Pièces jointes (${application.files.length})`}>
            {application.files.length === 0 ? (
              <p className="text-sm text-ink-soft">Aucun document joint à cette candidature.</p>
            ) : (
              <>
                <ul className="flex flex-col gap-2">
                  {application.files.map((file) => (
                    <li
                      key={file.fileId}
                      className="flex flex-col gap-2 rounded-2xl bg-lokambe-peach-soft/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                    >
                      <span className="min-w-0 truncate text-sm font-bold">{file.filename}</span>
                      <span className="flex flex-none items-center justify-between gap-4 sm:justify-end">
                        <span className="text-xs text-ink-soft tabular-nums">{formatBytes(file.size)}</span>
                        {/* TODO(api) : lien vers GET /api/admin/files/<applicationId>/<fileId>. */}
                        <button
                          type="button"
                          disabled
                          className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-bold text-ink-soft"
                        >
                          Télécharger
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-ink-soft">
                  Les fichiers sont fictifs : le téléchargement sera branché sur l’API.
                </p>
              </>
            )}
          </Panel>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <Panel title="Faire avancer le dossier">
            <form onSubmit={onSubmitStatus} className="flex flex-col gap-4">
              <Field label="Nouveau statut" htmlFor="status-select">
                <select
                  id="status-select"
                  value={nextStatus}
                  onChange={(event) => {
                    setNextStatus(event.target.value as ApplicationStatus);
                    setStatusFeedback(null);
                  }}
                  className={selectClass}
                  style={selectChevronStyle}
                >
                  {APPLICATION_STATUSES.map((value) => (
                    <option key={value} value={value}>
                      {STATUS_LABELS[value]}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Commentaire" htmlFor="status-comment" hint="Visible dans l’historique du dossier.">
                <textarea
                  id="status-comment"
                  rows={3}
                  maxLength={1000}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Visite planifiée jeudi avec l’équipe terrain…"
                  className={controlClass}
                />
              </Field>

              {statusFeedback ? (
                <p
                  role={statusFeedback.kind === 'error' ? 'alert' : 'status'}
                  className={
                    statusFeedback.kind === 'error'
                      ? 'rounded-xl bg-lokambe-red/10 px-3.5 py-2.5 text-sm font-medium text-lokambe-red'
                      : 'rounded-xl bg-lokambe-blue/10 px-3.5 py-2.5 text-sm font-medium text-lokambe-blue'
                  }
                >
                  {statusFeedback.text}
                </p>
              ) : null}

              <Button type="submit" className="w-full">
                Enregistrer le statut
              </Button>
            </form>
          </Panel>

          <Panel title={`Historique (${history.length})`}>
            <ol aria-label="Historique des statuts" className="flex flex-col gap-4 border-l-2 border-lokambe-peach pl-5">
              {[...history].reverse().map((entry, index) => (
                <li key={`${entry.changedAt}-${entry.status}-${index}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[1.63rem] h-2.5 w-2.5 rounded-full bg-lokambe-blue ring-3 ring-white"
                  />
                  <p className="text-sm font-extrabold">{STATUS_LABELS[entry.status]}</p>
                  <p className="text-xs text-ink-soft tabular-nums">
                    {formatDateTime(entry.changedAt)} · {entry.changedBy}
                  </p>
                  {entry.comment ? <p className="mt-1.5 text-sm whitespace-pre-line">{entry.comment}</p> : null}
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title={`Notes internes (${notes.length})`}>
            {notes.length > 0 ? (
              <ul className="mb-5 flex flex-col gap-3">
                {notes.map((note) => (
                  <li key={note.id} className="rounded-2xl bg-[#f7f6f9] p-4">
                    <p className="text-sm whitespace-pre-line">{note.text}</p>
                    <p className="mt-2 text-xs text-ink-soft tabular-nums">
                      {note.author} · {formatDateTime(note.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-5 text-sm text-ink-soft">Aucune note pour l’instant.</p>
            )}

            <form onSubmit={onSubmitNote} className="flex flex-col gap-3">
              <Field label="Nouvelle note" htmlFor="note-text">
                <textarea
                  id="note-text"
                  rows={3}
                  maxLength={2000}
                  value={noteText}
                  onChange={(event) => {
                    setNoteText(event.target.value);
                    setNoteError(null);
                  }}
                  placeholder="Ce que l’équipe doit savoir sur ce dossier…"
                  className={controlClass}
                />
              </Field>

              {noteError ? (
                <p role="alert" className="text-sm font-medium text-lokambe-red">
                  {noteError}
                </p>
              ) : null}

              <Button type="submit" variant="outline-blue" className="w-full">
                Ajouter la note
              </Button>
            </form>
          </Panel>
        </div>
      </div>
    </>
  );
}
