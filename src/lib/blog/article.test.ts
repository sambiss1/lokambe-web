import {describe, expect, it} from 'vitest';
import {blogArticles} from '@/content/blog';
import {blocksToHtml, fromApi, fromStatic, isEmptyHtml, mediaPath, slugify, withHeadingAnchors} from './article';
import type {ApiArticle} from './article';

const apiArticle: ApiArticle = {
  id: '65f000000000000000000001',
  slug: 'tenir-sa-caisse',
  title: 'Tenir sa caisse',
  excerpt: 'Un cahier, une règle, tous les jours.',
  content: '<h2>Commencer</h2><p>Écrire ce qui entre.</p>',
  category: 'entrepreneuriat',
  author: 'L’équipe LOKAMBE',
  status: 'publie',
  publishedAt: '2026-03-01T08:00:00.000Z',
  readingMinutes: 4,
  isExample: false,
  locale: 'fr',
  createdAt: '2026-02-20T08:00:00.000Z',
  updatedAt: '2026-03-01T08:00:00.000Z',
};

describe('fromApi', () => {
  it('raccourcit la date de publication et garde le corps', () => {
    const article = fromApi(apiArticle);
    expect(article.publishedAt).toBe('2026-03-01');
    expect(article.html).toContain('<h2>Commencer</h2>');
  });

  it('sert la couverture téléversée depuis le site, pas depuis l’API', () => {
    const article = fromApi({...apiArticle, coverFileId: 'abc123', coverAlt: 'Un cahier'});
    expect(article.image).toEqual({src: mediaPath('abc123'), alt: 'Un cahier'});
  });

  it('retombe sur une photo de la catégorie sans couverture', () => {
    const article = fromApi({...apiArticle, category: 'restauration'});
    expect(article.image.src).toBe('/images/sector-restauration.webp');
    expect(article.image.alt).toBe('');
  });

  it('montre la date de modification d’un brouillon sans date de publication', () => {
    const {publishedAt: _ignored, ...draft} = apiArticle;
    expect(fromApi({...draft, status: 'brouillon'}).publishedAt).toBe('2026-03-01');
  });
});

describe('fromStatic', () => {
  it('rend les articles d’exemple dans le même HTML', () => {
    const article = fromStatic(blogArticles[0]);
    expect(article.isExample).toBe(true);
    expect(article.html.startsWith('<')).toBe(true);
    expect(article.html).not.toContain('undefined');
  });

  it('échappe les chevrons du texte', () => {
    expect(blocksToHtml([{kind: 'paragraph', text: 'a < b & c'}])).toBe('<p>a &lt; b &amp; c</p>');
  });
});

describe('withHeadingAnchors', () => {
  it('ancre chaque titre et construit le sommaire', () => {
    const {html, toc} = withHeadingAnchors('<h2>Premier</h2><p>x</p><h2>Second</h2>');
    expect(toc).toEqual([
      {id: expect.any(String), text: 'Premier'},
      {id: expect.any(String), text: 'Second'},
    ]);
    expect(html).toContain(`<h2 id="${toc[0].id}">Premier</h2>`);
    expect(toc[0].id).not.toBe(toc[1].id);
  });

  it('laisse un corps sans titre intact', () => {
    const {html, toc} = withHeadingAnchors('<p>Rien à ancrer</p>');
    expect(html).toBe('<p>Rien à ancrer</p>');
    expect(toc).toEqual([]);
  });
});

describe('slugify', () => {
  it('translittère et relie par des tirets', () => {
    expect(slugify('Fixer ses prix à Kinshasa !')).toBe('fixer-ses-prix-a-kinshasa');
  });

  it('rend une chaîne vide pour un titre sans lettre', () => {
    expect(slugify('  —  ')).toBe('');
  });
});

describe('isEmptyHtml', () => {
  it('reconnaît un corps vide de l’éditeur', () => {
    expect(isEmptyHtml('<p></p>')).toBe(true);
    expect(isEmptyHtml('<p>&nbsp;</p>')).toBe(true);
    expect(isEmptyHtml('<p>Un mot</p>')).toBe(false);
  });
});
