'use client';

import type {TitledText} from '@/content/types';
import {cx} from '@/lib/cx';

type Props = {steps: TitledText[]; current: number; stepLabel: string; onSelect: (index: number) => void};

/** Fil des étapes du formulaire : progression et navigation vers les étapes déjà vues. */
export function FormSteps({steps, current, stepLabel, onSelect}: Props) {
  const label = stepLabel.replace('{current}', String(current + 1)).replace('{total}', String(steps.length));

  return (
    <div className="lg:sticky lg:top-32">
      <p className="text-base font-medium text-ink-soft">{label}</p>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {steps.map((step, index) => (
          <span
            key={step.title}
            className={cx('h-1.5 flex-1 rounded-full transition-colors', index <= current ? 'bg-lokambe-red' : 'bg-lokambe-peach')}
          />
        ))}
      </div>

      <ol className="mt-8 space-y-1">
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li key={step.title}>
              <button
                type="button"
                onClick={() => (index <= current ? onSelect(index) : undefined)}
                disabled={index > current}
                aria-current={active ? 'step' : undefined}
                className={cx(
                  'flex w-full items-start gap-4 rounded-2xl p-4 text-left transition-colors',
                  active && 'bg-lokambe-blue text-white',
                  !active && done && 'text-ink hover:bg-lokambe-peach-soft',
                  !active && !done && 'text-ink-soft/70',
                )}
              >
                <span
                  className={cx(
                    'grid size-8 flex-none place-items-center rounded-full text-base font-extrabold tabular-nums',
                    active ? 'bg-white text-lokambe-blue' : done ? 'bg-lokambe-red text-white' : 'bg-lokambe-peach-soft text-ink-soft',
                  )}
                >
                  {index + 1}
                </span>
                <span>
                  <span className="block text-lg font-extrabold uppercase">{step.title}</span>
                  <span className={cx('block text-base', active ? 'text-white/80' : 'text-ink-soft')}>{step.text}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
