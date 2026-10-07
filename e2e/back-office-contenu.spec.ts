import type {Cookie} from '@playwright/test';
import {expect, test} from '@playwright/test';
import {ADMIN_READY, reuseSession, signInOnce} from './utils/session';

/**
 * Le contenu éditorial administrable : les cinq collections et la médiathèque.
 *
 * Le parcours vérifie ce que le client a demandé explicitement — **une page par
 * cas** (liste, création, consultation, modification, suppression) et **aucune
 * fenêtre modale** : aucune boîte du navigateur ne doit s'ouvrir, à aucun
 * moment. Il crée une entreprise d'essai, la publie, la retrouve sur la page
 * d'accueil, puis la supprime.
 *
 * Comme le reste du back-office, il est ignoré sans `E2E_API_URL`,
 * `E2E_ADMIN_EMAIL` et `E2E_ADMIN_PASSWORD`.
 */
test.describe('back-office — contenu', () => {
  test.skip(!ADMIN_READY, 'API ou identifiants absents : contenu non vérifié');
  test.describe.configure({mode: 'serial'});

  // Une seule connexion : l'API plafonne les tentatives par IP et par compte.
  let session: Cookie[] = [];

  test.beforeAll(async ({request}) => {
    session = await signInOnce(request);
  });

  test.beforeEach(async ({context, page}) => {
    await reuseSession(context, session);
    // Aucune boîte du navigateur, nulle part : c'est la demande du client.
    page.on('dialog', (dialog) => {
      throw new Error(`boîte du navigateur inattendue : ${dialog.message()}`);
    });
  });

  test('ouvre chaque collection et sa page de création', async ({page}) => {
    const screens = [
      ['/admin/portefeuille', 'Portefeuille'],
      ['/admin/partenaires', 'Partenaires'],
      ['/admin/equipe', 'Équipe'],
      ['/admin/offres', 'Offres'],
      ['/admin/questions', 'Questions'],
      ['/admin/medias', 'Médiathèque'],
    ] as const;

    for (const [path, heading] of screens) {
      await page.goto(path);
      await expect(page.getByRole('heading', {level: 1})).toContainText(heading, {ignoreCase: true});
      await page.goto(`${path}/nouveau`);
      await expect(page.getByRole('heading', {level: 1})).toBeVisible();
    }
  });

  test('crée, publie, affiche puis supprime une entreprise', async ({page}) => {
    const suffix = Date.now().toString(36);
    const name = `Essai ${suffix}`;

    // Enregistrer à vide : les erreurs s'affichent sous les champs concernés.
    await page.goto('/admin/portefeuille/nouveau');
    await page.getByRole('button', {name: 'Enregistrer'}).click();
    await expect(page.getByText('2 caractères minimum.').first()).toBeVisible();
    await expect(page).toHaveURL(/\/nouveau$/);

    await page.getByLabel('Nom de l’entreprise').fill(name);
    const français = page.getByRole('group', {name: 'Français'});
    await français.getByLabel('Secteur').fill('Services');
    await page.getByLabel('Statut du projet').fill('En essai');
    await français
      .getByLabel('Description')
      .fill('Entreprise créée par la suite de tests pour vérifier le parcours complet.');
    await page.getByRole('button', {name: 'Enregistrer'}).click();

    // On arrive sur la fiche « voir », pas sur un formulaire.
    await expect(page).toHaveURL(/\/admin\/portefeuille\/[a-f0-9]{24}$/, {timeout: 30_000});
    await expect(page.getByRole('heading', {level: 1})).toContainText(name);
    await expect(page.getByText('Brouillon').first()).toBeVisible();

    await page.getByRole('button', {name: 'Publier'}).click();
    await expect(page.getByRole('status').first()).toContainText('Publié', {timeout: 20_000});

    // L'entreprise publiée paraît sur la page d'accueil.
    await page.goto('/fr');
    await expect(page.getByText(name).first()).toBeVisible({timeout: 20_000});

    // La modification est une page à part, atteinte depuis la fiche.
    await page.goBack();
    await page
      .getByRole('link', {name: /Modifier/})
      .first()
      .click();
    await expect(page).toHaveURL(/modifier$/);
    await expect(page.getByLabel('Nom de l’entreprise')).toHaveValue(name);

    // La suppression aussi : une page qui nomme ce qu'on perd.
    await page
      .getByRole('link', {name: /Supprimer/})
      .first()
      .click();
    await expect(page).toHaveURL(/supprimer$/);
    await expect(page.getByText(name).first()).toBeVisible();
    await page.getByRole('button', {name: 'Supprimer définitivement'}).click();
    await expect(page).toHaveURL(/\/admin\/portefeuille$/, {timeout: 30_000});
    await expect(page.getByRole('link', {name})).toHaveCount(0);
  });
});
