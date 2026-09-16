'use client';

import {ChevronRight, Menu, X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useCallback, useEffect, useRef, useState, useSyncExternalStore} from 'react';
import {createPortal} from 'react-dom';
import {Link, usePathname} from '@/i18n/navigation';
import {SLOGAN} from '@/lib/brand';
import {cx} from '@/lib/cx';
import {ButtonLink} from '../ui/Button';
import {Logo} from '../ui/Logo';
import {APPLY_HREF, MAIN_NAV, type NavLeaf} from './nav';

const subscribeNoop = () => () => {};

/**
 * Menu mobile : panneau plein écran qui glisse depuis la droite, rendu hors de
 * l'en-tête pour recouvrir la page au lieu de la pousser. Le panneau reste
 * monté (rendu inerte quand il est fermé) pour que la transition joue aussi à
 * la fermeture.
 */
export function MobileMenu({solid}: {solid: boolean}) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Verrouille le défilement de la page. La largeur de la barre de défilement
  // est compensée, sinon la mise en page sursaute à l'ouverture.
  useEffect(() => {
    if (!open) return;
    const {body, documentElement} = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  // Échap ferme ; le focus est piégé dans le panneau tant qu'il est ouvert.
  useEffect(() => {
    if (!open) return;
    const openButton = openButtonRef.current;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        openButton?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = focusable?.[0];
      const last = focusable?.[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const leaves: NavLeaf[] = MAIN_NAV.flatMap((entry) => (entry.kind === 'group' ? [...entry.items] : [entry]));

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={t('openMenu')}
        onClick={() => setOpen(true)}
        className={cx(
          'inline-flex size-11 items-center justify-center rounded-full transition-colors xl:hidden',
          solid ? 'bg-lokambe-blue text-white' : 'bg-white text-lokambe-blue',
        )}
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={2.5} />
      </button>

      {mounted &&
        createPortal(
          <div className="xl:hidden" {...(open ? {} : {inert: true})}>
            <div
              ref={panelRef}
              id="menu-mobile"
              role="dialog"
              aria-modal="true"
              aria-label={t('mainNavigation')}
              className={cx(
                'fixed inset-0 z-[70] flex h-dvh w-full flex-col overscroll-contain bg-lokambe-blue text-white',
                'transition-transform duration-300 ease-(--ease-out-expo)',
                open ? 'translate-x-0' : 'translate-x-full',
              )}
            >
              <div className="flex h-18 shrink-0 items-center justify-between border-b border-white/15 px-5 sm:h-20 sm:px-8">
                <Link href="/" onClick={close} aria-label={t('homeLink')} className="block w-32 sm:w-36">
                  <Logo tone="white" className="w-full" />
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label={t('closeMenu')}
                  onClick={() => {
                    close();
                    openButtonRef.current?.focus();
                  }}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-white text-lokambe-blue"
                >
                  <X aria-hidden="true" className="size-5" strokeWidth={2.5} />
                </button>
              </div>

              <nav className="flex min-h-0 w-full flex-1 flex-col items-start gap-0.5 overflow-y-auto px-5 py-6 sm:px-8">
                {leaves.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={close}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={cx(
                      'group -mx-3 flex w-[calc(100%+1.5rem)] items-center justify-between gap-3 rounded-2xl px-3 py-2.5',
                      'text-2xl font-extrabold uppercase transition-colors hover:bg-white/10',
                      pathname === item.href && 'text-lokambe-peach',
                    )}
                  >
                    {t(item.key)}
                    <ChevronRight
                      aria-hidden="true"
                      className="size-5 text-lokambe-peach transition-transform duration-200 group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </Link>
                ))}
              </nav>

              <div className="shrink-0 space-y-4 border-t border-white/15 px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8">
                <p lang="ln" className="text-base font-bold text-lokambe-peach uppercase">
                  {SLOGAN}
                </p>
                <ButtonLink href={APPLY_HREF} variant="white" size="lg" className="w-full" onClick={close}>
                  {t('apply')}
                </ButtonLink>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
