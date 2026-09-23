import {ArrowUpRight} from 'lucide-react';
import Image from 'next/image';
import {articlePath, formatArticleDate, formatReadingTime, getCategory} from '@/content/blog';
import type {Article} from '@/lib/blog/article';
import {Link} from '@/i18n/navigation';
import {cx} from '@/lib/cx';
import {ExampleBadge} from './ExampleBadge';

type Props = {
  article: Article;
  /** Carte large « à la une » : image à gauche, texte à droite sur grand écran. */
  featured?: boolean;
  /** Niveau de titre, pour rester cohérent avec le plan de la page. */
  headingLevel?: 'h2' | 'h3';
};

/** Carte d’article : image, thème, titre, accroche et informations de lecture. */
export function BlogCard({article, featured = false, headingLevel: Heading = 'h3'}: Props) {
  const category = getCategory(article.category);

  return (
    <article
      className={cx(
        'group relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line ring-inset',
        'transition-shadow duration-300 ease-(--ease-out-expo) hover:shadow-[0_30px_70px_-42px_rgba(0,18,168,0.6)]',
        'has-[a:focus-visible]:shadow-[0_30px_70px_-42px_rgba(0,18,168,0.6)]',
        featured && 'lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-stretch',
      )}
    >
      <div
        className={cx(
          'relative overflow-hidden bg-lokambe-peach-soft',
          featured ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[21rem]' : 'aspect-[16/10]',
        )}
      >
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes={featured ? '(min-width: 1024px) 46vw, 92vw' : '(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw'}
          className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-lokambe-blue px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.1em] text-white uppercase">
          {category.short}
        </span>
      </div>

      <div className={cx('flex flex-1 flex-col p-6 sm:p-7', featured && 'lg:justify-center lg:p-10')}>
        {article.isExample && <ExampleBadge className="self-start" />}

        <Heading
          className={cx(
            'display mt-5 text-lokambe-blue',
            featured ? 'text-[clamp(1.4rem,3.4vw,2.15rem)]' : 'text-[clamp(1.15rem,2.4vw,1.4rem)]',
          )}
        >
          <Link
            href={articlePath(article.slug)}
            className="before:absolute before:inset-0 before:content-[''] focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </Heading>

        <p className={cx('mt-4 leading-relaxed text-ink-soft', featured ? 'text-[1.0625rem] sm:text-lg' : 'text-base')}>
          {article.excerpt}
        </p>

        <footer className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-5 text-sm text-ink-soft">
          <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
          {/* Le séparateur appartient à la durée : il ne reste pas seul en fin de ligne. */}
          <span className="flex items-center gap-3 before:block before:size-1.5 before:flex-none before:rounded-full before:bg-lokambe-red before:content-['']">
            {formatReadingTime(article.readingMinutes)}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="ml-auto size-5 flex-none text-lokambe-blue transition-transform duration-300 ease-(--ease-out-expo) group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2.4}
          />
        </footer>
      </div>
    </article>
  );
}
