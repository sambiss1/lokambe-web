import type {ReactNode} from 'react';
import {cx} from '@/lib/cx';

/** Carte blanche bordée : la brique de base de tous les écrans du back-office. */
export function Surface({children, className}: {children: ReactNode; className?: string}) {
  return <div className={cx('rounded-[1.75rem] border border-line bg-white', className)}>{children}</div>;
}

type PanelProps = {title: string; children: ReactNode; aside?: ReactNode; className?: string};

/** Carte avec un intitulé de section en petites capitales bleues. */
export function Panel({title, children, aside, className}: PanelProps) {
  return (
    <Surface className={cx('p-5 sm:p-6', className)}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">{title}</h2>
        {aside}
      </div>
      {children}
    </Surface>
  );
}

/** Ligne d'une fiche : intitulé à gauche, valeur à droite. */
export function DataRow({label, value}: {label: string; value?: ReactNode}) {
  return (
    <div className="grid grid-cols-1 gap-0.5 border-b border-line/70 py-2.5 last:border-b-0 sm:grid-cols-3 sm:gap-3">
      <dt className="text-sm text-ink-soft">{label}</dt>
      <dd className="text-sm break-words whitespace-pre-line sm:col-span-2">{value ?? '—'}</dd>
    </div>
  );
}
