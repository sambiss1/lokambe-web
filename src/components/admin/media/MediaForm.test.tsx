import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {aMediaImage, aMediaVideo} from '@/lib/admin-fixtures';
import {updateMedia} from '@/lib/api/content-actions';
import {MediaForm} from './MediaForm';

vi.mock('@/lib/api/content-actions', () => ({updateMedia: vi.fn()}));

const refresh = vi.fn();

const poster = aMediaImage({id: 'media-image-02', title: 'Étal du matin'});

beforeEach(() => {
  refresh.mockClear();
  vi.mocked(updateMedia).mockReset().mockResolvedValue({ok: true, data: aMediaImage()});
  vi.mocked(useRouter).mockReturnValue({
    push: vi.fn(),
    refresh,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

describe('MediaForm', () => {
  it('part de ce que porte déjà le média et renvoie le texte corrigé', async () => {
    const user = userEvent.setup();
    render(<MediaForm media={aMediaImage()} posters={[]} />);

    expect(screen.getByLabelText(/Titre/)).toHaveValue('Boutique de quartier');
    expect(screen.getByLabelText(/Texte alternatif/)).toHaveValue('Une commerçante devant son étal');

    await user.clear(screen.getByLabelText(/Texte alternatif/));
    await user.type(screen.getByLabelText(/Texte alternatif/), 'Une commerçante devant son étal de légumes');
    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    await waitFor(() => expect(updateMedia).toHaveBeenCalled());
    expect(vi.mocked(updateMedia).mock.calls[0]).toEqual([
      'media-image-01',
      {title: 'Boutique de quartier', alt: 'Une commerçante devant son étal de légumes'},
    ]);
    expect(await screen.findByRole('status')).toHaveTextContent('Enregistré.');
    expect(refresh).toHaveBeenCalled();
  });

  /**
   * Vider un champ doit vraiment l'effacer : l'API refuse la chaîne vide, donc
   * c'est `null` qui part. Sans cela, la valeur précédente resterait en place
   * sans que rien ne le dise.
   */
  it('envoie `null` pour un champ vidé, et non une chaîne vide', async () => {
    const user = userEvent.setup();
    render(<MediaForm media={aMediaImage()} posters={[]} />);

    await user.clear(screen.getByLabelText(/Titre/));
    await user.clear(screen.getByLabelText(/Texte alternatif/));
    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    await waitFor(() => expect(updateMedia).toHaveBeenCalled());
    expect(vi.mocked(updateMedia).mock.calls[0][1]).toEqual({title: null, alt: null});
  });

  it('ne propose pas d’image d’attente pour une photo', () => {
    render(<MediaForm media={aMediaImage()} posters={[poster]} />);

    expect(screen.queryByText('Image d’attente')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Aucune'})).not.toBeInTheDocument();
  });

  it('propose les photos de la bibliothèque comme image d’attente d’une vidéo', async () => {
    const user = userEvent.setup();
    render(<MediaForm media={aMediaVideo()} posters={[poster]} />);

    expect(screen.getByText('Image d’attente')).toBeInTheDocument();
    const choice = screen.getByRole('button', {name: 'Image d’attente : Étal du matin'});
    expect(choice).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', {name: 'Aucune'})).toHaveAttribute('aria-pressed', 'true');

    await user.click(choice);
    expect(choice).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));
    await waitFor(() => expect(updateMedia).toHaveBeenCalled());
    expect(vi.mocked(updateMedia).mock.calls[0][1]).toMatchObject({posterMediaId: 'media-image-02'});
  });

  it('retire l’image d’attente avec « Aucune »', async () => {
    const user = userEvent.setup();
    render(<MediaForm media={aMediaVideo({posterMediaId: poster.id})} posters={[poster]} />);

    await user.click(screen.getByRole('button', {name: 'Aucune'}));
    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    await waitFor(() => expect(updateMedia).toHaveBeenCalled());
    expect(vi.mocked(updateMedia).mock.calls[0][1]).toMatchObject({posterMediaId: null});
  });

  it('dit pourquoi rien n’a été enregistré, assez fort pour interrompre un lecteur d’écran', async () => {
    vi.mocked(updateMedia).mockResolvedValue({ok: false, reason: 'indisponible'});
    const user = userEvent.setup();
    render(<MediaForm media={aMediaImage()} posters={[]} />);

    await user.click(screen.getByRole('button', {name: 'Enregistrer'}));

    expect(await screen.findByRole('alert')).toHaveTextContent('API injoignable. Rien n’a été enregistré.');
    expect(refresh).not.toHaveBeenCalled();
  });

  /**
   * Un média est posé sur des fiches : la suppression a sa propre page, qui
   * montre où il sert avant de l'effacer. Pas de `window.confirm` — c'est la
   * demande du client, « pas de modals ».
   */
  it('mène à la page de suppression plutôt que d’ouvrir une boîte', () => {
    const confirm = vi.spyOn(window, 'confirm');
    render(<MediaForm media={aMediaImage()} posters={[]} />);

    expect(screen.getByRole('link', {name: /Supprimer/})).toHaveAttribute(
      'href',
      '/admin/medias/media-image-01/supprimer',
    );
    expect(screen.queryByRole('button', {name: /Supprimer/})).not.toBeInTheDocument();
    expect(confirm).not.toHaveBeenCalled();
    confirm.mockRestore();
  });
});
