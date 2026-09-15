import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {Chain} from '@/components/sections/Chain';
import {CheckList} from '@/components/sections/CheckList';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {ListPanel} from '@/components/sections/ListPanel';
import {PageHero} from '@/components/sections/PageHero';
import {Prose} from '@/components/sections/Prose';
import {ResponsibilityTable} from '@/components/sections/ResponsibilityTable';
import {Section} from '@/components/sections/Section';
import {TeamGrid} from '@/components/sections/TeamGrid';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).governance.meta);
}

export default async function GovernancePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const {governance} = getContent(locale);

  return (
    <>
      <PageHero hero={governance.hero} />

      <Section tone="peach-soft" eyebrow={governance.team.eyebrow} title={governance.team.title} intro={governance.team.intro}>
        <TeamGrid members={governance.team.members} />
      </Section>

      <Section eyebrow={governance.committee.eyebrow} title={governance.committee.title}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Prose paragraphs={governance.committee.paragraphs} lead />
            <Reveal className="mt-10">
              <h3 className="text-xl font-extrabold text-lokambe-blue uppercase">{governance.committee.membersTitle}</h3>
            </Reveal>
            <div className="mt-6">
              <CheckList items={governance.committee.members} columns={1} />
            </div>
            <Reveal className="mt-6">
              <p className="text-base text-ink-soft italic">{governance.committee.note}</p>
            </Reveal>
          </div>
          <div className="space-y-4 lg:col-span-5">
            <ListPanel groups={[governance.committee.powers, governance.committee.criteria]} variant="bullets" columns={2} />
          </div>
        </div>
        <Reveal className="mt-12">
          <p className="max-w-[65ch] border-l-4 border-lokambe-red pl-4 text-xl font-bold text-ink">
            {governance.committee.closing}
          </p>
        </Reveal>
      </Section>

      <Section tone="peach-soft" eyebrow={governance.separation.eyebrow} title={governance.separation.title} intro={governance.separation.intro}>
        <ResponsibilityTable
          stageLabel={governance.separation.stageLabel}
          ownerLabel={governance.separation.ownerLabel}
          rows={governance.separation.rows}
        />
        <Reveal className="mt-8">
          <p className="max-w-[65ch] text-lg leading-relaxed text-ink-soft">{governance.separation.closing}</p>
        </Reveal>
      </Section>

      <Section tone="blue" eyebrow={governance.principles.eyebrow} title={governance.principles.title}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Prose paragraphs={governance.principles.paragraphs} tone="dark" lead />
          </div>
          <div className="lg:col-span-5">
            <Chain items={governance.principles.values} tone="dark" />
          </div>
        </div>
      </Section>

      <Section eyebrow={governance.risks.eyebrow} title={governance.risks.title}>
        <ListPanel groups={[governance.risks.risks, governance.risks.controls]} variant="bullets" columns={2} />
      </Section>

      <Section tone="peach-soft" eyebrow={governance.experts.eyebrow} title={governance.experts.title} intro={governance.experts.intro}>
        <CheckList items={governance.experts.items} />
        <Reveal className="mt-10">
          <p className="max-w-[65ch] text-lg leading-relaxed text-ink-soft">{governance.experts.closing}</p>
        </Reveal>
      </Section>

      <Section eyebrow={governance.evolution.eyebrow} title={governance.evolution.title}>
        <Prose paragraphs={governance.evolution.paragraphs} lead />
      </Section>

      <CtaBanner cta={governance.cta} />
    </>
  );
}
