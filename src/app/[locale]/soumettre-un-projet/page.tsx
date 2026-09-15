import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {ApplicationForm} from '@/components/forms/ApplicationForm';
import {Reveal} from '@/components/motion/Reveal';
import {CheckList} from '@/components/sections/CheckList';
import {ListPanel} from '@/components/sections/ListPanel';
import {PageHero} from '@/components/sections/PageHero';
import {Section} from '@/components/sections/Section';
import {StepList} from '@/components/sections/StepList';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).apply.meta);
}

export default async function ApplyPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const {apply, forms} = getContent(locale);

  return (
    <>
      <PageHero hero={apply.hero} />

      <Section tone="peach-soft" eyebrow={apply.eligibility.eyebrow} title={apply.eligibility.title}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <CheckList items={apply.eligibility.items} columns={1} />
            <Reveal className="mt-8">
              <p className="max-w-[60ch] border-l-4 border-lokambe-red pl-4 text-lg leading-relaxed text-ink">
                {apply.eligibility.note}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <ListPanel
              groups={[{title: apply.documents.title, intro: apply.documents.intro, items: apply.documents.items}]}
              variant="bullets"
              columns={2}
            />
            <Reveal className="mt-4">
              <p className="text-base text-ink-soft">{apply.documents.formats}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="formulaire">
        <ApplicationForm content={apply.form} labels={forms} />
      </Section>

      <Section tone="blue" eyebrow={apply.nextSteps.eyebrow} title={apply.nextSteps.title}>
        <StepList steps={apply.nextSteps.steps} tone="dark" />
      </Section>
    </>
  );
}
