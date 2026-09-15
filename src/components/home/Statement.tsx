import type {HomeContent} from '@/content/types';
import {CountUp} from '../motion/CountUp';
import {Reveal} from '../motion/Reveal';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';

export function Statement({statement, facts}: {statement: HomeContent['statement']; facts: HomeContent['facts']}) {
  const words = statement.quote.split(' ');

  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <Container>
        <blockquote>
          <p className="word-fill display text-[clamp(2.75rem,8.4vw,8.5rem)] leading-[0.88] text-lokambe-blue">
            {words.map((word, index) => (
              <span key={`${word}-${index}`}>
                {word}
                {index < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </blockquote>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="text-xl leading-relaxed text-ink-soft sm:text-2xl sm:leading-relaxed">{statement.text}</p>
          </Reveal>
        </div>

        <div className="mt-24 sm:mt-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-lokambe-blue pb-5">
            <div>
              <Eyebrow className="text-ink-soft">{facts.eyebrow}</Eyebrow>
              <h2 className="display mt-3 text-[clamp(1.75rem,3vw,2.5rem)] text-lokambe-blue">{facts.title}</h2>
            </div>
            <p className="max-w-sm text-base text-ink-soft">{facts.note}</p>
          </Reveal>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {facts.items.map((fact, index) => (
              <Reveal
                as="li"
                key={fact.label}
                index={index}
                className="group border-b border-line py-8 sm:odd:pr-6 sm:even:pl-6 lg:border-b-0 lg:border-l lg:px-8 lg:odd:pr-8 lg:even:pl-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <p className="text-[clamp(4.5rem,9vw,7.5rem)] leading-[0.85] font-extrabold tracking-tight text-lokambe-blue">
                  <CountUp value={fact.value} />
                </p>
                <p className="mt-4 text-xl font-bold text-ink">{fact.label}</p>
                <p className="mt-2 max-w-[28ch] text-base leading-relaxed text-ink-soft">{fact.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
