import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {CardGrid} from '@/components/sections/CardGrid';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {PageHero} from '@/components/sections/PageHero';
import {Prose} from '@/components/sections/Prose';
import {Section} from '@/components/sections/Section';
import {TeamRoles} from '@/components/team/TeamRoles';
import {team} from '@/content/team';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(team.meta, {locale, path: '/notre-equipe'});
}

export default async function TeamPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero hero={team.hero} />

      <Section tone="peach-soft" eyebrow={team.roles.eyebrow} title={team.roles.title} intro={team.roles.intro}>
        <TeamRoles members={team.roles.members} />
      </Section>

      <Section tone="blue" eyebrow={team.decisions.eyebrow} title={team.decisions.title} intro={team.decisions.intro}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Prose paragraphs={team.decisions.paragraphs} tone="dark" lead />
          </div>
          <Reveal index={1} className="lg:col-span-5">
            <h3 className="text-base font-bold text-white/80">{team.decisions.valuesTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {team.decisions.values.map((value) => (
                <li
                  key={value}
                  className="rounded-full bg-white/10 px-4 py-2 text-[0.9375rem] font-bold text-white ring-1 ring-white/15 ring-inset"
                >
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="mt-14">
          <CardGrid items={team.decisions.items} tone="dark" />
        </div>
      </Section>

      <CtaBanner cta={team.cta} />
    </>
  );
}
