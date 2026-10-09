import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {aTheme} from '@/lib/admin-fixtures';
import {createCollectionEntry, updateCollectionEntry} from '@/lib/api/content-actions';
import {ThemeForm} from './ThemeForm';

vi.mock('@/lib/api/content-actions', () => ({
  createCollectionEntry: vi.fn(),
  updateCollectionEntry: vi.fn(),
  createUploadTicket: vi.fn(),
  registerUploadedMedia: vi.fn(),
}));

const push = vi.fn();
const refresh = vi.fn();

beforeEach(() => {
  push.mockClear();
  refresh.mockClear();
  vi.mocked(createCollectionEntry).mockReset().mockResolvedValue({ok: true, data: aTheme({id: 'theme-42'})});
  vi.mocked(updateCollectionEntry).mockReset().mockResolvedValue({ok: true, data: aTheme()});
  vi.mocked(useRouter).mockReturnValue({
    push,
    refresh,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

function createdPayload(): Record<string, unknown> {
  return vi.mocked(createCollectionEntry).mock.calls.at(-1)![1];
}

describe('ThemeForm', () => {
  it('refuse un thème sans nom, sans rien envoyer à l’API', async () => {
    const user = userEvent.setup();
    render(<ThemeForm />);

    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    expect(await screen.findByText('2 caractères minimum.')).toBeInTheDocument();
    expect(createCollectionEntry).not.toHaveBeenCalled();
  });

  it('crée le thème et ouvre sa fiche', async () => {
    const user = userEvent.setup();
    render(<ThemeForm />);

    await user.type(screen.getByLabelText('Nom'), 'Gouvernance & gestion');
    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    await waitFor(() => expect(createCollectionEntry).toHaveBeenCalled());
    expect(vi.mocked(createCollectionEntry).mock.calls[0][0]).toBe('themes');
    expect(createdPayload()).toMatchObject({fr: {name: 'Gouvernance & gestion'}});

    await waitFor(() => expect(push).toHaveBeenCalledWith('/admin/themes/theme-42'));
  });

  it('n’envoie pas une traduction anglaise vide', async () => {
    const user = userEvent.setup();
    render(<ThemeForm />);

    await user.type(screen.getByLabelText('Nom'), 'Économie congolaise');
    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    await waitFor(() => expect(createCollectionEntry).toHaveBeenCalled());
    expect((createdPayload().en as Record<string, unknown>).name).toBeUndefined();
  });

  it('reprend un thème existant et le met à jour en place', async () => {
    const user = userEvent.setup();
    render(<ThemeForm entry={aTheme()} />);

    expect(screen.getByLabelText('Nom')).toHaveValue('Entrepreneuriat congolais');

    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    await waitFor(() => expect(updateCollectionEntry).toHaveBeenCalled());
    const [collection, id] = vi.mocked(updateCollectionEntry).mock.calls[0];
    expect(collection).toBe('themes');
    expect(id).toBe('theme-01');
  });

  it('mène à la page de suppression plutôt que d’ouvrir une boîte', () => {
    const confirm = vi.spyOn(window, 'confirm');
    render(<ThemeForm entry={aTheme()} />);

    expect(screen.getByRole('link', {name: /Supprimer/})).toHaveAttribute(
      'href',
      '/admin/themes/theme-01/supprimer',
    );
    expect(confirm).not.toHaveBeenCalled();
    confirm.mockRestore();
  });
});
