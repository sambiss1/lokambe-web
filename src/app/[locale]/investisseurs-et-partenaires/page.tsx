import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {ContactForm} from '@/components/forms/ContactForm';
import {Reveal} from '@/components/motion/Reveal';
import {CardGrid} from '@/components/sections/CardGrid';
import {Highlight} from '@/components/sections/Highlight';
import {ListPanel} from '@/components/sections/ListPanel';
import {PageHero} from '@/components/sections/PageHero';
import {Section} from '@/components/sections/Section';
import {getContent} from '@/content';
import {CONTACT_EMAIL} from '@/lib/brand';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).investors.meta, {locale, path: '/investisseurs-et-partenaires'});
}

export default async function InvestorsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const {investors, forms} = getContent(locale);

  return (
    <>
      <PageHero hero={investors.hero} />

      <Section eyebrow={investors.why.eyebrow} title={investors.why.title}>
        <CardGrid items={investors.why.items} columns={2} />
      </Section>

      <Section tone="peach-soft" eyebrow={investors.capital.eyebrow} title={investors.capital.title} intro={investors.capital.intro}>
        <ListPanel groups={investors.capital.items} variant="bullets" />
      </Section>

      <Highlight tone="blue">{investors.capital.principle}</Highlight>

      <Section eyebrow={investors.network.eyebrow} title={investors.network.title}>
        <CardGrid items={investors.network.items} />
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="text-xl leading-relaxed text-ink-soft">
              Écrivez-nous directement, ou utilisez le formulaire : nous revenons vers vous avec une présentation
              détaillée du fonds.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-block text-xl font-bold text-lokambe-blue underline decoration-lokambe-peach decoration-2 underline-offset-8 transition-colors hover:decoration-lokambe-blue"
            >
              {CONTACT_EMAIL}
            </a>
          </Reveal>
          <div className="lg:col-span-8">
            <ContactForm title={investors.form.title} labels={forms} defaultKind="investisseur" />
          </div>
        </div>
      </Section>
    </>
  );
}
