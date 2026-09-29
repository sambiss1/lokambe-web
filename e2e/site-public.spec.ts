import {expect, test} from '@playwright/test';

/** Les parcours que tout visiteur fait : arriver, comprendre, naviguer. */

test('l’accueil présente le fonds et ses deux appels à l’action', async ({page}) => {
  await page.goto('/fr');

  await expect(page.getByRole('heading', {level: 1})).toContainText('Musapi moko');
  await expect(page.getByRole('link', {name: 'Soumettre un projet'}).first()).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

  // La carte « Visiter » a été retirée du bandeau, sur tous les écrans.
  await expect(page.getByText('Nous venons voir et comprendre')).toHaveCount(0);
});

test('« Notre engagement » porte les trois textes de la formalisation', async ({page}) => {
  await page.goto('/fr');

  for (const titre of ['Structurer avant de financer', 'Accompagner la formalisation', 'Contribuer à la croissance de l’activité']) {
    await expect(page.getByRole('heading', {name: titre})).toBeVisible();
  }
});

test('les partenaires ne sont que des logos, sans fiche au clic', async ({page}) => {
  await page.goto('/fr');

  await expect(page.getByRole('heading', {name: 'Ceux qui avancent avec nous'})).toBeVisible();
  await expect(page.getByRole('img', {name: 'NIWALI'})).toBeVisible();
  // Le client ne veut afficher que le logo : pas de tuile cliquable.
  await expect(page.getByRole('button', {name: 'NIWALI'})).toHaveCount(0);
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

  // Le bandeau doit dire qu'on est sur la page des secteurs : c'est le retour
  // client du 29 septembre, l'ancien titre posait une question sans contexte.
  await expect(page.getByRole('heading', {level: 1})).toContainText('Sept secteurs');
  await expect(page.getByRole('heading', {name: 'Médias et divertissement'})).toBeVisible();
  await expect(page.getByRole('heading', {name: 'Éducation et formation'})).toBeVisible();
});

test('le portefeuille montre les sept entreprises et ouvre leur fiche', async ({page}) => {
  // Le bandeau de logos défile en boucle : Playwright refuse de cliquer une
  // cible qui bouge, et le survol qui met l'animation en pause demande déjà la
  // même stabilité. On coupe donc les animations, ce que le site sait faire.
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto('/fr');

  const rail = page.getByRole('group', {name: 'Elles grandissent avec nous.'});
  // Les tuiles sont dupliquées pour que la boucle soit sans couture : « first ».
  await rail.getByRole('button', {name: 'Bradamada'}).first().click();

  // La fiche est un vrai <dialog>. On le vise par la balise, et non par son
  // rôle : le panneau du menu mobile porte lui aussi `role="dialog"`, et il
  // reste dans la page — inerte — pour que sa transition joue.
  const fiche = page.locator('dialog');
  await expect(fiche.getByRole('heading', {name: 'Bradamada'})).toBeVisible();
  // `exact` : « Restauration » apparaît aussi dans la description de Bradamada.
  await expect(fiche.getByText('Restauration', {exact: true})).toBeVisible();
  await expect(fiche.getByText('En développement', {exact: true})).toBeVisible();

  await fiche.getByRole('button', {name: 'Fermer'}).click();
  await expect(fiche).toBeHidden();
});

test('les sections déplacées sont bien à leur nouvelle place', async ({page}) => {
  // La section Formalisation a quitté l'accueil pour Impact, la FAQ pour
  // Contact. Les trois textes de la formalisation, eux, ont été repris dans
  // « Notre engagement » — c'est la section, pas le texte, qui a déménagé.
  await page.goto('/fr');
  await expect(page.getByRole('heading', {name: /de l’informel vers le formel/i})).toHaveCount(0);
  await expect(page.getByText('Vous vous posez des questions ?')).toHaveCount(0);

  await page.goto('/fr/impact');
  await expect(page.getByRole('heading', {name: /de l’informel vers le formel/i})).toBeVisible();

  await page.goto('/fr/contact');
  await expect(page.getByRole('heading', {name: 'Vous vous posez des questions ?'})).toBeVisible();
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
  await expect(page.getByRole('heading', {level: 1})).toContainText('The talent is here');
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
