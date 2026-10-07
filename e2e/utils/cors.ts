import type {APIRequestContext} from '@playwright/test';

/**
 * L'API autorise-t-elle l'origine d'où tourne la suite ?
 *
 * Les formulaires publics et le téléversement d'un média partent **du
 * navigateur** vers l'API : ils sont donc soumis au CORS. En production
 * l'origine du site figure dans `CORS_ORIGIN` ; en local, `http://localhost:3100`
 * n'y est pas, et le navigateur bloque l'envoi.
 *
 * Sans ce test, le parcours échouait sur un « élément introuvable » qui ne
 * nommait pas la cause. On préfère l'ignorer en le disant.
 */
export async function apiAllowsOrigin(request: APIRequestContext, apiUrl: string, origin: string): Promise<boolean> {
  try {
    const response = await request.fetch(`${apiUrl.replace(/\/+$/, '')}/applications`, {
      method: 'OPTIONS',
      headers: {Origin: origin, 'Access-Control-Request-Method': 'POST'},
    });
    return response.headers()['access-control-allow-origin'] === origin;
  } catch {
    return false;
  }
}
