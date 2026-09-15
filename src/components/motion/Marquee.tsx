import type {ReactNode} from 'react';
import {cx} from '@/lib/cx';

/** Bandeau défilant en boucle. Le contenu est dupliqué pour une boucle sans couture. */
export function Marquee({children, className, label}: {children: ReactNode; className?: string; label: string}) {
  return (
    <div className={cx('group relative flex overflow-hidden', className)} role="region" aria-label={label}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
