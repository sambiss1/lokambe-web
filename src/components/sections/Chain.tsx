import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';

/** Suite d'étapes reliées (progression) : puces reliées par un filet. */
export function Chain({items, tone = 'light'}: {items: string[]; tone?: 'light' | 'dark'}) {
  const dark = tone === 'dark';
  return (
    <ol className="relative flex flex-wrap gap-3">
      {items.map((item, index) => (
        <Reveal as="li" key={item} index={Math.min(index, 6)} className="flex items-center gap-3">
          <span
            className={cx(
              'rounded-full px-4 py-2 text-base font-bold whitespace-nowrap',
              index === items.length - 1
                ? 'bg-lokambe-blue text-white'
                : dark
                  ? 'bg-white/10 text-white'
                  : 'bg-lokambe-peach-soft text-lokambe-blue',
            )}
          >
            {item}
          </span>
          {index < items.length - 1 && (
            <span aria-hidden="true" className={cx('h-1 w-5 rounded-full', dark ? 'bg-white/25' : 'bg-lokambe-peach')} />
          )}
        </Reveal>
      ))}
    </ol>
  );
}
