import {existsSync} from 'node:fs';
import {join} from 'node:path';
import {describe, expect, it} from 'vitest';
import {
  BLOG_AUTHOR,
  BLOG_BASE_PATH,
  type BlogArticle,
  articlePath,
  blogArticles,
  blogCategories,
  blogSlugs,
  formatArticleDate,
  formatReadingTime,
  getArticleBySlug,
  getCategory,
  getLatestArticles,
  getUsedCategories,
} from '@/content/blog';

const CATEGORY_IDS = blogCategories.map((category) => category.id);

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
    expect(getUsedCategories().map((category) => category.id)).toEqual(CATEGORY_IDS);
  });

  it('a des identifiants uniques et utilisables dans une URL', () => {
    expect(new Set(blogSlugs).size).toBe(blogArticles.length);
    for (const slug of blogSlugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
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
  it('retrouve un article par son identifiant', () => {
    expect(getArticleBySlug(blogSlugs[0])?.slug).toBe(blogSlugs[0]);
    expect(getArticleBySlug('inconnu')).toBeUndefined();
  });

  it('propose les derniers articles en excluant celui que l’on lit', () => {
    const latest = getLatestArticles(3, blogSlugs[0]);
    expect(latest).toHaveLength(3);
    expect(latest.map((article) => article.slug)).not.toContain(blogSlugs[0]);
  });

  it('construit les chemins relatifs à la locale', () => {
    expect(BLOG_BASE_PATH).toBe('/blog');
    expect(articlePath('mon-article')).toBe('/blog/mon-article');
  });

  it('met la date en français et la durée de lecture en clair', () => {
    expect(formatArticleDate('2026-09-02')).toBe('2 septembre 2026');
    expect(formatReadingTime(5)).toBe('5 min de lecture');
  });

  it('retombe sur la première catégorie pour un identifiant inconnu', () => {
    expect(getCategory('entrepreneuriat').label).toBe('Entrepreneuriat congolais');
  });
});
