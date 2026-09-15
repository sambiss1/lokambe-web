import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import {EMPTY_APPLICATION_FILTERS, MOCK_APPLICATIONS} from '@/lib/admin-mock';
import {ApplicationsBrowser} from './ApplicationsBrowser';

function renderBrowser(initialFilters = EMPTY_APPLICATION_FILTERS) {
  return render(<ApplicationsBrowser applications={MOCK_APPLICATIONS} initialFilters={initialFilters} />);
}

/** Le tableau (≥ 900 px) et les cartes (< 900 px) rendent les mêmes lignes : on compte le tableau. */
function referencesInTable() {
  const rows = within(screen.getByRole('table')).getAllByRole('row').slice(1);
  return rows.map((row) => within(row).getAllByRole('cell')[0]?.textContent?.trim());
}

describe('ApplicationsBrowser', () => {
  it('starts from the filters passed by the URL', () => {
    renderBrowser({status: 'recu', sector: '', q: ''});

    expect(screen.getByLabelText('Statut')).toHaveValue('recu');
    expect(referencesInTable()).toEqual(['LKB-4F2A81', 'LKB-52FD08']);
  });

  it('narrows the list when the status filter changes, without a page reload', async () => {
    const user = userEvent.setup();
    renderBrowser();

    expect(referencesInTable().length).toBeGreaterThan(1);

    await user.selectOptions(screen.getByLabelText('Statut'), 'finance');

    const references = referencesInTable();
    expect(references).toEqual(['LKB-E5497B']);
  });

  it('searches across the reference and the business name', async () => {
    const user = userEvent.setup();
    renderBrowser();

    await user.type(screen.getByLabelText('Recherche'), 'Kin Fresh');
    expect(referencesInTable()).toEqual(['LKB-77B0D4']);
  });

  it('shows an empty state and lets the filters be reset', async () => {
    const user = userEvent.setup();
    renderBrowser();

    await user.type(screen.getByLabelText('Recherche'), 'zzzz');
    expect(screen.getByText('Aucune candidature ne correspond à ces critères.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Réinitialiser'}));
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByLabelText('Recherche')).toHaveValue('');
  });

  it('paginates and goes back to the first page when a filter changes', async () => {
    const user = userEvent.setup();
    renderBrowser();

    const firstPage = referencesInTable();
    await user.click(screen.getByRole('button', {name: 'Suivant →'}));
    expect(referencesInTable()).not.toEqual(firstPage);

    await user.selectOptions(screen.getByLabelText('Secteur'), 'restauration');
    expect(screen.getByRole('navigation', {name: 'Pagination'}).textContent).toContain('2 candidatures');
  });
});
