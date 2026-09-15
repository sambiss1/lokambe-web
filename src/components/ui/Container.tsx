import type {ReactNode} from 'react';
import {cx} from '@/lib/cx';

export function Container({children, className}: {children: ReactNode; className?: string}) {
  return <div className={cx('mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12', className)}>{children}</div>;
}
