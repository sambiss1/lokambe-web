import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {JobOpenings} from '@/components/careers/JobOpenings';
import {CardGrid} from '@/components/sections/CardGrid';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {PageHero} from '@/components/sections/PageHero';
import {Section} from '@/components/sections/Section';
import {careers, jobPostings} from '@/content/careers';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(careers.meta, {locale, path: '/carrieres'});
}

export default async function CareersPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

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
        <JobOpenings jobs={jobPostings} openings={careers.openings} />
      </Section>

      <CtaBanner cta={careers.cta} />
    </>
  );
}
