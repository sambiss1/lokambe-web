import type {CtaContent} from '@/content/types';
import {Reveal} from '../motion/Reveal';
import {ButtonLink} from '../ui/Button';
import {Container} from '../ui/Container';

/** Appel à l'action de fin de page. */
export function CtaBanner({cta}: {cta: CtaContent}) {
  return (
    <section className="relative isolate overflow-hidden bg-lokambe-blue py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 size-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[4rem] border-lokambe-blue-deep/60"
      />
      <Container className="max-w-[60rem] text-center">
        <Reveal>
          <h2 className="display text-[clamp(1.95rem,4.92vw,4.1rem)]">{cta.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-white/85 sm:text-lg">{cta.text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href={cta.primary.href} variant="red" size="lg">
              {cta.primary.label}
            </ButtonLink>
            {cta.secondary && (
              <ButtonLink href={cta.secondary.href} variant="outline-white" size="lg">
                {cta.secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
