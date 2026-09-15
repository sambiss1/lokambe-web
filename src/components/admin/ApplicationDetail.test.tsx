import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import {MOCK_APPLICATIONS} from '@/lib/admin-mock';
import {ApplicationDetail} from './ApplicationDetail';

const application = MOCK_APPLICATIONS[1]!; // LKB-9C13E7, en présélection, avec une note.

describe('ApplicationDetail', () => {
  it('shows the applicant, the business and the need', () => {
    render(<ApplicationDetail application={application} />);

    expect(screen.getByRole('heading', {level: 1, name: application.reference})).toBeInTheDocument();
    expect(screen.getByText('Patrick Ilunga')).toBeInTheDocument();
    expect(screen.getByText('Boulangerie Le Régal')).toBeInTheDocument();
    expect(screen.getByText('Métiers de bouche')).toBeInTheDocument();
  });

  it('changes the status and records it in the history', async () => {
    const user = userEvent.setup();
    render(<ApplicationDetail application={application} />);

    const history = screen.getByRole('list', {name: 'Historique des statuts'});
    expect(within(history).getAllByRole('listitem')).toHaveLength(application.statusHistory.length);

    await user.selectOptions(screen.getByLabelText('Nouveau statut'), 'visite');
    await user.type(screen.getByLabelText('Commentaire'), 'Visite planifiée jeudi.');
    await user.click(screen.getByRole('button', {name: 'Enregistrer le statut'}));

    expect(screen.getByRole('status')).toHaveTextContent('Statut mis à jour : Visite terrain.');
    expect(within(history).getAllByRole('listitem')).toHaveLength(application.statusHistory.length + 1);
    expect(within(history).getByText('Visite planifiée jeudi.')).toBeInTheDocument();
    // Le commentaire est vidé après envoi.
    expect(screen.getByLabelText('Commentaire')).toHaveValue('');
  });

  it('refuses a status change that changes nothing', async () => {
    const user = userEvent.setup();
    render(<ApplicationDetail application={application} />);

    await user.click(screen.getByRole('button', {name: 'Enregistrer le statut'}));

    expect(screen.getByRole('alert')).toHaveTextContent('Choisissez un nouveau statut ou ajoutez un commentaire.');
  });

  it('adds a note and rejects an empty one', async () => {
    const user = userEvent.setup();
    render(<ApplicationDetail application={application} />);

    await user.click(screen.getByRole('button', {name: 'Ajouter la note'}));
    expect(screen.getByRole('alert')).toHaveTextContent('La note est vide.');

    await user.type(screen.getByLabelText('Nouvelle note'), 'Rappeler avant 10h.');
    await user.click(screen.getByRole('button', {name: 'Ajouter la note'}));

    expect(screen.getByText('Rappeler avant 10h.')).toBeInTheDocument();
    expect(screen.getByText(`Notes internes (${application.notes.length + 1})`)).toBeInTheDocument();
  });
});
