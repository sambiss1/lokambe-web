import {expect, test} from '@playwright/test';

/** Les parcours que tout visiteur fait : arriver, comprendre, naviguer. */

test('l’accueil présente le fonds et ses deux appels à l’action', async ({page}) => {
  await page.goto('/fr');

  await expect(page.getByRole('heading', {level: 1})).toContainText('Musapi moko');
  await expect(page.getByRole('link', {name: 'Soumettre un projet'}).first()).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
});

test('la racine redirige vers le français', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/fr$/);
});

test('les pages du site répondent et portent un titre unique', async ({page}) => {
  const paths = [
    '/fr/a-propos',
    '/fr/notre-modele',
    '/fr/secteurs-et-criteres',
    '/fr/impact',
    '/fr/notre-equipe',
    '/fr/carrieres',
    '/fr/blog',
    '/fr/contact',
    '/fr/soumettre-un-projet',
    '/fr/mentions-legales',
    '/fr/confidentialite',
  ];

  const titles = new Set<string>();
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.getByRole('heading', {level: 1})).toBeVisible();
    titles.add(await page.title());
  }
  expect(titles.size).toBe(paths.length);
});

test('la page Secteurs annonce bien les sept secteurs', async ({page}) => {
  await page.goto('/fr/secteurs-et-criteres');

  await expect(page.getByText('Sept secteurs prioritaires')).toBeVisible();
  await expect(page.getByRole('heading', {name: 'Médias et divertissement'})).toBeVisible();
  await expect(page.getByRole('heading', {name: 'Éducation et formation'})).toBeVisible();
});

test('une adresse inconnue rend une page 404 utile', async ({page}) => {
  const response = await page.goto('/fr/cette-page-nexiste-pas');

  expect(response?.status()).toBe(404);
  await expect(page.getByText('Page introuvable')).toBeVisible();
  await expect(page.getByRole('link', {name: /accueil/i}).first()).toBeVisible();
});

test('le site bascule en anglais et le contenu suit', async ({page}) => {
  await page.goto('/en/a-propos');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', {level: 1})).toContainText('The DRC is not short of entrepreneurs');
  await expect(page.getByText('Nos convictions')).toHaveCount(0);
});

test('le blog affiche des articles et ouvre un article', async ({page}) => {
  await page.goto('/fr/blog');

  const first = page.locator('article a').first();
  const title = (await first.textContent())?.trim() ?? '';
  expect(title.length).toBeGreaterThan(5);

  await first.click();
  await expect(page).toHaveURL(/\/fr\/blog\/[a-z0-9-]+$/);
  await expect(page.getByRole('heading', {level: 1})).toContainText(title);
});
