import type {LegalContent} from '@/content/types';
import {Reveal} from '../motion/Reveal';
import {Container} from '../ui/Container';

/** Page légale : sommaire latéral et sections numérotées. */
export function LegalDocument({document}: {document: LegalContent}) {
  const slug = (title: string) =>
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  return (
    <>
      <section className="bg-lokambe-blue pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
        <Container>
          <h1 className="display text-[clamp(2.4rem,6vw,4.5rem)]">
            <span className="line-mask">
              <span>{document.title}</span>
            </span>
          </h1>
          <p className="fade-up mt-6 text-lg text-white/75">
            {document.updatedLabel} : {document.updatedAt}
          </p>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label={document.title} className="lg:col-span-4">
            <ol className="lg:sticky lg:top-32 space-y-2 border-l-2 border-line pl-5">
              {document.sections.map((section, index) => (
                <li key={section.title}>
                  <a
                    href={`#${slug(section.title)}`}
                    className="flex gap-3 py-1 text-lg text-ink-soft transition-colors hover:text-lokambe-blue"
                  >
                    <span className="tabular-nums text-lokambe-red">{String(index + 1).padStart(2, '0')}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-14 lg:col-span-8">
            {document.sections.map((section) => (
              <Reveal as="article" key={section.title} id={slug(section.title)}>
                <h2 className="display text-[clamp(1.6rem,3vw,2.25rem)] text-lokambe-blue">{section.title}</h2>
                <div className="mt-5 max-w-[68ch] space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-ink-soft">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
