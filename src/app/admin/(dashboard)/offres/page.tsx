import type {Metadata} from 'next';
import {AdminButtonLink} from '@/components/admin/AdminButton';
import {CollectionBrowser} from '@/components/admin/CollectionBrowser';
import {EntryThumb} from '@/components/admin/collections/EntryThumb';
import {PageHeader} from '@/components/admin/PageHeader';
import {listCollectionAdmin, listMedia} from '@/lib/api/admin-content';
import {CONTRACT_TYPE_LABELS, PUBLICATION_STATUSES} from '@/lib/constants';
import {oneOf} from '@/lib/admin-search-params';
import type {SearchParams} from '@/lib/admin-search-params';

export const metadata: Metadata = {title: 'Offres d’emploi'};

export default async function JobsListPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const status = oneOf(sp.status, PUBLICATION_STATUSES);

  const [page, media] = await Promise.all([listCollectionAdmin('jobs', {status}), listMedia({kind: 'image'}, 100)]);
  const byId = new Map(media.items.map((item) => [item.id, item]));

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Offres d’emploi"
        description="Les postes ouverts, tels qu’ils paraissent sur la page Carrières. Aucune offre n’existe aujourd’hui : la page reste vide jusqu’à la première publication."
        actions={
          <AdminButtonLink tone="rouge" href="/admin/offres/nouveau">
            Nouvelle offre
          </AdminButtonLink>
        }
      />
      <CollectionBrowser
        collection="jobs"
        status={status}
        total={page.total}
        noun="offre"
        emptyLabel="Aucune offre pour l’instant."
        rows={page.items.map((job) => ({
          ...job,
          thumb: <EntryThumb entry={job} library={byId} fit="contain" />,
          label: job.fr.title,
          detail: [job.location, CONTRACT_TYPE_LABELS[job.contractType]].join(' · '),
        }))}
      />
    </>
  );
}
