import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {Chain} from '@/components/sections/Chain';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {Highlight} from '@/components/sections/Highlight';
import {ListPanel} from '@/components/sections/ListPanel';
import {PageHero} from '@/components/sections/PageHero';
import {Prose} from '@/components/sections/Prose';
import {Section} from '@/components/sections/Section';
import {StepList} from '@/components/sections/StepList';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).process.meta);
}

export default async function ProcessPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const {process} = getContent(locale);

  return (
    <>
      <PageHero hero={process.hero} />

      <Section eyebrow={process.investment.eyebrow} title={process.investment.title}>
        <StepList steps={process.investment.steps} />
      </Section>

      <Section tone="peach-soft" eyebrow={process.creation.eyebrow} title={process.creation.title}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Prose paragraphs={process.creation.paragraphs} lead />
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="text-xl font-extrabold text-lokambe-blue uppercase">{process.creation.stepsTitle}</h3>
            </Reveal>
            <div className="mt-6">
              <Chain items={process.creation.steps} />
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow={process.support.eyebrow} title={process.support.title} intro={process.support.intro}>
        <ListPanel groups={process.support.items} />
      </Section>

      <Highlight tone="peach">{process.support.closing}</Highlight>

      <CtaBanner cta={process.cta} />
    </>
  );
}
