import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {describe, expect, it} from 'vitest';
import {fr} from './fr';

function collectImageSources(node: unknown): string[] {
  if (Array.isArray(node)) return node.flatMap(collectImageSources);
  if (node !== null && typeof node === 'object') {
    return Object.entries(node).flatMap(([key, value]) =>
      key === 'src' && typeof value === 'string' ? [value] : collectImageSources(value),
    );
  }
  return [];
}

const publicFile = (src: string) => join(process.cwd(), 'public', src);
const sources = Array.from(new Set(collectImageSources(fr)));

describe('images', () => {
  it('chaque image référencée dans le contenu existe dans public/', () => {
    expect(sources.length).toBeGreaterThanOrEqual(16);
    expect(sources.filter((src) => !existsSync(publicFile(src)))).toEqual([]);
  });

  it('les assets de marque existent', () => {
    for (const src of ['/brand/logo-blue.png', '/brand/logo-white.png', '/images/og-default.jpg']) {
      expect(existsSync(publicFile(src)), src).toBe(true);
    }
  });

  it('chaque photo a une ligne de crédit', () => {
    const credits = readFileSync(publicFile('/images/CREDITS.md'), 'utf8');
    expect(sources.filter((src) => !credits.includes(src.replace('/images/', '')))).toEqual([]);
  });
});
