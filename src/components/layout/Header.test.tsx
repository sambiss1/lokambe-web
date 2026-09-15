import {screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import {renderWithIntl} from '@/test/render';
import {Header} from './Header';

describe('Header', () => {
  it('affiche la navigation principale et le bouton de candidature', () => {
    renderWithIntl(<Header />);
    expect(screen.getAllByRole('link', {name: 'LOKAMBE — retour à l’accueil'}).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', {name: 'Soumettre un projet'}).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', {name: /Le fonds/})).toHaveAttribute('aria-expanded', 'false');
  });

  it('ouvre le menu déroulant « Le fonds » au clic', async () => {
    const user = userEvent.setup();
    renderWithIntl(<Header />);
    const trigger = screen.getByRole('button', {name: /Le fonds/});
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const panel = document.getElementById(trigger.getAttribute('aria-controls') ?? '');
    expect(panel).not.toBeNull();
    expect(within(panel as HTMLElement).getByRole('link', {name: /^À propos/})).toHaveAttribute('href', '/fr/a-propos');
  });

  it('ouvre et ferme le menu mobile', async () => {
    const user = userEvent.setup();
    renderWithIntl(<Header />);
    await user.click(screen.getByRole('button', {name: 'Ouvrir le menu'}));
    const dialog = screen.getByRole('dialog', {name: 'Navigation principale'});
    expect(dialog).toBeVisible();
    await user.click(within(dialog).getByRole('button', {name: 'Fermer le menu'}));
    expect(screen.getByRole('button', {name: 'Ouvrir le menu'})).toHaveAttribute('aria-expanded', 'false');
  });
});
