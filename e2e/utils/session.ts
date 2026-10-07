import type {APIRequestContext, BrowserContext, Cookie} from '@playwright/test';

/**
 * Une seule connexion pour toute une série de tests.
 *
 * L'API limite les tentatives de connexion : dix par adresse IP et par compte
 * en quinze minutes. Une suite qui se reconnecte à chaque test les épuise, et
 * les derniers échouent sur « Trop de tentatives » — ce qui ressemble à une
 * panne du back-office alors que c'est la protection qui fonctionne.
 *
 * On se connecte donc une fois par fichier, et on rejoue le cookie dans chaque
 * contexte de test.
 */
export const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? '';
export const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? '';
export const ADMIN_READY = Boolean(process.env.E2E_API_URL && ADMIN_EMAIL && ADMIN_PASSWORD);

export async function signInOnce(request: APIRequestContext): Promise<Cookie[]> {
  const response = await request.post('/api/admin/session', {
    data: {email: ADMIN_EMAIL, password: ADMIN_PASSWORD},
  });
  if (!response.ok()) {
    throw new Error(`connexion refusée (${response.status()}) : ${await response.text()}`);
  }
  const {cookies} = await request.storageState();
  return cookies;
}

export async function reuseSession(context: BrowserContext, cookies: Cookie[]): Promise<void> {
  await context.addCookies(cookies);
}
