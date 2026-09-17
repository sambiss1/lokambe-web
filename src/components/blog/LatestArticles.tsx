import {type BlogArticle, BLOG_BASE_PATH, blogPage} from '@/content/blog';
import {Reveal} from '../motion/Reveal';
import {Section} from '../sections/Section';
import {ButtonLink} from '../ui/Button';
import {BlogCard} from './BlogCard';

/** Bloc de fin d’article : les publications les plus récentes. */
export function LatestArticles({articles}: {articles: BlogArticle[]}) {
  if (articles.length === 0) return null;

  return (
    <Section
      tone="peach-soft"
      eyebrow={blogPage.latest.eyebrow}
      title={blogPage.latest.title}
      aside={
        <ButtonLink href={BLOG_BASE_PATH} variant="outline-blue" size="lg" className="mt-2">
          {blogPage.allLabel}
        </ButtonLink>
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Reveal as="li" key={article.slug} index={index % 3}>
            <BlogCard article={article} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
