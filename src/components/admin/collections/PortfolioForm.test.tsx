import {render, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {aPortfolioCompany} from '@/lib/admin-fixtures';
import {createCollectionEntry, updateCollectionEntry} from '@/lib/api/content-actions';
import {PortfolioForm} from './PortfolioForm';

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
  vi.mocked(createCollectionEntry)
    .mockReset()
    .mockResolvedValue({
      ok: true,
      data: aPortfolioCompany({id: 'portfolio-42'}),
    });
  vi.mocked(updateCollectionEntry).mockReset().mockResolvedValue({ok: true, data: aPortfolioCompany()});
  vi.mocked(useRouter).mockReturnValue({
    push,
    refresh,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

/** Le corps envoyé à l'API lors du dernier appel de création. */
function createdPayload(): Record<string, unknown> {
  return vi.mocked(createCollectionEntry).mock.calls.at(-1)![1];
}

async function fillFrench(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Nom de l’entreprise'), 'Bradamada');
  await user.type(screen.getByLabelText('Secteur'), 'Restauration');
  await user.type(screen.getByLabelText('Statut du projet'), 'En développement');
  await user.type(screen.getByLabelText('Description'), 'Un concept de restauration rapide, immersif et mémorable.');
}

describe('PortfolioForm', () => {
  it('signale chaque champ fautif sous le champ, sans rien envoyer à l’API', async () => {
    const user = userEvent.setup();
    render(<PortfolioForm library={[]} />);

    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    // Nom, secteur et statut veulent deux caractères ; la description en veut dix.
    expect(await screen.findByText('10 caractères minimum.')).toBeInTheDocument();
    expect(screen.getAllByText('2 caractères minimum.')).toHaveLength(3);

    // Le message est bien rattaché au champ, donc lu avec lui.
    const describedBy = screen.getByLabelText('Nom de l’entreprise').getAttribute('aria-describedby');
    expect(document.getElementById(describedBy ?? '')).toHaveTextContent('2 caractères minimum.');

    expect(createCollectionEntry).not.toHaveBeenCalled();
  });

  it('crée l’entreprise avec le texte rangé par langue, puis ouvre sa fiche', async () => {
    const user = userEvent.setup();
    render(<PortfolioForm library={[]} />);

    await fillFrench(user);
    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    await waitFor(() => expect(createCollectionEntry).toHaveBeenCalled());
    expect(vi.mocked(createCollectionEntry).mock.calls[0][0]).toBe('portfolio');
    expect(createdPayload()).toMatchObject({
      name: 'Bradamada',
      fr: {
        sector: 'Restauration',
        status: 'En développement',
        description: 'Un concept de restauration rapide, immersif et mémorable.',
      },
    });

    // L'entreprise existe désormais : on passe sur sa fiche, pas sur un formulaire vide.
    await waitFor(() => expect(push).toHaveBeenCalledWith('/admin/portefeuille/portfolio-42'));
  });

  it('reprend une entreprise existante dans ses champs et la met à jour en place', async () => {
    const user = userEvent.setup();
    const company = aPortfolioCompany();
    render(<PortfolioForm company={company} library={[]} />);

    expect(screen.getByLabelText('Nom de l’entreprise')).toHaveValue('Bradamada');
    expect(screen.getByLabelText('Secteur')).toHaveValue('Restauration');
    expect(screen.getByLabelText('Description')).toHaveValue(company.fr.description);
    const anglais = screen.getByRole('group', {name: 'Anglais'});
    expect(within(anglais).getByLabelText(/Secteur/)).toHaveValue('Restaurants and catering');

    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    await waitFor(() => expect(updateCollectionEntry).toHaveBeenCalled());
    const [collection, id] = vi.mocked(updateCollectionEntry).mock.calls[0];
    expect(collection).toBe('portfolio');
    expect(id).toBe('portfolio-01');
  });

  it('publie un brouillon existant depuis le panneau de publication', async () => {
    const user = userEvent.setup();
    render(<PortfolioForm company={aPortfolioCompany({status: 'brouillon'})} library={[]} />);

    await user.click(screen.getByRole('button', {name: 'Publier'}));

    await waitFor(() => expect(updateCollectionEntry).toHaveBeenCalled());
    expect(vi.mocked(updateCollectionEntry).mock.calls[0][2]).toMatchObject({status: 'publie'});
    expect(await screen.findByRole('status')).toHaveTextContent('Publié.');
  });

  /**
   * Un champ anglais vide doit valoir « rien à dire », pas « dis que c'est vide » :
   * le site public reprend alors le français (`localized`). Le ménage final est
   * fait par `clean()` côté server action, qui écarte `undefined` — encore faut-il
   * que le formulaire envoie `undefined` et non la chaîne vide.
   */
  it('n’envoie pas une traduction anglaise vide', async () => {
    const user = userEvent.setup();
    render(<PortfolioForm library={[]} />);

    await fillFrench(user);
    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    await waitFor(() => expect(createCollectionEntry).toHaveBeenCalled());
    const en = createdPayload().en as Record<string, unknown>;
    expect(Object.values(en)).not.toContain('');
    expect(en.sector).toBeUndefined();
    expect(en.status).toBeUndefined();
    expect(en.description).toBeUndefined();
  });

  it('mène à la page de suppression plutôt que d’ouvrir une boîte', () => {
    const confirm = vi.spyOn(window, 'confirm');
    render(<PortfolioForm company={aPortfolioCompany()} library={[]} />);

    expect(screen.getByRole('link', {name: /Supprimer/})).toHaveAttribute(
      'href',
      '/admin/portefeuille/portfolio-01/supprimer',
    );
    expect(screen.queryByRole('button', {name: /Supprimer/})).toBeNull();
    expect(confirm).not.toHaveBeenCalled();
    confirm.mockRestore();
  });
});
