import type {Metadata} from 'next';
import {AdminButtonLink} from '@/components/admin/AdminButton';
import {CollectionBrowser} from '@/components/admin/CollectionBrowser';
import {EntryThumb} from '@/components/admin/collections/EntryThumb';
import {PageHeader} from '@/components/admin/PageHeader';
import {listCollectionAdmin, listMedia} from '@/lib/api/admin-content';
import {PUBLICATION_STATUSES} from '@/lib/constants';
import {oneOf} from '@/lib/admin-search-params';
import type {SearchParams} from '@/lib/admin-search-params';

export const metadata: Metadata = {title: 'Équipe'};

export default async function TeamListPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const status = oneOf(sp.status, PUBLICATION_STATUSES);

  const [page, media] = await Promise.all([listCollectionAdmin('team', {status}), listMedia({kind: 'image'}, 100)]);
  const byId = new Map(media.items.map((item) => [item.id, item]));

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Équipe"
        description="Les rôles présentés sur la page « Notre équipe ». L’ordre de cette liste est celui de la page publique."
        actions={
          <AdminButtonLink tone="rouge" href="/admin/equipe/nouveau">
            Nouveau membre
          </AdminButtonLink>
        }
      />
      <CollectionBrowser
        collection="team"
        status={status}
        total={page.total}
        noun="membre"
        emptyLabel="Aucun membre pour l’instant."
        rows={page.items.map((member) => ({
          ...member,
          thumb: <EntryThumb entry={member} library={byId} fit="cover" />,
          // Le nom n’est publié que pour le dirigeant : sinon la ligne porte le rôle.
          label: member.name ?? member.fr.title,
          detail: member.name ? member.fr.title : undefined,
        }))}
      />
    </>
  );
}
