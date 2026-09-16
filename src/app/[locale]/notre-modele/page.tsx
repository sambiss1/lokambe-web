import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {CardGrid} from '@/components/sections/CardGrid';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {Highlight} from '@/components/sections/Highlight';
import {PageHero} from '@/components/sections/PageHero';
import {PillarBlock} from '@/components/sections/PillarBlock';
import {Section} from '@/components/sections/Section';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).model.meta, {locale, path: '/notre-modele'});
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

      <CtaBanner cta={model.cta} />
    </>
  );
}
