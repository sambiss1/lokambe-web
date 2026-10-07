'use client';

import {useCallback, useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import type {DefaultValues, FieldValues, Resolver, UseFormReturn} from 'react-hook-form';
import type {ZodType} from 'zod';

import {ACTION_FAILURES} from '@/lib/api/action-result';
import type {ActionResult} from '@/lib/api/action-result';

/**
 * Le schéma reçu décrit les valeurs du formulaire, mais chaque écran a le sien :
 * le hook ne peut pas en connaître la forme exacte sans la faire remonter
 * partout. `zodResolver` est donc appelé sur un schéma non paramétré, puis le
 * résolveur est retypé sur les valeurs du formulaire. La validation reste celle
 * du schéma de l'écran ; seul le lien de types est forcé ici, une fois.
 */
function resolverFor<V extends FieldValues>(schema: ZodType): Resolver<V> {
  return zodResolver(schema as never) as unknown as Resolver<V>;
}

/**
 * Le noyau des formulaires du back-office : validation, attente, message.
 *
 * Tous les écrans d'écriture passent par ici, donc une seule façon de valider
 * (zod), une seule façon de signaler l'attente, et une seule traduction des
 * échecs de l'API. Avant, chaque formulaire avait son `validate()` maison et ne
 * pouvait montrer qu'un message global.
 *
 * `submit` valide d'abord : si un champ est en faute, rien n'est envoyé et
 * l'erreur s'affiche sous le champ. `run` sert aux actions qui ne passent pas
 * par le formulaire — publier, dépublier, supprimer — pour qu'elles partagent
 * la même gestion d'erreur.
 */

export type Feedback = {tone: 'ok' | 'erreur'; text: string};

export type ResourceForm<V extends FieldValues> = {
  form: UseFormReturn<V>;
  /** Vrai pendant un enregistrement : les boutons se désactivent. */
  pending: boolean;
  feedback: Feedback | null;
  setFeedback: (next: Feedback | null) => void;
  /** Valide puis enregistre. Ne fait rien si un champ est en faute. */
  submit: (
    save: (values: V) => Promise<ActionResult<unknown>>,
    options?: {okMessage?: string; onSaved?: (data: unknown) => void},
  ) => void;
  /** Lance une action hors formulaire en partageant attente et messages. */
  run: (
    action: () => Promise<ActionResult<unknown>>,
    options?: {okMessage?: string; onDone?: (data: unknown) => void},
  ) => void;
};

export function useResourceForm<V extends FieldValues>({
  schema,
  defaultValues,
}: {
  schema: ZodType;
  defaultValues: DefaultValues<V>;
}): ResourceForm<V> {
  const form = useForm<V>({
    resolver: resolverFor<V>(schema),
    // `onBlur` signale la faute en quittant le champ, pas à chaque frappe :
    // une erreur qui apparaît pendant qu'on écrit se lit comme un reproche.
    mode: 'onBlur',
    defaultValues,
  });

  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handle = useCallback((result: ActionResult<unknown>, okMessage?: string): boolean => {
    if (result.ok) {
      if (okMessage) setFeedback({tone: 'ok', text: okMessage});
      return true;
    }
    setFeedback({tone: 'erreur', text: ACTION_FAILURES[result.reason]});
    return false;
  }, []);

  const run = useCallback<ResourceForm<V>['run']>(
    (action, options = {}) => {
      setFeedback(null);
      startTransition(async () => {
        const result = await action();
        if (handle(result, options.okMessage) && result.ok) {
          options.onDone?.(result.data);
        }
      });
    },
    [handle],
  );

  const submit = useCallback<ResourceForm<V>['submit']>(
    (save, options = {}) => {
      setFeedback(null);
      void form.handleSubmit(
        (values) => {
          startTransition(async () => {
            const result = await save(values);
            if (handle(result, options.okMessage) && result.ok) {
              options.onSaved?.(result.data);
            }
          });
        },
        () => {
          setFeedback({
            tone: 'erreur',
            text: 'Certains champs sont à corriger : voyez les messages sous les champs.',
          });
        },
      )();
    },
    [form, handle],
  );

  return {form, pending, feedback, setFeedback, submit, run};
}
