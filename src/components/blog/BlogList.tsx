'use client';

import {useTranslations} from 'next-intl';
import {useMemo, useState} from 'react';
import {FALLBACK_BLOG_CATEGORIES, getCategory, type BlogCategory, type BlogCategoryId} from '@/content/blog';
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
export function BlogList({
  articles: all,
  categories: known = FALLBACK_BLOG_CATEGORIES,
}: {
  articles: Article[];
  /** Les thèmes servis par l'API ; à défaut, ceux livrés avec le site. */
  categories?: readonly BlogCategory[];
}) {
  const t = useTranslations('blog');
  const [active, setActive] = useState<BlogCategoryId | null>(null);

  // Les thèmes affichés sont ceux qui portent au moins un article, dans l'ordre de référence.
  const categories = useMemo(() => {
    const used = new Set(all.map((article) => article.category));
    return known.filter((category) => used.has(category.id)).map((category) => category.id);
  }, [all, known]);
  const articles = active ? all.filter((article) => article.category === active) : all;
  const [featured, ...rest] = articles;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
        <Eyebrow className="text-ink-soft">{t('filterLabel')}</Eyebrow>
        <p aria-live="polite" className="text-sm font-medium text-ink-soft">
          {t('count', {count: articles.length})}
        </p>
      </div>

      <div role="group" aria-label={t('filterLabel')} className="mt-6 flex flex-wrap gap-2.5">
        <button type="button" aria-pressed={active === null} className={chipClasses(active === null)} onClick={() => setActive(null)}>
          {t('allLabel')}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            className={chipClasses(active === category)}
            onClick={() => setActive(category)}
          >
            {getCategory(category, known).label}
          </button>
        ))}
      </div>

      {featured ? (
        <>
          {active === null && (
            <Reveal className="mt-14">
              <Eyebrow className="text-ink-soft">{t('featuredLabel')}</Eyebrow>
            </Reveal>
          )}
          <Reveal className={active === null ? 'mt-5' : 'mt-12'}>
            <BlogCard article={featured} categories={known} featured headingLevel="h2" />
          </Reveal>

          {rest.length > 0 && (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article, index) => (
                <Reveal as="li" key={article.slug} index={index % 3}>
                  <BlogCard article={article} categories={known} />
                </Reveal>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="mt-14 rounded-[1.75rem] bg-lokambe-peach-soft p-8 text-lg font-medium text-ink-soft">
          {all.length === 0 ? t('emptyLocale') : t('empty')}
        </p>
      )}
    </div>
  );
}
