import {act, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {aMediaImage, aMediaVideo, aPage} from '@/lib/admin-fixtures';
import {MediaBrowser} from './MediaBrowser';

const push = vi.fn();

const items = [aMediaImage(), aMediaVideo()];

beforeEach(() => {
  push.mockClear();
  vi.mocked(useRouter).mockReturnValue({
    push,
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('MediaBrowser', () => {
  it('montre les photos et les vidéos dans la même grille, chacune menant à sa fiche', () => {
    render(<MediaBrowser result={aPage(items)} filters={{}} pageSize={20} />);

    expect(screen.getByRole('link', {name: /Boutique de quartier/})).toHaveAttribute(
      'href',
      '/admin/medias/media-image-01',
    );
    expect(screen.getByRole('link', {name: /Présentation LOKAMBE/})).toHaveAttribute(
      'href',
      '/admin/medias/media-video-01',
    );
    expect(screen.getByText(/^Photo ·/)).toBeInTheDocument();
    expect(screen.getByText(/^Vidéo ·/)).toBeInTheDocument();
  });

  /**
   * C'est par cette mention qu'une personne qui relit la bibliothèque repère ce
   * qui reste à décrire : sans elle, un média sans texte alternatif se perd
   * dans la grille.
   */
  it('signale le média qui n’a pas encore de texte alternatif', () => {
    render(<MediaBrowser result={aPage(items)} filters={{}} pageSize={20} />);

    expect(screen.getByText(/sans texte alternatif/)).toBeInTheDocument();
    expect(screen.getAllByText(/sans texte alternatif/)).toHaveLength(1);
  });

  it('porte le genre choisi dans l’adresse, et dit lequel est actif', async () => {
    const user = userEvent.setup();
    render(<MediaBrowser result={aPage(items)} filters={{}} pageSize={20} />);

    expect(screen.getByRole('button', {name: 'Tout'})).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', {name: 'Vidéos'})).toHaveAttribute('aria-pressed', 'false');

    await user.click(screen.getByRole('button', {name: 'Vidéos'}));
    expect(push).toHaveBeenCalledWith('/admin/medias?kind=video');
  });

  it('revient à « Tout » sans paramètre inutile dans l’adresse', async () => {
    const user = userEvent.setup();
    render(<MediaBrowser result={aPage(items)} filters={{kind: 'video'}} pageSize={20} />);

    await user.click(screen.getByRole('button', {name: 'Tout'}));
    expect(push).toHaveBeenCalledWith('/admin/medias');
  });

  /**
   * La recherche attend la fin de la frappe : un appel par lettre relancerait
   * huit requêtes pour « boutique » et ferait clignoter la grille.
   *
   * La frappe passe par `fireEvent` et non `userEvent` : sous horloge
   * simulée, chaque `await user.*` se bloque, car l'enveloppe asynchrone de
   * Testing Library vide sa file avec un vrai `setTimeout` qu'elle n'avance
   * que si un `jest` global existe. Vitest n'en a pas.
   */
  it('ne lance la recherche qu’après la pause de frappe, et repart à zéro à chaque lettre', () => {
    vi.useFakeTimers();
    render(<MediaBrowser result={aPage(items)} filters={{}} pageSize={20} />);
    const field = screen.getByRole('searchbox');

    fireEvent.change(field, {target: {value: 'bout'}});
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(push).not.toHaveBeenCalled();

    fireEvent.change(field, {target: {value: 'boutique'}});
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(push).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/admin/medias?q=boutique');
  });

  it('garde le genre en cours quand la recherche part, et retire la recherche vidée', () => {
    vi.useFakeTimers();
    const {unmount} = render(<MediaBrowser result={aPage(items)} filters={{kind: 'video'}} pageSize={20} />);

    fireEvent.change(screen.getByRole('searchbox'), {target: {value: '  présentation  '}});
    act(() => {
      vi.advanceTimersByTime(350);
    });
    expect(push).toHaveBeenCalledWith('/admin/medias?kind=video&q=pr%C3%A9sentation');
    unmount();
    push.mockClear();

    render(<MediaBrowser result={aPage(items)} filters={{kind: 'video', q: 'présentation'}} pageSize={20} />);
    fireEvent.change(screen.getByRole('searchbox'), {target: {value: ''}});
    act(() => {
      vi.advanceTimersByTime(350);
    });
    expect(push).toHaveBeenCalledWith('/admin/medias?kind=video');
  });

  it('distingue « rien ne correspond » d’une médiathèque encore vide', () => {
    const {unmount} = render(<MediaBrowser result={aPage([], {total: 0})} filters={{q: 'boutique'}} pageSize={20} />);
    expect(screen.getByText('Aucun média ne correspond à cette recherche.')).toBeInTheDocument();
    unmount();

    render(<MediaBrowser result={aPage([], {total: 0})} filters={{}} pageSize={20} />);
    expect(screen.getByText(/La médiathèque est vide/)).toBeInTheDocument();
  });

  it('ne pagine que s’il y a plus d’une page', async () => {
    const {unmount} = render(<MediaBrowser result={aPage(items)} filters={{}} pageSize={20} />);
    expect(screen.queryByRole('button', {name: /Suivant/})).not.toBeInTheDocument();
    unmount();

    const user = userEvent.setup();
    render(<MediaBrowser result={aPage(items, {total: 45, page: 1})} filters={{kind: 'image'}} pageSize={20} />);

    expect(screen.getByRole('button', {name: /Précédent/})).toBeDisabled();
    await user.click(screen.getByRole('button', {name: /Suivant/}));
    expect(push).toHaveBeenCalledWith('/admin/medias?kind=image&page=2');
  });
});
