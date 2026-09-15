import Image from 'next/image';
import {cx} from '@/lib/cx';

export const LOGO_WIDTH = 1200;
export const LOGO_HEIGHT = 197;

export function Logo({tone = 'blue', className, priority}: {tone?: 'blue' | 'white'; className?: string; priority?: boolean}) {
  return (
    <Image
      src={tone === 'blue' ? '/brand/logo-blue.png' : '/brand/logo-white.png'}
      alt="LOKAMBE"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={cx('h-auto', className)}
    />
  );
}
