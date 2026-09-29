import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

/**
 * Les logos que le client a fournis : les entreprises du portefeuille, et les
 * partenaires.
 *
 * Ce sont des carrés dont le fond est **opaque et coloré** : chaque marque a le
 * sien. Le client a tranché le 29 septembre : on les affiche tels quels, avec
 * leur couleur. Il n'y a donc rien à détourer — seulement à ramener à la taille
 * d'affichage et à convertir en WebP, comme les photos.
 */
const source = (path) => fileURLToPath(new URL(`../../assets-source/${path}`, import.meta.url));
const out = (dir) => fileURLToPath(new URL(`../public/images/${dir}/`, import.meta.url));

/** 400 px : deux fois la taille d'affichage de la tuile, pour les écrans à forte densité. */
const WIDTH = 400;

const FAMILIES = [
  {
    dir: 'portfolio',
    from: 'entreprises accompagnees',
    logos: [
      ['BRADAMADA-LOGO-1.png', 'bradamada'],
      ['SITINI-LOGO.png', 'sitini'],
      ['JAIANT-LOGO-1.png', 'jaiant'],
      ['LECAP-LOGO.png', 'lecap'],
      ['MOLOLO-REBRANDING-LOGO-1 (1).png', 'mololo'],
      ['CONGOLICIOUS-MEDIA (1).png', 'congolicious'],
      ['GRAND-MOLOLO-LOGO-BLACK.png', 'grand-mololo'],
    ],
  },
  {
    dir: 'partners',
    from: 'partenaires',
    logos: [['NIWALI-LOGO.png', 'niwali']],
  },
];

for (const {dir, from, logos} of FAMILIES) {
  await mkdir(out(dir), {recursive: true});

  for (const [file, slug] of logos) {
    const info = await sharp(source(`${from}/${file}`))
      .flatten({background: '#ffffff'}) // un fond de marque reste un fond : pas d'alpha résiduel
      .resize({width: WIDTH, height: WIDTH, fit: 'cover'})
      .webp({quality: 88})
      .toFile(`${out(dir)}${slug}.webp`);
    console.log(`public/images/${dir}/${slug}.webp: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} Ko`);
  }
}
