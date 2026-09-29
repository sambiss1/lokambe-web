import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const source = (name) => fileURLToPath(new URL(`../../assets-source/${name}`, import.meta.url));
const target = (path) => fileURLToPath(new URL(`../${path}`, import.meta.url));

const BLUE = '#001df3';
const WHITE = '#ffffff';

/**
 * Le verrou de marque « LOKAMBE REPUBLIC », tel que le client l'a fourni.
 *
 * Les deux fichiers de la charte ont un fond **opaque** — bleu sur blanc pour
 * l'un, blanc sur bleu pour l'autre : posés tels quels dans l'en-tête, ils
 * traîneraient leur rectangle derrière eux. On n'en garde donc qu'un seul, dont
 * on fait un masque de transparence que l'on reteinte : les deux déclinaisons
 * sortent de la même découpe, au pixel près.
 */
const LOCKUP = 'LOKAMBE-REPUBLIC-CHARTE.png';
const LOGO_WIDTH = 1200;

await mkdir(target('public/brand'), {recursive: true});
await mkdir(target('public/images'), {recursive: true});

/** Le tracé du verrou, en niveaux de gris : blanc là où il y a de l'encre. */
async function lockupMask(width) {
  // Deux passes : sharp applique `trim` AVANT `flatten`, quel que soit l'ordre
  // des appels. Sur un PNG dont l'alpha est uniforme, le rognage se ferait sur
  // l'alpha et ne verrait pas le fond blanc — on obtiendrait le cadre entier au
  // lieu du tracé. D'où l'aplatissement en premier, dans son propre pipeline.
  const flattened = await sharp(source(LOCKUP)).flatten({background: WHITE}).png().toBuffer();

  return sharp(flattened)
    .trim({background: WHITE, threshold: 10})
    .resize({width})
    .greyscale()
    .negate()
    .normalise() // sans ça le bleu de la charte ne vire pas au noir : logo translucide
    .raw() // joinChannel attend des octets bruts, pas un PNG encodé
    .toBuffer({resolveWithObject: true});
}

/** Le verrou détouré, dans la couleur demandée, sur fond transparent. */
async function lockup(width, color) {
  const {data: mask, info} = await lockupMask(width);
  return sharp({create: {width: info.width, height: info.height, channels: 3, background: color}})
    .joinChannel(mask, {raw: {width: info.width, height: info.height, channels: 1}})
    .png()
    .toBuffer();
}

for (const [output, color] of [
  ['public/brand/logo-blue.png', BLUE],
  ['public/brand/logo-white.png', WHITE],
]) {
  const info = await sharp(await lockup(LOGO_WIDTH, color)).toFile(target(output));
  console.log(`${output}: ${info.width}x${info.height}`);
}

// L'image de partage et le favicon reprennent la version blanche sur le bleu de
// la charte : ils suivent donc le changement de logo sans rien de plus à faire.
await sharp({create: {width: 1200, height: 630, channels: 4, background: BLUE}})
  .composite([{input: await lockup(560, WHITE), gravity: 'center'}])
  .jpeg({quality: 90})
  .toFile(target('public/images/og-default.jpg'));
console.log('public/images/og-default.jpg: 1200x630');

await sharp({create: {width: 512, height: 512, channels: 4, background: BLUE}})
  .composite([{input: await lockup(400, WHITE), gravity: 'center'}])
  .png()
  .toFile(target('src/app/icon.png'));
console.log('src/app/icon.png: 512x512');
