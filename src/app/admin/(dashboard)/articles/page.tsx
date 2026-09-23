import type {Metadata} from 'next';
import Link from 'next/link';
import {ArticlesBrowser} from '@/components/admin/ArticlesBrowser';
import {PageHeader} from '@/components/admin/PageHeader';
import {listAdminArticles, PAGE_SIZE} from '@/lib/api/admin';
import type {ArticleFilters} from '@/lib/api/admin-types';

export const metadata: Metadata = {title: 'Articles'};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? '';
}

function pageNumber(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
}

export default async function ArticlesPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const status = first(sp.status);

  const filters: ArticleFilters = {
    status: status === 'publie' || status === 'brouillon' ? status : undefined,
    page: pageNumber(first(sp.page)),
  };

  const result = await listAdminArticles(filters);

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Articles"
        description="Le blog du site public. Un article reste invisible tant qu’il est en brouillon."
        actions={
          <Link
            href="/admin/articles/nouveau"
            className="inline-flex items-center rounded-xl bg-lokambe-red px-4 py-2.5 text-[0.95rem] font-bold text-white transition-colors duration-200 hover:bg-lokambe-red/90"
          >
            Nouvel article
          </Link>
        }
      />
      <ArticlesBrowser result={result} filters={filters} pageSize={PAGE_SIZE} />
    </>
  );
}
