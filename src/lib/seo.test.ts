import {afterEach, describe, expect, it, vi} from 'vitest';
import {siteUrl} from './seo';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('siteUrl', () => {
  it('utilise NEXT_PUBLIC_SITE_URL et retire la barre oblique finale', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://lokambe.com/');
    expect(siteUrl()).toBe('https://lokambe.com');
  });

  it('ignore une variable vide et retombe sur le domaine de l’hébergeur', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL', 'lokambe-web.vercel.app');
    expect(siteUrl()).toBe('https://lokambe-web.vercel.app');
  });

  it('retombe sur localhost sans aucune variable', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL', '');
    vi.stubEnv('NEXT_PUBLIC_VERCEL_URL', '');
    expect(siteUrl()).toBe('http://localhost:3000');
  });

  it('ajoute le schéma si le domaine est fourni sans protocole', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'lokambe.com');
    expect(siteUrl()).toBe('https://lokambe.com');
  });
});
