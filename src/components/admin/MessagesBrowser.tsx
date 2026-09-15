'use client';

import {useMemo, useState} from 'react';
import {
  type AdminContact,
  CONTACT_KIND_LABELS,
  CONTACT_KINDS,
  type ContactFilters,
  filterContacts,
  formatDateTime,
  formatRelative,
  paginate,
  totalPages,
} from '@/lib/admin-mock';
import {cx} from '@/lib/cx';
import {Field, selectChevronStyle, selectClass} from './Field';
import {Pagination} from './Pagination';
import {Surface} from './Surface';

type Props = {contacts: AdminContact[]; initialFilters: ContactFilters};

export function MessagesBrowser({contacts, initialFilters}: Props) {
  const [items, setItems] = useState<AdminContact[]>(contacts);
  const [filters, setFilters] = useState<ContactFilters>(initialFilters);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => filterContacts(items, filters), [items, filters]);
  const pages = totalPages(filtered.length);
  const currentPage = Math.min(page, pages);
  const visible = paginate(filtered, currentPage);
  const unread = items.filter((contact) => !contact.isRead).length;

  function update(patch: Partial<ContactFilters>) {
    setFilters((previous) => ({...previous, ...patch}));
    setPage(1);
  }

  /** TODO(api) : PATCH /admin/contacts/<id> { isRead } puis revalidation de /admin/messages et /admin. */
  function toggleRead(id: string) {
    setItems((previous) =>
      previous.map((contact) => (contact.id === id ? {...contact, isRead: !contact.isRead} : contact)),
    );
  }

  const hasFilters = Boolean(filters.kind || filters.isRead);

  return (
    <div className="flex flex-col gap-6">
      <Surface className="p-5 sm:p-6">
        <div className="grid gap-4 min-[900px]:grid-cols-[1fr_1fr_auto] min-[900px]:items-end">
          <Field label="Type de contact" htmlFor="filter-kind">
            <select
              id="filter-kind"
              value={filters.kind}
              onChange={(event) => update({kind: event.target.value})}
              className={selectClass}
              style={selectChevronStyle}
            >
              <option value="">Tous les types</option>
              {CONTACT_KINDS.map((kind) => (
                <option key={kind} value={kind}>
                  {CONTACT_KIND_LABELS[kind]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="État de lecture" htmlFor="filter-read">
            <select
              id="filter-read"
              value={filters.isRead}
              onChange={(event) => update({isRead: event.target.value})}
              className={selectClass}
              style={selectChevronStyle}
            >
              <option value="">Tous les messages</option>
              <option value="false">Non lus</option>
              <option value="true">Lus</option>
            </select>
          </Field>

          <button
            type="button"
            onClick={() => update({kind: '', isRead: ''})}
            disabled={!hasFilters}
            className="h-[2.85rem] rounded-full border border-line px-5 text-sm font-bold transition-colors duration-200 hover:border-lokambe-blue hover:text-lokambe-blue disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink"
          >
            Réinitialiser
          </button>
        </div>
      </Surface>

      <p className="text-sm text-ink-soft">
        <span className="font-bold text-ink tabular-nums">{filtered.length}</span> message
        {filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''} ·{' '}
        <span className="font-bold text-ink tabular-nums">{unread}</span> non lu{unread > 1 ? 's' : ''} au total
      </p>

      {filtered.length === 0 ? (
        <Surface className="px-6 py-16 text-center">
          <p className="font-bold">Aucun message ne correspond à ces filtres.</p>
          <p className="mt-2 text-sm text-ink-soft">Réinitialisez les filtres pour voir toute la boîte.</p>
        </Surface>
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {visible.map((contact) => (
              <li key={contact.id}>
                <article
                  className={cx(
                    'rounded-[1.75rem] border bg-white p-5 sm:p-6',
                    contact.isRead ? 'border-line' : 'border-lokambe-blue',
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        {!contact.isRead && (
                          <span
                            aria-hidden="true"
                            className="h-2.5 w-2.5 flex-none rounded-full bg-lokambe-red"
                          />
                        )}
                        <span className="font-extrabold">{contact.fullName}</span>
                        <span className="rounded-full bg-lokambe-peach-soft px-2.5 py-1 text-xs font-bold text-[#9a4a15]">
                          {CONTACT_KIND_LABELS[contact.kind]}
                        </span>
                        {!contact.isRead && <span className="sr-only">Message non lu</span>}
                      </p>

                      {contact.organization ? (
                        <p className="mt-1 text-sm text-ink-soft">{contact.organization}</p>
                      ) : null}

                      <p className="mt-1 text-sm text-ink-soft tabular-nums">
                        {formatDateTime(contact.createdAt)} · {formatRelative(contact.createdAt)} ·{' '}
                        {contact.locale.toUpperCase()}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRead(contact.id)}
                      aria-pressed={contact.isRead}
                      className="rounded-full border border-line px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors duration-200 hover:border-lokambe-blue hover:text-lokambe-blue"
                    >
                      {contact.isRead ? 'Marquer non lu' : 'Marquer comme lu'}
                    </button>
                  </div>

                  <h2 className="mt-4 font-extrabold">{contact.subject}</h2>
                  <p className="mt-2 text-sm whitespace-pre-line">{contact.message}</p>

                  <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-4 text-sm">
                    <a className="font-bold text-lokambe-blue underline underline-offset-4" href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                    {contact.phone ? (
                      <a className="text-ink-soft underline underline-offset-4" href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                        {contact.phone}
                      </a>
                    ) : null}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          <Pagination page={currentPage} pages={pages} total={filtered.length} noun="message" onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
