import {describe, expect, it} from 'vitest';
import {entryImageUrl, formatDuration, formatMediaSize, mediaApiUrl, mediaFileUrl} from './url';

/**
 * Les adresses sont construites ici une fois pour tout le site : une barre
 * oblique de travers et plus aucune vignette ne s'affiche, sans message.
 */
describe('adresses des médias', () => {
  it('mène au fichier et à la fiche du même média', () => {
    expect(mediaFileUrl('media-image-01')).toMatch(/\/media\/media-image-01\/file$/);
    expect(mediaApiUrl('media-image-01')).toMatch(/\/media\/media-image-01$/);
  });

  it('échappe l’identifiant plutôt que de casser l’adresse', () => {
    // Un identifiant arrive de l'API : on ne suppose pas qu'il soit sans danger.
    expect(mediaFileUrl('a/b?c')).toMatch(/\/media\/a%2Fb%3Fc\/file$/);
    expect(mediaApiUrl('a b')).toMatch(/\/media\/a%20b$/);
  });
});

describe('entryImageUrl', () => {
  it('préfère le média téléversé à l’image livrée avec le site', () => {
    const url = entryImageUrl({mediaId: 'media-image-01', legacyImagePath: '/images/partners/niwali.webp'});
    expect(url).toMatch(/\/media\/media-image-01\/file$/);
  });

  /** Sans ce repli, une entrée d'amorçage perdrait son logo au premier rendu. */
  it('garde l’image livrée avec le site quand aucun média n’est posé', () => {
    expect(entryImageUrl({legacyImagePath: '/images/partners/niwali.webp'})).toBe('/images/partners/niwali.webp');
  });

  it('ne renvoie rien quand il n’y a ni média ni image : l’appelant montre son monogramme', () => {
    expect(entryImageUrl({})).toBeUndefined();
  });
});

describe('formatMediaSize', () => {
  it('reste en octets sous le kilo-octet', () => {
    expect(formatMediaSize(0)).toBe('0 o');
    expect(formatMediaSize(812)).toBe('812 o');
  });

  it('passe en kilo-octets puis en mégaoctets', () => {
    expect(formatMediaSize(2048)).toBe('2 ko');
    expect(formatMediaSize(812 * 1024)).toBe('812 ko');
    expect(formatMediaSize(1024 * 1024)).toBe('1,0 Mo');
  });

  it('écrit les décimales à la française, avec une virgule', () => {
    expect(formatMediaSize(4.2 * 1024 * 1024)).toBe('4,2 Mo');
    expect(formatMediaSize(24_117_248)).toBe('23,0 Mo');
  });
});

describe('formatDuration', () => {
  it('compte en secondes sous la minute', () => {
    expect(formatDuration(8)).toBe('8 s');
    expect(formatDuration(59)).toBe('59 s');
  });

  it('dit « 1 min » tout court quand il n’y a pas de reste', () => {
    expect(formatDuration(60)).toBe('1 min');
    expect(formatDuration(120)).toBe('2 min');
  });

  it('ajoute les secondes restantes', () => {
    expect(formatDuration(102.4)).toBe('1 min 42 s');
    expect(formatDuration(3_601)).toBe('60 min 1 s');
  });

  it('arrondit la durée mesurée par le navigateur, qui n’est jamais ronde', () => {
    expect(formatDuration(7.6)).toBe('8 s');
    expect(formatDuration(59.7)).toBe('1 min');
    expect(formatDuration(61.6)).toBe('1 min 2 s');
  });
});
