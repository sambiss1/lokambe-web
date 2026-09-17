import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import {blogArticles, blogPage, getCategory, getUsedCategories} from '@/content/blog';
import {renderWithIntl} from '@/test/render';
import {BlogList} from './BlogList';

const articleLinks = () =>
  screen.getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('/fr/blog/'));

describe('BlogList', () => {
  it('affiche tous les articles et le compteur', () => {
    renderWithIntl(<BlogList />);

    expect(articleLinks()).toHaveLength(blogArticles.length);
    expect(screen.getByText(blogPage.countLabel(blogArticles.length))).toBeInTheDocument();
    expect(screen.getByText(blogPage.featuredLabel)).toBeInTheDocument();
  });

  it('propose une pastille par thème utilisé, « tous » étant actif au départ', () => {
    renderWithIntl(<BlogList />);

    const group = screen.getByRole('group', {name: blogPage.filterLabel});
    expect(group.querySelectorAll('button')).toHaveLength(getUsedCategories().length + 1);
    expect(screen.getByRole('button', {name: blogPage.allLabel})).toHaveAttribute('aria-pressed', 'true');
  });

  it('filtre les articles sur le thème choisi puis revient à la liste complète', async () => {
    const user = userEvent.setup();
    renderWithIntl(<BlogList />);

    const category = getCategory('restauration');
    const expected = blogArticles.filter((article) => article.category === 'restauration');

    await user.click(screen.getByRole('button', {name: category.label}));
    expect(screen.getByRole('button', {name: category.label})).toHaveAttribute('aria-pressed', 'true');
    expect(articleLinks()).toHaveLength(expected.length);
    expect(screen.getByRole('link', {name: expected[0].title})).toBeInTheDocument();
    expect(screen.queryByText(blogPage.featuredLabel)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: blogPage.allLabel}));
    expect(articleLinks()).toHaveLength(blogArticles.length);
  });
});
