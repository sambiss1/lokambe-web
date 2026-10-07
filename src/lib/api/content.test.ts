import {describe, expect, it} from 'vitest';
import {localized} from './content';

/**
 * `localized` tient la cohérence des pages anglaises : la traduction complète
 * le français champ par champ au lieu de le remplacer en bloc. Une entrée
 * traduite à moitié doit donc donner une page lisible, pas des trous — c'est
 * exactement ce que ces cas vérifient.
 */

type Texte = {sector: string; status: string; description: string; missions: string[]};

const fr: Texte = {
  sector: 'Restauration',
  status: 'En développement',
  description: 'Un concept de restauration rapide, immersif et mémorable.',
  missions: ['Ouvrir deux points de vente', 'Former les équipes'],
};

describe('localized', () => {
  it('laisse le français intact quand c’est le français qu’on demande', () => {
    const en = {sector: 'Restaurants and catering', status: 'In development'};

    expect(localized(fr, en, 'fr')).toEqual(fr);
  });

  it('ne remplace que ce que la traduction dit vraiment', () => {
    const en = {sector: 'Restaurants and catering'};

    expect(localized(fr, en, 'en')).toEqual({...fr, sector: 'Restaurants and catering'});
  });

  it('ignore un champ anglais vide plutôt que de vider la page', () => {
    const en: Partial<Texte> = {
      sector: undefined,
      status: '',
      description: '   ',
      missions: [],
    };

    // Aucun de ces quatre « rien » ne doit écraser le français.
    expect(localized(fr, en, 'en')).toEqual(fr);
  });

  it('reprend le français quand il n’y a pas de traduction du tout', () => {
    expect(localized(fr, undefined, 'en')).toEqual(fr);
  });
});
