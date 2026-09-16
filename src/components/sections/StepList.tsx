import type {TitledText} from '@/content/types';
import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';

/** Étapes numérotées, reliées par un filet vertical. */
export function StepList({steps, tone = 'light'}: {steps: TitledText[]; tone?: 'light' | 'dark'}) {
  const dark = tone === 'dark';
  return (
    <ol className="grid gap-x-12 md:grid-cols-2">
      {steps.map((step, index) => (
        <Reveal
          as="li"
          key={step.title}
          index={index % 2}
          className={cx(
            'group relative flex gap-6 border-t py-7 last:border-b md:last:border-b-0',
            dark ? 'border-white/15' : 'border-line',
            index === steps.length - 2 && 'md:border-b',
          )}
        >
          <span
            className={cx(
              'text-3xl leading-none font-extrabold tabular-nums transition-colors sm:text-4xl',
              dark ? 'text-white/35 group-hover:text-lokambe-peach' : 'text-lokambe-peach group-hover:text-lokambe-red',
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="pt-1">
            <h3 className={cx('text-lg font-extrabold uppercase sm:text-xl', dark ? 'text-white' : 'text-lokambe-blue')}>
              {step.title}
            </h3>
            <p className={cx('mt-2 text-[1.0625rem] leading-relaxed', dark ? 'text-white/75' : 'text-ink-soft')}>{step.text}</p>
          </span>
        </Reveal>
      ))}
    </ol>
  );
}
