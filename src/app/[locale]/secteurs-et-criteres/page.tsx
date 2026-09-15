import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {CardGrid} from '@/components/sections/CardGrid';
import {CheckList} from '@/components/sections/CheckList';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {ListPanel} from '@/components/sections/ListPanel';
import {PageHero} from '@/components/sections/PageHero';
import {Section} from '@/components/sections/Section';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).sectors.meta, {locale, path: '/secteurs-et-criteres'});
}

export default async function SectorsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const {sectors} = getContent(locale);

  return (
    <>
      <PageHero hero={sectors.hero} />

      <Section eyebrow={sectors.thesis.eyebrow} title={sectors.thesis.title} intro={sectors.thesis.intro}>
        <CardGrid items={sectors.thesis.items} />
      </Section>

      <Section tone="peach-soft" eyebrow={sectors.sectors.eyebrow} title={sectors.sectors.title} intro={sectors.sectors.intro}>
        <ListPanel groups={sectors.sectors.items} />
        <Reveal className="mt-10">
          <p className="max-w-[65ch] text-lg leading-relaxed text-ink-soft">{sectors.sectors.closing}</p>
        </Reveal>
      </Section>

      <Section tone="blue" eyebrow={sectors.profile.eyebrow} title={sectors.profile.title} intro={sectors.profile.intro}>
        <CheckList items={sectors.profile.items} tone="dark" />
        <Reveal className="mt-10">
          <p className="max-w-[70ch] rounded-[1.75rem] bg-white/[0.07] p-7 text-lg leading-relaxed text-white/85 ring-1 ring-white/15 ring-inset">
            {sectors.profile.note}
          </p>
        </Reveal>
      </Section>

      <CtaBanner cta={sectors.cta} />
    </>
  );
}
