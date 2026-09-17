import {render, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {usePathname, useRouter} from 'next/navigation';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {anApplicationSummary, aPage} from '@/lib/admin-fixtures';
import type {ApplicationFilters} from '@/lib/api/admin-types';
import {ApplicationsBrowser} from './ApplicationsBrowser';

/**
 * Le filtrage et la pagination sont faits par l'API : ce composant ne trie
 * plus rien. Son rôle est d'écrire les filtres dans l'URL, que la page serveur
 * relit pour interroger l'API. C'est donc l'URL produite qu'on vérifie.
 */

const replace = vi.fn();

const items = [
  anApplicationSummary(),
  anApplicationSummary({
    id: 'app-02',
    reference: 'LKB-9C13E7',
    status: 'finance',
    business: {...anApplicationSummary().business, name: 'Boulangerie Le Régal', sector: 'metiers_de_bouche'},
  }),
];

beforeEach(() => {
  replace.mockClear();
  vi.mocked(usePathname).mockReturnValue('/admin/candidatures');
  vi.mocked(useRouter).mockReturnValue({
    replace,
    refresh: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

function renderBrowser(filters: ApplicationFilters = {}, total = items.length) {
  return render(
    <ApplicationsBrowser result={aPage(items, {total})} filters={filters} pageSize={20} />,
  );
}

function referencesInTable() {
  const rows = within(screen.getByRole('table')).getAllByRole('row').slice(1);
  return rows.map((row) => within(row).getAllByRole('cell')[0]?.textContent?.trim());
}

describe('ApplicationsBrowser', () => {
  it('affiche les lignes renvoyées par l’API et reprend les filtres de l’URL', () => {
    renderBrowser({status: 'recu'});

    expect(screen.getByLabelText('Statut')).toHaveValue('recu');
    expect(referencesInTable()).toEqual(['LKB-4F2A81', 'LKB-9C13E7']);
  });

  it('écrit le filtre de statut dans l’URL', async () => {
    const user = userEvent.setup();
    renderBrowser();

    await user.selectOptions(screen.getByLabelText('Statut'), 'finance');

    expect(replace).toHaveBeenCalledWith('/admin/candidatures?status=finance');
  });

  it('attend une pause avant de lancer la recherche', async () => {
    const user = userEvent.setup();
    renderBrowser();

    await user.type(screen.getByLabelText('Recherche'), 'Kin Fresh');

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/admin/candidatures?q=Kin+Fresh'));
    // Une requête pour toute la saisie, pas une par touche.
    expect(replace).toHaveBeenCalledTimes(1);
  });

  it('renvoie à la première page quand un filtre change', async () => {
    const user = userEvent.setup();
    renderBrowser({status: 'recu', page: 3});

    await user.selectOptions(screen.getByLabelText('Secteur'), 'restauration');

    // Ni `page=3`, ni la page courante : le filtre repart du début.
    expect(replace).toHaveBeenCalledWith('/admin/candidatures?status=recu&sector=restauration');
  });

  it('vide l’URL quand on réinitialise', async () => {
    const user = userEvent.setup();
    renderBrowser({status: 'recu'});

    await user.click(screen.getByRole('button', {name: 'Réinitialiser'}));

    expect(replace).toHaveBeenCalledWith('/admin/candidatures');
  });

  it('propose l’export sur la route relais, filtres compris', () => {
    renderBrowser({status: 'recu', q: 'Kin'});

    expect(screen.getByRole('link', {name: 'Exporter en CSV'})).toHaveAttribute(
      'href',
      '/api/admin/export?status=recu&q=Kin',
    );
  });

  it('montre l’état vide sans tableau', () => {
    render(<ApplicationsBrowser result={aPage([])} filters={{q: 'zzzz'}} pageSize={20} />);

    expect(screen.getByText('Aucune candidature ne correspond à ces critères.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
