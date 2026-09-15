'use client';

import type {ComponentProps, ReactNode} from 'react';
import {useId} from 'react';
import {cx} from '@/lib/cx';

const CONTROL =
  'w-full rounded-2xl border-2 border-line bg-white px-4 py-3.5 text-lg text-ink transition-colors ' +
  'placeholder:text-ink-soft/50 hover:border-ink/25 focus:border-lokambe-blue focus:outline-none';
const INVALID = 'border-lokambe-red';

type FieldShellProps = {
  label: string;
  hint?: string;
  error?: string;
  optionalLabel?: string;
  children: (props: {id: string; describedBy?: string; invalid: boolean}) => ReactNode;
};

/** Étiquette, aide, message d'erreur : enveloppe commune à tous les champs. */
export function Field({label, hint, error, optionalLabel, children}: FieldShellProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="flex flex-wrap items-baseline gap-2 text-base font-bold text-ink">
        {label}
        {optionalLabel && <span className="text-sm font-medium text-ink-soft">({optionalLabel})</span>}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-base text-ink-soft">
          {hint}
        </p>
      )}
      <div className="mt-2">{children({id, describedBy, invalid: Boolean(error)})}</div>
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-2 text-base font-medium text-lokambe-red">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lokambe-red" />
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = ComponentProps<'input'> & {invalid?: boolean};

export function Input({className, invalid, ...props}: InputProps) {
  return <input {...props} aria-invalid={invalid || undefined} className={cx(CONTROL, invalid && INVALID, className)} />;
}

type TextareaProps = ComponentProps<'textarea'> & {invalid?: boolean};

export function Textarea({className, invalid, rows = 5, ...props}: TextareaProps) {
  return (
    <textarea {...props} rows={rows} aria-invalid={invalid || undefined} className={cx(CONTROL, 'resize-y', invalid && INVALID, className)} />
  );
}

type SelectProps = ComponentProps<'select'> & {invalid?: boolean};

export function Select({className, invalid, children, ...props}: SelectProps) {
  return (
    <select {...props} aria-invalid={invalid || undefined} className={cx(CONTROL, 'appearance-none pr-10', invalid && INVALID, className)}>
      {children}
    </select>
  );
}

/** Case à cocher au format « carte », confortable au doigt. */
export function CheckboxCard({
  label,
  checked,
  error,
  ...props
}: ComponentProps<'input'> & {label: ReactNode; checked?: boolean; error?: string}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className={cx(
          'flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-4 transition-colors',
          checked ? 'border-lokambe-blue bg-lokambe-peach-soft' : 'border-line bg-white hover:border-ink/25',
          error && 'border-lokambe-red',
        )}
      >
        <input
          {...props}
          id={id}
          type="checkbox"
          checked={checked}
          className="mt-1 size-6 flex-none accent-[#001df3]"
          aria-invalid={Boolean(error) || undefined}
        />
        <span className="text-lg leading-snug text-ink">{label}</span>
      </label>
      {error && <p className="mt-2 text-base font-medium text-lokambe-red">{error}</p>}
    </div>
  );
}

/** Champ piège à robots, invisible pour les personnes. */
export function Honeypot(props: ComponentProps<'input'> & {label: string}) {
  const {label, ...rest} = props;
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label>
        {label}
        <input {...rest} type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
