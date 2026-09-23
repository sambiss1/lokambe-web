import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {ArticleBody} from '@/components/blog/ArticleBody';
import {ArticleHero} from '@/components/blog/ArticleHero';
import {LatestArticles} from '@/components/blog/LatestArticles';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {articlePath, blogPage} from '@/content/blog';
import {getArticle, listArticleSlugs, listLatestArticles} from '@/lib/api/articles';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string; slug: string}>};

/**
 * Les articles connus au moment du build sont pré-rendus ; ceux publiés
 * ensuite sont rendus à la première visite, puis mis en cache.
 */
export async function generateStaticParams() {
  const slugs = await listArticleSlugs();
  return slugs.map((slug) => ({slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return pageMetadata(
    {title: article.title, description: article.excerpt},
    {locale, path: articlePath(article.slug)},
  );
}

export default async function BlogArticlePage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <LatestArticles articles={await listLatestArticles(article.slug)} />
      <CtaBanner cta={blogPage.cta} />
    </>
  );
}
