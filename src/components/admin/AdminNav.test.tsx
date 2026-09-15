import {render, screen} from '@testing-library/react';
import {usePathname} from 'next/navigation';
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

  it('exposes the three sections and the logout link', () => {
    vi.mocked(usePathname).mockReturnValue('/admin');
    render(<AdminNav />);

    for (const label of ['Tableau de bord', 'Candidatures', 'Messages', 'Déconnexion']) {
      expect(screen.getByRole('link', {name: label})).toBeInTheDocument();
    }
    expect(screen.getByRole('link', {name: 'Tableau de bord'})).toHaveAttribute('aria-current', 'page');
  });
});
