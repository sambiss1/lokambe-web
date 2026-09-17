'use client';

import {usePathname, useRouter} from 'next/navigation';
import {useState, useTransition} from 'react';
import {CONTACT_KIND_LABELS, formatDateTime, formatRelative, totalPages} from '@/lib/admin-format';
import {setContactRead} from '@/lib/api/admin-actions';
import type {AdminContact, ContactFilters, Page} from '@/lib/api/admin-types';
import {CONTACT_KINDS} from '@/lib/constants';
import {cx} from '@/lib/cx';
import {Field, selectChevronStyle, selectClass} from './Field';
import {Pagination} from './Pagination';
import {Surface} from './Surface';

type Props = {
  result: Page<AdminContact>;
  filters: ContactFilters;
  pageSize: number;
  /** Non-lus de toute la boîte, pas seulement de la page affichée. */
  unreadTotal: number;
};

export function MessagesBrowser({result, filters, pageSize, unreadTotal}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [failure, setFailure] = useState<string | null>(null);
  /** Bascule affichée avant la réponse du serveur, pour que le clic paraisse immédiat. */
  const [optimistic, setOptimistic] = useState<Record<string, boolean>>({});

  const pages = totalPages(result.total, pageSize);
  const hasFilters = filters.kind !== undefined || filters.isRead !== undefined;

  function apply(patch: Partial<ContactFilters>, options: {keepPage?: boolean} = {}) {
    const next = {...filters, ...patch};
    const params = new URLSearchParams();
    if (next.kind) params.set('kind', next.kind);
    if (next.isRead !== undefined) params.set('isRead', String(next.isRead));
    const page = options.keepPage ? (next.page ?? 1) : 1;
    if (page > 1) params.set('page', String(page));

    const rendered = params.toString();
    startTransition(() => router.replace(rendered === '' ? pathname : `${pathname}?${rendered}`));
  }

  function isRead(contact: AdminContact): boolean {
    return optimistic[contact.id] ?? contact.isRead;
  }

  function toggleRead(contact: AdminContact) {
    const next = !isRead(contact);
    setOptimistic((previous) => ({...previous, [contact.id]: next}));
    setFailure(null);

    startTransition(async () => {
      const outcome = await setContactRead(contact.id, next);
      // Dans les deux cas on rend la main à la donnée du serveur : soit elle
      // vient d'être revalidée, soit la bascule n'a pas eu lieu.
      setOptimistic((previous) => {
        const rest = {...previous};
        delete rest[contact.id];
        return rest;
      });

      if (outcome.ok) {
        router.refresh();
        return;
      }

      if (outcome.reason === 'session') {
        router.replace('/admin/login?expiree=1');
        return;
      }
      setFailure(
        outcome.reason === 'introuvable'
          ? 'Ce message n’existe plus.'
          : 'La mise à jour n’a pas abouti. Réessayez dans un instant.',
      );
    });
  }

  return (
    <div className={cx('flex flex-col gap-6', pending && 'opacity-70 transition-opacity')}>
      <Surface className="p-5 sm:p-6">
        <div className="grid gap-4 min-[900px]:grid-cols-[1fr_1fr_auto] min-[900px]:items-end">
          <Field label="Type de contact" htmlFor="filter-kind">
            <select
              id="filter-kind"
              value={filters.kind ?? ''}
              onChange={(event) => apply({kind: (event.target.value || undefined) as ContactFilters['kind']})}
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
              value={filters.isRead === undefined ? '' : String(filters.isRead)}
              onChange={(event) =>
                apply({isRead: event.target.value === '' ? undefined : event.target.value === 'true'})
              }
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
            onClick={() => apply({kind: undefined, isRead: undefined})}
            disabled={!hasFilters}
            className="h-[2.85rem] rounded-full border border-line px-5 text-sm font-bold transition-colors duration-200 hover:border-lokambe-blue hover:text-lokambe-blue disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink"
          >
            Réinitialiser
          </button>
        </div>
      </Surface>

      <p className="text-sm text-ink-soft">
        <span className="font-bold text-ink tabular-nums">{result.total}</span> message
        {result.total > 1 ? 's' : ''} affiché{result.total > 1 ? 's' : ''} ·{' '}
        <span className="font-bold text-ink tabular-nums">{unreadTotal}</span> non lu{unreadTotal > 1 ? 's' : ''} au
        total
      </p>

      {failure && (
        <p role="alert" className="rounded-2xl bg-lokambe-red/8 px-5 py-4 text-sm font-medium text-lokambe-red">
          {failure}
        </p>
      )}

      {result.items.length === 0 ? (
        <Surface className="px-6 py-16 text-center">
          <p className="font-bold">Aucun message ne correspond à ces filtres.</p>
          <p className="mt-2 text-sm text-ink-soft">Réinitialisez les filtres pour voir toute la boîte.</p>
        </Surface>
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {result.items.map((contact) => (
              <li key={contact.id}>
                <article
                  className={cx(
                    'rounded-[1.75rem] border bg-white p-5 sm:p-6',
                    isRead(contact) ? 'border-line' : 'border-lokambe-blue',
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        {!isRead(contact) && (
                          <span aria-hidden="true" className="h-2.5 w-2.5 flex-none rounded-full bg-lokambe-red" />
                        )}
                        <span className="font-extrabold">{contact.fullName}</span>
                        <span className="rounded-full bg-lokambe-peach-soft px-2.5 py-1 text-xs font-bold text-[#9a4a15]">
                          {CONTACT_KIND_LABELS[contact.kind]}
                        </span>
                        {!isRead(contact) && <span className="sr-only">Message non lu</span>}
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
                      onClick={() => toggleRead(contact)}
                      aria-pressed={isRead(contact)}
                      className="rounded-full border border-line px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors duration-200 hover:border-lokambe-blue hover:text-lokambe-blue"
                    >
                      {isRead(contact) ? 'Marquer non lu' : 'Marquer comme lu'}
                    </button>
                  </div>

                  <p className="mt-4 text-sm whitespace-pre-line">{contact.message}</p>

                  <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-4 text-sm">
                    <a
                      className="font-bold text-lokambe-blue underline underline-offset-4"
                      href={`mailto:${contact.email}`}
                    >
                      {contact.email}
                    </a>
                    {contact.phone ? (
                      <a
                        className="text-ink-soft underline underline-offset-4"
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      >
                        {contact.phone}
                      </a>
                    ) : null}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          <Pagination
            page={result.page}
            pages={pages}
            total={result.total}
            noun="message"
            onPageChange={(next) => apply({page: next}, {keepPage: true})}
          />
        </>
      )}
    </div>
  );
}
