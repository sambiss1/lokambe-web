import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {ContactForm} from '@/components/forms/ContactForm';
import {Reveal} from '@/components/motion/Reveal';
import {PageHero} from '@/components/sections/PageHero';
import {Section} from '@/components/sections/Section';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).contact.meta, {locale, path: '/contact'});
}

export default async function ContactPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const {contact, forms} = getContent(locale);

  return (
    <>
      <PageHero hero={contact.hero} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="display text-[clamp(1.6rem,3vw,2.25rem)] text-lokambe-blue">{contact.details.title}</h2>
              <dl className="mt-8 space-y-7">
                {contact.details.items.map((item) => (
                  <div key={item.label}>
                    <dt className="text-base font-medium text-ink-soft">{item.label}</dt>
                    <dd className="mt-1 text-xl font-bold text-ink">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="underline decoration-lokambe-peach decoration-2 underline-offset-8 transition-colors hover:text-lokambe-blue hover:decoration-lokambe-blue"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <div className="lg:col-span-8">
            <ContactForm title={contact.form.title} labels={forms} />
          </div>
        </div>
      </Section>
    </>
  );
}
