import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {CardGrid} from '@/components/sections/CardGrid';
import {Chain} from '@/components/sections/Chain';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {Highlight} from '@/components/sections/Highlight';
import {ListPanel} from '@/components/sections/ListPanel';
import {PageHero} from '@/components/sections/PageHero';
import {PhaseList} from '@/components/sections/PhaseList';
import {Section} from '@/components/sections/Section';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).impact.meta);
}

export default async function ImpactPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const {impact} = getContent(locale);

  return (
    <>
      <PageHero hero={impact.hero} />

      <Section eyebrow={impact.performance.eyebrow} title={impact.performance.title} intro={impact.performance.intro}>
        <ListPanel groups={impact.performance.groups} />
      </Section>

      <Section tone="peach-soft" eyebrow={impact.impact.eyebrow} title={impact.impact.title} intro={impact.impact.intro}>
        <ListPanel groups={impact.impact.groups} />
        <Reveal className="mt-10">
          <p className="max-w-[65ch] text-lg leading-relaxed text-ink-soft">{impact.impact.closing}</p>
        </Reveal>
      </Section>

      <Section eyebrow={impact.deployment.eyebrow} title={impact.deployment.title}>
        <PhaseList phases={impact.deployment.phases} />
      </Section>

      <Highlight>{impact.deployment.motto}</Highlight>

      <Section tone="blue" eyebrow={impact.pilot.eyebrow} title={impact.pilot.title} intro={impact.pilot.intro}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="text-xl font-extrabold text-lokambe-peach uppercase">{impact.pilot.questionsTitle}</h3>
            </Reveal>
            <ol className="mt-6 space-y-4">
              {impact.pilot.questions.map((question, index) => (
                <Reveal as="li" key={question} index={index} className="flex items-baseline gap-4">
                  <span className="text-xl font-extrabold text-lokambe-peach tabular-nums">{index + 1}</span>
                  <span className="text-xl font-bold text-white sm:text-2xl">{question}</span>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <ListPanel groups={[impact.pilot.tests]} tone="dark" columns={2} />
          </div>
        </div>
      </Section>

      <Section eyebrow={impact.strategy.eyebrow} title={impact.strategy.title}>
        <PhaseList phases={impact.strategy.phases} />
      </Section>

      <Section tone="peach-soft" eyebrow={impact.vision.eyebrow} title={impact.vision.title}>
        <CardGrid items={impact.vision.items} columns={2} />
        <Reveal className="mt-14">
          <h3 className="text-xl font-extrabold text-lokambe-blue uppercase">{impact.vision.ecosystemTitle}</h3>
        </Reveal>
        <div className="mt-6">
          <Chain items={impact.vision.ecosystem} />
        </div>
        <Reveal className="mt-10">
          <p className="max-w-[65ch] border-l-4 border-lokambe-red pl-4 text-xl font-bold text-ink">{impact.vision.closing}</p>
        </Reveal>
      </Section>

      <CtaBanner cta={impact.cta} />
    </>
  );
}
