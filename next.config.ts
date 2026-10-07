import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import {DEFAULT_API_URL, normalizeBase} from './src/lib/api/base';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * Les médias téléversés sont servis par l'API, pas par le site : une vidéo doit
 * répondre aux demandes d'intervalles d'octets du lecteur, ce qu'un relais
 * passant par une fonction Vercel ferait mal. `next/image` n'optimise une image
 * distante que si son hôte est déclaré ici.
 */
function apiImageHost(): NonNullable<NonNullable<NextConfig['images']>['remotePatterns']> {
  const base =
    normalizeBase(process.env.NEXT_PUBLIC_API_URL ?? process.env.API_INTERNAL_URL ?? '') ||
    normalizeBase(DEFAULT_API_URL);
  try {
    const url = new URL(base);
    return [
      {
        protocol: url.protocol === 'http:' ? 'http' : 'https',
        hostname: url.hostname,
        ...(url.port ? {port: url.port} : {}),
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {formats: ['image/avif', 'image/webp'], remotePatterns: apiImageHost()},
};

export default withNextIntl(nextConfig);
