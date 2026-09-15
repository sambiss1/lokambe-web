import Image from 'next/image';
import type {CSSProperties} from 'react';
import type {PageHeroContent} from '@/content/types';
import {Marquee} from '../motion/Marquee';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';

/** Bandeau d'ouverture des pages intérieures : bleu, titre en capitales, photo en capsule. */
export function PageHero({hero, marquee}: {hero: PageHeroContent; marquee?: string[]}) {
  return (
    <section className="relative isolate overflow-hidden bg-lokambe-blue text-white">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-24 -z-10 h-[130%] w-auto opacity-55"
        viewBox="0 0 600 700"
        fill="none"
      >
        <path d="M560 40 A300 300 0 0 0 260 340 V700" stroke="#0014c9" strokeWidth="70" strokeLinecap="round" />
      </svg>

      <Container className="grid gap-12 pt-32 pb-16 sm:pt-40 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-44 lg:pb-24">
        <div className={hero.image ? 'lg:col-span-7' : 'lg:col-span-9'}>
          <Eyebrow className="fade-up text-white/85">{hero.eyebrow}</Eyebrow>
          <h1 className="display mt-6 text-[clamp(2.3rem,7.6vw,4.5rem)] lg:text-[clamp(3rem,4.6vw,5rem)]">
            <span className="line-mask">
              <span>{hero.title}</span>
            </span>
          </h1>
          <p className="fade-up mt-7 max-w-[38rem] text-lg leading-relaxed text-white/85 sm:text-xl" style={{'--i': 1} as CSSProperties}>
            {hero.intro}
          </p>
        </div>

        {hero.image && (
          <div className="capsule-in relative mx-auto aspect-[4/4.6] w-full max-w-[22rem] overflow-hidden rounded-[13rem] bg-lokambe-blue-deep lg:col-span-5 lg:max-w-none">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 34vw, 85vw"
              style={hero.image.position ? {objectPosition: hero.image.position} : undefined}
              className="object-cover"
            />
          </div>
        )}
      </Container>

      {marquee && (
        <Marquee label={marquee.join(' ')} className="bg-lokambe-peach py-4 text-lokambe-blue">
          {marquee.map((word) => (
            <span key={word} className="flex items-center">
              <span className="display px-6 text-[clamp(1.5rem,3.5vw,2.75rem)] leading-none whitespace-nowrap sm:px-8">
                {word}
              </span>
              <span aria-hidden="true" className="h-2.5 w-6 rounded-full bg-lokambe-red" />
            </span>
          ))}
        </Marquee>
      )}
    </section>
  );
}
