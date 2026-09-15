import type {MetadataRoute} from 'next';
import {enabledLocales} from '@/i18n/locales';
import {PUBLIC_PATHS} from '@/lib/site-paths';
import {siteUrl} from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return enabledLocales.flatMap((locale) =>
    PUBLIC_PATHS.map((path) => ({
      url: `${siteUrl()}/${locale}${path === '/' ? '' : path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          enabledLocales.map((alternate) => [alternate, `${siteUrl()}/${alternate}${path === '/' ? '' : path}`]),
        ),
      },
    })),
  );
}
