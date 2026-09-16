'use client';

import {ArrowLeft, ArrowRight} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import type {HomeContent} from '@/content/types';
import {cx} from '@/lib/cx';

/** Frise horizontale des 12 étapes, avec barre de progression liée au défilement. */
export function ProcessTrack({process}: {process: HomeContent['process']}) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 1);
    };
    update();
    track.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 16 : 320;
    track.scrollBy({left: direction * step * 2, behavior: 'smooth'});
  };

  const offsets = process.phases.map((_, index) =>
    process.phases.slice(0, index).reduce((sum, phase) => sum + phase.steps.length, 0),
  );
  const total = offsets.at(-1)! + process.phases.at(-1)!.steps.length;

  return (
    <div>
      <ol
        ref={trackRef}
        tabIndex={0}
        aria-label={process.title}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scroll-px-5 px-5 pb-4 sm:scroll-px-8 lg:scroll-px-[max(3rem,calc((100vw_-_1320px)/2_+_3rem))] focus-visible:outline-offset-[-3px] sm:px-8 lg:px-[max(3rem,calc((100vw_-_1320px)/2_+_3rem))]"
      >
        {process.phases.flatMap((phase, phaseIndex) =>
          phase.steps.map((step, stepIndex) => {
            const number = offsets[phaseIndex] + stepIndex + 1;
            const last = number === total;
            return (
              <li
                key={`${phase.title}-${step.title}`}
                className="w-[17.5rem] flex-none snap-start sm:w-[19rem]"
              >
                <p
                  className={cx(
                    'mb-4 flex h-7 items-center gap-3 text-base font-bold',
                    stepIndex === 0 ? 'text-lokambe-peach' : 'text-transparent select-none',
                  )}
                  aria-hidden={stepIndex !== 0}
                >
                  <span
                    className={cx(
                      'h-2 rounded-full',
                      stepIndex === 0 ? 'w-6 bg-lokambe-peach' : 'w-0',
                    )}
                  />
                  {stepIndex === 0 ? `${phaseIndex + 1}. ${phase.title}` : '.'}
                </p>
                <article
                  className={cx(
                    'group flex min-h-[17rem] flex-col rounded-[1.75rem] p-6 transition-colors duration-300',
                    last ? 'bg-lokambe-peach text-lokambe-blue' : 'bg-white/[0.07] ring-1 ring-white/15 ring-inset hover:bg-white hover:text-lokambe-blue',
                  )}
                >
                  <span
                    className={cx(
                      'text-5xl leading-none font-extrabold tabular-nums transition-colors',
                      last ? 'text-lokambe-red' : 'text-lokambe-peach group-hover:text-lokambe-red',
                    )}
                  >
                    <span className="sr-only">{process.stepLabel} </span>
                    {String(number).padStart(2, '0')}
                  </span>
                  <h3 className="mt-auto pt-8 text-[1.4rem] leading-none font-extrabold uppercase">{step.title}</h3>
                  <p
                    className={cx(
                      'mt-3 text-base leading-snug transition-colors',
                      last ? 'text-lokambe-blue/80' : 'text-white/75 group-hover:text-ink-soft',
                    )}
                  >
                    {step.text}
                  </p>
                </article>
              </li>
            );
          }),
        )}
      </ol>

      <div className="mx-auto mt-10 flex max-w-[1320px] items-center gap-6 px-5 sm:px-8 lg:px-12">
        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-lokambe-peach transition-[width] duration-150"
            style={{width: `${Math.max(8, progress * 100)}%`}}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={progress <= 0.001}
            className="grid size-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-lokambe-blue disabled:opacity-35 disabled:hover:bg-white/10 disabled:hover:text-white"
            aria-label={process.prevLabel}
          >
            <ArrowLeft className="size-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={progress >= 0.999}
            className="grid size-12 place-items-center rounded-full bg-white text-lokambe-blue transition-colors hover:bg-lokambe-peach disabled:opacity-35"
            aria-label={process.nextLabel}
          >
            <ArrowRight className="size-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
