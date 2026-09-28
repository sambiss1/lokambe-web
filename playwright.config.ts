import {defineConfig, devices} from '@playwright/test';

/**
 * Tests de bout en bout.
 *
 * Ils tournent sur le **site construit**, pas sur le serveur de développement :
 * c'est la version que le visiteur reçoit, animations et rendu statique compris.
 * Le navigateur est le Chrome du système (`channel: 'chrome'`) pour éviter de
 * télécharger 300 Mo de navigateurs à chaque installation.
 *
 * L'anglais est activé pendant les tests : c'est le seul moyen de vérifier que
 * les deux langues tiennent, même si la production reste en français.
 *
 * Les parcours qui ont besoin de l'API (envoi d'une candidature, back-office)
 * ne s'exécutent que si `E2E_API_URL` est posée ; sinon ils sont ignorés, pour
 * que la suite reste lançable sans base de données.
 */
const PORT = Number(process.env.E2E_PORT ?? 3100);
const API_URL = process.env.E2E_API_URL ?? '';

const start = `npx next start -p ${PORT}`;
const command = process.env.E2E_SKIP_BUILD ? start : `npx next build && ${start}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : [['list']],
  timeout: 45_000,
  expect: {timeout: 10_000},
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: 'chrome',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {name: 'bureau', use: {...devices['Desktop Chrome'], channel: 'chrome'}},
    {name: 'mobile', use: {...devices['Pixel 7'], channel: 'chrome'}},
  ],
  webServer: {
    command,
    url: `http://localhost:${PORT}/fr`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    env: {
      NEXT_PUBLIC_ENABLED_LOCALES: 'fr,en',
      NEXT_PUBLIC_API_URL: API_URL,
      API_INTERNAL_URL: API_URL,
    },
  },
});
