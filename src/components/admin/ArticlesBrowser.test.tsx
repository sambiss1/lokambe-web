import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {anArticle, aPage} from '@/lib/admin-fixtures';
import {ArticlesBrowser} from './ArticlesBrowser';

const push = vi.fn();

const items = [
  anArticle(),
  anArticle({id: 'article-02', title: 'Fixer ses prix', slug: 'fixer-ses-prix', status: 'brouillon'}),
];

beforeEach(() => {
  push.mockClear();
  vi.mocked(useRouter).mockReturnValue({
    push,
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

describe('ArticlesBrowser', () => {
  it('distingue les brouillons des articles en ligne', () => {
    render(<ArticlesBrowser result={aPage(items)} filters={{}} pageSize={20} />);

    expect(screen.getByRole('link', {name: items[0].title})).toHaveAttribute('href', '/admin/articles/article-01');
    expect(screen.getByText('Publié')).toBeInTheDocument();
    expect(screen.getByText('Brouillon')).toBeInTheDocument();
  });

  it('porte le filtre d’état dans l’URL', async () => {
    const user = userEvent.setup();
    render(<ArticlesBrowser result={aPage(items)} filters={{}} pageSize={20} />);

    await user.click(screen.getByRole('button', {name: 'Brouillons'}));
    expect(push).toHaveBeenCalledWith('/admin/articles?status=brouillon');
  });

  it('garde le filtre en changeant de page', async () => {
    const user = userEvent.setup();
    render(
      <ArticlesBrowser
        result={aPage(items, {total: 45, page: 1})}
        filters={{status: 'publie'}}
        pageSize={20}
      />,
    );

    await user.click(screen.getByRole('button', {name: /Suivant/}));
    expect(push).toHaveBeenCalledWith('/admin/articles?status=publie&page=2');
  });

  it('invite à écrire quand la liste est vide', () => {
    render(<ArticlesBrowser result={aPage([], {total: 0})} filters={{status: 'brouillon'}} pageSize={20} />);
    expect(screen.getByText(/Aucun article/)).toBeInTheDocument();
  });
});
