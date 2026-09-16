import type {ReactNode} from 'react';
import {cx} from '@/lib/cx';

/** Petit intitulé de section, précédé du « point » rouge du logo LOKAMBE. */
export function Eyebrow({children, className}: {children: ReactNode; className?: string}) {
  return (
    <p className={cx('flex items-center gap-2.5 text-[0.9375rem] font-medium', className)}>
      <span aria-hidden="true" className="h-2 w-3.5 flex-none rounded-full bg-lokambe-red" />
      {children}
    </p>
  );
}
