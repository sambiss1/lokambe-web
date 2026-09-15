import {describe, expect, it} from 'vitest';
import {isPublicPath} from '@/lib/site-paths';
import {getContent} from './index';
import {en} from './en';
import {fr} from './fr';

type Leaf = {path: string; key: string; value: unknown};

function collectLeaves(node: unknown, path = 'root'): Leaf[] {
  if (Array.isArray(node)) return node.flatMap((child, index) => collectLeaves(child, `${path}[${index}]`));
  if (node !== null && typeof node === 'object') {
    return Object.entries(node).flatMap(([key, child]) =>
      child !== null && typeof child === 'object'
        ? collectLeaves(child, `${path}.${key}`)
        : [{path: `${path}.${key}`, key, value: child}],
    );
  }
  return [];
}

describe('getContent', () => {
  it('retourne le contenu de la locale demandée', () => {
    expect(getContent('fr')).toBe(fr);
    expect(getContent('en')).toBe(en);
  });

  it('retombe sur le français pour une locale inconnue', () => {
    expect(getContent('de')).toBe(fr);
  });
});

describe.each([
  ['fr', fr],
  ['en', en],
])('contenu %s', (_locale, content) => {
  const leaves = collectLeaves(content);

  it('ne contient aucune chaîne vide', () => {
    const empty = leaves.filter((leaf) => typeof leaf.value === 'string' && leaf.value.trim() === '');
    expect(empty.map((leaf) => leaf.path)).toEqual([]);
  });

  it('ne pointe que vers des chemins publics connus', () => {
    const invalid = leaves.filter(
      (leaf) => leaf.key === 'href' && typeof leaf.value === 'string' && !leaf.value.startsWith('mailto:') && !leaf.value.startsWith('https://') && !isPublicPath(leaf.value),
    );
    expect(invalid.map((leaf) => `${leaf.path} = ${String(leaf.value)}`)).toEqual([]);
  });

  it('référence des images WebP dans /images/', () => {
    const invalid = leaves.filter(
      (leaf) => leaf.key === 'src' && (typeof leaf.value !== 'string' || !/^\/images\/[a-z0-9-]+\.webp$/.test(leaf.value)),
    );
    expect(invalid.map((leaf) => leaf.path)).toEqual([]);
  });
});
