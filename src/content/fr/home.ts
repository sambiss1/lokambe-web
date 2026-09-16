import type {HomeContent} from '../types';

export const home: HomeContent = {
  meta: {
    title: 'Fonds privé congolais d’investissement',
    description:
      'LOKAMBE investit dans les PME, microentreprises et activités génératrices de revenus en RDC, crée des entreprises et les accompagne pour les faire grandir.',
  },
  hero: {
    eyebrow: 'Fonds privé congolais d’investissement',
    titleLines: ['Le capital privé', 'au service de', 'l’entrepreneuriat', 'congolais.'],
    tagline: 'Investir. Créer. Accompagner. Faire grandir. Réinvestir.',
    intro:
      'LOKAMBE investit dans les petites et moyennes entreprises et les activités génératrices de revenus, en crée de nouvelles et les accompagne jusqu’à ce qu’elles grandissent.',
    image: {src: '/images/home-hero.webp', alt: 'Commerçant souriant derrière le comptoir de son épicerie'},
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Investir avec nous', href: '/investisseurs-et-partenaires'},
    cards: {
      step: {label: 'Étape 3 sur 12', title: 'Visiter', text: 'Vérification de terrain et compréhension de l’activité.'},
      sector: {label: 'Secteur prioritaire', title: 'Métiers de bouche'},
      place: {label: 'Au-delà du capital', title: 'Accompagnement'},
    },
  },
  marquee: ['Investir', 'Créer', 'Accompagner', 'Faire grandir', 'Réinvestir'],
  statement: {
    quote: 'Nous ne donnons pas. Nous investissons.',
    text: 'Le capital est un levier de création de valeur. Il doit permettre à une activité de se structurer, de produire davantage, de générer des revenus, de créer des emplois, d’accumuler du capital et, à terme, de contribuer elle-même au financement de nouvelles opportunités économiques.',
  },
  facts: {
    eyebrow: 'LOKAMBE en bref',
    title: 'Un fonds pensé pour durer',
    items: [
      {value: 5, label: 'secteurs prioritaires', text: 'Restauration, métiers de bouche, commerce, événementiel et services.'},
      {value: 3, label: 'façons d’intervenir', text: 'Investir dans une activité, en créer une nouvelle, accompagner sa croissance.'},
      {value: 5, label: 'domaines d’accompagnement', text: 'Finance, commercial, marketing, opérations et ressources humaines.'},
    ],
  },
  functions: {
    eyebrow: 'Notre modèle',
    title: 'Un capital qui circule',
    intro:
      'Le modèle LOKAMBE repose sur deux piliers complémentaires, investir et créer, et une fonction transversale : accompagner. Le capital récupéré finance de nouvelles opportunités.',
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
    cycle: ['Investir', 'Créer', 'Accompagner', 'Faire grandir', 'Réinvestir'],
    cycleLabel: 'Le cycle du capital LOKAMBE',
  },
  sectors: {
    eyebrow: 'Secteurs prioritaires',
    title: 'Là où nous concentrons nos efforts',
    intro:
      'Nous concentrons nos efforts sur un nombre limité de secteurs, pour les connaître vraiment.',
    items: [
      {
        title: 'Restauration',
        text: 'Restaurants, restauration rapide, traiteurs, restauration événementielle et concepts spécialisés.',
        tags: ['Restaurants', 'Fast-food', 'Traiteurs'],
        image: {src: '/images/sector-restauration.webp', alt: 'Chef cuisinant au-dessus des flammes dans la cuisine d’un restaurant'},
      },
      {
        title: 'Métiers de bouche',
        text: 'Boulangerie, pâtisserie, chocolaterie, production, transformation et conditionnement alimentaires.',
        tags: ['Boulangerie', 'Pâtisserie', 'Transformation'],
        image: {src: '/images/sector-metiers-de-bouche.webp', alt: 'Jeune pâtissière présentant un gâteau décoré dans son atelier'},
      },
      {
        title: 'Commerce et distribution',
        text: 'Commerces de proximité, boutiques spécialisées, distribution et produits alimentaires.',
        tags: ['Proximité', 'Boutiques', 'Distribution'],
        image: {src: '/images/sector-commerce.webp', alt: 'Vendeuse tenant des tomates sur son étal au marché'},
      },
      {
        title: 'Événementiel',
        text: 'Location de mobilier et d’équipements, sonorisation, éclairage, décoration et logistique.',
        tags: ['Mobilier', 'Sonorisation', 'Décoration'],
        image: {src: '/images/sector-evenementiel.webp', alt: 'Longue table de banquet décorée de fleurs pour une réception'},
      },
      {
        title: 'Services',
        text: 'Maintenance, nettoyage, logistique, services aux entreprises et services spécialisés.',
        tags: ['Maintenance', 'Nettoyage', 'Logistique'],
        image: {src: '/images/sector-services.webp', alt: 'Réparateur souriant tenant une roue de vélo dans son atelier'},
      },
    ],
    link: {label: 'Secteurs et critères', href: '/secteurs-et-criteres'},
  },
  process: {
    eyebrow: 'Processus d’investissement',
    title: 'Douze étapes, aucune improvisation',
    intro: 'Aucune décision d’investissement significative ne repose sur la seule intuition ou appréciation d’un individu.',
    stepLabel: 'Étape',
    prevLabel: 'Étapes précédentes',
    nextLabel: 'Étapes suivantes',
    phases: [
      {
        title: 'Repérer',
        steps: [
          {title: 'Identifier', text: 'Recherche proactive et réception de projets.'},
          {title: 'Présélectionner', text: 'Premier filtre selon les critères d’investissement.'},
          {title: 'Visiter', text: 'Vérification de terrain et compréhension de l’activité.'},
        ],
      },
      {
        title: 'Analyser',
        steps: [
          {title: 'Analyser', text: 'Analyse commerciale, financière, opérationnelle et entrepreneuriale.'},
          {title: 'Due diligence', text: 'Vérification des informations essentielles.'},
          {title: 'Structurer', text: 'Détermination du montant, de l’instrument et des conditions d’intervention.'},
        ],
      },
      {
        title: 'Investir',
        steps: [
          {title: 'Décider', text: 'Validation selon les règles de gouvernance et les seuils établis.'},
          {title: 'Investir', text: 'Déploiement du capital.'},
          {title: 'Accompagner', text: 'Mise en œuvre du plan de croissance.'},
        ],
      },
      {
        title: 'Faire fructifier',
        steps: [
          {title: 'Suivre', text: 'Reporting, indicateurs et contrôle.'},
          {
            title: 'Valoriser',
            text: 'Remboursement, dividendes, cession, plus-value ou autre mécanisme de retour selon l’investissement.',
          },
          {title: 'Réinvestir', text: 'Réallocation du capital récupéré vers de nouvelles opportunités.'},
        ],
      },
    ],
    link: {label: 'Découvrir le processus', href: '/processus'},
  },
  support: {
    eyebrow: 'Accompagnement',
    title: 'Le capital ne suffit pas',
    intro: 'Chaque investissement s’accompagne d’un appui concret, sur les sujets qui font grandir une entreprise.',
    items: [
      {title: 'Finance', text: 'Comptabilité, trésorerie et suivi des marges.'},
      {title: 'Commercial', text: 'Prix, clientèle et distribution.'},
      {title: 'Marketing', text: 'Marque, communication et présence digitale.'},
      {title: 'Opérations', text: 'Stocks, achats et qualité.'},
      {title: 'Ressources humaines', text: 'Recrutement, organisation et management.'},
    ],
  },
  pilot: {
    eyebrow: 'Notre engagement',
    title: 'Ce que change un investissement',
    paragraphs: [
      'Nous investissons dans des activités réelles, aux côtés d’entrepreneurs qui les dirigent au quotidien. Le capital sert à produire davantage, vendre davantage et employer davantage.',
    ],
    image: {src: '/images/home-kinshasa.webp', alt: 'Boulevard de Kinshasa avec taxis jaunes et motos'},
    overlay: 'RDC.',
    points: [
      {
        label: 'Ce que nous finançons',
        title: 'Équipements et stock',
        text: 'Machines, matériel, matières premières et fonds de roulement.',
      },
      {
        label: 'Ce que nous apportons',
        title: 'Accompagnement',
        text: 'Des compétences, des outils et un réseau, aux côtés de l’entrepreneur.',
      },
      {
        label: 'Ce que nous visons',
        title: 'Des entreprises solides',
        text: 'Plus structurées, plus autonomes, créatrices d’emplois et de revenus.',
      },
    ],
    closing: 'Nous investissons dans ceux qui créent déjà.',
  },
  faq: {
    eyebrow: 'Questions fréquentes',
    title: 'Vous vous posez des questions ?',
    items: [
      {
        question: 'Qui peut soumettre un projet à LOKAMBE ?',
        answer:
          'Les entrepreneurs qui développent une activité réelle en RDC : PME, microentreprises ou activités génératrices de revenus, avec une clientèle identifiable et un besoin précis.',
      },
      {
        question: 'Mon activité n’est pas formalisée. Puis-je candidater ?',
        answer:
          'Oui. Une activité informelle qui présente un potentiel économique peut être accompagnée dans sa structuration et sa formalisation.',
      },
      {
        question: 'Quels secteurs sont prioritaires ?',
        answer:
          'La restauration, les métiers de bouche et la transformation alimentaire, le commerce et la distribution, l’événementiel et les services.',
      },
      {
        question: 'LOKAMBE fait-il des dons ou des subventions ?',
        answer:
          'Non. Nous ne donnons pas, nous investissons : le capital est engagé aux côtés de l’entrepreneur, et toujours associé à un accompagnement.',
      },
    ],
    contactText: 'Une autre question ? Notre équipe vous répond.',
    contact: {label: 'Nous contacter', href: '/contact'},
  },
  cta: {
    title: 'Vous portez une activité qui mérite de grandir ?',
    text: 'Présentez-nous votre projet : nous étudions chaque dossier avec rigueur, sur le terrain comme dans les chiffres.',
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Devenir partenaire', href: '/investisseurs-et-partenaires'},
    image: {src: '/images/cta-entrepreneur.webp', alt: 'Jeune femme entrepreneure en blazer orange'},
  },
};
