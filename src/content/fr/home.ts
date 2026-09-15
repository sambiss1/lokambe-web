import type {HomeContent} from '../types';

export const home: HomeContent = {
  meta: {
    title: 'Fonds privé congolais d’investissement',
    description:
      'LOKAMBE investit dans les PME, microentreprises et activités génératrices de revenus en RDC, crée des entreprises et les accompagne pour les faire grandir.',
  },
  hero: {
    eyebrow: 'Fonds privé congolais',
    title: 'Le capital privé au service de l’entrepreneuriat congolais.',
    tagline: 'Investir. Créer. Accompagner. Faire grandir. Réinvestir.',
    intro:
      'LOKAMBE est un fonds privé congolais d’investissement, de création et d’accompagnement des petites et moyennes entreprises et des activités génératrices de revenus.',
    image: {src: '/images/home-hero.webp', alt: 'Entrepreneur congolais au travail dans son commerce'},
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Investir avec nous', href: '/investisseurs-et-partenaires'},
  },
  statement: {
    quote: '« Nous ne donnons pas. Nous investissons. »',
    text: 'Le capital est un levier de création de valeur. Il doit permettre à une activité de se structurer, de produire davantage, de générer des revenus, de créer des emplois, d’accumuler du capital et, à terme, de contribuer elle-même au financement de nouvelles opportunités économiques.',
  },
  functions: {
    eyebrow: 'Notre modèle',
    title: 'Investir, créer, accompagner',
    intro: 'Le modèle LOKAMBE repose sur deux piliers complémentaires et une fonction transversale.',
    items: [
      {
        title: 'Investir',
        text: 'Identifier et financer des entrepreneurs et entreprises présentant un potentiel économique et financier.',
      },
      {
        title: 'Créer',
        text: 'Identifier des besoins de marché et créer directement des entreprises dans des secteurs présentant un potentiel de rentabilité, de croissance et de duplication.',
      },
      {
        title: 'Accompagner',
        text: 'Apporter aux entreprises financées ou créées les compétences, outils, réseaux et ressources nécessaires à leur développement.',
      },
    ],
  },
  sectors: {
    eyebrow: 'Secteurs prioritaires',
    title: 'Là où nous concentrons nos efforts',
    intro:
      'La phase pilote est volontairement concentrée sur un nombre limité de secteurs afin de développer une véritable expertise sectorielle.',
    items: [
      {title: 'Restauration', text: 'Restaurants, restauration rapide, traiteurs, restauration événementielle et concepts spécialisés.'},
      {title: 'Métiers de bouche', text: 'Boulangerie, pâtisserie, chocolaterie, production, transformation et conditionnement alimentaires.'},
      {title: 'Commerce et distribution', text: 'Commerces de proximité, boutiques spécialisées, distribution et produits alimentaires.'},
      {title: 'Événementiel', text: 'Location de mobilier et d’équipements, sonorisation, éclairage, décoration et logistique.'},
      {title: 'Services', text: 'Maintenance, nettoyage, logistique, services aux entreprises et services spécialisés.'},
    ],
    link: {label: 'Secteurs et critères', href: '/secteurs-et-criteres'},
  },
  process: {
    eyebrow: 'Processus',
    title: 'Une démarche structurée',
    intro: 'Aucune décision d’investissement significative ne repose sur la seule intuition ou appréciation d’un individu.',
    steps: [
      {
        title: 'Identifier et présélectionner',
        text: 'Recherche proactive, réception des projets et premier filtre selon nos critères d’investissement.',
      },
      {
        title: 'Visiter et analyser',
        text: 'Vérification de terrain, analyse commerciale, financière, opérationnelle et entrepreneuriale, puis due diligence.',
      },
      {
        title: 'Décider et investir',
        text: 'Structuration de l’intervention, validation collégiale par le Comité d’investissement, puis déploiement du capital.',
      },
      {
        title: 'Accompagner et réinvestir',
        text: 'Mise en œuvre du plan de croissance, suivi, valorisation et réallocation du capital vers de nouvelles opportunités.',
      },
    ],
    link: {label: 'Découvrir le processus', href: '/processus'},
  },
  pilot: {
    eyebrow: 'Phase pilote',
    title: 'Kinshasa, laboratoire du modèle',
    paragraphs: [
      'LOKAMBE commence par Kinshasa, à travers une phase pilote destinée à tester le modèle, constituer un premier portefeuille, créer les premières entreprises, mesurer les performances et documenter les méthodes nécessaires à une expansion progressive vers d’autres pôles économiques de la RDC.',
      'Commencer concentré pour apprendre. Grandir progressivement pour durer.',
    ],
    image: {src: '/images/home-kinshasa.webp', alt: 'Rue commerçante animée à Kinshasa'},
  },
  cta: {
    title: 'Vous faites grandir une activité ?',
    text: 'Présentez-nous votre projet : nous étudions chaque dossier avec rigueur, sur le terrain comme dans les chiffres.',
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Nous contacter', href: '/contact'},
  },
};
