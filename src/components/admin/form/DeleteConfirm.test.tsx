import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import type {ComponentProps} from 'react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {ACTION_FAILURES} from '@/lib/api/action-result';
import type {ActionResult} from '@/lib/api/action-result';
import {DeleteConfirm} from './DeleteConfirm';

/**
 * L'écran de suppression est une page, pas une fenêtre : ces tests le tiennent.
 * Rien n'est moqué ici que la suppression elle-même — c'est tout l'intérêt
 * d'avoir quitté `window.confirm`, qui ne se testait qu'en détournant `window`.
 */

const push = vi.fn();
const refresh = vi.fn();
const remove = vi.fn<() => Promise<ActionResult<unknown>>>();

beforeEach(() => {
  push.mockClear();
  refresh.mockClear();
  remove.mockReset().mockResolvedValue({ok: true, data: null});
  vi.mocked(useRouter).mockReturnValue({
    push,
    refresh,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

function renderConfirm(props: Partial<ComponentProps<typeof DeleteConfirm>> = {}) {
  return render(
    <DeleteConfirm
      question="Supprimer « Bradamada » ?"
      consequence="L’entreprise disparaît du portefeuille et de la page d’accueil."
      cancelHref="/admin/portefeuille/portfolio-01"
      doneHref="/admin/portefeuille"
      remove={remove}
      {...props}
    />,
  );
}

describe('DeleteConfirm', () => {
  it('nomme ce qui disparaît et ce que cela entraîne, sur la page et non dans une boîte', () => {
    const confirm = vi.spyOn(window, 'confirm');
    renderConfirm();

    expect(screen.getByRole('heading', {name: 'Supprimer « Bradamada » ?'})).toBeInTheDocument();
    expect(screen.getByText(/disparaît du portefeuille/)).toBeInTheDocument();
    // La confirmation est un vrai bouton de la page : ni fenêtre, ni `window.confirm`.
    expect(screen.getByRole('button', {name: 'Supprimer définitivement'})).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(confirm).not.toHaveBeenCalled();
    confirm.mockRestore();
  });

  it('supprime puis renvoie là où l’enregistrement n’est plus attendu', async () => {
    const user = userEvent.setup();
    renderConfirm();

    await user.click(screen.getByRole('button', {name: 'Supprimer définitivement'}));

    await waitFor(() => expect(remove).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/admin/portefeuille'));
    // Sans rafraîchissement, la liste de retour montrerait encore la ligne supprimée.
    expect(refresh).toHaveBeenCalled();
  });

  it('reste sur place et dit pourquoi quand l’API refuse la suppression', async () => {
    const user = userEvent.setup();
    remove.mockResolvedValue({ok: false, reason: 'conflit'});
    renderConfirm();

    await user.click(screen.getByRole('button', {name: 'Supprimer définitivement'}));

    expect(await screen.findByRole('alert')).toHaveTextContent(ACTION_FAILURES.conflit);
    expect(push).not.toHaveBeenCalled();
    expect(refresh).not.toHaveBeenCalled();
  });

  it('ne propose rien à confirmer quand la suppression est refusée d’avance', () => {
    renderConfirm({blocked: 'Ce média est encore posé sur deux fiches publiées.'});

    expect(screen.getByRole('alert')).toHaveTextContent('encore posé sur deux fiches');
    // Aucun bouton de suppression : il n'y a rien à cliquer, même par insistance.
    expect(screen.queryByRole('button', {name: /Supprimer/})).toBeNull();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(remove).not.toHaveBeenCalled();
  });

  it('laisse toujours une sortie vers la page d’où l’on vient', () => {
    renderConfirm();

    expect(screen.getByRole('link', {name: 'Annuler'})).toHaveAttribute('href', '/admin/portefeuille/portfolio-01');
  });
});
