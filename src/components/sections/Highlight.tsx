import type {ReactNode} from 'react';
import {cx} from '@/lib/cx';
import {Reveal} from '../motion/Reveal';
import {Container} from '../ui/Container';

/** Bandeau de mise en avant : une phrase forte sur fond pêche ou bleu. */
export function Highlight({children, tone = 'peach'}: {children: ReactNode; tone?: 'peach' | 'blue'}) {
  return (
    <section className={cx('py-16 sm:py-20', tone === 'peach' ? 'bg-lokambe-peach' : 'bg-lokambe-blue')}>
      <Container>
        <Reveal>
          <p
            className={cx(
              'display max-w-[22ch] text-[clamp(1.9rem,4.6vw,3.75rem)]',
              tone === 'peach' ? 'text-lokambe-blue' : 'text-white',
            )}
          >
            {children}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
