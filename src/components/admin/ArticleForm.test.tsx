import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {anArticle} from '@/lib/admin-fixtures';
import {createArticle, deleteArticle, updateArticle} from '@/lib/api/admin-actions';
import {ArticleForm} from './ArticleForm';

vi.mock('@/lib/api/admin-actions', () => ({
  createArticle: vi.fn(),
  updateArticle: vi.fn(),
  deleteArticle: vi.fn(),
}));

const push = vi.fn();
const refresh = vi.fn();

beforeEach(() => {
  push.mockClear();
  refresh.mockClear();
  vi.mocked(createArticle).mockReset().mockResolvedValue({ok: true, data: anArticle({id: 'nouveau-01'})});
  vi.mocked(updateArticle).mockReset().mockResolvedValue({ok: true, data: anArticle()});
  vi.mocked(deleteArticle).mockReset().mockResolvedValue({ok: true, data: {ok: true}});
  vi.mocked(useRouter).mockReturnValue({
    push,
    refresh,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

describe('ArticleForm', () => {
  it('déduit l’adresse publique du titre tant qu’on ne la touche pas', async () => {
    const user = userEvent.setup();
    render(<ArticleForm />);

    await user.type(screen.getByLabelText('Titre'), 'Fixer ses prix au restaurant');
    expect(screen.getByLabelText('Adresse de l’article')).toHaveValue('fixer-ses-prix-au-restaurant');
  });

  it('refuse d’enregistrer un article vide, sans appeler l’API', async () => {
    const user = userEvent.setup();
    render(<ArticleForm />);

    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    expect(await screen.findByRole('status')).toHaveTextContent('Donnez un titre');
    expect(createArticle).not.toHaveBeenCalled();
  });

  it('exige un chapô puis un contenu avant de créer', async () => {
    const user = userEvent.setup();
    render(<ArticleForm />);

    await user.type(screen.getByLabelText('Titre'), 'Un titre correct');
    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));
    expect(await screen.findByRole('status')).toHaveTextContent('chapô');

    await user.type(screen.getByLabelText('Chapô'), 'Deux phrases qui donnent envie de lire.');
    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));
    expect(await screen.findByRole('status')).toHaveTextContent('vide');
    expect(createArticle).not.toHaveBeenCalled();
  });

  it('publie un brouillon existant et renvoie sur sa fiche', async () => {
    const user = userEvent.setup();
    render(<ArticleForm article={anArticle({status: 'brouillon'})} />);

    await user.click(screen.getByRole('button', {name: 'Publier'}));

    await waitFor(() => expect(updateArticle).toHaveBeenCalled());
    expect(vi.mocked(updateArticle).mock.calls[0][1]).toMatchObject({status: 'publie'});
    expect(await screen.findByRole('status')).toHaveTextContent('Article publié.');
    expect(refresh).toHaveBeenCalled();
  });

  it('propose de repasser en brouillon un article publié', () => {
    render(<ArticleForm article={anArticle({status: 'publie'})} />);

    expect(screen.getByRole('button', {name: 'Repasser en brouillon'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Publier'})).not.toBeInTheDocument();
  });

  it('dit ce qu’il faut faire quand la session a expiré', async () => {
    vi.mocked(updateArticle).mockResolvedValue({ok: false, reason: 'session'});
    const user = userEvent.setup();
    render(<ArticleForm article={anArticle()} />);

    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    expect(await screen.findByRole('status')).toHaveTextContent('session a expiré');
  });

  it('demande confirmation avant de supprimer', async () => {
    const user = userEvent.setup();
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<ArticleForm article={anArticle()} />);

    await user.click(screen.getByRole('button', {name: /Supprimer/}));
    expect(deleteArticle).not.toHaveBeenCalled();

    confirm.mockReturnValue(true);
    await user.click(screen.getByRole('button', {name: /Supprimer/}));
    await waitFor(() => expect(deleteArticle).toHaveBeenCalledWith('article-01'));
    expect(push).toHaveBeenCalledWith('/admin/articles');
    confirm.mockRestore();
  });
});
