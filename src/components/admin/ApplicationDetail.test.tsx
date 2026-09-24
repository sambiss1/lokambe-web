import {render, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {anApplication} from '@/lib/admin-fixtures';
import {addApplicationNote, changeApplicationStatus} from '@/lib/api/admin-actions';
import {ApplicationDetail} from './ApplicationDetail';

vi.mock('@/lib/api/admin-actions', () => ({
  changeApplicationStatus: vi.fn(),
  addApplicationNote: vi.fn(),
}));

const replace = vi.fn();
const refresh = vi.fn();

const application = anApplication({
  reference: 'LKB-9C13E7',
  status: 'preselection',
  statusHistory: [
    {status: 'recu', changedAt: '2026-09-11T13:05:00.000Z'},
    {status: 'preselection', changedAt: '2026-09-12T08:20:00.000Z', changedBy: 'Équipe LOKAMBE'},
  ],
});

beforeEach(() => {
  replace.mockClear();
  refresh.mockClear();
  vi.mocked(changeApplicationStatus).mockReset();
  vi.mocked(addApplicationNote).mockReset();
  vi.mocked(useRouter).mockReturnValue({
    replace,
    refresh,
    push: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

describe('ApplicationDetail', () => {
  it('montre le candidat, l’activité et le besoin', () => {
    render(<ApplicationDetail application={application} />);

    expect(screen.getByRole('heading', {level: 1, name: 'LKB-9C13E7'})).toBeInTheDocument();
    expect(screen.getByText('Bénédicte Mwamba')).toBeInTheDocument();
    expect(screen.getByText('Chez Bénédicte')).toBeInTheDocument();
    expect(screen.getByText('Restauration')).toBeInTheDocument();
  });

  it('nomme le formulaire public pour l’entrée d’historique sans auteur', () => {
    render(<ApplicationDetail application={application} />);

    const history = screen.getByRole('list', {name: 'Historique des statuts'});
    expect(within(history).getByText(/Formulaire public/)).toBeInTheDocument();
  });

  it('propose le téléchargement des pièces jointes par la route relais', () => {
    render(<ApplicationDetail application={application} />);

    expect(screen.getByRole('link', {name: 'Télécharger'})).toHaveAttribute(
      'href',
      '/api/admin/files/app-01/665f1c2e9b1d8a0012345678',
    );
  });

  it('change le statut et affiche le dossier renvoyé par l’API', async () => {
    const user = userEvent.setup();
    vi.mocked(changeApplicationStatus).mockResolvedValue({
      ok: true,
      data: {
        ...application,
        status: 'visite',
        statusHistory: [
          ...application.statusHistory,
          {
            status: 'visite',
            changedAt: '2026-09-15T09:00:00.000Z',
            changedBy: 'Équipe LOKAMBE',
            comment: 'Visite planifiée jeudi.',
          },
        ],
      },
    });
    render(<ApplicationDetail application={application} />);

    await user.selectOptions(screen.getByLabelText('Nouveau statut'), 'visite');
    await user.type(screen.getByLabelText('Commentaire'), 'Visite planifiée jeudi.');
    await user.click(screen.getByRole('button', {name: 'Enregistrer le statut'}));

    expect(changeApplicationStatus).toHaveBeenCalledWith('app-01', 'visite', 'Visite planifiée jeudi.');
    expect(await screen.findByRole('status')).toHaveTextContent('Statut mis à jour : Visite terrain.');

    const history = screen.getByRole('list', {name: 'Historique des statuts'});
    expect(within(history).getByText('Visite planifiée jeudi.')).toBeInTheDocument();
    // Le commentaire est vidé après envoi.
    expect(screen.getByLabelText('Commentaire')).toHaveValue('');
  });

  it('refuse un changement de statut qui ne change rien, sans appeler l’API', async () => {
    const user = userEvent.setup();
    render(<ApplicationDetail application={application} />);

    await user.click(screen.getByRole('button', {name: 'Enregistrer le statut'}));

    expect(screen.getByRole('alert')).toHaveTextContent('Choisissez un nouveau statut ou ajoutez un commentaire.');
    expect(changeApplicationStatus).not.toHaveBeenCalled();
  });

  it('explique l’échec quand l’API refuse le changement', async () => {
    const user = userEvent.setup();
    vi.mocked(changeApplicationStatus).mockResolvedValue({ok: false, reason: 'introuvable'});
    render(<ApplicationDetail application={application} />);

    await user.selectOptions(screen.getByLabelText('Nouveau statut'), 'visite');
    await user.click(screen.getByRole('button', {name: 'Enregistrer le statut'}));

    expect(await screen.findByRole('alert')).toHaveTextContent('Ce dossier n’existe plus.');
  });

  it('renvoie à la connexion quand la session a expiré', async () => {
    const user = userEvent.setup();
    vi.mocked(changeApplicationStatus).mockResolvedValue({ok: false, reason: 'session'});
    render(<ApplicationDetail application={application} />);

    await user.selectOptions(screen.getByLabelText('Nouveau statut'), 'visite');
    await user.click(screen.getByRole('button', {name: 'Enregistrer le statut'}));

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/admin/login?expiree=1'));
  });

  it('ajoute une note et refuse une note vide sans appeler l’API', async () => {
    const user = userEvent.setup();
    vi.mocked(addApplicationNote).mockResolvedValue({
      ok: true,
      data: {
        ...application,
        notes: [{text: 'Rappeler avant 10h.', author: 'Équipe LOKAMBE', createdAt: '2026-09-15T09:00:00.000Z'}],
      },
    });
    render(<ApplicationDetail application={application} />);

    await user.click(screen.getByRole('button', {name: 'Ajouter la note'}));
    expect(screen.getByRole('alert')).toHaveTextContent('La note est vide.');
    expect(addApplicationNote).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText('Nouvelle note'), 'Rappeler avant 10h.');
    await user.click(screen.getByRole('button', {name: 'Ajouter la note'}));

    expect(await screen.findByText('Rappeler avant 10h.')).toBeInTheDocument();
    expect(screen.getByText('Notes internes (1)')).toBeInTheDocument();
  });
});
