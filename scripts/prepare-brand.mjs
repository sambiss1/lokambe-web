import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const source = (name) => fileURLToPath(new URL(`../../assets-source/${name}`, import.meta.url));
const target = (path) => fileURLToPath(new URL(`../${path}`, import.meta.url));

const BLUE = '#001df3';

await mkdir(target('public/brand'), {recursive: true});
await mkdir(target('public/images'), {recursive: true});

const logos = [
  ['LOKAMBE-LOGO-BLEU-PNG.png', 'public/brand/logo-blue.png'],
  ['LOKAMBE-LOGO-PNG.png', 'public/brand/logo-white.png'],
];

for (const [input, output] of logos) {
  const info = await sharp(source(input)).trim().resize({width: 1200}).png().toFile(target(output));
  console.log(`${output}: ${info.width}x${info.height}`);
}

const whiteLogo = (width) => sharp(source('LOKAMBE-LOGO-PNG.png')).trim().resize({width}).png().toBuffer();

await sharp({create: {width: 1200, height: 630, channels: 4, background: BLUE}})
  .composite([{input: await whiteLogo(640), gravity: 'center'}])
  .jpeg({quality: 90})
  .toFile(target('public/images/og-default.jpg'));
console.log('public/images/og-default.jpg: 1200x630');

await sharp({create: {width: 512, height: 512, channels: 4, background: BLUE}})
  .composite([{input: await whiteLogo(420), gravity: 'center'}])
  .png()
  .toFile(target('src/app/icon.png'));
console.log('src/app/icon.png: 512x512');
