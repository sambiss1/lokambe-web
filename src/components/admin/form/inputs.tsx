'use client';

import {Plus, X} from 'lucide-react';
import type {ComponentProps, ReactNode} from 'react';
import {cx} from '@/lib/cx';
import {selectChevronStyle} from '../Field';
import {adminControl, adminControlInvalid} from './AdminField';

/**
 * Les contrôles du back-office. Un seul habillage, une seule gestion de l'état
 * « invalide » : un champ en erreur se signale de la même façon partout.
 */

type Invalid = {invalid?: boolean};

export function TextInput({className, invalid, ...props}: ComponentProps<'input'> & Invalid) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={cx(adminControl, invalid && adminControlInvalid, className)}
    />
  );
}

export function TextArea({className, invalid, rows = 4, ...props}: ComponentProps<'textarea'> & Invalid) {
  return (
    <textarea
      {...props}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cx(adminControl, 'resize-y', invalid && adminControlInvalid, className)}
    />
  );
}

export function SelectInput({className, invalid, children, ...props}: ComponentProps<'select'> & Invalid) {
  return (
    <select
      {...props}
      aria-invalid={invalid || undefined}
      style={selectChevronStyle}
      className={cx(
        adminControl,
        'cursor-pointer appearance-none bg-no-repeat pr-10',
        invalid && adminControlInvalid,
        className,
      )}
    >
      {children}
    </select>
  );
}

/**
 * Une liste de lignes de texte : les missions d'une offre d'emploi, le profil
 * recherché. Chaque ligne a son champ et son bouton de retrait ; une ligne vide
 * est ignorée à l'enregistrement.
 */
export function StringListInput({
  value,
  onChange,
  labelledBy,
  describedBy,
  placeholder,
  addLabel = 'Ajouter une ligne',
  itemLabel = 'Ligne',
  invalid,
  disabled,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  labelledBy: string;
  describedBy?: string;
  placeholder?: string;
  addLabel?: string;
  itemLabel?: string;
  invalid?: boolean;
  disabled?: boolean;
}) {
  const rows = value.length > 0 ? value : [''];

  function replace(index: number, next: string) {
    onChange(rows.map((row, position) => (position === index ? next : row)));
  }

  return (
    <div role="group" aria-labelledby={labelledBy} aria-describedby={describedBy} className="grid gap-2">
      {rows.map((row, index) => (
        <div key={index} className="flex items-start gap-2">
          <input
            value={row}
            disabled={disabled}
            aria-label={`${itemLabel} ${index + 1}`}
            aria-invalid={invalid || undefined}
            placeholder={index === 0 ? placeholder : undefined}
            onChange={(event) => replace(index, event.target.value)}
            className={cx(adminControl, invalid && adminControlInvalid)}
          />
          <button
            type="button"
            disabled={disabled || rows.length <= 1}
            onClick={() => onChange(rows.filter((_row, position) => position !== index))}
            aria-label={`Retirer la ${itemLabel.toLowerCase()} ${index + 1}`}
            className="mt-1 rounded-lg p-2 text-ink-soft transition-colors hover:bg-lokambe-red/10 hover:text-lokambe-red-strong disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink-soft"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={2.4} />
          </button>
        </div>
      ))}

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange([...rows, ''])}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-bold text-lokambe-blue transition-colors hover:bg-lokambe-peach-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus aria-hidden="true" className="size-4" strokeWidth={2.4} />
        {addLabel}
      </button>
    </div>
  );
}

/** Un interrupteur, pour un réglage qui n'a que deux états. */
export function SwitchInput({
  id,
  checked,
  onChange,
  label,
  disabled,
}: {
  id: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  label: ReactNode;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-xl border border-line px-3.5 py-3 transition-colors hover:border-ink-soft/40"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 size-4.5 flex-none accent-[#001df3]"
      />
      <span className="text-sm leading-snug text-ink">{label}</span>
    </label>
  );
}
