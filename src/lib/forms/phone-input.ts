import type {ChangeEvent} from 'react';
import type {UseFormRegisterReturn} from 'react-hook-form';
import {PHONE_DISALLOWED_CHARS, PHONE_MAX_LENGTH} from '@/lib/constants';

/**
 * Les attributs d'un champ téléphone, et le nettoyage de ce qu'on y tape.
 *
 * On empêche la saisie au lieu de la punir après coup : une lettre n'entre
 * jamais dans le champ, collée comme tapée, et le navigateur borne la
 * longueur. L'erreur rouge reste pour ce qu'une contrainte de saisie ne peut
 * pas dire — un numéro trop court, ou sans `+` ni `0` devant.
 *
 * Le nettoyage se fait **avant** de passer l'événement à react-hook-form, pour
 * que la valeur retenue soit celle qu'on affiche. On ne réécrit le champ que
 * si quelque chose a été retiré : assigner `value` ramène le curseur en fin de
 * ligne, insupportable au milieu d'une correction.
 *
 * `onBeforeInput` serait plus direct, mais React 19 ne le relaie pas sous
 * jsdom : la règle ne serait couverte par aucun test.
 */
export function phoneField(field: UseFormRegisterReturn) {
  return {
    ...field,
    type: 'tel',
    inputMode: 'tel' as const,
    autoComplete: 'tel',
    maxLength: PHONE_MAX_LENGTH,
    placeholder: '+243 810 000 141',
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      // `maxLength` suffit dans un navigateur, mais pas sur un `type="tel"`
      // sous jsdom : sans cette coupe, la borne ne serait vérifiée par aucun
      // test, et la valeur retenue par le formulaire pourrait dépasser ce que
      // l'API accepte.
      const cleaned = event.target.value
        .replace(PHONE_DISALLOWED_CHARS, '')
        .slice(0, PHONE_MAX_LENGTH);
      if (cleaned !== event.target.value) event.target.value = cleaned;
      return field.onChange(event);
    },
  };
}
