'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
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
        <p className="rounded-2xl bg-white/10 px-4 py-3 text-xs leading-relaxed text-white/75">
          Maquette : les données affichées sont fictives et ne sont enregistrées nulle part.
        </p>
        {/* TODO(api) : remplacer par un POST vers /admin/logout qui supprime le cookie de session. */}
        <Link
          href="/admin/login"
          onClick={onNavigate}
          className={cx(linkBase, 'text-white/80 ring-1 ring-white/25 ring-inset hover:bg-white/12 hover:text-white')}
        >
          <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full bg-lokambe-peach" />
          Déconnexion
        </Link>
      </div>
    </div>
  );
}
