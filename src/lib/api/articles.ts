import {blogArticles} from '@/content/blog';
import {fromApi, fromStatic} from '@/lib/blog/article';
import type {ApiArticle, Article} from '@/lib/blog/article';
import {normalizeBase} from './base';

/**
 * Lecture publique du blog.
 *
 * Les articles sont écrits dans le back-office et servis par l'API. Ces appels
 * partent du serveur Next — pas du navigateur — parce que la page du blog est
 * rendue côté serveur et mise en cache : un visiteur n'attend pas l'API.
 *
 * Si l'API est injoignable ou pas encore déployée, le blog montre les articles
 * d'exemple livrés avec le site plutôt qu'une page vide.
 */
const BLOG_API_URL = normalizeBase(
  process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? '',
);

export const isBlogApiConfigured = BLOG_API_URL !== '';

/** Étiquette de cache : les écritures du back-office la font expirer. */
export const ARTICLES_TAG = 'articles';

/** Le blog change rarement : cinq minutes suffisent à absorber le trafic. */
const REVALIDATE_SECONDS = 300;

/** Nombre d'articles rapatriés pour la page du blog. */
export const BLOG_PAGE_SIZE = 24;

type Outcome<T> = {kind: 'ok'; data: T} | {kind: 'missing'} | {kind: 'unavailable'};

async function get<T>(path: string): Promise<Outcome<T>> {
  if (!isBlogApiConfigured) return {kind: 'unavailable'};
  try {
    const response = await fetch(`${BLOG_API_URL}${path}`, {
      next: {revalidate: REVALIDATE_SECONDS, tags: [ARTICLES_TAG]},
    });
    if (response.status === 404) return {kind: 'missing'};
    if (!response.ok) return {kind: 'unavailable'};
    return {kind: 'ok', data: (await response.json()) as T};
  } catch {
    return {kind: 'unavailable'};
  }
}

/** Articles d'exemple, triés comme la liste publique. */
function examples(): Article[] {
  return blogArticles.map(fromStatic);
}

export type ArticleList = {
  articles: Article[];
  /** Vrai quand la liste vient des exemples, l'API n'ayant pas répondu. */
  fromExamples: boolean;
};

export async function listArticles(): Promise<ArticleList> {
  const result = await get<{items: ApiArticle[]}>(`/articles?limit=${BLOG_PAGE_SIZE}`);
  if (result.kind !== 'ok') return {articles: examples(), fromExamples: true};
  // Une base encore vide ne doit pas donner un blog vide au client.
  if (result.data.items.length === 0) return {articles: examples(), fromExamples: true};
  return {articles: result.data.items.map(fromApi), fromExamples: false};
}

/** `null` quand l'article n'existe pas ou n'est pas publié : la page rend un 404. */
export async function getArticle(slug: string): Promise<Article | null> {
  const result = await get<ApiArticle>(`/articles/${encodeURIComponent(slug)}`);
  if (result.kind === 'ok') return fromApi(result.data);
  if (result.kind === 'missing') {
    // L'API a répondu « inconnu » : l'article peut rester un exemple tant que
    // la base n'a pas été semée.
    const example = blogArticles.find((article) => article.slug === slug);
    return example ? fromStatic(example) : null;
  }
  const example = blogArticles.find((article) => article.slug === slug);
  return example ? fromStatic(example) : null;
}

/** Les derniers articles publiés, hors article courant. */
export async function listLatestArticles(excludeSlug: string, limit = 3): Promise<Article[]> {
  const {articles} = await listArticles();
  return articles.filter((article) => article.slug !== excludeSlug).slice(0, limit);
}

/** Slugs connus au moment du build, pour le pré-rendu des pages d'article. */
export async function listArticleSlugs(): Promise<string[]> {
  const {articles} = await listArticles();
  return articles.map((article) => article.slug);
}

/** URL de l'image d'article côté API, pour le relais du site. */
export function apiMediaUrl(fileId: string): string {
  return `${BLOG_API_URL}/articles/media/${encodeURIComponent(fileId)}`;
}
