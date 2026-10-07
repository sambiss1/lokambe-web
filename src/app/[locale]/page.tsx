import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {CapitalCycle} from '@/components/home/CapitalCycle';
import {LogoWall} from '@/components/home/LogoWall';
import {HomeHero} from '@/components/home/HomeHero';
import {SectorsBento} from '@/components/home/SectorsBento';
import {Statement} from '@/components/home/Statement';
import {SupportPilot} from '@/components/home/SupportPilot';
import {getContent} from '@/content';
import {livePartners, livePortfolio} from '@/lib/content/live';
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

  // Le portefeuille et les partenaires sont administrables depuis le 7 octobre.
  // Les deux lectures sont indépendantes, et chacune retombe sur le contenu
  // livré avec le site si l'API ne répond pas.
  const [portfolio, partners] = await Promise.all([
    livePortfolio(locale, home.portfolio),
    livePartners(locale, home.partners),
  ]);

  return (
    <>
      <HomeHero hero={home.hero} />
      <Statement statement={home.statement} facts={home.facts} />
      <CapitalCycle functions={home.functions} />
      <SectorsBento sectors={home.sectors} />
      <LogoWall content={portfolio} tone="peach" />
      <SupportPilot support={home.support} pilot={home.pilot} />
      {/* Les partenaires : juste les logos, sans fiche au clic — le client n'a
          rien d'autre à afficher pour l'instant. La section reste masquée tant
          que la liste est vide. */}
      {partners.items.length > 0 && <LogoWall content={partners} interactive={false} />}
    </>
  );
}
