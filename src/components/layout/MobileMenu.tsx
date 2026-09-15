'use client';

import {useTranslations} from 'next-intl';
import {type CSSProperties, useEffect, useState, useSyncExternalStore} from 'react';
import {createPortal} from 'react-dom';
import {SLOGAN} from '@/lib/brand';
import {Link, usePathname} from '@/i18n/navigation';
import {cx} from '@/lib/cx';
import {ButtonLink} from '../ui/Button';
import {Logo} from '../ui/Logo';
import {APPLY_HREF, MAIN_NAV, type NavLeaf} from './nav';

const subscribeNoop = () => () => {};

export function MobileMenu({solid}: {solid: boolean}) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const leaves: NavLeaf[] = MAIN_NAV.flatMap((entry) => (entry.kind === 'group' ? [...entry.items] : [entry]));

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={t('openMenu')}
        onClick={() => setOpen(true)}
        className={cx(
          'grid size-12 place-items-center rounded-full transition-colors lg:hidden',
          solid ? 'bg-lokambe-blue text-white' : 'bg-white text-lokambe-blue',
        )}
      >
        <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
          <span className="h-0.5 w-full rounded-full bg-current" />
          <span className="h-0.5 w-3/5 rounded-full bg-current" />
        </span>
      </button>

      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('mainNavigation')}
            className={cx(
              'fixed inset-0 z-[60] flex flex-col bg-lokambe-blue text-white transition-[clip-path,visibility] duration-700 ease-(--ease-out-expo) lg:hidden',
              open
                ? 'visible [clip-path:circle(150%_at_calc(100%-3rem)_2.5rem)]'
                : 'invisible [clip-path:circle(0%_at_calc(100%-3rem)_2.5rem)]',
            )}
          >
            <div className="flex h-18 items-center justify-between px-5 sm:h-20 sm:px-8">
              <Link href="/" onClick={() => setOpen(false)} aria-label={t('homeLink')} className="block w-32 sm:w-40">
                <Logo tone="white" className="w-full" />
              </Link>
              <button
                type="button"
                aria-label={t('closeMenu')}
                onClick={() => setOpen(false)}
                className="grid size-12 place-items-center rounded-full bg-white text-lokambe-blue"
              >
                <span aria-hidden="true" className="relative block size-4">
                  <span className="absolute top-1/2 left-0 h-0.5 w-full rotate-45 rounded-full bg-current" />
                  <span className="absolute top-1/2 left-0 h-0.5 w-full -rotate-45 rounded-full bg-current" />
                </span>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 pt-6 pb-8 sm:px-8">
              <ul className="space-y-1">
                {leaves.map((item, index) => (
                  <li
                    key={item.key}
                    style={{'--i': index} as CSSProperties}
                    className={cx(
                      'transition-[opacity,translate] duration-700 ease-(--ease-out-expo) [transition-delay:calc(var(--i)*45ms+150ms)]',
                      open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                    )}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className="flex items-center justify-between py-2 text-[clamp(2rem,9vw,3.25rem)] leading-none font-extrabold uppercase"
                    >
                      {t(item.key)}
                      {pathname === item.href && <span className="h-3 w-6 rounded-full bg-lokambe-red" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-5 border-t border-white/15 px-5 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
              <p lang="ln" className="text-lg font-bold text-lokambe-peach uppercase">
                {SLOGAN}
              </p>
              <ButtonLink href={APPLY_HREF} variant="white" size="lg" className="w-full" onClick={() => setOpen(false)}>
                {t('apply')}
              </ButtonLink>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
