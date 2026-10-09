import {expect, test} from '@playwright/test';
import {apiAllowsOrigin} from './utils/cors';

/**
 * Le formulaire de candidature, côté visiteur.
 *
 * L'envoi réel a besoin de l'API : il n'est déroulé que si `E2E_API_URL` est
 * posée. Le reste — validation, navigation entre les étapes, récapitulatif —
 * se vérifie sans elle.
 */
const withApi = Boolean(process.env.E2E_API_URL);

test('refuse d’avancer tant que l’étape n’est pas remplie', async ({page}) => {
  await page.goto('/fr/soumettre-un-projet');

  await page.getByRole('button', {name: 'Continuer'}).click();

  // Chaque champ fautif se signale lui-même, et le focus va au premier.
  await expect(page.getByLabel('Prénom')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Indiquez votre prénom.')).toBeVisible();
  await expect(page.getByLabel('Prénom')).toBeFocused();
  await expect(page.getByText('Étape 1 sur 4')).toBeVisible();
});

test('avance d’étape en étape et laisse revenir en arrière', async ({page}) => {
  await page.goto('/fr/soumettre-un-projet');

  await page.getByLabel('Prénom').fill('Grâce');
  await page.getByLabel('Nom', {exact: true}).fill('Mbala');
  await page.getByLabel('Téléphone').fill('+243 810 000 000');
  await page.getByLabel('Ville', {exact: true}).selectOption('Kinshasa');
  await page.getByRole('button', {name: 'Continuer'}).click();

  await expect(page.getByText('Étape 2 sur 4')).toBeVisible();

  await page.getByRole('button', {name: 'Précédent'}).click();
  await expect(page.getByLabel('Prénom')).toHaveValue('Grâce');
});

test('demande un numéro de téléphone plausible', async ({page}) => {
  await page.goto('/fr/soumettre-un-projet');

  await page.getByLabel('Prénom').fill('Grâce');
  await page.getByLabel('Nom', {exact: true}).fill('Mbala');
  await page.getByLabel('Téléphone').fill('abc');
  await page.getByLabel('Ville', {exact: true}).selectOption('Kinshasa');
  await page.getByRole('button', {name: 'Continuer'}).click();

  await expect(page.getByLabel('Téléphone')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Étape 1 sur 4')).toBeVisible();
});

test('le formulaire de contact refuse une adresse email invalide', async ({page}) => {
  await page.goto('/fr/contact');

  await page.getByLabel('Nom complet').fill('Jean Kabasele');
  await page.getByLabel('Email').fill('pas-une-adresse');
  await page.getByLabel('Votre message').fill('Bonjour, je souhaite échanger avec votre équipe.');
  await page.getByRole('button', {name: 'Envoyer'}).click();

  await expect(page.getByLabel('Email')).toHaveAttribute('aria-invalid', 'true');
});

test('les messages de validation suivent la langue de la page', async ({page}) => {
  await page.goto('/en/soumettre-un-projet');

  await page.getByRole('button', {name: 'Continue'}).click();

  // Le piège d'un site bilingue : un champ anglais sous lequel s'affiche une
  // phrase française.
  await expect(page.getByText('Enter your first name.')).toBeVisible();
  await expect(page.getByText('Indiquez votre prénom.')).toHaveCount(0);
});

test('le formulaire de contact anglais refuse une adresse invalide, en anglais', async ({page}) => {
  await page.goto('/en/contact');

  await page.getByLabel('Full name').fill('Jean Kabasele');
  await page.getByLabel('Email').fill('pas-une-adresse');
  await page.getByLabel('Your message').fill('Hello, I would like to talk with your team.');
  await page.getByRole('button', {name: 'Send'}).click();

  await expect(page.getByText('This email address is not valid.')).toBeVisible();
});

test.describe('avec l’API', () => {
  test.skip(!withApi, 'E2E_API_URL absente : envoi réel non vérifié');

  test('envoie une candidature complète et affiche sa référence', async ({page, request, baseURL}) => {
    // Le formulaire poste depuis le navigateur : l'API doit autoriser cette
    // origine. Elle ne connaît que le domaine du site en production, donc en
    // local l'envoi est bloqué par le navigateur, sans que ce soit une panne.
    const allowed = await apiAllowsOrigin(request, process.env.E2E_API_URL ?? '', baseURL ?? '');
    test.skip(
      !allowed,
      `CORS_ORIGIN de l’API ne contient pas ${baseURL} : envoi réel vérifiable seulement depuis le site déployé`,
    );

    await page.goto('/fr/soumettre-un-projet');

    await page.getByLabel('Prénom').fill('Grâce');
    await page.getByLabel('Nom', {exact: true}).fill('Mbala');
    await page.getByLabel('Téléphone').fill('+243 810 000 000');
    await page.getByLabel('Ville', {exact: true}).selectOption('Kinshasa');
    await page.getByRole('button', {name: 'Continuer'}).click();

    await page.getByLabel('Nom de l’activité').fill('Pâtisserie Mbala');
    await page.getByLabel('Secteur').selectOption('metiers_de_bouche');
    await page.getByLabel('Nombre de personnes qui travaillent avec vous').fill('3');
    await page
      .getByLabel('Décrivez votre activité')
      .fill('Pâtisserie artisanale qui vend chaque jour à une clientèle fidèle du quartier.');
    await page.getByRole('button', {name: 'Continuer'}).click();

    await page.getByLabel('Type de besoin').selectOption('equipements');
    await page.getByLabel('Montant souhaité (USD)').fill('12500');
    await page
      .getByLabel('Utilisation prévue du capital')
      .fill('Achat d’un four professionnel et d’un pétrin pour doubler la production.');
    await page.getByRole('button', {name: 'Continuer'}).click();

    await page.getByLabel(/J’autorise LOKAMBE/).check();
    await page.getByRole('button', {name: 'Envoyer'}).click();

    await expect(page.getByText('Dossier envoyé')).toBeVisible({timeout: 30_000});
    await expect(page.getByText(/LKB-[A-Z0-9]{6}/)).toBeVisible();
  });
});
