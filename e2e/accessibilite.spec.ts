import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

/**
 * Contrôle d'accessibilité automatisé, page par page.
 *
 * Il ne remplace pas une relecture humaine — axe ne voit ni le sens d'un texte
 * alternatif, ni l'ordre de lecture réel — mais il empêche les régressions les
 * plus courantes : contraste, libellés manquants, ordre des titres.
 */
const PAGES = [
  ['/fr', 'accueil'],
  ['/fr/a-propos', 'à propos'],
  ['/fr/notre-modele', 'notre modèle'],
  ['/fr/secteurs-et-criteres', 'secteurs'],
  ['/fr/impact', 'impact'],
  ['/fr/notre-equipe', 'notre équipe'],
  ['/fr/carrieres', 'carrières'],
  ['/fr/blog', 'blog'],
  ['/fr/contact', 'contact'],
  ['/fr/soumettre-un-projet', 'candidature'],
  ['/fr/mentions-legales', 'mentions légales'],
  ['/fr/confidentialite', 'confidentialité'],
  ['/en', 'accueil anglais'],
] as const;

for (const [path, label] of PAGES) {
  test(`${label} : aucune violation axe`, async ({page}) => {
    await page.goto(path);
    // Les apparitions au défilement partent d'une opacité nulle : on les
    // déclenche avant l'analyse, sinon axe mesure le contraste d'un texte
    // encore invisible.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      window.scrollTo(0, 0);
      // Les apparitions durent 0,9 s : mesurer avant la fin ferait échouer le
      // contraste d'un texte encore à moitié transparent.
      await new Promise((resolve) => setTimeout(resolve, 1400));
    });

    const results = await new AxeBuilder({page})
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

test('le menu mobile s’ouvre et reste navigable au clavier', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/fr');

  const toggle = page.getByRole('button', {name: /ouvrir le menu/i});
  await toggle.click();

  const menu = page.getByRole('dialog');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(menu.getByRole('link', {name: 'Contact'})).toBeVisible();

  // Échap referme : un menu plein écran qui ne se ferme pas au clavier est un piège.
  // Le panneau reste dans la page pour que la transition joue, mais il devient
  // inerte — c'est ce que l'attribut du bouton annonce aux technologies d'assistance.
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#menu-mobile')).toHaveClass(/translate-x-full/);
});
