import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {CardGrid} from '@/components/sections/CardGrid';
import {Chain} from '@/components/sections/Chain';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {ListPanel} from '@/components/sections/ListPanel';
import {PageHero} from '@/components/sections/PageHero';
import {Prose} from '@/components/sections/Prose';
import {Section} from '@/components/sections/Section';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).about.meta);
}

export default async function AboutPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const {about} = getContent(locale);

  return (
    <>
      <PageHero hero={about.hero} />

      <Section eyebrow={about.problem.eyebrow} title={about.problem.title}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Prose paragraphs={about.problem.paragraphs} lead />
          </div>
          <div className="lg:col-span-5">
            <ListPanel groups={[about.problem.obstacles]} variant="bullets" columns={2} />
          </div>
        </div>
        <div className="mt-14 border-t border-line pt-14">
          <Prose paragraphs={about.problem.closing} className="max-w-[72ch]" />
        </div>
      </Section>

      <Section
        tone="peach-soft"
        eyebrow={about.convictions.eyebrow}
        title={about.convictions.title}
        intro={about.convictions.intro}
      >
        <CardGrid items={about.convictions.items} />
      </Section>

      <Section tone="blue" eyebrow={about.vision.eyebrow} title={about.vision.title}>
        <CardGrid items={about.vision.items} tone="dark" />
      </Section>

      <Section eyebrow={about.conclusion.eyebrow} title={about.conclusion.title}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Prose paragraphs={about.conclusion.paragraphs} lead />
            <ol className="mt-10 space-y-3">
              {about.conclusion.pillars.map((pillar, index) => (
                <Reveal as="li" key={pillar} index={index} className="flex items-baseline gap-4">
                  <span className="text-xl font-extrabold text-lokambe-red tabular-nums">{index + 1}</span>
                  <span className="text-xl font-bold text-ink sm:text-2xl">{pillar}</span>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <h3 className="text-xl font-extrabold text-lokambe-blue uppercase">{about.conclusion.evolutionTitle}</h3>
            </Reveal>
            <div className="mt-6">
              <Chain items={about.conclusion.evolution} />
            </div>
            <div className="mt-10">
              <Prose paragraphs={about.conclusion.closing} />
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner cta={about.cta} />
    </>
  );
}
