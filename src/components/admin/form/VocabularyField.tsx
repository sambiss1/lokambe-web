'use client';

import {useState} from 'react';
import type {Bilingual} from '@/lib/vocabulary';
import {isKnownTerm, translateTerm} from '@/lib/vocabulary';
import {AdminField} from './AdminField';
import {SelectInput, TextInput} from './inputs';

/**
 * Le champ d'une liste fermée : un secteur, un statut de projet.
 *
 * C'était un champ de texte libre, et c'était une faute : on y retapait à la
 * main sept fois les mêmes trois mots, dans une orthographe qui variait, puis
 * on les retraduisait à la main dans le bloc anglais. Ici on choisit, et
 * **l'anglais suit tout seul** — la table de `@/lib/vocabulary` le donne.
 *
 * La porte de sortie reste ouverte : « Autre » rend le champ libre, en français
 * comme en anglais, pour ce que la liste n'avait pas prévu. Une fiche
 * enregistrée avant la liste s'ouvre d'ailleurs ainsi, sa valeur intacte.
 */

const OTHER = '__autre__';

type Props = {
  label: string;
  hint?: string;
  error?: string;
  vocabulary: Bilingual[];
  /** La valeur française enregistrée. */
  value: string;
  /** Reçoit le français **et** son anglais : `undefined` hors de la liste. */
  onChange: (next: {fr: string; en?: string}) => void;
  /** Première ligne du menu, tant que rien n'est choisi. */
  placeholder: string;
  /** Exemple montré dans le champ libre de « Autre ». */
  otherPlaceholder?: string;
  /**
   * Ce qu'on lit quand rien n'est choisi. Le schéma, lui, parle de longueur —
   * « 2 caractères minimum » sous un menu déroulant ne veut rien dire : on ne
   * tape pas, on choisit.
   */
  requiredMessage?: string;
  disabled?: boolean;
};

export function VocabularyField({
  label,
  hint,
  error,
  vocabulary,
  value,
  onChange,
  placeholder,
  otherPlaceholder,
  requiredMessage,
  disabled,
}: Props) {
  // Une valeur hors liste ouvre le champ libre : une fiche d'avant la liste ne
  // doit pas voir sa valeur effacée au premier affichage.
  const [custom, setCustom] = useState(() => value.trim() !== '' && !isKnownTerm(vocabulary, value));

  const chosen = vocabulary.find((term) => term.fr.toLowerCase() === value.trim().toLowerCase());

  return (
    <div className="grid gap-2.5">
      <AdminField
        label={label}
        hint={custom ? undefined : hint}
        // En mode liste, toute valeur du menu est valide : une erreur ne peut
        // dire qu'une chose, c'est que rien n'a été choisi.
        error={custom || !error ? undefined : (requiredMessage ?? error)}
      >
        {({id, describedBy, invalid}) => (
          <SelectInput
            id={id}
            aria-describedby={describedBy}
            invalid={invalid}
            disabled={disabled}
            value={custom ? OTHER : (chosen?.fr ?? '')}
            onChange={(event) => {
              const next = event.target.value;
              if (next === OTHER) {
                setCustom(true);
                onChange({fr: '', en: undefined});
                return;
              }
              setCustom(false);
              const term = vocabulary.find((candidate) => candidate.fr === next);
              onChange({fr: term?.fr ?? '', en: term?.en});
            }}
          >
            <option value="">{placeholder}</option>
            {vocabulary.map((term) => (
              <option key={term.fr} value={term.fr}>
                {term.fr}
              </option>
            ))}
            <option value={OTHER}>Autre (à préciser)</option>
          </SelectInput>
        )}
      </AdminField>

      {custom ? (
        <AdminField label={`${label} — à préciser`} hint={hint} error={error}>
          {({id, describedBy, invalid}) => (
            <TextInput
              id={id}
              aria-describedby={describedBy}
              invalid={invalid}
              disabled={disabled}
              placeholder={otherPlaceholder}
              value={value}
              onChange={(event) => onChange({fr: event.target.value, en: undefined})}
            />
          )}
        </AdminField>
      ) : chosen ? (
        <p className="text-xs text-ink-soft">
          Anglais : <span className="font-bold text-ink">{chosen.en}</span> — traduit automatiquement.
        </p>
      ) : null}
    </div>
  );
}

/**
 * Le pendant anglais d'un champ de liste fermée, dans le bloc « Anglais ».
 *
 * Quand le français vient de la liste, il n'y a rien à saisir : la traduction
 * est connue, on la montre et on la verrouille — on ne demande pas à quelqu'un
 * de retaper ce qu'on sait déjà, et on ne le laisse pas écrire autre chose que
 * ce que le reste du site affiche. Hors liste, le champ redevient libre : la
 * table n'a rien à proposer.
 */
export function TranslatedField({
  label,
  vocabulary,
  french,
  value,
  onChange,
  error,
  placeholder,
  disabled,
}: {
  label: string;
  vocabulary: Bilingual[];
  french: string;
  value: string;
  onChange: (next: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  const automatic = translateTerm(vocabulary, french);

  if (automatic) {
    return (
      // « automatique » n'est pas qu'une mention : sans lui, ce champ et son
      // homologue français porteraient le même nom accessible dans le même
      // formulaire, et un lecteur d'écran annoncerait deux fois « Secteur ».
      <AdminField label={label} optionalLabel="automatique" hint="Repris de la liste française. Rien à saisir.">
        {({id, describedBy}) => (
          <TextInput
            id={id}
            aria-describedby={describedBy}
            value={automatic}
            readOnly
            disabled={disabled}
            className="bg-paper text-ink-soft"
          />
        )}
      </AdminField>
    );
  }

  return (
    <AdminField label={label} optionalLabel="facultatif" error={error}>
      {({id, describedBy, invalid}) => (
        <TextInput
          id={id}
          aria-describedby={describedBy}
          invalid={invalid}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </AdminField>
  );
}
