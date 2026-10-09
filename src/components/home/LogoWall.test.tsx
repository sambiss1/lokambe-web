import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {fr} from '@/content/fr';
import {renderWithIntl} from '@/test/render';
import {LogoWall} from './LogoWall';

const content = fr.home.portfolio;
const first = content.items[0];

/** Le survol n'existe pas sur un écran tactile : le composant s'en assure. */
function withPointer(hover: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query.includes('hover: hover') ? hover : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

describe('LogoWall', () => {
  beforeEach(() => {
    withPointer(true);
  });

  it('montre la fiche au survol, sans attendre le clic', async () => {
    const user = userEvent.setup();
    renderWithIntl(<LogoWall content={content} />);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    await user.hover(screen.getAllByRole('button', {name: first.name})[0]);

    const card = await screen.findByRole('tooltip');
    expect(card).toHaveTextContent(first.name);
    if (first.text) expect(card).toHaveTextContent(first.text);
  });

  it('retire la fiche quand le pointeur quitte le logo', async () => {
    const user = userEvent.setup();
    renderWithIntl(<LogoWall content={content} />);
    const tile = screen.getAllByRole('button', {name: first.name})[0];

    await user.hover(tile);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    await user.unhover(tile);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('ne montre rien au survol sur un écran tactile, où le clic reste la voie', async () => {
    withPointer(false);
    const user = userEvent.setup();
    renderWithIntl(<LogoWall content={content} />);

    await user.hover(screen.getAllByRole('button', {name: first.name})[0]);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('ne fait plus monter la tuile au survol', () => {
    renderWithIntl(<LogoWall content={content} />);

    const tile = screen.getAllByRole('button', {name: first.name})[0];

    expect(tile.className).not.toContain('-translate-y-1');
  });
});
