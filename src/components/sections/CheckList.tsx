import {Check} from 'lucide-react';
import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';

/** Liste de critères, en deux colonnes sur grand écran. */
export function CheckList({items, tone = 'light', columns = 2}: {items: string[]; tone?: 'light' | 'dark'; columns?: 1 | 2}) {
  const dark = tone === 'dark';
  return (
    <ul className={cx('grid gap-x-10 gap-y-1', columns === 2 && 'sm:grid-cols-2')}>
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item}
          index={Math.min(index, 5)}
          className={cx(
            'flex items-center gap-4 border-b py-4 text-lg',
            dark ? 'border-white/15 text-white/85' : 'border-line text-ink',
          )}
        >
          <span
            className={cx(
              'grid size-8 flex-none place-items-center rounded-full',
              dark ? 'bg-lokambe-peach text-lokambe-blue' : 'bg-lokambe-blue text-white',
            )}
          >
            <Check aria-hidden="true" className="size-4" strokeWidth={3} />
          </span>
          {item}
        </Reveal>
      ))}
    </ul>
  );
}
