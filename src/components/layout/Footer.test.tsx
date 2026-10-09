import {screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {renderWithIntl} from '@/test/render';
import {Footer} from './Footer';

describe('Footer', () => {
  it('ramène à l’accueil quand on clique le logo', () => {
    renderWithIntl(<Footer />);

    const logo = screen.getByAltText('LOKAMBE REPUBLIC');

    expect(logo.closest('a')).toHaveAttribute('href', '/fr');
  });
});
