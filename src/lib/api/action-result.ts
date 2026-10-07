/**
 * Le résultat d'une écriture du back-office, et son message.
 *
 * Ce module est **lisible depuis le navigateur** : il ne dépend de rien côté
 * serveur. C'est pour cela qu'il existe séparément de `admin-write.ts`, qui lit
 * le cookie de session et ne peut donc vivre que sur le serveur. Un composant
 * client qui importait la table des messages depuis `admin-write.ts` faisait
 * entrer `next/headers` dans le paquet du navigateur, et la construction
 * échouait — avec un message qui ne nommait pas la vraie cause.
 */

export type ActionResult<T> = {ok: true; data: T} | {ok: false; reason: ActionFailure};

export type ActionFailure =
  /** La session a expiré ou n'existe pas : il faut se reconnecter. */
  | 'session'
  /** L'API a refusé la valeur envoyée. */
  | 'invalid'
  /** L'enregistrement n'existe plus. */
  | 'introuvable'
  /** L'API refuse l'opération en l'état — un média encore utilisé, par exemple. */
  | 'conflit'
  /** Panne, coupure réseau, API injoignable. */
  | 'indisponible';

/** Ce que l'écran affiche. Une seule formulation par cas, partout. */
export const ACTION_FAILURES: Record<ActionFailure, string> = {
  session: 'Votre session a expiré. Reconnectez-vous puis réessayez.',
  invalid: 'L’API a refusé ces valeurs. Vérifiez les champs signalés.',
  introuvable: 'Cet enregistrement n’existe plus.',
  conflit: 'L’API a refusé : cet élément est encore utilisé ailleurs.',
  indisponible: 'API injoignable. Rien n’a été enregistré.',
};
