import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {CapitalCycle} from '@/components/home/CapitalCycle';
import {Faq} from '@/components/home/Faq';
import {FinalCta} from '@/components/home/FinalCta';
import {Formalisation} from '@/components/home/Formalisation';
import {LogoWall} from '@/components/home/LogoWall';
import {HomeHero} from '@/components/home/HomeHero';
import {SectorsBento} from '@/components/home/SectorsBento';
import {Statement} from '@/components/home/Statement';
import {SupportPilot} from '@/components/home/SupportPilot';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const {meta} = getContent(locale).home;
  return {
    ...pageMetadata(meta, {locale, path: '/'}),
    title: {absolute: `LOKAMBE — ${meta.title}`},
  };
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const home = getContent(locale).home;

  return (
    <>
      <HomeHero hero={home.hero} />
      <Statement statement={home.statement} facts={home.facts} />
      <CapitalCycle functions={home.functions} />
      <SectorsBento sectors={home.sectors} />
      <LogoWall content={home.portfolio} tone="peach" />
      <Formalisation formalisation={home.formalisation} />
      <SupportPilot support={home.support} pilot={home.pilot} />
      <LogoWall content={home.partners} />
      <Faq faq={home.faq} />
      <FinalCta cta={home.cta} />
    </>
  );
}
