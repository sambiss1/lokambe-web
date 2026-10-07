import type {Metadata} from 'next';
import {AdminButtonLink} from '@/components/admin/AdminButton';
import {CollectionBrowser} from '@/components/admin/CollectionBrowser';
import {EntryThumb} from '@/components/admin/collections/EntryThumb';
import {PageHeader} from '@/components/admin/PageHeader';
import {listCollectionAdmin, listMedia} from '@/lib/api/admin-content';
import {PUBLICATION_STATUSES} from '@/lib/constants';
import {oneOf} from '@/lib/admin-search-params';
import type {SearchParams} from '@/lib/admin-search-params';

export const metadata: Metadata = {title: 'Partenaires'};

export default async function PartnersListPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const status = oneOf(sp.status, PUBLICATION_STATUSES);

  const [page, media] = await Promise.all([listCollectionAdmin('partners', {status}), listMedia({kind: 'image'}, 100)]);
  const byId = new Map(media.items.map((item) => [item.id, item]));

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Partenaires"
        description="Les logos des partenaires de LOKAMBE, sur la page d’accueil. Tant qu’aucun partenaire n’est publié, la section entière reste masquée."
        actions={
          <AdminButtonLink tone="rouge" href="/admin/partenaires/nouveau">
            Nouveau partenaire
          </AdminButtonLink>
        }
      />
      <CollectionBrowser
        collection="partners"
        status={status}
        total={page.total}
        noun="partenaire"
        emptyLabel="Aucun partenaire pour l’instant."
        rows={page.items.map((partner) => ({
          ...partner,
          thumb: <EntryThumb entry={partner} library={byId} fit="contain" />,
          label: partner.name,
          // La description est tronquée par la feuille de style : on la passe entière.
          detail: partner.fr?.description,
        }))}
      />
    </>
  );
}
