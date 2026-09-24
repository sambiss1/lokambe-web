import type {Metadata} from 'next';
import {MessagesBrowser} from '@/components/admin/MessagesBrowser';
import {PageHeader} from '@/components/admin/PageHeader';
import {getStats, listContacts, PAGE_SIZE} from '@/lib/api/admin';
import type {ContactFilters} from '@/lib/api/admin-types';
import {CONTACT_KINDS, type ContactKind} from '@/lib/constants';

export const metadata: Metadata = {title: 'Messages'};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? '';
}

function pageNumber(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
}

/** Le tableau de bord pointe vers `?isRead=false` : les filtres vivent dans l'URL. */
export default async function MessagesPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const kind = first(sp.kind);
  const isRead = first(sp.isRead);

  const filters: ContactFilters = {
    kind: (CONTACT_KINDS as readonly string[]).includes(kind) ? (kind as ContactKind) : undefined,
    isRead: isRead === 'true' ? true : isRead === 'false' ? false : undefined,
    page: pageNumber(first(sp.page)),
  };

  // Le nombre de non-lus porte sur toute la boîte, pas sur la page affichée :
  // il vient donc des statistiques, pas du décompte des messages visibles.
  const [result, stats] = await Promise.all([listContacts(filters), getStats()]);

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Messages"
        description="Les demandes envoyées depuis le formulaire de contact du site public."
      />
      <MessagesBrowser
        result={result}
        filters={filters}
        pageSize={PAGE_SIZE}
        unreadTotal={stats.unreadContacts}
      />
    </>
  );
}
