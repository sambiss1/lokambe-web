'use client';

import type {ReactNode} from 'react';
import {useId} from 'react';
import {cx} from '@/lib/cx';

/**
 * Le champ du back-office : étiquette réelle, aide, **message d'erreur sous le
 * champ**.
 *
 * Le `Field` d'origine (`../Field.tsx`) n'avait pas d'erreur : un formulaire ne
 * pouvait montrer qu'un seul message, en haut, sans dire quel champ était en
 * cause. Celui-ci câble `aria-describedby` et `aria-invalid`, donc un lecteur
 * d'écran annonce l'erreur du champ qu'il lit.
 *
 * Il prend ses enfants en fonction, comme le champ des formulaires publics :
 * c'est le seul moyen de donner au contrôle l'identifiant généré ici.
 */

export const adminControl =
  'w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-soft/55 ' +
  'transition-colors duration-200 hover:border-ink-soft/40 focus:border-lokambe-blue focus:outline-none ' +
  'focus-visible:border-lokambe-blue disabled:cursor-not-allowed disabled:opacity-60';

export const adminControlInvalid = 'border-lokambe-red-strong';

type Props = {
  label: string;
  hint?: string;
  error?: string;
  /** Affiché à côté de l'étiquette, pour les champs qu'on peut laisser vides. */
  optionalLabel?: string;
  className?: string;
  children: (props: {id: string; describedBy?: string; invalid: boolean}) => ReactNode;
};

export function AdminField({label, hint, error, optionalLabel, className, children}: Props) {
  const id = useId();
  const hintId = hint ? `${id}-aide` : undefined;
  const errorId = error ? `${id}-erreur` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={id}
        className="flex flex-wrap items-baseline gap-2 text-xs font-bold tracking-[0.08em] text-ink-soft uppercase"
      >
        {label}
        {/* L'espace est explicite : sans lui, le nom accessible du champ se lit
            « Secteur(facultatif) » — la grille visuelle, elle, garde son écart. */}
        {optionalLabel ? (
          <span className="text-[0.7rem] font-medium tracking-normal normal-case"> ({optionalLabel})</span>
        ) : null}
      </label>
      {children({id, describedBy, invalid: Boolean(error)})}
      {hint ? (
        <p id={hintId} className="text-xs text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-bold text-lokambe-red-strong">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Le même habillage, pour un bloc qui n'est pas un contrôle unique : une liste
 * de lignes, un éditeur riche, un sélecteur de média. Il porte une étiquette
 * `<p>` et non `<label>`, qui ne désignerait rien.
 */
export function AdminFieldset({
  label,
  hint,
  error,
  optionalLabel,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  /** Affiché à côté de l'étiquette, comme pour `AdminField`. */
  optionalLabel?: string;
  className?: string;
  children: (props: {labelledBy: string; describedBy?: string}) => ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-aide` : undefined;
  const errorId = error ? `${id}-erreur` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <p id={id} className="text-xs font-bold tracking-[0.08em] text-ink-soft uppercase">
        {label}
        {optionalLabel ? (
          <span className="text-[0.7rem] font-medium tracking-normal normal-case"> ({optionalLabel})</span>
        ) : null}
      </p>
      {children({labelledBy: id, describedBy})}
      {hint ? (
        <p id={hintId} className="text-xs text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-bold text-lokambe-red-strong">
          {error}
        </p>
      ) : null}
    </div>
  );
}
