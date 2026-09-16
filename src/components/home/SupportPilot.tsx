import Image from 'next/image';
import type {HomeContent} from '@/content/types';
import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';

export function SupportPilot({support, pilot}: {support: HomeContent['support']; pilot: HomeContent['pilot']}) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow className="text-ink-soft">{support.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[clamp(1.95rem,4.1vw,3.7rem)] text-lokambe-blue">{support.title}</h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">{support.intro}</p>
          </Reveal>
        </div>

        <ul className="border-t border-line lg:col-span-8">
          {support.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              index={index}
              className="group border-b border-line transition-colors duration-300 hover:bg-lokambe-peach-soft"
            >
              <div className="grid gap-2 px-1 py-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:items-baseline sm:gap-8 sm:px-5 sm:py-9">
                <h3 className="display text-[clamp(1.5rem,2.38vw,2.15rem)] text-ink transition-colors group-hover:text-lokambe-blue">
                  {item.title}
                </h3>
                <p className="text-[1.0625rem] leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Container className="mt-24 sm:mt-32">
        <div className="relative isolate grid overflow-hidden rounded-[2.5rem] bg-ink text-white lg:grid-cols-2">
          <div className="relative min-h-[22rem] lg:min-h-[40rem]">
            <Image src={pilot.image.src} alt={pilot.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[50%_80%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink/40" />
            <p className="display absolute bottom-6 left-6 text-[clamp(2.45rem,6.56vw,5.35rem)] leading-none text-white lg:bottom-10 lg:left-10">
              {pilot.overlay}
            </p>
          </div>
          <div className="flex flex-col p-8 sm:p-12 lg:p-14">
            <Reveal>
              <Eyebrow className="text-white/75">{pilot.eyebrow}</Eyebrow>
              <h2 className="display mt-5 text-[clamp(1.8rem,3.44vw,3.05rem)]">{pilot.title}</h2>
              {pilot.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-6 text-[1.0625rem] leading-relaxed text-white/75">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <ol className="relative mt-10 space-y-7 before:absolute before:top-3 before:bottom-3 before:left-[0.6875rem] before:w-0.5 before:bg-white/15">
              {pilot.points.map((point, index) => (
                <Reveal as="li" key={point.title} index={index} className="relative flex gap-5">
                  <span className="relative mt-1 grid size-6 flex-none place-items-center">
                    {index === 0 && <span className="absolute size-4 animate-pulse-dot rounded-full bg-lokambe-red" />}
                    <span
                      className={cx(
                        'relative size-4 rounded-full ring-4 ring-ink',
                        index === 0 ? 'bg-lokambe-red' : 'bg-white/35',
                      )}
                    />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-lokambe-peach">{point.label}</p>
                    <h3 className="text-xl font-extrabold uppercase">{point.title}</h3>
                    {point.text && <p className="mt-1 text-base leading-relaxed text-white/70">{point.text}</p>}
                  </div>
                </Reveal>
              ))}
            </ol>

            <p className="mt-auto pt-10 text-lg font-bold text-lokambe-peach">{pilot.closing}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
