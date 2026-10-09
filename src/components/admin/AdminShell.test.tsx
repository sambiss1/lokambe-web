import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {AdminShell} from './AdminShell';

describe('AdminShell', () => {
  it('ramène au tableau de bord depuis le logo de la barre mobile', () => {
    render(
      <AdminShell>
        <p>contenu</p>
      </AdminShell>,
    );

    // Ceux des menus latéraux étaient déjà des liens, celui de la barre
    // mobile non : on vérifie qu'aucun logo n'échappe plus à la règle.
    const logos = screen.getAllByAltText('LOKAMBE REPUBLIC');

    expect(logos.length).toBeGreaterThan(0);
    for (const logo of logos) expect(logo.closest('a')).toHaveAttribute('href', '/admin');
  });
});
