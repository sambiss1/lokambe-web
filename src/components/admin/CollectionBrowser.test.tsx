import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import type {ComponentProps} from 'react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {aPortfolioCompany} from '@/lib/admin-fixtures';
import {ACTION_FAILURES} from '@/lib/api/action-result';
import {reorderCollection} from '@/lib/api/content-actions';
import {CollectionBrowser} from './CollectionBrowser';

vi.mock('@/lib/api/content-actions', () => ({reorderCollection: vi.fn()}));

const refresh = vi.fn();

/** Une ligne de liste : l'entrée de l'API, plus ce que l'écran en affiche. */
function aRow(id: string, label: string) {
  const company = aPortfolioCompany({id, name: label, slug: id});
  return {...company, label, detail: company.fr.sector};
}

const rows = [aRow('portfolio-01', 'Bradamada'), aRow('portfolio-02', 'Kin Fresh'), aRow('portfolio-03', 'Mama Nzila')];

beforeEach(() => {
  refresh.mockClear();
  vi.mocked(reorderCollection)
    .mockReset()
    .mockResolvedValue({ok: true, data: {ok: true}});
  vi.mocked(useRouter).mockReturnValue({
    refresh,
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

function renderBrowser(props: Partial<ComponentProps<typeof CollectionBrowser>> = {}) {
  return render(
    <CollectionBrowser
      collection="portfolio"
      rows={rows}
      total={rows.length}
      noun="entreprise"
      emptyLabel="Aucune entreprise pour l’instant."
      {...props}
    />,
  );
}

describe('CollectionBrowser', () => {
  it('mène de chaque ligne à sa fiche', () => {
    renderBrowser();

    expect(screen.getByRole('link', {name: 'Bradamada'})).toHaveAttribute('href', '/admin/portefeuille/portfolio-01');
    expect(screen.getByRole('link', {name: 'Mama Nzila'})).toHaveAttribute('href', '/admin/portefeuille/portfolio-03');
  });

  it('porte le filtre d’état dans l’adresse, et dit lequel est actif', () => {
    renderBrowser({status: 'publie'});

    expect(screen.getByRole('link', {name: 'Publiés'})).toHaveAttribute('href', '/admin/portefeuille?status=publie');
    expect(screen.getByRole('link', {name: 'Brouillons'})).toHaveAttribute(
      'href',
      '/admin/portefeuille?status=brouillon',
    );
    // Un filtre est un lien partageable : l'état actif doit être annoncé, pas seulement coloré.
    expect(screen.getByRole('link', {name: 'Publiés'})).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', {name: 'Tout'})).not.toHaveAttribute('aria-current');
  });

  it('échange deux lignes et envoie l’ordre entier', async () => {
    const user = userEvent.setup();
    renderBrowser();

    await user.click(screen.getByRole('button', {name: 'Remonter « Kin Fresh »'}));

    await waitFor(() =>
      expect(reorderCollection).toHaveBeenCalledWith('portfolio', ['portfolio-02', 'portfolio-01', 'portfolio-03']),
    );
    await waitFor(() => expect(refresh).toHaveBeenCalled());
  });

  it('n’offre pas de sortir de la liste par le haut ni par le bas', () => {
    renderBrowser();

    expect(screen.getByRole('button', {name: 'Remonter « Bradamada »'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Descendre « Mama Nzila »'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Remonter « Kin Fresh »'})).toBeEnabled();
  });

  /**
   * Le rang est celui de la collection entière. Sur une liste filtrée, remonter
   * une ligne voudrait dire la passer devant une entrée qu'on ne voit pas : la
   * commande disparaît plutôt que de mentir.
   */
  it('retire les commandes de rang sur une liste filtrée', () => {
    renderBrowser({status: 'brouillon'});

    expect(screen.queryByRole('button', {name: /Remonter/})).toBeNull();
    expect(screen.queryByRole('button', {name: /Descendre/})).toBeNull();
  });

  it('retire les commandes de rang sur une liste partielle, en disant pourquoi', () => {
    renderBrowser({total: 12});

    expect(screen.queryByRole('button', {name: /Remonter/})).toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent('12 entreprises au total, 3 affichés');
  });

  it('prévient quand le nouvel ordre n’a pas été enregistré', async () => {
    const user = userEvent.setup();
    vi.mocked(reorderCollection).mockResolvedValue({ok: false, reason: 'indisponible'});
    renderBrowser();

    await user.click(screen.getByRole('button', {name: 'Descendre « Bradamada »'}));

    expect(await screen.findByRole('alert')).toHaveTextContent(ACTION_FAILURES.indisponible);
    expect(refresh).not.toHaveBeenCalled();
  });

  it('montre l’état vide', () => {
    renderBrowser({rows: [], total: 0});

    expect(screen.getByText('Aucune entreprise pour l’instant.')).toBeInTheDocument();
  });
});
