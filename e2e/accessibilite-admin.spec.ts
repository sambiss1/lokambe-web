import AxeBuilder from '@axe-core/playwright';
import type {Cookie} from '@playwright/test';
import {expect, test} from '@playwright/test';
import {ADMIN_READY, reuseSession, signInOnce} from './utils/session';

/**
 * Contrôle d'accessibilité du back-office.
 *
 * Les écrans publics étaient vérifiés depuis le 28 septembre, pas le
 * back-office : il demande une session, donc la suite l'ignorait. Il s'y ajoute
 * maintenant, parce que l'équipe y passe ses journées et que c'est là que vivent
 * les formulaires — les champs mal nommés s'y installent sans qu'on les voie.
 *
 * Le premier passage a trouvé une vraie faute : le champ de fichier caché des
 * écrans de téléversement n'avait pas de nom, donc un lecteur d'écran
 * n'annonçait rien.
 */
const PAGES = [
  ['/admin', 'tableau de bord'],
  ['/admin/portefeuille', 'portefeuille'],
  ['/admin/portefeuille/nouveau', 'nouvelle entreprise'],
  ['/admin/partenaires', 'partenaires'],
  ['/admin/equipe', 'équipe'],
  ['/admin/equipe/nouveau', 'nouveau membre'],
  ['/admin/offres', 'offres d’emploi'],
  ['/admin/offres/nouveau', 'nouvelle offre'],
  ['/admin/questions', 'questions fréquentes'],
  ['/admin/questions/nouveau', 'nouvelle question'],
  ['/admin/medias', 'médiathèque'],
  ['/admin/medias/nouveau', 'téléversement'],
  ['/admin/articles', 'articles'],
] as const;

test.describe('accessibilité du back-office', () => {
  test.skip(!ADMIN_READY, 'API ou identifiants absents : back-office non vérifié');

  // Une seule connexion pour les treize écrans : l'API plafonne les tentatives.
  let session: Cookie[] = [];

  test.beforeAll(async ({request}) => {
    session = await signInOnce(request);
  });

  test.beforeEach(async ({context}) => {
    await reuseSession(context, session);
  });

  for (const [path, label] of PAGES) {
    test(`${label} : aucune violation axe`, async ({page}) => {
      await page.goto(path);
      // Le tableau de bord fait apparaître ses cartes au défilement, depuis une
      // opacité nulle : sans cette attente, axe mesure le contraste d'un texte
      // encore à moitié transparent et signale des centaines de fautes qui
      // n'existent pas. Même technique que pour les pages publiques.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 80));
        }
        window.scrollTo(0, 0);
        await new Promise((resolve) => setTimeout(resolve, 1400));
      });

      const {violations} = await new AxeBuilder({page})
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(violations).toEqual([]);
    });
  }
});
