import type {ReactNode} from 'react';
import {cx} from '@/lib/cx';

/** Habillage commun des champs du back-office (champs texte, selects, zones de texte). */
export const controlClass =
  'w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-soft/55 ' +
  'transition-colors duration-200 hover:border-ink-soft/40 focus:border-lokambe-blue focus:outline-none ' +
  'focus-visible:border-lokambe-blue disabled:cursor-not-allowed disabled:opacity-60';

export const selectClass = cx(controlClass, 'appearance-none bg-no-repeat pr-10 cursor-pointer');

/** Chevron dessiné en CSS pour les <select>, faute de pouvoir styler la flèche native. */
export const selectChevronStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%233d3d45' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
  backgroundPosition: 'right 0.85rem center',
  backgroundSize: '1rem',
};

type FieldProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
  className?: string;
};

/** Un libellé réel associé à son contrôle, plus une aide facultative. */
export function Field({label, htmlFor, children, hint, className}: FieldProps) {
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-xs font-bold tracking-[0.08em] text-ink-soft uppercase">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-ink-soft">{hint}</p> : null}
    </div>
  );
}
