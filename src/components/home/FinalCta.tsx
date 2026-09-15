import Image from 'next/image';
import type {HomeContent} from '@/content/types';
import {Reveal} from '../motion/Reveal';
import {ButtonLink} from '../ui/Button';
import {Container} from '../ui/Container';

export function FinalCta({cta}: {cta: HomeContent['cta']}) {
  return (
    <section className="relative isolate overflow-hidden bg-lokambe-blue py-24 text-white sm:py-32">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[5rem] border-lokambe-blue-deep/60"
      />
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <h2 className="display text-[clamp(2.75rem,7vw,7rem)] leading-[0.9]">{cta.title}</h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">{cta.text}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={cta.primary.href} variant="white" size="lg">
              {cta.primary.label}
            </ButtonLink>
            {cta.secondary && (
              <ButtonLink href={cta.secondary.href} variant="outline-white" size="lg">
                {cta.secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
        <Reveal index={1} className="mx-auto w-full max-w-[20rem] lg:col-span-4 lg:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-full ring-[0.75rem] ring-lokambe-peach">
            <Image src={cta.image.src} alt={cta.image.alt} fill sizes="(min-width: 1024px) 30vw, 70vw" className="object-cover" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
