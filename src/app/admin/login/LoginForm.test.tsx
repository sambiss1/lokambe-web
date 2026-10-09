import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import {LoginForm} from './LoginForm';

const password = () => screen.getByLabelText('Mot de passe');
const reveal = () => screen.getByRole('button', {name: 'Afficher le mot de passe'});
const hide = () => screen.getByRole('button', {name: 'Masquer le mot de passe'});

describe('LoginForm', () => {
  it('cache le mot de passe au départ', () => {
    render(<LoginForm />);

    expect(password()).toHaveAttribute('type', 'password');
    expect(reveal()).toHaveAttribute('aria-pressed', 'false');
  });

  it('révèle puis recache le mot de passe sans perdre ce qui est saisi', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(password(), 'secret-a-cacher');
    await user.click(reveal());

    expect(password()).toHaveAttribute('type', 'text');
    expect(password()).toHaveValue('secret-a-cacher');
    expect(hide()).toHaveAttribute('aria-pressed', 'true');

    await user.click(hide());

    expect(password()).toHaveAttribute('type', 'password');
    expect(password()).toHaveValue('secret-a-cacher');
  });

  it('ne soumet pas le formulaire en basculant la visibilité', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Email'), 'admin@lokambe.com');
    await user.type(password(), 'secret-a-cacher');
    await user.click(reveal());

    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
