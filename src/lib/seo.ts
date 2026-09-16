import type {Metadata} from 'next';
import type {PageMeta} from '@/content/types';
import {DEFAULT_LOCALE, enabledLocales} from '@/i18n/locales';

/**
 * URL publique du site, sans barre oblique finale.
 * À défaut de `NEXT_PUBLIC_SITE_URL`, on retombe sur le domaine fourni par
 * l'hébergeur (Vercel) pour que les liens canoniques restent justes.
 */
export function siteUrl(): string {
  const vercelDomain =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? (vercelDomain ? `https://${vercelDomain}` : undefined);

  return (configured ?? 'http://localhost:3000').replace(/\/$/, '');
}

/** Liens canoniques et alternates par langue pour une page. */
export function buildAlternates(locale: string, path: string): NonNullable<Metadata['alternates']> {
  const suffix = path === '/' ? '' : path;
  const languages = Object.fromEntries(enabledLocales.map((code) => [code, `${siteUrl()}/${code}${suffix}`]));

  return {
    canonical: `${siteUrl()}/${locale}${suffix}`,
    languages: {...languages, 'x-default': `${siteUrl()}/${DEFAULT_LOCALE}${suffix}`},
  };
}

/** Métadonnées d'une page publique à partir de son contenu. */
export function pageMetadata(meta: PageMeta, options?: {locale: string; path: string}): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: options ? buildAlternates(options.locale, options.path) : undefined,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [{url: '/images/og-default.jpg', width: 1200, height: 630}],
      type: 'website',
    },
  };
}
