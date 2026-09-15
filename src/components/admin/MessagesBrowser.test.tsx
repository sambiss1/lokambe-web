import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import {EMPTY_CONTACT_FILTERS, MOCK_CONTACTS} from '@/lib/admin-mock';
import {MessagesBrowser} from './MessagesBrowser';

function renderBrowser(initialFilters = EMPTY_CONTACT_FILTERS) {
  return render(<MessagesBrowser contacts={MOCK_CONTACTS} initialFilters={initialFilters} />);
}

describe('MessagesBrowser', () => {
  it('starts on the unread filter when the URL asks for it', () => {
    renderBrowser({kind: '', isRead: 'false'});

    expect(screen.getByLabelText('État de lecture')).toHaveValue('false');
    expect(screen.getAllByRole('button', {name: 'Marquer comme lu'})).toHaveLength(3);
  });

  it('toggles a message between read and unread', async () => {
    const user = userEvent.setup();
    renderBrowser({kind: '', isRead: 'false'});

    const [first] = screen.getAllByRole('button', {name: 'Marquer comme lu'});
    expect(first).toHaveAttribute('aria-pressed', 'false');

    await user.click(first!);

    expect(screen.getAllByRole('button', {name: 'Marquer comme lu'})).toHaveLength(2);
  });

  it('filters by contact kind', async () => {
    const user = userEvent.setup();
    renderBrowser();

    await user.selectOptions(screen.getByLabelText('Type de contact'), 'partenaire');

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByText('Partenariat sur l’approvisionnement')).toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup();
    renderBrowser();

    await user.selectOptions(screen.getByLabelText('Type de contact'), 'expert');
    await user.selectOptions(screen.getByLabelText('État de lecture'), 'false');

    expect(screen.getByText('Aucun message ne correspond à ces filtres.')).toBeInTheDocument();
  });
});
