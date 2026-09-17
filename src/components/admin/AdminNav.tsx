'use client';

import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useState} from 'react';
import {Logo} from '@/components/ui/Logo';
import {cx} from '@/lib/cx';

export const ADMIN_LINKS = [
  {href: '/admin', label: 'Tableau de bord', exact: true},
  {href: '/admin/candidatures', label: 'Candidatures', exact: false},
  {href: '/admin/messages', label: 'Messages', exact: false},
] as const;

export function isActive(pathname: string, href: string, exact: boolean): boolean {
  return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

const linkBase =
  'flex items-center gap-3 rounded-2xl px-4 py-3 text-[0.95rem] font-bold transition-colors duration-200 ease-(--ease-out-expo)';

/** Contenu de la barre latérale : marque, navigation, déconnexion. */
export function AdminNav({onNavigate}: {onNavigate?: () => void}) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    onNavigate?.();
    // Le cookie est httpOnly : seul le serveur peut l'effacer.
    await fetch('/api/admin/session', {method: 'DELETE'}).catch(() => undefined);
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="flex h-full flex-col gap-8 bg-lokambe-blue p-5 text-white">
      <Link href="/admin" onClick={onNavigate} className="block px-1 pt-1" aria-label="LOKAMBE — tableau de bord">
        <Logo tone="white" className="w-32" priority />
      </Link>

      <nav aria-label="Navigation du back-office" className="flex flex-col gap-1.5">
        {ADMIN_LINKS.map((link) => {
          const active = isActive(pathname, link.href, link.exact);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cx(
                linkBase,
                active ? 'bg-white text-lokambe-blue' : 'text-white/80 hover:bg-white/12 hover:text-white',
              )}
            >
              <span
                aria-hidden="true"
                className={cx(
                  'h-2 w-2 flex-none rounded-full transition-colors duration-200',
                  active ? 'bg-lokambe-red' : 'bg-white/35',
                )}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className={cx(
            linkBase,
            'w-full text-white/80 ring-1 ring-white/25 ring-inset hover:bg-white/12 hover:text-white disabled:opacity-60',
          )}
        >
          <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full bg-lokambe-peach" />
          {signingOut ? 'Déconnexion…' : 'Déconnexion'}
        </button>
      </div>
    </div>
  );
}
