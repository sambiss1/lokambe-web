import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {ArticleBody} from '@/components/blog/ArticleBody';
import {ArticleHero} from '@/components/blog/ArticleHero';
import {LatestArticles} from '@/components/blog/LatestArticles';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {articlePath} from '@/content/blog';
import {enabledLocales} from '@/i18n/locales';
import {getArticle, listArticleSlugs, listLatestArticles} from '@/lib/api/articles';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string; slug: string}>};

/**
 * Les articles connus au moment du build sont pré-rendus, langue par langue ;
 * ceux publiés ensuite sont rendus à la première visite, puis mis en cache.
 */
export async function generateStaticParams() {
  const perLocale = await Promise.all(
    enabledLocales.map(async (locale) => {
      const slugs = await listArticleSlugs(locale);
      return slugs.map((slug) => ({locale, slug}));
    }),
  );
  return perLocale.flat();
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const article = await getArticle(slug, locale);
  if (!article) return {};

  return pageMetadata(
    {title: article.title, description: article.excerpt},
    {locale, path: articlePath(article.slug)},
  );
}

export default async function BlogArticlePage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const article = await getArticle(slug, locale);
  if (!article) notFound();

  const t = await getTranslations({locale, namespace: 'blog'});

  return (
    <>
      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <LatestArticles articles={await listLatestArticles(article.slug, locale)} />
      <CtaBanner
        cta={{
          title: t('ctaTitle'),
          text: t('ctaText'),
          primary: {label: t('ctaPrimary'), href: '/soumettre-un-projet'},
          secondary: {label: t('ctaSecondary'), href: '/contact'},
        }}
      />
    </>
  );
}
