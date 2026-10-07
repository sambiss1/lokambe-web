import type {Metadata} from 'next';
import {AdminButtonLink} from '@/components/admin/AdminButton';
import {CollectionBrowser} from '@/components/admin/CollectionBrowser';
import {EntryThumb} from '@/components/admin/collections/EntryThumb';
import {PageHeader} from '@/components/admin/PageHeader';
import {listCollectionAdmin, listMedia} from '@/lib/api/admin-content';
import {PUBLICATION_STATUSES} from '@/lib/constants';
import {oneOf} from '@/lib/admin-search-params';
import type {SearchParams} from '@/lib/admin-search-params';

export const metadata: Metadata = {title: 'Portefeuille'};

export default async function PortfolioListPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const status = oneOf(sp.status, PUBLICATION_STATUSES);

  const [page, media] = await Promise.all([
    listCollectionAdmin('portfolio', {status}),
    listMedia({kind: 'image'}, 100),
  ]);
  const byId = new Map(media.items.map((item) => [item.id, item]));

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Portefeuille"
        description="Les entreprises financées ou créées par LOKAMBE, telles qu’elles apparaissent sur la page d’accueil."
        actions={
          <AdminButtonLink tone="rouge" href="/admin/portefeuille/nouveau">
            Nouvelle entreprise
          </AdminButtonLink>
        }
      />
      <CollectionBrowser
        collection="portfolio"
        status={status}
        total={page.total}
        noun="entreprise"
        emptyLabel="Aucune entreprise pour l’instant."
        rows={page.items.map((company) => ({
          ...company,
          thumb: <EntryThumb entry={company} library={byId} fit="contain" />,
          label: company.name,
          detail: [company.fr.sector, company.fr.status].filter(Boolean).join(' · '),
        }))}
      />
    </>
  );
}
