import {useTranslations} from 'next-intl';
import {BLOG_BASE_PATH} from '@/content/blog';
import type {BlogCategory} from '@/content/blog';
import type {Article} from '@/lib/blog/article';
import {Reveal} from '../motion/Reveal';
import {Section} from '../sections/Section';
import {ButtonLink} from '../ui/Button';
import {BlogCard} from './BlogCard';

/** Bloc de fin d’article : les publications les plus récentes. */
export function LatestArticles({
  articles,
  categories,
}: {
  articles: Article[];
  /** Les thèmes connus : sans eux, les cartes affichent le slug brut. */
  categories?: readonly BlogCategory[];
}) {
  const t = useTranslations('blog');

  if (articles.length === 0) return null;

  return (
    <Section
      tone="peach-soft"
      eyebrow={t('latestEyebrow')}
      title={t('latestTitle')}
      aside={
        <ButtonLink href={BLOG_BASE_PATH} variant="outline-blue" size="lg" className="mt-2">
          {t('allLabel')}
        </ButtonLink>
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Reveal as="li" key={article.slug} index={index % 3}>
            <BlogCard article={article} categories={categories} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
