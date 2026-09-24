import {screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {blogArticles, getCategory} from '@/content/blog';
import {fromStatic} from '@/lib/blog/article';
import {renderWithIntl} from '@/test/render';
import {BlogCard} from './BlogCard';

const article = fromStatic(blogArticles[0]);

describe('BlogCard', () => {
  it('affiche le titre, l’accroche et le lien vers l’article', () => {
    renderWithIntl(<BlogCard article={article} />);

    const link = screen.getByRole('link', {name: article.title});
    expect(link).toHaveAttribute('href', `/fr/blog/${article.slug}`);
    expect(screen.getByText(article.excerpt)).toBeInTheDocument();
  });

  it('affiche le thème, la date, la durée de lecture et la mention d’exemple', () => {
    renderWithIntl(<BlogCard article={article} />);

    expect(screen.getByText(getCategory(article.category).short)).toBeInTheDocument();
    expect(screen.getByText(/min de lecture/)).toBeInTheDocument();
    expect(screen.getByText(/Article d’exemple/)).toBeInTheDocument();
    expect(document.querySelector(`time[datetime="${article.publishedAt}"]`)).not.toBeNull();
  });

  it('utilise un titre de niveau 2 pour la carte à la une', () => {
    renderWithIntl(<BlogCard article={article} featured headingLevel="h2" />);
    expect(screen.getByRole('heading', {level: 2, name: article.title})).toBeInTheDocument();
  });

  it('utilise un titre de niveau 3 par défaut', () => {
    renderWithIntl(<BlogCard article={article} />);
    expect(screen.getByRole('heading', {level: 3, name: article.title})).toBeInTheDocument();
  });
});
