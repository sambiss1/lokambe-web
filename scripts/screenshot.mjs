/**
 * Capture d'écran d'une page du site.
 *
 *   node scripts/screenshot.mjs /fr sortie.png [largeur] [hauteur] [pleinePage]
 *   SHOT_BASE=http://localhost:3100 node scripts/screenshot.mjs /fr/impact impact.png
 *
 * Par défaut : http://localhost:3011, 1440 × 900, page entière.
 *
 * Deux précautions, chacune payée d'une demi-heure perdue :
 *
 * 1. On déroule la page avant de capturer. Les apparitions au défilement
 *    démarrent à une opacité nulle : sans ça, la moitié de la page est vide.
 *
 * 2. On agrandit la fenêtre nous-mêmes au lieu de passer `fullPage` à
 *    Playwright. Ce mode redimensionne au dernier moment puis capture dans la
 *    foulée ; les apparitions, qui commencent après 450 ms, sont alors encore à
 *    zéro. On croit qu'un élément a disparu alors qu'il est bien là.
 *
 * Le navigateur est le Chrome du système, comme pour les tests de bout en bout :
 * pas de téléchargement de 300 Mo pour une capture.
 */
import {chromium} from '@playwright/test';

const [path = '/fr', out = 'capture.png', width = '1440', height = '900', full = '1'] = process.argv.slice(2);
const base = process.env.SHOT_BASE ?? 'http://localhost:3011';

const browser = await chromium.launch({channel: 'chrome'});
const page = await browser.newPage({viewport: {width: Number(width), height: Number(height)}});

await page.goto(base + path, {waitUntil: 'networkidle', timeout: 60_000});

await page.evaluate(async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((resolve) => setTimeout(resolve, 160));
  }
  window.scrollTo(0, 0);
});
// Une transition de 0,9 s fausse aussi bien une capture qu'une mesure de contraste.
await page.waitForTimeout(1400);

if (full === '1') {
  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({width: Number(width), height: Math.min(docHeight, 12_000)});
  await page.waitForTimeout(2600);
}

await page.screenshot({path: out});
await browser.close();
console.log(out);
