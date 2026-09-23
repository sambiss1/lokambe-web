import type {BlogArticle, BlogBlock, BlogCategoryId} from '@/content/blog';
import {headingAnchor} from '@/content/blog';

/**
 * Le modèle d'article manipulé par les écrans.
 *
 * Il vient soit de l'API (articles écrits dans le back-office), soit des
 * articles d'exemple livrés avec le site quand l'API est injoignable. Les deux
 * sources donnent la même forme : les composants n'ont pas à savoir laquelle.
 */
export type Article = {
  /** Identifiant API, ou le slug pour un article d'exemple. */
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryId;
  author: string;
  /** Date de publication au format ISO (AAAA-MM-JJ). */
  publishedAt: string;
  readingMinutes: number;
  image: {src: string; alt: string};
  /** Corps de l'article en HTML, déjà nettoyé par l'API. */
  html: string;
  /** Article de démonstration : la page l'annonce au lecteur. */
  isExample: boolean;
};

/** Forme renvoyée par l'API. Le corps est absent des listes. */
export type ApiArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: BlogCategoryId;
  author: string;
  status: 'brouillon' | 'publie';
  publishedAt?: string;
  readingMinutes: number;
  coverFileId?: string;
  coverAlt?: string;
  isExample: boolean;
  locale: string;
  createdAt: string;
  updatedAt: string;
};

/** Image de repli quand l'article n'a pas de couverture téléversée. */
const FALLBACK_COVER: Record<BlogCategoryId, string> = {
  entrepreneuriat: '/images/sector-services.webp',
  financement: '/images/investors-hero.webp',
  creation: '/images/model-hero.webp',
  commerce: '/images/sector-commerce.webp',
  restauration: '/images/sector-restauration.webp',
  investissement: '/images/impact-hero.webp',
  histoires: '/images/governance-hero.webp',
  portefeuille: '/images/home-kinshasa.webp',
};

/** URL publique d'une image stockée par l'API, servie par le site pour rester sur le même domaine. */
export function mediaPath(fileId: string): string {
  return `/api/articles/media/${encodeURIComponent(fileId)}`;
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Un bloc d'article d'exemple rendu dans le même HTML que celui de l'éditeur. */
function blockToHtml(block: BlogBlock): string {
  if (block.kind === 'heading') return `<h2>${escapeHtml(block.text)}</h2>`;
  if (block.kind === 'quote') {
    const attribution = block.attribution
      ? `<p><em>— ${escapeHtml(block.attribution)}</em></p>`
      : '';
    return `<blockquote><p>${escapeHtml(block.text)}</p>${attribution}</blockquote>`;
  }
  if (block.kind === 'list') {
    const tag = block.ordered ? 'ol' : 'ul';
    const title = block.title ? `<h3>${escapeHtml(block.title)}</h3>` : '';
    const items = block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
    return `${title}<${tag}>${items}</${tag}>`;
  }
  return `<p>${escapeHtml(block.text)}</p>`;
}

export function blocksToHtml(blocks: readonly BlogBlock[]): string {
  return blocks.map(blockToHtml).join('');
}

export function fromStatic(article: BlogArticle): Article {
  return {
    id: article.slug,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    author: article.author,
    publishedAt: article.publishedAt,
    readingMinutes: article.readingMinutes,
    image: article.image,
    html: blocksToHtml(article.body),
    isExample: true,
  };
}

export function fromApi(article: ApiArticle): Article {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    author: article.author,
    // Un brouillon n'a pas de date : on montre la dernière modification.
    publishedAt: (article.publishedAt ?? article.updatedAt).slice(0, 10),
    readingMinutes: article.readingMinutes,
    image: article.coverFileId
      ? {src: mediaPath(article.coverFileId), alt: article.coverAlt ?? ''}
      : {src: FALLBACK_COVER[article.category] ?? FALLBACK_COVER.entrepreneuriat, alt: ''},
    html: article.content ?? '',
    isExample: article.isExample,
  };
}

export type TocEntry = {id: string; text: string};

/**
 * Pose une ancre sur chaque titre du corps et rend le sommaire.
 *
 * Le HTML vient de l'API, qui n'a laissé aux titres aucun attribut : un `<h2>`
 * y est toujours nu, ce qui rend la substitution sûre.
 */
export function withHeadingAnchors(html: string): {html: string; toc: TocEntry[]} {
  const toc: TocEntry[] = [];
  const anchored = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_match, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = headingAnchor(text, toc.length);
    toc.push({id, text});
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return {html: anchored, toc};
}

/**
 * Même règle que l'API : le back-office propose le slug pendant la saisie,
 * l'API tranche à l'enregistrement (et le numérote s'il existe déjà).
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
}

/** Vrai quand le corps ne contient que du balisage vide. */
export function isEmptyHtml(html: string): boolean {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() === '';
}
