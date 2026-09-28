import {expect, test} from '@playwright/test';

/**
 * Le back-office de bout en bout : connexion, écriture d'un article, publication,
 * puis lecture de l'article sur le site public.
 *
 * Ce parcours a besoin d'une API et d'un compte : sans `E2E_API_URL`,
 * `E2E_ADMIN_EMAIL` et `E2E_ADMIN_PASSWORD`, il est ignoré.
 */
const email = process.env.E2E_ADMIN_EMAIL ?? '';
const password = process.env.E2E_ADMIN_PASSWORD ?? '';
const ready = Boolean(process.env.E2E_API_URL && email && password);

test.describe('back-office', () => {
  test.skip(!ready, 'API ou identifiants absents : back-office non vérifié');
  // Un article est écrit puis publié : les tests ne doivent pas se marcher dessus.
  test.describe.configure({mode: 'serial'});

  test('refuse l’entrée sans session', async ({page}) => {
    await page.goto('/admin/candidatures');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('écrit, publie et met en ligne un article', async ({page}) => {
    const suffix = Date.now().toString(36);
    const title = `Article de recette ${suffix}`;

    await page.goto('/admin/login');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Mot de passe').fill(password);
    await page.getByRole('button', {name: /connexion|se connecter/i}).click();
    await expect(page).toHaveURL(/\/admin(\?|$)/);

    await page.goto('/admin/articles/nouveau');
    await page.getByLabel('Titre', {exact: true}).fill(title);
    await page
      .getByLabel('Chapô')
      .fill('Un article écrit par la suite de tests, pour vérifier la chaîne complète.');

    const editor = page.locator('.ProseMirror');
    await editor.click();
    await page.keyboard.type('Le capital sert à produire davantage, vendre davantage et employer davantage.');
    await page.waitForTimeout(300);
    await page.getByRole('button', {name: 'Titre de section'}).click();
    await page.waitForTimeout(300);
    await page.keyboard.type('Ce que nous regardons');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await page.getByRole('button', {name: 'Liste à puces'}).click();
    await page.waitForTimeout(300);
    await page.keyboard.type('Des revenus démontrables');

    await page.getByRole('button', {name: 'Publier'}).click();
    await expect(page).toHaveURL(/\/admin\/articles\/[a-f0-9]{24}/, {timeout: 30_000});

    const slug = title
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    await page.goto(`/fr/blog/${slug}`);
    await expect(page.getByRole('heading', {level: 1})).toContainText(title);
    await expect(page.getByRole('heading', {level: 2, name: 'Ce que nous regardons'})).toBeVisible();
    await expect(page.getByText('Des revenus démontrables')).toBeVisible();

    // On ne laisse pas de trace : l'article de test est supprimé.
    await page.goto('/admin/articles');
    await page.getByRole('link', {name: title}).click();
    page.once('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', {name: /Supprimer/}).click();
    await expect(page).toHaveURL(/\/admin\/articles$/, {timeout: 20_000});
  });
});
