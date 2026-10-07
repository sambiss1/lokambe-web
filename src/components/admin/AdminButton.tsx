import Link from 'next/link';
import type {ComponentProps, ReactNode} from 'react';
import {cx} from '@/lib/cx';

/**
 * Boutons et liens du back-office.
 *
 * Pas ceux du site public (`@/components/ui/Button`) : ils sont taillés pour une
 * page vitrine, et leur variante lien passe par la navigation traduite de
 * `next-intl`, qui préfixerait `/admin` d'une langue. Les classes vivaient en
 * double dans `ArticleForm` et dans la liste des articles ; elles sont ici.
 */

export type AdminTone = 'primaire' | 'neutre' | 'rouge' | 'danger';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[0.95rem] font-bold ' +
  'transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const TONES: Record<AdminTone, string> = {
  primaire: 'bg-lokambe-blue text-white hover:bg-lokambe-blue-deep',
  neutre: 'border border-line text-ink-soft hover:border-ink-soft/40',
  rouge: 'bg-lokambe-red-strong text-white hover:bg-lokambe-red-strong-hover',
  danger: 'text-lokambe-red-strong hover:bg-lokambe-red/10',
};

export function adminButtonClass(tone: AdminTone = 'primaire', className?: string): string {
  return cx(BASE, TONES[tone], className);
}

type ButtonProps = ComponentProps<'button'> & {tone?: AdminTone};

export function AdminButton({tone = 'primaire', className, type = 'button', ...props}: ButtonProps) {
  return <button type={type} {...props} className={adminButtonClass(tone, className)} />;
}

type LinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  tone?: AdminTone;
  className?: string;
  children: ReactNode;
};

export function AdminButtonLink({tone = 'primaire', className, ...props}: LinkProps) {
  return <Link {...props} className={adminButtonClass(tone, className)} />;
}

/** Lien de retour, en tête des écrans de fiche. */
export function BackLink({href, children}: {href: string; children: ReactNode}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-lokambe-blue"
    >
      <span aria-hidden="true">←</span>
      {children}
    </Link>
  );
}
