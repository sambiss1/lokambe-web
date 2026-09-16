import {Plus} from 'lucide-react';
import type {HomeContent} from '@/content/types';
import {Reveal} from '../motion/Reveal';
import {ButtonLink} from '../ui/Button';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';

export function Faq({faq}: {faq: HomeContent['faq']}) {
  return (
    <section className="bg-lokambe-peach py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow className="text-lokambe-blue">{faq.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[clamp(1.95rem,4.1vw,3.7rem)] text-lokambe-blue">{faq.title}</h2>
            <p className="mt-6 text-[1.0625rem] text-ink sm:text-lg">{faq.contactText}</p>
            <ButtonLink href={faq.contact.href} variant="blue" size="lg" className="mt-6">
              {faq.contact.label}
            </ButtonLink>
          </div>
        </Reveal>

        <div className="space-y-3 lg:col-span-7">
          {faq.items.map((item, index) => (
            <Reveal key={item.question} index={index}>
              <details className="faq-item group rounded-[1.75rem] bg-white transition-shadow duration-300 open:shadow-[0_24px_60px_-30px_rgba(0,18,168,0.5)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-[1.75rem] p-6 text-lg font-bold text-ink sm:p-7 sm:text-xl">
                  {item.question}
                  <span className="grid size-11 flex-none place-items-center rounded-full bg-lokambe-peach-soft text-lokambe-blue transition-[rotate,background-color,color] duration-500 ease-(--ease-out-expo) group-open:rotate-45 group-open:bg-lokambe-blue group-open:text-white">
                    <Plus aria-hidden="true" className="size-5" strokeWidth={2.6} />
                  </span>
                </summary>
                <p className="px-6 pb-7 text-[1.0625rem] leading-relaxed text-ink-soft sm:px-7">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
