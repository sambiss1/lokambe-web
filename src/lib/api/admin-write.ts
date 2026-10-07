import {headers} from 'next/headers';
import type {ActionFailure, ActionResult} from './action-result';
import {AdminApiError, fetchAdminJson} from './server';
import {readSessionToken} from './session';

/**
 * Le socle des écritures du back-office.
 *
 * Ce module n'est pas lui-même `'use server'` : il est importé par les fichiers
 * de server actions, qui exposent les verbes. Le mettre à part évite d'avoir
 * deux fois la même mécanique — vérification de session, traduction des
 * erreurs, nettoyage du corps — dans chaque famille d'actions.
 *
 * Une server action est joignable directement en POST : la session est donc
 * vérifiée ici, à chaque appel, sans se reposer sur la garde du proxy. Aucune
 * écriture ne lève : elle renvoie un résultat que l'écran sait montrer.
 *
 * Les messages affichés, eux, vivent dans `action-result.ts` : ce module lit le
 * cookie de session, donc le navigateur ne peut pas l'importer.
 */

export type {ActionFailure, ActionResult};

export function failureOf(error: unknown): ActionFailure {
  if (!(error instanceof AdminApiError)) return 'indisponible';
  if (error.kind === 'unauthorized') return 'session';
  if (error.kind === 'not-found') return 'introuvable';
  // 409 arrive dans le sac des 4xx : c'est le seul cas où le site doit
  // distinguer « valeur refusée » de « opération refusée en l'état ».
  if (error.status === 409) return 'conflit';
  if (error.kind === 'invalid') return 'invalid';
  return 'indisponible';
}

export async function writeAdmin<T>(path: string, method: string, body: unknown): Promise<ActionResult<T>> {
  const token = await readSessionToken();
  if (!token) return {ok: false, reason: 'session'};

  const store = await headers();
  const forwardedFor = store.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;

  try {
    const data = await fetchAdminJson<T>(path, {
      method,
      token,
      forwardedFor,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: body === undefined ? {} : {'Content-Type': 'application/json'},
    });
    return {ok: true, data};
  } catch (error) {
    return {ok: false, reason: failureOf(error)};
  }
}

/**
 * L'API refuse les champs qu'elle ne déclare pas et les chaînes vides : on
 * n'envoie que ce qui est renseigné. `null` est conservé — c'est ainsi qu'on
 * retire une valeur (une couverture, un média, un lien).
 */
export function clean(input: Record<string, unknown>): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed === '') continue;
      payload[key] = trimmed;
      continue;
    }
    if (Array.isArray(value)) {
      const kept = value
        .map((item) => (typeof item === 'string' ? item.trim() : item))
        .filter((item) => item !== '' && item !== undefined && item !== null);
      if (kept.length === 0) continue;
      payload[key] = kept;
      continue;
    }
    if (value !== null && typeof value === 'object') {
      const nested = clean(value as Record<string, unknown>);
      if (Object.keys(nested).length === 0) continue;
      payload[key] = nested;
      continue;
    }
    payload[key] = value;
  }
  return payload;
}
