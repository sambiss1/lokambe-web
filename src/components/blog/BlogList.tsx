'use client';

import {useMemo, useState} from 'react';
import {type BlogCategoryId, blogPage, getUsedCategories} from '@/content/blog';
import type {Article} from '@/lib/blog/article';
import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';
import {Eyebrow} from '../ui/Eyebrow';
import {BlogCard} from './BlogCard';

function chipClasses(active: boolean) {
  return cx(
    'inline-flex min-h-10 items-center rounded-full px-4 text-[0.9375rem] font-bold transition-colors duration-300 ease-(--ease-out-expo)',
    active
      ? 'bg-lokambe-blue text-white'
      : 'text-ink-soft ring-1 ring-line ring-inset hover:bg-lokambe-peach-soft hover:text-lokambe-blue',
  );
}

/** Liste filtrable des articles : thèmes en pastilles, article à la une puis grille. */
export function BlogList({articles: all}: {articles: Article[]}) {
  const [active, setActive] = useState<BlogCategoryId | null>(null);

  const categories = useMemo(() => getUsedCategories(all.map((article) => article.category)), [all]);
  const articles = active ? all.filter((article) => article.category === active) : all;
  const [featured, ...rest] = articles;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
        <Eyebrow className="text-ink-soft">{blogPage.filterLabel}</Eyebrow>
        <p aria-live="polite" className="text-sm font-medium text-ink-soft">
          {blogPage.countLabel(articles.length)}
        </p>
      </div>

      <div role="group" aria-label={blogPage.filterLabel} className="mt-6 flex flex-wrap gap-2.5">
        <button type="button" aria-pressed={active === null} className={chipClasses(active === null)} onClick={() => setActive(null)}>
          {blogPage.allLabel}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={active === category.id}
            className={chipClasses(active === category.id)}
            onClick={() => setActive(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {featured ? (
        <>
          {active === null && (
            <Reveal className="mt-14">
              <Eyebrow className="text-ink-soft">{blogPage.featuredLabel}</Eyebrow>
            </Reveal>
          )}
          <Reveal className={active === null ? 'mt-5' : 'mt-12'}>
            <BlogCard article={featured} featured headingLevel="h2" />
          </Reveal>

          {rest.length > 0 && (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article, index) => (
                <Reveal as="li" key={article.slug} index={index % 3}>
                  <BlogCard article={article} />
                </Reveal>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="mt-14 rounded-[1.75rem] bg-lokambe-peach-soft p-8 text-lg font-medium text-ink-soft">
          {blogPage.emptyLabel}
        </p>
      )}
    </div>
  );
}
