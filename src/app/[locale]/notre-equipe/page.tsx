import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {CardGrid} from '@/components/sections/CardGrid';
import {PageHero} from '@/components/sections/PageHero';
import {Section} from '@/components/sections/Section';
import {TeamRoles} from '@/components/team/TeamRoles';
import {getTeam} from '@/content/team';
import {liveTeamRoles} from '@/lib/content/live';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getTeam(locale).meta, {locale, path: '/notre-equipe'});
}

export default async function TeamPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const team = getTeam(locale);
  // Les rôles sont administrables : sans réponse de l'API, ceux du code.
  const members = await liveTeamRoles(locale, team.roles.members);

  return (
    <>
      <PageHero hero={team.hero} />

      <Section tone="peach-soft" eyebrow={team.roles.eyebrow} title={team.roles.title} intro={team.roles.intro}>
        <TeamRoles members={members} />
      </Section>

      <Section tone="blue" eyebrow={team.values.eyebrow} title={team.values.title} intro={team.values.intro}>
        <CardGrid items={team.values.items} tone="dark" columns={2} />
      </Section>
    </>
  );
}
