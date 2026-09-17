import {HeartHandshake, UtensilsCrossed} from 'lucide-react';
import Image from 'next/image';
import type {CSSProperties} from 'react';
import type {HomeContent} from '@/content/types';
import {cx} from '@/lib/cx';
import {ButtonLink} from '../ui/Button';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';

const FLOAT = 'animate-float motion-reduce:animate-none';

export function HomeHero({hero}: {hero: HomeContent['hero']}) {
  const {cards} = hero;

  return (
    <section className="relative isolate overflow-hidden bg-lokambe-blue text-white">
      <HeroArcs />

      <Container className="relative grid gap-12 pt-32 pb-16 sm:pt-40 lg:grid-cols-12 lg:gap-8 lg:pt-44 lg:pb-24">
        <div className="lg:col-span-7 xl:col-span-7">
          <Eyebrow className="fade-up text-white/85">{hero.eyebrow}</Eyebrow>
          <h1 lang="ln" className="display mt-6 text-[clamp(1.7rem,7.71vw,2.95rem)] sm:text-[clamp(2.8rem,6.23vw,4.1rem)] lg:text-[clamp(2.6rem,3.98vw,4.2rem)]">
            {hero.titleLines.map((line, index) => (
              <span key={line} className="line-mask" style={{'--i': index} as CSSProperties}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="fade-up mt-7 max-w-[33rem] text-[1.0625rem] leading-relaxed text-white/85 sm:text-lg" style={{'--i': 2} as CSSProperties}>
            {hero.intro}
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3" style={{'--i': 3} as CSSProperties}>
            <ButtonLink href={hero.primary.href} variant="red" size="lg">
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="outline-white" size="lg">
              {hero.secondary.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:mt-4 lg:max-w-none">
          <div className="capsule-in relative mx-auto aspect-[4/5.2] w-[82%] overflow-hidden rounded-full bg-lokambe-blue-deep lg:w-[78%]">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 34vw, 80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lokambe-blue/35 via-transparent to-transparent" />
          </div>

          {/* Cartes flottantes : elles illustrent le parcours réel d'un dossier. */}
          <div
            className="fade-up absolute top-[8%] -left-1 w-[15.5rem] sm:-left-6 lg:-left-10"
            style={{'--i': 4} as CSSProperties}
            aria-hidden="true"
          >
            <div className={cx(FLOAT, 'rounded-3xl bg-white p-5 text-ink shadow-[0_24px_60px_-18px_rgba(0,8,90,0.55)]')}>
              <p className="text-sm font-medium text-ink-soft">{cards.step.label}</p>
              <p className="mt-1 text-2xl font-extrabold text-lokambe-blue uppercase">{cards.step.title}</p>
              <p className="mt-1.5 text-[0.95rem] leading-snug text-ink-soft">{cards.step.text}</p>
              <div className="mt-4 flex gap-1">
                {Array.from({length: 12}, (_, index) => (
                  <span
                    key={index}
                    className={cx('h-1.5 flex-1 rounded-full', index < 3 ? 'bg-lokambe-red' : 'bg-lokambe-peach/60')}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="fade-up absolute right-0 bottom-[22%] sm:-right-4 lg:-right-2"
            style={{'--i': 5} as CSSProperties}
            aria-hidden="true"
          >
            <div
              className={cx(
                FLOAT,
                '[animation-delay:-2.4s] flex items-center gap-3 rounded-full bg-lokambe-peach py-2 pr-5 pl-2 text-lokambe-blue shadow-[0_20px_50px_-20px_rgba(0,8,90,0.6)]',
              )}
            >
              <span className="grid size-10 place-items-center rounded-full bg-lokambe-blue text-white">
                <UtensilsCrossed className="size-5" strokeWidth={2.2} />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-medium">{cards.sector.label}</span>
                <span className="block text-base font-extrabold">{cards.sector.title}</span>
              </span>
            </div>
          </div>

          <div
            className="fade-up absolute bottom-[2%] left-[6%] lg:left-0"
            style={{'--i': 6} as CSSProperties}
            aria-hidden="true"
          >
            <div
              className={cx(
                FLOAT,
                '[animation-delay:-4.6s] flex items-center gap-3 rounded-full bg-ink py-2.5 pr-5 pl-3 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]',
              )}
            >
              <span className="relative grid size-8 place-items-center">
                <span className="absolute size-3 animate-pulse-dot rounded-full bg-lokambe-red" />
                <HeartHandshake className="relative size-5 text-lokambe-peach" strokeWidth={2.2} />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-medium text-white/70">{cards.place.label}</span>
                <span className="block text-base font-extrabold uppercase">{cards.place.title}</span>
              </span>
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
}

/** Arcs décoratifs reprenant le trait arrondi des lettres du logo. */
function HeroArcs() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -top-[18%] -right-[22%] -z-10 h-[140%] w-auto opacity-60 lg:-right-[6%]"
      viewBox="0 0 600 700"
      fill="none"
    >
      <path d="M560 40 A300 300 0 0 0 260 340 V700" stroke="#0014c9" strokeWidth="70" strokeLinecap="round" />
      <path d="M560 200 A140 140 0 0 0 420 340 V700" stroke="#0018de" strokeWidth="70" strokeLinecap="round" />
    </svg>
  );
}
