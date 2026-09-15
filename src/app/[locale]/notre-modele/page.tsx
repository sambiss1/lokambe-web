import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {CardGrid} from '@/components/sections/CardGrid';
import {Chain} from '@/components/sections/Chain';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {Highlight} from '@/components/sections/Highlight';
import {ListPanel} from '@/components/sections/ListPanel';
import {PageHero} from '@/components/sections/PageHero';
import {PillarBlock} from '@/components/sections/PillarBlock';
import {Prose} from '@/components/sections/Prose';
import {Section} from '@/components/sections/Section';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).model.meta);
}

export default async function ModelPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const {model} = getContent(locale);

  return (
    <>
      <PageHero hero={model.hero} marquee={['Investisseur', 'Créateur', 'Accompagnateur']} />

      <Section eyebrow={model.roles.eyebrow} title={model.roles.title} intro={model.roles.intro}>
        <CardGrid items={model.roles.items} />
      </Section>

      <Highlight>{model.roles.closing}</Highlight>

      <Section tone="peach-soft" eyebrow={model.pillars.eyebrow} title={model.pillars.title}>
        <div className="space-y-20">
          {model.pillars.items.map((pillar) => (
            <PillarBlock key={pillar.title} pillar={pillar} />
          ))}
        </div>
      </Section>

      <Section eyebrow={model.instruments.eyebrow} title={model.instruments.title} intro={model.instruments.intro}>
        <CardGrid items={model.instruments.items} />
        <div className="mt-10 lg:max-w-2xl">
          <ListPanel groups={[model.instruments.criteria]} columns={2} />
        </div>
      </Section>

      <Section tone="blue" eyebrow={model.portfolio.eyebrow} title={model.portfolio.title}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Prose paragraphs={model.portfolio.paragraphs} tone="dark" lead />
          </div>
          <div className="lg:col-span-5">
            <ListPanel groups={[model.portfolio.dimensions]} tone="dark" columns={2} />
          </div>
        </div>
      </Section>

      <Section eyebrow={model.economics.eyebrow} title={model.economics.title} intro={model.economics.intro}>
        <ListPanel groups={model.economics.items} columns={2} />
        <Reveal className="mt-14">
          <h3 className="text-xl font-extrabold text-lokambe-blue uppercase">{model.economics.cycleTitle}</h3>
        </Reveal>
        <div className="mt-6">
          <Chain items={model.economics.cycle} />
        </div>
      </Section>

      <CtaBanner cta={model.cta} />
    </>
  );
}
