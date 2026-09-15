'use client';

import {type ReactNode, useCallback, useEffect, useState} from 'react';
import {Logo} from '@/components/ui/Logo';
import {cx} from '@/lib/cx';
import {AdminNav} from './AdminNav';

/** Trait de burger / croix, animé entre les deux états. */
function BurgerIcon({open}: {open: boolean}) {
  return (
    <span aria-hidden="true" className="relative block h-4 w-5">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={cx(
            'absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-(--ease-out-expo)',
            index === 0 && (open ? 'top-1/2 rotate-45' : 'top-0'),
            index === 1 && (open ? 'top-1/2 opacity-0' : 'top-1/2 -translate-y-1/2'),
            index === 2 && (open ? 'top-1/2 -rotate-45' : 'bottom-0'),
          )}
        />
      ))}
    </span>
  );
}

/**
 * Ossature des écrans protégés : barre latérale fixe à partir de 900 px,
 * tiroir coulissant en dessous.
 */
export function AdminShell({children}: {children: ReactNode}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const {overflow} = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-[#f7f6f9] min-[900px]:flex">
      {/* Barre latérale permanente sur grand écran. */}
      <aside className="hidden w-[16.5rem] flex-none min-[900px]:sticky min-[900px]:top-0 min-[900px]:block min-[900px]:h-screen">
        <AdminNav />
      </aside>

      {/* Barre supérieure mobile. */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line bg-white px-4 py-3 min-[900px]:hidden">
        <Logo tone="blue" className="w-24" priority />
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="admin-drawer"
          className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-sm font-bold text-ink transition-colors duration-200 hover:border-lokambe-blue hover:text-lokambe-blue"
        >
          <BurgerIcon open={open} />
          Menu
        </button>
      </div>

      {/* Tiroir mobile. */}
      <div
        id="admin-drawer"
        hidden={!open}
        className="fixed inset-0 z-40 min-[900px]:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation du back-office"
      >
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={close}
          className="absolute inset-0 h-full w-full bg-ink/45 backdrop-blur-[2px]"
        />
        <div className="absolute inset-y-0 left-0 w-[17rem] max-w-[86vw] shadow-2xl shadow-ink/25">
          <AdminNav onNavigate={close} />
        </div>
      </div>

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 min-[900px]:px-10 min-[900px]:py-12">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8">{children}</div>
      </main>
    </div>
  );
}
