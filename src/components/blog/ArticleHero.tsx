import {ArrowLeft} from 'lucide-react';
import type {CSSProperties} from 'react';
import {
  BLOG_BASE_PATH,
  blogPage,
  formatArticleDate,
  formatReadingTime,
  getCategory,
} from '@/content/blog';
import type {Article} from '@/lib/blog/article';
import {Link} from '@/i18n/navigation';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';
import {ExampleBadge} from './ExampleBadge';

const SEPARATED =
  "flex items-center gap-4 before:block before:size-1.5 before:flex-none before:rounded-full before:bg-lokambe-peach before:content-['']";

/** Bandeau bleu d’un article : thème, titre, date, durée de lecture. */
export function ArticleHero({article}: {article: Article}) {
  const category = getCategory(article.category);

  return (
    <section className="relative isolate overflow-hidden bg-lokambe-blue text-white">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-24 -z-10 h-[130%] w-auto opacity-55"
        viewBox="0 0 600 700"
        fill="none"
      >
        <path d="M560 40 A300 300 0 0 0 260 340 V700" stroke="#0014c9" strokeWidth="70" strokeLinecap="round" />
      </svg>

      <Container className="pt-28 pb-28 sm:pt-36 lg:pt-40 lg:pb-36">
        <Link
          href={BLOG_BASE_PATH}
          className="fade-up inline-flex items-center gap-2 text-[0.9375rem] font-bold text-white/75 transition-colors duration-300 hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2.6} />
          {blogPage.backLabel}
        </Link>

        <div className="fade-up mt-9" style={{'--i': 1} as CSSProperties}>
          <Eyebrow className="text-white/85">{category.label}</Eyebrow>
        </div>

        <h1 className="display mt-6 max-w-[24ch] text-[clamp(1.85rem,6.23vw,3.45rem)] lg:text-[clamp(2.3rem,3.6vw,3.9rem)]">
          <span className="line-mask">
            <span>{article.title}</span>
          </span>
        </h1>

        <p
          className="fade-up mt-7 max-w-[38rem] text-[1.0625rem] leading-relaxed text-white/85 sm:text-lg"
          style={{'--i': 2} as CSSProperties}
        >
          {article.excerpt}
        </p>

        <div
          className="fade-up mt-9 flex flex-wrap items-center gap-x-4 gap-y-3 text-[0.9375rem] text-white/75"
          style={{'--i': 3} as CSSProperties}
        >
          <span className="font-bold text-white">{article.author}</span>
          {/* Le séparateur appartient à l’élément suivant : il ne reste pas seul en fin de ligne. */}
          <time dateTime={article.publishedAt} className={SEPARATED}>
            {formatArticleDate(article.publishedAt)}
          </time>
          <span className={SEPARATED}>{formatReadingTime(article.readingMinutes)}</span>
          {article.isExample && (
            <span className="basis-full sm:basis-auto">
              <ExampleBadge tone="dark" />
            </span>
          )}
        </div>
      </Container>
    </section>
  );
}
