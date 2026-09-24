'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {getCategory} from '@/content/blog';
import type {ArticleFilters, Page} from '@/lib/api/admin-types';
import type {ApiArticle} from '@/lib/blog/article';
import {formatDate, totalPages} from '@/lib/admin-format';
import {cx} from '@/lib/cx';
import {Pagination} from './Pagination';
import {Surface} from './Surface';

/** Liste des articles : filtres d'état dans l'URL, une ligne par article. */

type Props = {
  result: Page<ApiArticle>;
  filters: ArticleFilters;
  pageSize: number;
};

const FILTERS = [
  {value: undefined, label: 'Tous'},
  {value: 'publie' as const, label: 'Publiés'},
  {value: 'brouillon' as const, label: 'Brouillons'},
];

function chipClass(active: boolean) {
  return cx(
    'inline-flex min-h-9 items-center rounded-full px-4 text-sm font-bold transition-colors duration-200',
    active
      ? 'bg-lokambe-blue text-white'
      : 'border border-line text-ink-soft hover:border-lokambe-blue hover:text-lokambe-blue',
  );
}

export function ArticlesBrowser({result, filters, pageSize}: Props) {
  const router = useRouter();

  function go(next: {status?: 'brouillon' | 'publie'; page?: number}) {
    const params = new URLSearchParams();
    const status = 'status' in next ? next.status : filters.status;
    if (status) params.set('status', status);
    if (next.page && next.page > 1) params.set('page', String(next.page));
    const query = params.toString();
    router.push(query === '' ? '/admin/articles' : `/admin/articles?${query}`);
  }

  return (
    <div className="mt-8">
      <div role="group" aria-label="Filtrer par état" className="flex flex-wrap gap-2.5">
        {FILTERS.map((filter) => (
          <button
            key={filter.label}
            type="button"
            aria-pressed={filters.status === filter.value}
            className={chipClass(filters.status === filter.value)}
            onClick={() => go({status: filter.value, page: 1})}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <Surface className="mt-5 p-5 sm:p-6">
        {result.items.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-soft">
            Aucun article pour ce filtre. Le bouton « Nouvel article » ouvre l’éditeur.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {result.items.map((article) => (
              <li key={article.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3.5 first:pt-0 last:pb-0">
                <span
                  className={cx(
                    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ring-1 ring-inset',
                    article.status === 'publie'
                      ? 'bg-lokambe-blue text-white ring-lokambe-blue'
                      : 'bg-[#eef0f5] text-[#3d3d45] ring-[#d8dbe4]',
                  )}
                >
                  {article.status === 'publie' ? 'Publié' : 'Brouillon'}
                </span>

                <Link
                  href={`/admin/articles/${article.id}`}
                  className="min-w-0 flex-1 text-[0.95rem] font-bold text-ink hover:text-lokambe-blue"
                >
                  {article.title}
                </Link>

                <span className="text-sm text-ink-soft">{getCategory(article.category).short}</span>

                <time dateTime={article.publishedAt ?? article.updatedAt} className="text-sm text-ink-soft tabular-nums">
                  {formatDate(article.publishedAt ?? article.updatedAt)}
                </time>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <Pagination
            page={result.page}
            pages={totalPages(result.total, pageSize)}
            total={result.total}
            noun="article"
            onPageChange={(page) => go({page})}
          />
        </div>
      </Surface>
    </div>
  );
}
