'use client';

import {ChevronDown} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useEffect, useId, useRef, useState} from 'react';
import {Link, usePathname} from '@/i18n/navigation';
import {cx} from '@/lib/cx';
import {ButtonLink} from '../ui/Button';
import {Logo} from '../ui/Logo';
import {LanguageSwitcher} from './LanguageSwitcher';
import {MobileMenu} from './MobileMenu';
import {APPLY_HREF, MAIN_NAV, type NavGroupKey, type NavLeaf} from './nav';

/**
 * En-tête fixe. Transparent sur le bandeau bleu en haut de page, il devient
 * blanc au défilement, se masque quand on descend et réapparaît quand on remonte.
 */
export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openGroup, setOpenGroup] = useState<NavGroupKey | null>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenGroup(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const solid = scrolled || openGroup !== null;

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ease-(--ease-out-expo)',
        hidden && openGroup === null ? '-translate-y-full' : 'translate-y-0',
        openGroup !== null
          ? 'bg-white'
          : scrolled
            ? 'bg-white/90 shadow-[0_1px_0_rgba(10,10,10,0.08)] backdrop-blur-xl'
            : 'bg-transparent',
      )}
      onMouseLeave={() => setOpenGroup(null)}
    >
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-lokambe-red px-4 py-2 font-bold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {t('skipToContent')}
      </a>
      <div className="mx-auto flex h-18 max-w-[1320px] items-center gap-6 px-5 sm:h-20 sm:px-8 lg:px-12">
        <Link href="/" aria-label={t('homeLink')} className="relative block w-32 flex-none sm:w-40">
          <Logo tone="white" priority className={cx('w-full transition-opacity duration-300', solid && 'opacity-0')} />
          <Logo
            tone="blue"
            priority
            className={cx('absolute inset-0 w-full transition-opacity duration-300', solid ? 'opacity-100' : 'opacity-0')}
          />
        </Link>

        <nav aria-label={t('mainNavigation')} className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {MAIN_NAV.map((entry) =>
              entry.kind === 'group' ? (
                <NavGroup
                  key={entry.key}
                  groupKey={entry.key}
                  items={entry.items}
                  open={openGroup === entry.key}
                  solid={solid}
                  active={entry.items.some((item) => pathname === item.href)}
                  onOpen={() => setOpenGroup(entry.key)}
                  onClose={() => setOpenGroup(null)}
                  onToggle={() => setOpenGroup((current) => (current === entry.key ? null : entry.key))}
                />
              ) : (
                <li key={entry.key} onMouseEnter={() => setOpenGroup(null)}>
                  <Link
                    href={entry.href}
                    aria-current={pathname === entry.href ? 'page' : undefined}
                    className={navItemClasses(solid, pathname === entry.href)}
                  >
                    {t(entry.key)}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 xl:ml-2">
          <LanguageSwitcher tone={solid ? 'blue' : 'white'} />
          <ButtonLink href={APPLY_HREF} variant={solid ? 'blue' : 'white'} className="hidden md:inline-flex">
            {t('apply')}
          </ButtonLink>
          <MobileMenu solid={solid} />
        </div>
      </div>
    </header>
  );
}

function navItemClasses(solid: boolean, active: boolean) {
  return cx(
    'relative inline-flex h-11 items-center gap-1 rounded-full px-4 text-[0.975rem] font-medium transition-colors duration-200',
    solid ? 'text-ink hover:bg-lokambe-peach-soft hover:text-lokambe-blue' : 'text-white hover:bg-white/12',
    active && (solid ? 'text-lokambe-blue' : 'text-white'),
    active &&
      'after:absolute after:bottom-1.5 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-lokambe-red',
  );
}

type NavGroupProps = {
  groupKey: NavGroupKey;
  items: readonly NavLeaf[];
  open: boolean;
  solid: boolean;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

function NavGroup({groupKey, items, open, solid, active, onOpen, onClose, onToggle}: NavGroupProps) {
  const t = useTranslations('nav');
  const tDesc = useTranslations('navDesc');
  const tPromo = useTranslations('navPromo');
  const panelId = useId();
  const pathname = usePathname();

  return (
    <li
      onMouseEnter={onOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={navItemClasses(solid, active)}
      >
        {t(groupKey)}
        <ChevronDown
          aria-hidden="true"
          className={cx('size-4 transition-transform duration-300', open && 'rotate-180')}
          strokeWidth={2.5}
        />
      </button>

      <div
        id={panelId}
        className={cx(
          'absolute inset-x-0 top-full px-5 pb-6 transition-[opacity,translate] duration-300 ease-(--ease-out-expo) sm:px-8 lg:px-12',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <div className="mx-auto grid max-w-[1224px] grid-cols-[1fr_minmax(0,22rem)] gap-3 rounded-[2rem] bg-white p-3 shadow-[0_30px_80px_-20px_rgba(0,18,168,0.35)] ring-1 ring-ink/5">
          <ul className={cx('grid gap-1 p-2', items.length > 2 ? 'grid-cols-3' : 'grid-cols-2')}>
            {items.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="group/item flex h-full flex-col rounded-3xl p-5 transition-colors duration-200 hover:bg-lokambe-peach-soft focus-visible:bg-lokambe-peach-soft"
                >
                  <span className="flex items-center justify-between text-xl font-extrabold text-lokambe-blue uppercase">
                    {t(item.key)}
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-lokambe-red opacity-0 transition-[opacity,width] duration-300 group-hover/item:w-5 group-hover/item:opacity-100"
                    />
                  </span>
                  <span className="mt-2 text-[0.975rem] leading-snug text-ink-soft">{tDesc(item.key)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={APPLY_HREF}
            onClick={onClose}
            className="group/promo relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl bg-lokambe-blue p-6 text-white"
          >
            <span
              aria-hidden="true"
              className="absolute -right-10 -bottom-16 size-48 rounded-full bg-lokambe-peach/25 transition-transform duration-500 ease-(--ease-out-expo) group-hover/promo:scale-125"
            />
            <span className="relative text-xl leading-tight font-bold text-balance">{tPromo('title')}</span>
            <span className="relative mt-6 inline-flex items-center gap-3 font-bold text-lokambe-peach">
              {tPromo('cta')}
              <span className="h-2 w-2 rounded-full bg-lokambe-peach transition-[width] duration-300 group-hover/promo:w-6" />
            </span>
          </Link>
        </div>
      </div>
    </li>
  );
}
