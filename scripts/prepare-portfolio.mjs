import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

/**
 * Les logos des entreprises du portefeuille, tels que le client les a fournis.
 *
 * Ce sont des carrés de 8192 px dont le fond est **opaque et coloré** : chaque
 * marque a le sien. Le client a tranché le 29 septembre : on les affiche tels
 * quels, avec leur couleur. Il n'y a donc rien à détourer — seulement à
 * ramener à la taille d'affichage et à convertir en WebP, comme les photos.
 */
const source = (name) => fileURLToPath(new URL(`../../assets-source/entreprises accompagnees/${name}`, import.meta.url));
const OUT_DIR = fileURLToPath(new URL('../public/images/portfolio/', import.meta.url));

/** 400 px : deux fois la taille d'affichage de la tuile, pour les écrans à forte densité. */
const WIDTH = 400;

const LOGOS = [
  ['BRADAMADA-LOGO-1.png', 'bradamada'],
  ['SITINI-LOGO.png', 'sitini'],
  ['JAIANT-LOGO-1.png', 'jaiant'],
  ['LECAP-LOGO.png', 'lecap'],
  ['MOLOLO-REBRANDING-LOGO-1 (1).png', 'mololo'],
  ['CONGOLICIOUS-MEDIA (1).png', 'congolicious'],
  ['GRAND-MOLOLO-LOGO-BLACK.png', 'grand-mololo'],
];

await mkdir(OUT_DIR, {recursive: true});

for (const [file, slug] of LOGOS) {
  const info = await sharp(source(file))
    .flatten({background: '#ffffff'}) // un fond de marque reste un fond : pas d'alpha résiduel
    .resize({width: WIDTH, height: WIDTH, fit: 'cover'})
    .webp({quality: 88})
    .toFile(new URL(`${slug}.webp`, `file://${OUT_DIR}`).pathname);
  console.log(`public/images/portfolio/${slug}.webp: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} Ko`);
}
