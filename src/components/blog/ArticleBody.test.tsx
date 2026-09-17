import {screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {BLOG_EXAMPLE_NOTICE, type BlogArticle, blogArticles, blogPage} from '@/content/blog';
import {renderWithIntl} from '@/test/render';
import {ArticleBody} from './ArticleBody';

const sample: BlogArticle = {
  ...blogArticles[0],
  body: [
    {kind: 'paragraph', text: 'Un paragraphe d’introduction.'},
    {kind: 'heading', text: 'Un intertitre'},
    {kind: 'list', title: 'Une liste titrée', items: ['Premier point', 'Deuxième point']},
    {kind: 'list', ordered: true, items: ['Étape une', 'Étape deux']},
    {kind: 'quote', text: 'Une citation marquante.', attribution: 'Source'},
  ],
};

describe('ArticleBody', () => {
  it('affiche la mention d’article d’exemple et l’image de couverture', () => {
    renderWithIntl(<ArticleBody article={sample} />);

    expect(screen.getByText(BLOG_EXAMPLE_NOTICE)).toBeInTheDocument();
    expect(screen.getByRole('img', {name: sample.image.alt})).toHaveAttribute('src', sample.image.src);
  });

  it('rend chaque type de bloc avec la bonne sémantique', () => {
    renderWithIntl(<ArticleBody article={sample} />);

    expect(screen.getByText('Un paragraphe d’introduction.').tagName).toBe('P');
    expect(screen.getByRole('heading', {level: 2, name: /Un intertitre/})).toBeInTheDocument();
    expect(screen.getByText('Une liste titrée')).toBeInTheDocument();
    expect(screen.getByText('Premier point').closest('ul')).not.toBeNull();
    expect(screen.getByText('Étape une').closest('ol')).not.toBeNull();
    expect(screen.getByText('Une citation marquante.').tagName).toBe('BLOCKQUOTE');
    expect(screen.getByText('Source').tagName).toBe('FIGCAPTION');
  });

  it('construit un sommaire ancré sur les intertitres', () => {
    renderWithIntl(<ArticleBody article={sample} />);

    const nav = screen.getByRole('navigation', {name: blogPage.tocLabel});
    const link = within(nav).getByRole('link', {name: 'Un intertitre'});
    const anchor = link.getAttribute('href')?.slice(1) ?? '';

    expect(anchor).not.toBe('');
    expect(screen.getByRole('heading', {level: 2, name: /Un intertitre/})).toHaveAttribute('id', anchor);
  });

  it('limite la colonne de lecture à 68 caractères', () => {
    renderWithIntl(<ArticleBody article={sample} />);
    const column = screen.getByText('Un paragraphe d’introduction.').parentElement;
    expect(column?.className).toContain('max-w-[68ch]');
  });
});
