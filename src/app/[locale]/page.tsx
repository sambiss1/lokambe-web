import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {CapitalCycle} from '@/components/home/CapitalCycle';
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
      <SupportPilot support={home.support} pilot={home.pilot} />
      {/* Les partenaires : juste les logos, sans fiche au clic — le client n'a
          rien d'autre à afficher pour l'instant. La section reste masquée tant
          que la liste est vide. */}
      {home.partners.items.length > 0 && <LogoWall content={home.partners} interactive={false} />}
    </>
  );
}
