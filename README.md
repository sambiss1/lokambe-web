# lokambe-web

Site public et back-office de **LOKAMBE**, fonds privé congolais d'investissement, de création et d'accompagnement des PME et des activités génératrices de revenus.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · Vitest.

## Démarrer

```bash
npm install
cp .env.example .env.local
npm run dev -- -p 3011     # http://localhost:3011/fr
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm run start` | Build et exécution en production (Railway lit `PORT`) |
| `npm run lint` / `npm run typecheck` / `npm run test` | Contrôles |
| `npm run brand` | Régénère logos, favicon et image Open Graph depuis `../assets-source/` |
| `npm run images` | Convertit `images-raw/*.jpg` en WebP optimisés dans `public/images/` |

## Organisation

```
src/
├── app/[locale]/        pages publiques (fr, en préparé)
├── app/admin/           back-office (hors i18n, noindex)
├── content/{types,fr}/  tout le texte éditorial, typé
├── components/
│   ├── ui/              boutons, conteneur, logo, en-tête de section
│   ├── motion/          apparitions au défilement, bandeau défilant, compteur
│   ├── layout/          en-tête fixe, menu mobile, pied de page
│   ├── sections/        briques réutilisables des pages intérieures
│   ├── home/            sections de la page d'accueil
│   ├── forms/           candidature (4 étapes) et contact
│   └── admin/           écrans du back-office
├── lib/                 constantes partagées avec l'API, schémas zod, SEO
└── i18n/                routage et messages next-intl
```

## État actuel

Les interfaces sont complètes avec des **données fictives** : les formulaires et le back-office ne parlent pas encore à l'API. Chaque point de branchement est marqué par un commentaire `TODO(api)`.

## Charte

Bleu `#001df3`, pêche `#f7c4a7`, rouge `#f01346` (accents uniquement), encre `#0a0a0a`. Police Cabinet Grotesk auto-hébergée. Titres en capitales grasses. Les animations respectent `prefers-reduced-motion`.

Crédits des photos : `public/images/CREDITS.md`.
