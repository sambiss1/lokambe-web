import type {Metadata} from 'next';
import {AdminButtonLink} from '@/components/admin/AdminButton';
import {MediaBrowser} from '@/components/admin/media/MediaBrowser';
import {PageHeader} from '@/components/admin/PageHeader';
import {MEDIA_PAGE_SIZE, listMedia} from '@/lib/api/admin-content';
import type {MediaFilters} from '@/lib/api/content-types';
import {MEDIA_KINDS} from '@/lib/constants';
import {first, oneOf, pageNumber} from '@/lib/admin-search-params';
import type {SearchParams} from '@/lib/admin-search-params';

export const metadata: Metadata = {title: 'Médiathèque'};

export default async function MediaListPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const q = first(sp.q).trim();

  const filters: MediaFilters = {
    kind: oneOf(sp.kind, MEDIA_KINDS),
    q: q === '' ? undefined : q,
    page: pageNumber(sp.page),
  };

  const result = await listMedia(filters);

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Médiathèque"
        description="Les photos et les vidéos téléversées par l’équipe. Un média posé sur une fiche ne peut pas être supprimé tant qu’il y sert."
        actions={
          <AdminButtonLink tone="rouge" href="/admin/medias/nouveau">
            Téléverser un média
          </AdminButtonLink>
        }
      />
      <MediaBrowser result={result} filters={filters} pageSize={MEDIA_PAGE_SIZE} />
    </>
  );
}
