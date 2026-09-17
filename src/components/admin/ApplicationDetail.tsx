'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {type FormEvent, useState, useTransition} from 'react';
import {Button} from '@/components/ui/Button';
import {
  formatBytes,
  formatDateTime,
  formatUsd,
  NEED_TYPE_LABELS,
  sectorLabel,
  STATUS_LABELS,
} from '@/lib/admin-format';
import {addApplicationNote, changeApplicationStatus, type ActionFailure} from '@/lib/api/admin-actions';
import type {AdminApplication} from '@/lib/api/admin-types';
import {APPLICATION_STATUSES, type ApplicationStatus} from '@/lib/constants';
import {Field, controlClass, selectChevronStyle, selectClass} from './Field';
import {StatusBadge} from './StatusBadge';
import {DataRow, Panel} from './Surface';

/** Message montré à l'équipe pour chaque refus de l'API. */
function messageFor(reason: ActionFailure): string {
  switch (reason) {
    case 'introuvable':
      return 'Ce dossier n’existe plus.';
    case 'invalid':
      return 'L’API a refusé cette modification.';
    default:
      return 'La modification n’a pas abouti. Réessayez dans un instant.';
  }
}

export function ApplicationDetail({application}: {application: AdminApplication}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  /**
   * Les routes d'écriture renvoient le dossier entier : on affiche leur réponse
   * sans attendre que la page serveur se rafraîchisse, plutôt que de recomposer
   * l'historique à la main.
   *
   * La réponse ne vaut que pour la version du dossier qu'on avait sous les yeux :
   * dès que le serveur en envoie une nouvelle, on la reprend. C'est l'ajustement
   * d'état pendant le rendu, préféré à un effet qui appellerait `setState`.
   */
  const [saved, setSaved] = useState<AdminApplication | null>(null);
  const [rendered, setRendered] = useState(application);
  if (rendered !== application) {
    setRendered(application);
    setSaved(null);
  }
  const document = saved ?? application;

  const {applicant, business, need} = document;

  const [nextStatus, setNextStatus] = useState<ApplicationStatus>(application.status);
  const [comment, setComment] = useState('');
  const [statusFeedback, setStatusFeedback] = useState<{kind: 'ok' | 'error'; text: string} | null>(null);

  const [noteText, setNoteText] = useState('');
  const [noteError, setNoteError] = useState<string | null>(null);

  function onSubmitStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (nextStatus === document.status && !comment.trim()) {
      setStatusFeedback({kind: 'error', text: 'Choisissez un nouveau statut ou ajoutez un commentaire.'});
      return;
    }

    setStatusFeedback(null);
    startTransition(async () => {
      const outcome = await changeApplicationStatus(document.id, nextStatus, comment);
      if (outcome.ok) {
        setSaved(outcome.data);
        setComment('');
        setStatusFeedback({kind: 'ok', text: `Statut mis à jour : ${STATUS_LABELS[nextStatus]}.`});
        router.refresh();
        return;
      }
      if (outcome.reason === 'session') {
        router.replace('/admin/login?expiree=1');
        return;
      }
      setStatusFeedback({kind: 'error', text: messageFor(outcome.reason)});
    });
  }

  function onSubmitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = noteText.trim();
    if (!text) {
      setNoteError('La note est vide.');
      return;
    }

    setNoteError(null);
    startTransition(async () => {
      const outcome = await addApplicationNote(document.id, text);
      if (outcome.ok) {
        setSaved(outcome.data);
        setNoteText('');
        router.refresh();
        return;
      }
      if (outcome.reason === 'session') {
        router.replace('/admin/login?expiree=1');
        return;
      }
      setNoteError(messageFor(outcome.reason));
    });
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
          <h1 className="display text-[clamp(1.55rem,3.28vw,2.15rem)] tabular-nums">{document.reference}</h1>
          <StatusBadge status={document.status} />
        </div>

        <p className="text-sm text-ink-soft">
          Reçue le {formatDateTime(document.createdAt)} · formulaire en {document.locale.toUpperCase()} ·{' '}
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
              <DataRow
                label="Localisation"
                // La commune est facultative dans le formulaire public.
                value={applicant.commune ? `${applicant.city} — ${applicant.commune}` : applicant.city}
              />
            </dl>
          </Panel>

          <Panel title="Activité">
            <dl>
              <DataRow label="Nom" value={business.name} />
              <DataRow label="Secteur" value={sectorLabel(business.sector, business.sectorOther)} />
              <DataRow
                label="Formalisée"
                value={business.isFormal ? `Oui${business.rccm ? ` · RCCM ${business.rccm}` : ''}` : 'Non'}
              />
              <DataRow
                label="Année de démarrage"
                value={
                  business.foundedYear === undefined ? undefined : (
                    <span className="tabular-nums">{business.foundedYear}</span>
                  )
                }
              />
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

          <Panel title={`Pièces jointes (${document.files.length})`}>
            {document.files.length === 0 ? (
              <p className="text-sm text-ink-soft">Aucun document joint à cette candidature.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {document.files.map((file) => (
                  <li
                    key={file.fileId}
                    className="flex flex-col gap-2 rounded-2xl bg-lokambe-peach-soft/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                  >
                    <span className="min-w-0 truncate text-sm font-bold">{file.filename}</span>
                    <span className="flex flex-none items-center justify-between gap-4 sm:justify-end">
                      <span className="text-xs text-ink-soft tabular-nums">{formatBytes(file.size)}</span>
                      {/* Le fichier passe par le site, qui signe l'appel : le jeton reste au serveur. */}
                      <a
                        href={`/api/admin/files/${document.id}/${file.fileId}`}
                        className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-bold text-lokambe-blue transition-colors duration-200 hover:border-lokambe-blue"
                      >
                        Télécharger
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
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

              <Button type="submit" disabled={pending} className="w-full">
                {pending ? 'Enregistrement…' : 'Enregistrer le statut'}
              </Button>
            </form>
          </Panel>

          <Panel title={`Historique (${document.statusHistory.length})`}>
            <ol aria-label="Historique des statuts" className="flex flex-col gap-4 border-l-2 border-lokambe-peach pl-5">
              {[...document.statusHistory].reverse().map((entry, index) => (
                // Les sous-documents de l'API n'ont pas d'identifiant.
                <li key={`${entry.changedAt}-${entry.status}-${index}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[1.63rem] h-2.5 w-2.5 rounded-full bg-lokambe-blue ring-3 ring-white"
                  />
                  <p className="text-sm font-extrabold">{STATUS_LABELS[entry.status]}</p>
                  <p className="text-xs text-ink-soft tabular-nums">
                    {formatDateTime(entry.changedAt)}
                    {/* L'entrée créée par le formulaire public n'a pas d'auteur. */}
                    {entry.changedBy ? ` · ${entry.changedBy}` : ' · Formulaire public'}
                  </p>
                  {entry.comment ? <p className="mt-1.5 text-sm whitespace-pre-line">{entry.comment}</p> : null}
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title={`Notes internes (${document.notes.length})`}>
            {document.notes.length > 0 ? (
              <ul className="mb-5 flex flex-col gap-3">
                {document.notes.map((note, index) => (
                  <li key={`${note.createdAt}-${index}`} className="rounded-2xl bg-[#f7f6f9] p-4">
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

              <Button type="submit" variant="outline-blue" disabled={pending} className="w-full">
                Ajouter la note
              </Button>
            </form>
          </Panel>
        </div>
      </div>
    </>
  );
}
