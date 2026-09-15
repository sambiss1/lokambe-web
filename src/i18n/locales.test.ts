import {describe, expect, it} from 'vitest';
import {DEFAULT_LOCALE, isLocale, parseEnabledLocales} from './locales';

describe('parseEnabledLocales', () => {
  it('retourne la locale par défaut si la variable est absente ou vide', () => {
    expect(parseEnabledLocales(undefined)).toEqual(['fr']);
    expect(parseEnabledLocales('')).toEqual(['fr']);
  });

  it('lit une liste séparée par des virgules en ignorant espaces et casse', () => {
    expect(parseEnabledLocales(' fr , EN ')).toEqual(['fr', 'en']);
  });

  it('ignore les locales inconnues et les doublons', () => {
    expect(parseEnabledLocales('fr,de,en,fr')).toEqual(['fr', 'en']);
  });

  it('ajoute toujours la locale par défaut en premier', () => {
    expect(parseEnabledLocales('en')).toEqual(['fr', 'en']);
    expect(parseEnabledLocales('en,fr')).toEqual(['fr', 'en']);
  });
});

describe('isLocale', () => {
  it('reconnaît uniquement les locales supportées', () => {
    expect(isLocale('fr')).toBe(true);
    expect(isLocale('en')).toBe(true);
    expect(isLocale('ln')).toBe(false);
  });

  it('a le français comme locale par défaut', () => {
    expect(DEFAULT_LOCALE).toBe('fr');
  });
});
