import {describe, expect, it} from 'vitest';
import en from '../../../messages/en.json';
import {careersEn} from '../careers';
import {fr} from '../fr';
import {teamEn} from '../team';
import {en as content} from './index';

/**
 * Le piège d'une traduction faite fichier par fichier, c'est la phrase oubliée :
 * la structure est identique (TypeScript s'en charge), mais le texte est resté
 * français. Ces tests cherchent le français là où il ne devrait plus être.
 */

/** Mots français fréquents, jamais des mots anglais. */
const FRENCH_WORDS = [
  'le',
  'la',
  'les',
  'des',
  'une',
  'nous',
  'vous',
  'pour',
  'avec',
  'dans',
  'est',
  'sont',
  'qui',
  'que',
  'leur',
  'plus',
  'sur',
  'aux',
  'ses',
  'cette',
];

const FRENCH = new RegExp(`(^|[^a-zà-ÿ])(${FRENCH_WORDS.join('|')})([^a-zà-ÿ]|$)`, 'i');

/** Chemins d'images et liens : ils restent en français, c'est l'URL du site. */
const TECHNICAL_KEYS = new Set(['src', 'href', 'id', 'slug']);

function texts(node: unknown, key = ''): string[] {
  if (typeof node === 'string') {
    if (TECHNICAL_KEYS.has(key)) return [];
    if (node.startsWith('/') || node.startsWith('http') || node.startsWith('mailto:')) return [];
    return [node];
  }
  if (Array.isArray(node)) return node.flatMap((item) => texts(item, key));
  if (node !== null && typeof node === 'object') {
    return Object.entries(node).flatMap(([childKey, value]) => texts(value, childKey));
  }
  return [];
}

const SOURCES: [string, unknown][] = [
  ['le contenu des pages', content],
  ['les libellés courts', en],
  ['la page équipe', teamEn],
  ['la page carrières', careersEn],
];

describe('version anglaise', () => {
  it.each(SOURCES)('%s ne contient plus de phrase française', (_label, source) => {
    const french = texts(source).filter((text) => FRENCH.test(text));
    expect(french).toEqual([]);
  });

  it('n’a pas gardé une phrase identique au français', () => {
    const frenchTexts = new Set(texts(fr).filter((text) => text.length > 30));
    const repeated = texts(content).filter((text) => text.length > 30 && frenchTexts.has(text));
    expect(repeated).toEqual([]);
  });

  it('garde le slogan en lingala', () => {
    expect(content.home.hero.titleLines.join(' ')).toBe('Musapi moko esokolaka elongi te.');
  });

  it('garde les adresses françaises, qui sont celles du site', () => {
    expect(content.home.hero.primary.href).toBe('/soumettre-un-projet');
    expect(content.home.sectors.link.href).toBe('/secteurs-et-criteres');
  });
});
