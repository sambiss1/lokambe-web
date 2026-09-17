import type {MetadataRoute} from 'next';
import {blogArticles} from '@/content/blog';
import {enabledLocales} from '@/i18n/locales';
import {siteUrl} from '@/lib/seo';
import {PUBLIC_PATHS} from '@/lib/site-paths';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: {path: string; lastModified: Date}[] = [
    ...PUBLIC_PATHS.map((path) => ({path, lastModified: new Date()})),
    ...blogArticles.map((article) => ({
      path: `/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
    })),
  ];

  const url = (locale: string, path: string) => `${siteUrl()}/${locale}${path === '/' ? '' : path}`;

  return enabledLocales.flatMap((locale) =>
    pages.map(({path, lastModified}) => ({
      url: url(locale, path),
      lastModified,
      alternates: {
        languages: Object.fromEntries(enabledLocales.map((alternate) => [alternate, url(alternate, path)])),
      },
    })),
  );
}
