import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {JobOpenings} from '@/components/careers/JobOpenings';
import {CardGrid} from '@/components/sections/CardGrid';
import {PageHero} from '@/components/sections/PageHero';
import {Section} from '@/components/sections/Section';
import {getCareers, jobPostings} from '@/content/careers';
import {liveJobs} from '@/lib/content/live';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getCareers(locale).meta, {locale, path: '/carrieres'});
}

export default async function CareersPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const careers = getCareers(locale);
  // Les offres viennent de l'API. Le tableau du code est vide : sans offre
  // publiée, la page garde son état « aucun poste ouvert ».
  const jobs = await liveJobs(locale, jobPostings);

  return (
    <>
      <PageHero hero={careers.hero} />

      <Section eyebrow={careers.culture.eyebrow} title={careers.culture.title} intro={careers.culture.intro}>
        <CardGrid items={careers.culture.items} columns={2} />
      </Section>

      <Section
        id="postes"
        tone="peach-soft"
        eyebrow={careers.openings.eyebrow}
        title={careers.openings.title}
        intro={careers.openings.intro}
      >
        <JobOpenings jobs={jobs} openings={careers.openings} />
      </Section>
    </>
  );
}
