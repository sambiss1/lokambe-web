import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {usePathname, useRouter} from 'next/navigation';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {aContact, aPage} from '@/lib/admin-fixtures';
import {setContactRead} from '@/lib/api/admin-actions';
import type {ContactFilters} from '@/lib/api/admin-types';
import {MessagesBrowser} from './MessagesBrowser';

vi.mock('@/lib/api/admin-actions', () => ({setContactRead: vi.fn()}));

const replace = vi.fn();
const refresh = vi.fn();

const items = [
  aContact(),
  aContact({id: 'contact-02', kind: 'partenaire', fullName: 'Nadine Kabongo', isRead: true}),
];

beforeEach(() => {
  replace.mockClear();
  refresh.mockClear();
  vi.mocked(setContactRead).mockReset().mockResolvedValue({ok: true, data: aContact({isRead: true})});
  vi.mocked(usePathname).mockReturnValue('/admin/messages');
  vi.mocked(useRouter).mockReturnValue({
    replace,
    refresh,
    push: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

function renderBrowser(filters: ContactFilters = {}) {
  return render(<MessagesBrowser result={aPage(items)} filters={filters} pageSize={20} unreadTotal={1} />);
}

describe('MessagesBrowser', () => {
  it('reprend le filtre de lecture porté par l’URL', () => {
    renderBrowser({isRead: false});

    expect(screen.getByLabelText('État de lecture')).toHaveValue('false');
  });

  it('écrit les filtres dans l’URL', async () => {
    const user = userEvent.setup();
    renderBrowser();

    await user.selectOptions(screen.getByLabelText('Type de contact'), 'partenaire');

    expect(replace).toHaveBeenCalledWith('/admin/messages?kind=partenaire');
  });

  it('bascule un message en lu en passant par l’API', async () => {
    const user = userEvent.setup();
    renderBrowser();

    await user.click(screen.getAllByRole('button', {name: 'Marquer comme lu'})[0]!);

    expect(setContactRead).toHaveBeenCalledWith('contact-01', true);
    // La bascule s'affiche sans attendre la réponse, puis la page se rafraîchit.
    await waitFor(() => expect(refresh).toHaveBeenCalled());
  });

  it('revient en arrière et prévient quand l’API refuse', async () => {
    const user = userEvent.setup();
    vi.mocked(setContactRead).mockResolvedValue({ok: false, reason: 'indisponible'});
    renderBrowser();

    await user.click(screen.getAllByRole('button', {name: 'Marquer comme lu'})[0]!);

    expect(await screen.findByRole('alert')).toHaveTextContent('n’a pas abouti');
    // Le message est bien redevenu non lu.
    expect(screen.getAllByRole('button', {name: 'Marquer comme lu'})).toHaveLength(1);
  });

  it('renvoie à la connexion quand la session a expiré', async () => {
    const user = userEvent.setup();
    vi.mocked(setContactRead).mockResolvedValue({ok: false, reason: 'session'});
    renderBrowser();

    await user.click(screen.getAllByRole('button', {name: 'Marquer comme lu'})[0]!);

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/admin/login?expiree=1'));
  });

  it('montre l’état vide', () => {
    render(<MessagesBrowser result={aPage([])} filters={{kind: 'expert'}} pageSize={20} unreadTotal={0} />);

    expect(screen.getByText('Aucun message ne correspond à ces filtres.')).toBeInTheDocument();
  });
});
