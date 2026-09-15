import type {ReactNode} from 'react';
import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';
import {Eyebrow} from './Eyebrow';

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: 'light' | 'dark';
  align?: 'split' | 'stack';
  aside?: ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
};

/**
 * En-tête de section : grand titre en capitales à gauche, introduction à droite
 * (disposition « split ») ou empilée.
 */
export function SectionHeader({eyebrow, title, intro, tone = 'light', align = 'split', aside, className, as: Heading = 'h2'}: Props) {
  const dark = tone === 'dark';
  return (
    <div
      className={cx(
        'grid gap-6',
        align === 'split' && 'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-16',
        className,
      )}
    >
      <Reveal>
        {eyebrow && <Eyebrow className={cx('mb-5', dark ? 'text-white/80' : 'text-ink-soft')}>{eyebrow}</Eyebrow>}
        <Heading
          className={cx('display text-[clamp(2.4rem,5.2vw,4.75rem)]', dark ? 'text-white' : 'text-lokambe-blue')}
        >
          {title}
        </Heading>
      </Reveal>
      {(intro || aside) && (
        <Reveal index={1} className={cx('max-w-xl', align === 'split' && 'lg:justify-self-end lg:pb-2')}>
          {intro && (
            <p className={cx('text-lg leading-relaxed sm:text-xl', dark ? 'text-white/80' : 'text-ink-soft')}>{intro}</p>
          )}
          {aside}
        </Reveal>
      )}
    </div>
  );
}
