import Image from 'next/image';
import type {HomeContent} from '@/content/types';
import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';
import {ButtonLink} from '../ui/Button';
import {Container} from '../ui/Container';
import {SectionHeader} from '../ui/SectionHeader';

/** Emplacements de la grille « bento » (desktop) pour les 5 secteurs. */
const SPANS = [
  'lg:col-span-5 lg:row-span-2',
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-4',
];

export function SectorsBento({sectors}: {sectors: HomeContent['sectors']}) {
  return (
    <section className="overflow-hidden bg-white py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow={sectors.eyebrow}
          title={sectors.title}
          intro={sectors.intro}
          aside={
            <ButtonLink href={sectors.link.href} variant="outline-blue" className="mt-6">
              {sectors.link.label}
            </ButtonLink>
          }
        />
      </Container>

      <Container className="mt-14 max-lg:px-0">
        <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:scroll-px-8 sm:px-8 lg:grid lg:auto-rows-[19rem] lg:grid-cols-12 lg:overflow-visible lg:px-0 xl:auto-rows-[21rem]">
          {sectors.items.map((sector, index) => (
            <Reveal
              as="li"
              key={sector.title}
              index={index}
              className={cx('w-[78vw] max-w-[22rem] flex-none snap-start lg:w-auto lg:max-w-none', SPANS[index])}
            >
              <article className="group relative isolate flex h-[27rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-lokambe-blue-deep p-6 text-white sm:p-7 lg:h-full">
                <Image
                  src={sector.image.src}
                  alt={sector.image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="-z-20 object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent transition-colors duration-500 group-hover:from-lokambe-blue/95 group-hover:via-lokambe-blue/40" />
                <ul className="mb-auto flex flex-wrap gap-1.5">
                  {sector.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur-md"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <h3 className={cx('display text-[1.9rem] leading-none', index === 0 && 'lg:text-[3.25rem]')}>
                  {sector.title}
                </h3>
                <p
                  className={cx(
                    'mt-3 max-w-[34ch] text-base leading-snug text-white/85',
                    'lg:grid lg:grid-rows-[0fr] lg:opacity-0 lg:transition-[grid-template-rows,opacity,margin] lg:duration-500 lg:ease-(--ease-out-expo)',
                    'lg:mt-0 lg:group-hover:mt-3 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100',
                    index === 0 && 'lg:mt-3 lg:grid-rows-[1fr] lg:opacity-100 lg:text-lg',
                  )}
                >
                  <span className="overflow-hidden">{sector.text}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
