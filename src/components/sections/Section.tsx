import type {ReactNode} from 'react';
import {cx} from '@/lib/cx';
import {Container} from '../ui/Container';
import {SectionHeader} from '../ui/SectionHeader';

export type SectionTone = 'white' | 'peach-soft' | 'peach' | 'blue' | 'ink';

const TONES: Record<SectionTone, string> = {
  white: 'bg-white text-ink',
  'peach-soft': 'bg-lokambe-peach-soft text-ink',
  peach: 'bg-lokambe-peach text-ink',
  blue: 'bg-lokambe-blue text-white',
  ink: 'bg-ink text-white',
};

type Props = {
  id?: string;
  tone?: SectionTone;
  eyebrow?: string;
  title?: string;
  intro?: string;
  aside?: ReactNode;
  align?: 'split' | 'stack';
  children?: ReactNode;
  className?: string;
};

/** Section de page : fond, en-tête (facultatif) et contenu. */
export function Section({id, tone = 'white', eyebrow, title, intro, aside, align = 'split', children, className}: Props) {
  const dark = tone === 'blue' || tone === 'ink';
  return (
    <section id={id} className={cx('py-20 sm:py-28', TONES[tone], className)}>
      <Container>
        {title && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            aside={aside}
            align={align}
            tone={dark ? 'dark' : 'light'}
            className={children ? 'mb-14' : undefined}
          />
        )}
        {children}
      </Container>
    </section>
  );
}
