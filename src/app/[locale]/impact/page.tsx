import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {CardGrid} from '@/components/sections/CardGrid';
import {Chain} from '@/components/sections/Chain';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {ListPanel} from '@/components/sections/ListPanel';
import {PageHero} from '@/components/sections/PageHero';
import {Section} from '@/components/sections/Section';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).impact.meta, {locale, path: '/impact'});
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
