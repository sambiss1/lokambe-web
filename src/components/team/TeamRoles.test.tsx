import {screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import type {TeamRoleCard} from '@/content/team';
import {team, teamRoles} from '@/content/team';
import {renderWithIntl} from '@/test/render';
import {TeamRoles} from './TeamRoles';

const role: TeamRoleCard = {
  slug: 'role-test',
  title: 'Responsable test',
  initials: 'RT',
  summary: 'Résumé du rôle de test.',
  photo: {src: '/images/team/role-test.webp', alt: 'Portrait du Responsable test'},
};

describe('TeamRoles', () => {
  it('affiche les quatre rôles permanents avec leur résumé', () => {
    renderWithIntl(<TeamRoles members={team.roles.members} />);
    expect(screen.getAllByRole('heading', {level: 3})).toHaveLength(4);
    for (const member of teamRoles) {
      expect(screen.getByRole('heading', {level: 3, name: member.title})).toBeInTheDocument();
      expect(screen.getByText(member.summary)).toBeInTheDocument();
    }
  });

  it('réserve la place du portrait sans afficher d’image tant qu’il n’est pas prêt', () => {
    renderWithIntl(<TeamRoles members={[role]} />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('RT')).toBeInTheDocument();
  });

  it('affiche la photographie dès que `ready` est vrai', () => {
    renderWithIntl(<TeamRoles members={[{...role, photo: {...role.photo, ready: true}}]} />);
    const image = screen.getByRole('img', {name: 'Portrait du Responsable test'});
    expect(image.getAttribute('src')).toContain('/images/team/role-test.webp');
    expect(screen.queryByText('RT')).toBeNull();
  });

  it('ne publie aucun nom de personne : seuls les intitulés de rôle', () => {
    for (const member of teamRoles) {
      expect(member.title).toMatch(/^(Fondateur|Responsable)/);
      expect(member.photo.src).toBe(`/images/team/${member.slug}.webp`);
    }
  });
});
