import type {Metadata} from 'next';
import {MessagesBrowser} from '@/components/admin/MessagesBrowser';
import {PageHeader} from '@/components/admin/PageHeader';
import {CONTACT_KINDS, type ContactFilters, MOCK_CONTACTS} from '@/lib/admin-mock';

export const metadata: Metadata = {title: 'Messages'};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? '';
}

/** Le tableau de bord pointe vers `?isRead=false` : on en fait l'état initial. */
export default async function MessagesPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const kind = first(sp.kind);
  const isRead = first(sp.isRead);

  const initialFilters: ContactFilters = {
    kind: (CONTACT_KINDS as readonly string[]).includes(kind) ? kind : '',
    isRead: isRead === 'true' || isRead === 'false' ? isRead : '',
  };

  // TODO(api) : remplacer par GET /admin/contacts?<filtres>&page=&limit=.
  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Messages"
        description="Les demandes envoyées depuis le formulaire de contact du site public."
      />
      <MessagesBrowser contacts={MOCK_CONTACTS} initialFilters={initialFilters} />
    </>
  );
}
