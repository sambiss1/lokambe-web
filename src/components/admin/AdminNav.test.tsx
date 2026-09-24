import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {usePathname, useRouter} from 'next/navigation';
import {describe, expect, it, vi} from 'vitest';
import {AdminNav, isActive} from './AdminNav';

describe('isActive', () => {
  it('matches the dashboard only on an exact path', () => {
    expect(isActive('/admin', '/admin', true)).toBe(true);
    expect(isActive('/admin/messages', '/admin', true)).toBe(false);
  });

  it('matches a section and its sub-pages', () => {
    expect(isActive('/admin/candidatures', '/admin/candidatures', false)).toBe(true);
    expect(isActive('/admin/candidatures/app-01', '/admin/candidatures', false)).toBe(true);
    expect(isActive('/admin/messages', '/admin/candidatures', false)).toBe(false);
  });
});

describe('AdminNav', () => {
  it('marks the current section with aria-current, even on a detail page', () => {
    vi.mocked(usePathname).mockReturnValue('/admin/candidatures/app-01');
    render(<AdminNav />);

    expect(screen.getByRole('link', {name: 'Candidatures'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', {name: 'Tableau de bord'})).not.toHaveAttribute('aria-current');
  });

  it('exposes the three sections and a logout control', () => {
    vi.mocked(usePathname).mockReturnValue('/admin');
    render(<AdminNav />);

    for (const label of ['Tableau de bord', 'Candidatures', 'Messages']) {
      expect(screen.getByRole('link', {name: label})).toBeInTheDocument();
    }
    // La déconnexion agit, elle ne navigue pas : c'est un bouton, pas un lien.
    expect(screen.getByRole('button', {name: 'Déconnexion'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Tableau de bord'})).toHaveAttribute('aria-current', 'page');
  });

  it('demande au serveur d’effacer la session, puis renvoie à la connexion', async () => {
    vi.mocked(usePathname).mockReturnValue('/admin');
    const replace = vi.fn();
    const refresh = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      replace,
      refresh,
      push: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    } as unknown as ReturnType<typeof useRouter>);
    const fetchMock = vi.fn().mockResolvedValue({ok: true});
    vi.stubGlobal('fetch', fetchMock);

    render(<AdminNav />);
    await userEvent.click(screen.getByRole('button', {name: 'Déconnexion'}));

    // Le cookie est httpOnly : seul le serveur peut le supprimer.
    expect(fetchMock).toHaveBeenCalledWith('/api/admin/session', {method: 'DELETE'});
    expect(replace).toHaveBeenCalledWith('/admin/login');
    vi.unstubAllGlobals();
  });
});
