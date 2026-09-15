import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {CapitalCycle} from '@/components/home/CapitalCycle';
import {Faq} from '@/components/home/Faq';
import {FinalCta} from '@/components/home/FinalCta';
import {HomeHero} from '@/components/home/HomeHero';
import {ProcessSection} from '@/components/home/ProcessSection';
import {SectorsBento} from '@/components/home/SectorsBento';
import {Statement} from '@/components/home/Statement';
import {SupportPilot} from '@/components/home/SupportPilot';
import {getContent} from '@/content';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const {meta} = getContent(locale).home;
  return {title: {absolute: `LOKAMBE — ${meta.title}`}, description: meta.description};
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const home = getContent(locale).home;

  return (
    <>
      <HomeHero hero={home.hero} marquee={home.marquee} />
      <Statement statement={home.statement} facts={home.facts} />
      <CapitalCycle functions={home.functions} />
      <SectorsBento sectors={home.sectors} />
      <ProcessSection process={home.process} />
      <SupportPilot support={home.support} pilot={home.pilot} />
      <Faq faq={home.faq} />
      <FinalCta cta={home.cta} />
    </>
  );
}
