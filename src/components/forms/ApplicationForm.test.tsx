import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import {fr} from '@/content/fr';
import {renderWithIntl} from '@/test/render';
import {ApplicationForm} from './ApplicationForm';

describe('ApplicationForm', () => {
  it('bloque le passage à l’étape suivante tant que l’étape est incomplète', async () => {
    const user = userEvent.setup();
    renderWithIntl(<ApplicationForm content={fr.apply.form} labels={fr.forms} />);
    await user.click(screen.getByRole('button', {name: 'Continuer'}));
    expect(await screen.findByText('Indiquez votre prénom.')).toBeInTheDocument();
    expect(screen.getByLabelText(/Prénom/)).toBeInTheDocument();
  });

  it('passe à l’étape suivante quand les champs requis sont remplis', async () => {
    const user = userEvent.setup();
    renderWithIntl(<ApplicationForm content={fr.apply.form} labels={fr.forms} />);
    await user.type(screen.getByLabelText(/Prénom/), 'Joseph');
    await user.type(screen.getByLabelText(/^Nom$/), 'Mbala');
    await user.type(screen.getByLabelText(/Téléphone/), '+243 810 000 000');
    await user.type(screen.getByLabelText(/^Ville$/), 'Kinshasa');
    await user.click(screen.getByRole('button', {name: 'Continuer'}));
    expect(await screen.findByLabelText(/Nom de l’activité/)).toBeInTheDocument();
  });
});
