import type {Metadata} from 'next';
import {AdminButtonLink} from '@/components/admin/AdminButton';
import {CollectionBrowser} from '@/components/admin/CollectionBrowser';
import {PageHeader} from '@/components/admin/PageHeader';
import {listCollectionAdmin} from '@/lib/api/admin-content';
import {PUBLICATION_STATUSES} from '@/lib/constants';
import {oneOf} from '@/lib/admin-search-params';
import type {SearchParams} from '@/lib/admin-search-params';

export const metadata: Metadata = {title: 'Thèmes'};

export default async function ThemesListPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const status = oneOf(sp.status, PUBLICATION_STATUSES);

  // Pas de `listMedia` : un thème n'a pas d'illustration, donc pas de vignette.
  const page = await listCollectionAdmin('themes', {status});

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Thèmes"
        description="Les thèmes proposés au classement d’un article, et les filtres affichés en tête du blog. L’ordre de cette liste est celui des filtres."
        actions={
          <AdminButtonLink tone="rouge" href="/admin/themes/nouveau">
            Nouveau thème
          </AdminButtonLink>
        }
      />
      <CollectionBrowser
        collection="themes"
        status={status}
        total={page.total}
        noun="thème"
        emptyLabel="Aucun thème pour l’instant."
        rows={page.items.map((entry) => ({
          ...entry,
          label: entry.fr.name,
          detail: entry.en?.name ?? '',
        }))}
      />
    </>
  );
}
