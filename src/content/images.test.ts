import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {describe, expect, it} from 'vitest';
import {fr} from './fr';

/** Toutes les valeurs portées par une clé donnée, quelle que soit leur profondeur. */
function collectByKey(node: unknown, wanted: string): string[] {
  if (Array.isArray(node)) return node.flatMap((child) => collectByKey(child, wanted));
  if (node !== null && typeof node === 'object') {
    return Object.entries(node).flatMap(([key, value]) =>
      key === wanted && typeof value === 'string' ? [value] : collectByKey(value, wanted),
    );
  }
  return [];
}

const publicFile = (src: string) => join(process.cwd(), 'public', src);

/** Les photographies du site : elles viennent de banques libres de droits. */
const photos = Array.from(new Set(collectByKey(fr, 'src')));
/** Les logos des entreprises du portefeuille : fournis par le client. */
const logos = Array.from(new Set(collectByKey(fr, 'logo')));

describe('images', () => {
  it('chaque image référencée dans le contenu existe dans public/', () => {
    expect(photos.length).toBeGreaterThanOrEqual(15);
    expect(logos.length).toBeGreaterThanOrEqual(7);
    expect([...photos, ...logos].filter((src) => !existsSync(publicFile(src)))).toEqual([]);
  });

  it('les assets de marque existent', () => {
    for (const src of ['/brand/logo-blue.png', '/brand/logo-white.png', '/images/og-default.jpg']) {
      expect(existsSync(publicFile(src)), src).toBe(true);
    }
  });

  it('chaque photo a une ligne de crédit', () => {
    const credits = readFileSync(publicFile('/images/CREDITS.md'), 'utf8');
    expect(photos.filter((src) => !credits.includes(src.replace('/images/', '')))).toEqual([]);
  });
});
