import type {TitledList} from '@/content/types';
import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';

type Props = {groups: TitledList[]; tone?: 'light' | 'dark'; variant?: 'chips' | 'bullets'; columns?: 2 | 3};

/** Groupes « titre + liste » : en pastilles (chips) ou en liste à puces. */
export function ListPanel({groups, tone = 'light', variant = 'chips', columns = 3}: Props) {
  const dark = tone === 'dark';
  return (
    <ul
      className={cx(
        'grid gap-4',
        groups.length === 1 ? '' : columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2',
      )}
    >
      {groups.map((group, index) => (
        <Reveal
          as="li"
          key={group.title}
          index={index % columns}
          className={cx(
            'rounded-[1.75rem] p-7',
            dark ? 'bg-white/[0.07] ring-1 ring-white/15 ring-inset' : 'bg-white ring-1 ring-line ring-inset',
          )}
        >
          <h3 className={cx('text-xl font-extrabold uppercase', dark ? 'text-lokambe-peach' : 'text-lokambe-blue')}>
            {group.title}
          </h3>
          {group.intro && <p className={cx('mt-2 text-base', dark ? 'text-white/70' : 'text-ink-soft')}>{group.intro}</p>}
          <ul className={cx('mt-4', variant === 'chips' ? 'flex flex-wrap gap-2' : 'space-y-2.5')}>
            {group.items.map((item) => (
              <li
                key={item}
                className={cx(
                  variant === 'chips'
                    ? cx(
                        'rounded-full px-3.5 py-1.5 text-[0.95rem] font-medium',
                        dark ? 'bg-white/10 text-white' : 'bg-lokambe-peach-soft text-ink',
                      )
                    : cx('flex gap-3 text-lg leading-snug', dark ? 'text-white/80' : 'text-ink-soft'),
                )}
              >
                {variant === 'bullets' && (
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 flex-none rounded-full bg-lokambe-red" />
                )}
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ul>
  );
}
