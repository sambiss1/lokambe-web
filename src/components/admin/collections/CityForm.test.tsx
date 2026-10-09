import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {aCity} from '@/lib/admin-fixtures';
import {createCollectionEntry, updateCollectionEntry} from '@/lib/api/content-actions';
import {CityForm} from './CityForm';

vi.mock('@/lib/api/content-actions', () => ({
  createCollectionEntry: vi.fn(),
  updateCollectionEntry: vi.fn(),
  createUploadTicket: vi.fn(),
  registerUploadedMedia: vi.fn(),
}));

const push = vi.fn();

beforeEach(() => {
  push.mockClear();
  vi.mocked(createCollectionEntry).mockReset().mockResolvedValue({ok: true, data: aCity({id: 'city-42'})});
  vi.mocked(updateCollectionEntry).mockReset().mockResolvedValue({ok: true, data: aCity()});
  vi.mocked(useRouter).mockReturnValue({
    push,
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

describe('CityForm', () => {
  it('refuse une ville sans nom, sans rien envoyer à l’API', async () => {
    const user = userEvent.setup();
    render(<CityForm />);

    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    expect(await screen.findByText('2 caractères minimum.')).toBeInTheDocument();
    expect(createCollectionEntry).not.toHaveBeenCalled();
  });

  it('crée la ville et ouvre sa fiche', async () => {
    const user = userEvent.setup();
    render(<CityForm />);

    await user.type(screen.getByLabelText('Nom'), 'Lubumbashi');
    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    await waitFor(() => expect(createCollectionEntry).toHaveBeenCalled());
    expect(vi.mocked(createCollectionEntry).mock.calls[0][0]).toBe('cities');
    expect(vi.mocked(createCollectionEntry).mock.calls.at(-1)![1]).toMatchObject({fr: {name: 'Lubumbashi'}});
    await waitFor(() => expect(push).toHaveBeenCalledWith('/admin/villes/city-42'));
  });

  it('mène à la page de suppression plutôt que d’ouvrir une boîte', () => {
    const confirm = vi.spyOn(window, 'confirm');
    render(<CityForm entry={aCity()} />);

    expect(screen.getByRole('link', {name: /Supprimer/})).toHaveAttribute('href', '/admin/villes/city-01/supprimer');
    expect(confirm).not.toHaveBeenCalled();
    confirm.mockRestore();
  });
});
