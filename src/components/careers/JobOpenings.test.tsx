import {screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import type {JobPosting} from '@/content/careers';
import {careers, jobPostings} from '@/content/careers';
import {renderWithIntl} from '@/test/render';
import {JobOpenings} from './JobOpenings';

const job: JobPosting = {
  slug: 'analyste-investissement',
  title: 'Analyste investissement',
  location: 'Kinshasa, RDC',
  contractType: 'CDI',
  summary: 'Instruire les dossiers d’investissement et préparer les recommandations.',
  missions: ['Analyser les dossiers', 'Réaliser les diligences'],
  profile: ['Formation en finance', 'Première expérience du terrain'],
};

describe('JobOpenings', () => {
  it('affiche l’état vide et l’invitation aux candidatures spontanées', () => {
    renderWithIntl(<JobOpenings jobs={jobPostings} openings={careers.openings} />);
    expect(screen.getByText('Aucun poste ouvert pour le moment')).toBeInTheDocument();
    expect(screen.getByText('Écrivez-nous, les candidatures spontanées sont les bienvenues.')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Envoyer une candidature/})).toHaveAttribute('href', '/fr/contact');
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('rend une offre complète dès qu’un poste est ajouté au tableau', () => {
    renderWithIntl(<JobOpenings jobs={[job]} openings={careers.openings} />);
    expect(screen.getByRole('heading', {level: 3, name: job.title})).toBeInTheDocument();
    expect(screen.getByText('Kinshasa, RDC')).toBeInTheDocument();
    expect(screen.getByText('CDI')).toBeInTheDocument();
    expect(screen.getByText('Missions')).toBeInTheDocument();
    expect(screen.getByText('Profil recherché')).toBeInTheDocument();
    for (const item of [...job.missions, ...job.profile]) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    expect(screen.getByRole('link', {name: /Postuler/})).toHaveAttribute('href', '/fr/contact');
  });

  it('garde le tableau des postes vide par défaut', () => {
    expect(jobPostings).toEqual([]);
  });
});
