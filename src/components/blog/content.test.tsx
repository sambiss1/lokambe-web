import {existsSync} from 'node:fs';
import {join} from 'node:path';
import {describe, expect, it} from 'vitest';
import {
  BLOG_AUTHOR,
  BLOG_BASE_PATH,
  type BlogArticle,
  articlePath,
  blogArticles,
  FALLBACK_BLOG_CATEGORIES,
  formatArticleDate,
  getCategory,
} from '@/content/blog';

/**
 * Ces huit articles ne sont plus le blog : ils en sont le repli, affiché quand
 * l'API ne répond pas. Ils restent tenus aux mêmes exigences éditoriales.
 */
const slugs = blogArticles.map((article) => article.slug);

const CATEGORY_IDS = FALLBACK_BLOG_CATEGORIES.map((category) => category.id);

function words(article: BlogArticle): number {
  return article.body
    .flatMap((block) => (block.kind === 'list' ? [block.title ?? '', ...block.items] : [block.text]))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

describe('contenu du blog', () => {
  it('contient huit articles, triés du plus récent au plus ancien', () => {
    expect(blogArticles).toHaveLength(8);
    const dates = blogArticles.map((article) => article.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('couvre tous les thèmes annoncés dans le filtre', () => {
    const used = new Set(blogArticles.map((article) => article.category));
    expect(CATEGORY_IDS.filter((id) => used.has(id))).toEqual(CATEGORY_IDS);
  });

  it('a des identifiants uniques et utilisables dans une URL', () => {
    expect(new Set(slugs).size).toBe(blogArticles.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it.each(blogArticles.map((article) => [article.slug, article] as const))('%s est complet', (_slug, article) => {
    expect(article.title.length).toBeGreaterThan(10);
    expect(article.excerpt.length).toBeGreaterThan(40);
    expect(CATEGORY_IDS).toContain(article.category);
    expect(article.publishedAt).toMatch(/^2026-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);
    expect(article.readingMinutes).toBeGreaterThanOrEqual(3);
    expect(article.readingMinutes).toBeLessThanOrEqual(12);
    expect(article.author).toBe(BLOG_AUTHOR);
    expect(words(article)).toBeGreaterThanOrEqual(450);
    expect(words(article)).toBeLessThanOrEqual(900);
  });

  it.each(blogArticles.map((article) => [article.slug, article] as const))(
    '%s a une structure éditoriale complète',
    (_slug, article) => {
      const kinds = article.body.map((block) => block.kind);
      expect(article.body[0]?.kind).toBe('paragraph');
      expect(kinds).toContain('heading');
      expect(kinds).toContain('list');
      expect(kinds).toContain('quote');
      for (const block of article.body) {
        if (block.kind === 'list') expect(block.items.length).toBeGreaterThanOrEqual(3);
        else expect(block.text.trim().length).toBeGreaterThan(0);
      }
    },
  );

  it('ne référence que des images présentes dans public/', () => {
    for (const article of blogArticles) {
      expect(article.image.alt.length).toBeGreaterThan(5);
      expect(existsSync(join(process.cwd(), 'public', article.image.src)), article.image.src).toBe(true);
    }
  });

  it('les mois de publication sont répartis sur l’année', () => {
    const months = new Set(blogArticles.map((article) => article.publishedAt.slice(0, 7)));
    expect(months.size).toBe(8);
  });
});

describe('aides du blog', () => {
  it('construit les chemins relatifs à la locale', () => {
    expect(BLOG_BASE_PATH).toBe('/blog');
    expect(articlePath('mon-article')).toBe('/blog/mon-article');
  });

  it('met la date dans la langue de la page', () => {
    expect(formatArticleDate('2026-09-02')).toBe('2 septembre 2026');
    expect(formatArticleDate('2026-09-02', 'en')).toBe('2 September 2026');
  });

  it('nomme un thème de la liste de repli', () => {
    expect(getCategory('entrepreneuriat').label).toBe('Entrepreneuriat congolais');
  });

  /**
   * Les thèmes s'administrent : la liste livrée avec le site ne les connaît
   * pas tous. Rendre le premier de la liste afficherait « Entrepreneuriat
   * congolais » sur un article qui n'en est pas — mieux vaut son propre slug.
   */
  it('rend le slug lui-même pour un thème qu’elle ne connaît pas', () => {
    expect(getCategory('gouvernance').label).toBe('gouvernance');
  });

  it('cherche d’abord dans la liste qu’on lui donne', () => {
    const served = [{id: 'gouvernance', label: 'Gouvernance & gestion', short: 'Gouvernance'}];
    expect(getCategory('gouvernance', served).label).toBe('Gouvernance & gestion');
  });
});
