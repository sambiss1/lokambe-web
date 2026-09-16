import type {TitledText} from '@/content/types';
import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';

type Props = {
  items: TitledText[];
  /** Numérote les cartes lorsque le contenu est une suite ordonnée. */
  numbered?: boolean;
  tone?: 'light' | 'dark';
  columns?: 2 | 3;
};

/** Grille de cartes titre + texte. */
export function CardGrid({items, numbered = false, tone = 'light', columns = 3}: Props) {
  const dark = tone === 'dark';
  return (
    <ul className={cx('grid gap-4', columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2')}>
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.title}
          index={index % columns}
          className={cx(
            'group flex flex-col rounded-[1.75rem] p-7 transition-colors duration-300',
            dark ? 'bg-white/[0.07] ring-1 ring-white/15 ring-inset hover:bg-white/[0.12]' : 'bg-lokambe-peach-soft hover:bg-lokambe-peach',
          )}
        >
          {numbered ? (
            <span className={cx('text-4xl leading-none font-extrabold tabular-nums', dark ? 'text-lokambe-peach' : 'text-lokambe-red')}>
              {String(index + 1).padStart(2, '0')}
            </span>
          ) : (
            <span aria-hidden="true" className="h-2.5 w-6 rounded-full bg-lokambe-red transition-[width] duration-300 group-hover:w-10" />
          )}
          <h3 className={cx('mt-5 text-xl leading-tight font-extrabold uppercase', dark ? 'text-white' : 'text-lokambe-blue')}>
            {item.title}
          </h3>
          <p className={cx('mt-3 text-[1.0625rem] leading-relaxed', dark ? 'text-white/75' : 'text-ink-soft')}>{item.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}
