import Link from 'next/link';
import type {ReactNode} from 'react';
import {cx} from '@/lib/cx';

type Props = {
  label: string;
  value: number;
  hint?: string;
  href?: string;
  tone?: 'default' | 'blue' | 'peach';
};

const TONES = {
  default: 'border-line bg-white',
  blue: 'border-lokambe-blue bg-lokambe-blue text-white',
  peach: 'border-lokambe-peach bg-lokambe-peach-soft',
} as const;

/** Compteur du tableau de bord, cliquable quand il mène à une liste filtrée. */
export function StatCard({label, value, hint, href, tone = 'default'}: Props) {
  const inverted = tone === 'blue';

  const body: ReactNode = (
    <>
      <p className={cx('text-sm font-medium', inverted ? 'text-white/75' : 'text-ink-soft')}>{label}</p>
      <p className="mt-3 text-4xl font-extrabold tabular-nums">{value}</p>
      {hint ? <p className={cx('mt-1.5 text-xs', inverted ? 'text-white/70' : 'text-ink-soft')}>{hint}</p> : null}
    </>
  );

  const shell = cx(
    'block rounded-[1.75rem] border p-5 transition-colors duration-300 ease-(--ease-out-expo)',
    TONES[tone],
  );

  if (!href) return <div className={shell}>{body}</div>;

  return (
    <Link
      href={href}
      className={cx(
        shell,
        inverted ? 'hover:bg-lokambe-blue-deep' : 'hover:border-lokambe-blue hover:bg-lokambe-peach-soft/60',
      )}
    >
      {body}
    </Link>
  );
}
