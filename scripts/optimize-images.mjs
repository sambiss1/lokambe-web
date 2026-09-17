import {mkdir, readdir} from 'node:fs/promises';
import {basename, extname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const RAW_DIR = fileURLToPath(new URL('../images-raw/', import.meta.url));
const OUT_DIR = fileURLToPath(new URL('../public/images/', import.meta.url));
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const MAX_BYTES = 500 * 1024;
const QUALITIES = [78, 72, 66, 60];

const LANDSCAPE = {ratio: 4 / 3, maxWidth: 1920};
const PORTRAIT = {ratio: 4 / 5, maxWidth: 1400};

/**
 * Cadrage par image. `fx`/`fy` (0..1) positionnent la zone recadrée dans l'image source
 * (0.5 = centré) ; `zoom` (< 1) réduit la zone pour écarter un élément gênant en bordure.
 */
const FRAMING = {
  'home-hero': {...PORTRAIT, fx: 0.4},
  'home-kinshasa': LANDSCAPE,
  'about-hero': {...LANDSCAPE, fx: 0.3},
  'model-hero': {...LANDSCAPE, fx: 0.75},
  'process-hero': LANDSCAPE,
  'sectors-hero': LANDSCAPE,
  'governance-hero': LANDSCAPE,
  'impact-hero': {...LANDSCAPE, zoom: 0.86, fx: 0.5, fy: 1},
  'apply-hero': LANDSCAPE,
  'investors-hero': LANDSCAPE,
  'contact-hero': LANDSCAPE,
  'sector-medias': {...PORTRAIT, fx: 0.85},
  'sector-education': {...PORTRAIT, fy: 1},
  'sector-restauration': {...PORTRAIT, fy: 0.45},
  'sector-metiers-de-bouche': {...PORTRAIT, fy: 0.6},
  'sector-commerce': {...PORTRAIT, fx: 0.47},
  'sector-evenementiel': PORTRAIT,
  'sector-services': {...PORTRAIT, fy: 0.55},
  'cta-entrepreneur': {...PORTRAIT, fy: 0.3},
};

function cropBox(width, height, {ratio, zoom = 1, fx = 0.5, fy = 0.5}) {
  let w = width;
  let h = Math.round(width / ratio);
  if (h > height) {
    h = height;
    w = Math.round(height * ratio);
  }
  w = Math.round(w * zoom);
  h = Math.round(h * zoom);
  return {
    left: Math.round((width - w) * fx),
    top: Math.round((height - h) * fy),
    width: w,
    height: h,
  };
}

await mkdir(OUT_DIR, {recursive: true});

const files = (await readdir(RAW_DIR)).filter((file) => EXTENSIONS.has(extname(file).toLowerCase()));

if (files.length === 0) {
  console.error(`Aucune image trouvée dans ${RAW_DIR}`);
  process.exit(1);
}

for (const file of files.sort()) {
  const name = basename(file, extname(file)).toLowerCase();
  const framing = FRAMING[name] ?? {maxWidth: 1920};
  const source = sharp(join(RAW_DIR, file)).rotate();
  const {data, info: raw} = await source.toBuffer({resolveWithObject: true});

  let pipeline = sharp(data);
  if (framing.ratio) pipeline = pipeline.extract(cropBox(raw.width, raw.height, framing));
  const cropped = await pipeline
    .resize({width: framing.maxWidth, withoutEnlargement: true})
    .toBuffer();

  let info;
  for (const quality of QUALITIES) {
    info = await sharp(cropped).webp({quality}).toFile(join(OUT_DIR, `${name}.webp`));
    if (info.size <= MAX_BYTES) break;
  }
  const flag = info.size > MAX_BYTES ? '  > 500 Ko !' : '';
  console.log(`${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} Ko${flag}`);
}
