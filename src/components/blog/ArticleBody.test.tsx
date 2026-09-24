import {screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {BLOG_EXAMPLE_NOTICE, blogArticles, blogPage} from '@/content/blog';
import {fromStatic} from '@/lib/blog/article';
import type {Article} from '@/lib/blog/article';
import {renderWithIntl} from '@/test/render';
import {ArticleBody} from './ArticleBody';

const sample: Article = {
  ...fromStatic(blogArticles[0]),
  html: [
    '<p>Un paragraphe d’introduction.</p>',
    '<h2>Un intertitre</h2>',
    '<h3>Une liste titrée</h3><ul><li>Premier point</li><li>Deuxième point</li></ul>',
    '<ol><li>Étape une</li><li>Étape deux</li></ol>',
    '<blockquote><p>Une citation marquante.</p><p><em>— Source</em></p></blockquote>',
  ].join(''),
};

describe('ArticleBody', () => {
  it('affiche la mention d’article d’exemple et l’image de couverture', () => {
    renderWithIntl(<ArticleBody article={sample} />);

    expect(screen.getByText(BLOG_EXAMPLE_NOTICE)).toBeInTheDocument();
    expect(screen.getByRole('img', {name: sample.image.alt})).toHaveAttribute('src', sample.image.src);
  });

  it('rend le HTML de l’article avec la bonne sémantique', () => {
    renderWithIntl(<ArticleBody article={sample} />);

    expect(screen.getByText('Un paragraphe d’introduction.').tagName).toBe('P');
    expect(screen.getByRole('heading', {level: 2, name: /Un intertitre/})).toBeInTheDocument();
    expect(screen.getByText('Une liste titrée')).toBeInTheDocument();
    expect(screen.getByText('Premier point').closest('ul')).not.toBeNull();
    expect(screen.getByText('Étape une').closest('ol')).not.toBeNull();
    expect(screen.getByText('Une citation marquante.').closest('blockquote')).not.toBeNull();
    expect(screen.getByText('— Source').tagName).toBe('EM');
  });

  it('n’annonce pas un exemple pour un article écrit dans le back-office', () => {
    renderWithIntl(<ArticleBody article={{...sample, isExample: false}} />);
    expect(screen.queryByText(BLOG_EXAMPLE_NOTICE)).not.toBeInTheDocument();
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
