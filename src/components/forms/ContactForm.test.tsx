import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import {fr} from '@/content/fr';
import {renderWithIntl} from '@/test/render';
import {ContactForm} from './ContactForm';

describe('ContactForm', () => {
  it('signale les champs manquants sans envoyer', async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactForm title="Écrivez-nous" labels={fr.forms} />);
    await user.click(screen.getByRole('button', {name: 'Envoyer'}));
    expect(await screen.findByText('Indiquez votre nom.')).toBeInTheDocument();
    expect(screen.getByText('Indiquez votre email.')).toBeInTheDocument();
  });

  it('affiche l’écran de confirmation après un envoi valide', async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactForm title="Écrivez-nous" labels={fr.forms} defaultKind="investisseur" />);
    await user.type(screen.getByLabelText('Nom complet'), 'Amina Kabasele');
    await user.type(screen.getByLabelText('Email'), 'amina@example.com');
    await user.type(screen.getByLabelText('Votre message'), 'Bonjour, je souhaite investir dans le fonds LOKAMBE.');
    await user.click(screen.getByRole('button', {name: 'Envoyer'}));
    expect(await screen.findByText('Message envoyé', {}, {timeout: 4000})).toBeInTheDocument();
  });
});
