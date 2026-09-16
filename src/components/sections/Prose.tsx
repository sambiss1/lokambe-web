import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';

type Props = {paragraphs: string[]; tone?: 'light' | 'dark'; lead?: boolean; className?: string};

/** Suite de paragraphes ; le premier peut être mis en avant (`lead`). */
export function Prose({paragraphs, tone = 'light', lead = false, className}: Props) {
  const dark = tone === 'dark';
  return (
    <div className={cx('max-w-[65ch] space-y-5', className)}>
      {paragraphs.map((paragraph, index) => (
        <Reveal
          as="p"
          key={paragraph.slice(0, 40)}
          index={Math.min(index, 3)}
          className={cx(
            'leading-relaxed',
            lead && index === 0
              ? cx('text-lg font-medium sm:text-xl', dark ? 'text-white' : 'text-ink')
              : cx('text-[1.0625rem]', dark ? 'text-white/75' : 'text-ink-soft'),
          )}
        >
          {paragraph}
        </Reveal>
      ))}
    </div>
  );
}
