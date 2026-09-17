import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {ArticleBody} from '@/components/blog/ArticleBody';
import {ArticleHero} from '@/components/blog/ArticleHero';
import {LatestArticles} from '@/components/blog/LatestArticles';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {articlePath, blogPage, blogSlugs, getArticleBySlug, getLatestArticles} from '@/content/blog';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string; slug: string}>};

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return pageMetadata(
    {title: article.title, description: article.excerpt},
    {locale, path: articlePath(article.slug)},
  );
}

export default async function BlogArticlePage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <LatestArticles articles={getLatestArticles(3, article.slug)} />
      <CtaBanner cta={blogPage.cta} />
    </>
  );
}
