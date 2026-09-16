import type {HomeContent} from '@/content/types';
import {cx} from '@/lib/cx';
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
          <p className="word-fill display text-[clamp(2.25rem,6.89vw,6.95rem)] leading-[0.88] text-lokambe-blue">
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
            <p className="text-lg leading-relaxed text-ink-soft sm:text-xl sm:leading-relaxed">{statement.text}</p>
          </Reveal>
        </div>

        <div className="mt-24 sm:mt-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-lokambe-blue pb-5">
            <div>
              <Eyebrow className="text-ink-soft">{facts.eyebrow}</Eyebrow>
              <h2 className="display mt-3 text-[clamp(1.45rem,2.46vw,2.05rem)] text-lokambe-blue">{facts.title}</h2>
            </div>
          </Reveal>
          <ul className={cx('grid sm:grid-cols-2', facts.items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4')}>
            {facts.items.map((fact, index) => (
              <Reveal
                as="li"
                key={fact.label}
                index={index}
                className="group border-b border-line py-8 sm:odd:pr-6 sm:even:pl-6 lg:border-b-0 lg:border-l lg:px-8 lg:odd:pr-8 lg:even:pl-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <p className="text-[clamp(3.7rem,7.38vw,6.15rem)] leading-[0.85] font-extrabold tracking-tight text-lokambe-blue">
                  <CountUp value={fact.value} />
                </p>
                <p className="mt-4 text-lg font-bold text-ink">{fact.label}</p>
                <p className="mt-2 max-w-[30ch] text-[0.9375rem] leading-relaxed text-ink-soft">{fact.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
