import type {Phase} from '@/content/types';
import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';

/** Phases de déploiement : cartes reliées, la première mise en avant. */
export function PhaseList({phases, tone = 'light'}: {phases: Phase[]; tone?: 'light' | 'dark'}) {
  const dark = tone === 'dark';
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {phases.map((phase, index) => (
        <Reveal
          as="li"
          key={phase.title}
          index={index}
          className={cx(
            'relative flex flex-col rounded-[1.75rem] p-7',
            index === 0
              ? 'bg-lokambe-blue text-white'
              : dark
                ? 'bg-white/[0.07] text-white ring-1 ring-white/15 ring-inset'
                : 'bg-lokambe-peach-soft text-ink',
          )}
        >
          <span className="flex items-center gap-3">
            <span className="relative grid size-4 place-items-center">
              {index === 0 && <span className="absolute size-3 animate-pulse-dot rounded-full bg-lokambe-red" />}
              <span className={cx('relative size-3 rounded-full', index === 0 ? 'bg-lokambe-red' : 'bg-lokambe-blue/40')} />
            </span>
            <span className={cx('text-sm font-medium', index === 0 ? 'text-lokambe-peach' : dark ? 'text-white/60' : 'text-ink-soft')}>
              {phase.label}
            </span>
          </span>
          <h3 className="mt-3 text-2xl font-extrabold uppercase">{phase.title}</h3>
          {phase.text && (
            <p className={cx('mt-3 text-lg leading-relaxed', index === 0 ? 'text-white/80' : dark ? 'text-white/75' : 'text-ink-soft')}>
              {phase.text}
            </p>
          )}
          {phase.items && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {phase.items.map((item) => (
                <li
                  key={item}
                  className={cx(
                    'rounded-full px-3 py-1.5 text-[0.95rem]',
                    index === 0 ? 'bg-white/15' : dark ? 'bg-white/10' : 'bg-white',
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
