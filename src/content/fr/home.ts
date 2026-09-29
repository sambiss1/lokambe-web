import type {HomeContent} from '../types';

export const home: HomeContent = {
  meta: {
    title: 'Fonds privé congolais d’investissement',
    description:
      'LOKAMBE investit dans les PME, microentreprises et activités génératrices de revenus en RDC, crée des entreprises et les accompagne pour les faire grandir.',
  },
  hero: {
    eyebrow: 'Le capital privé au service de l’entrepreneuriat congolais',
    titleLines: ['Musapi moko', 'esokolaka', 'elongi te.'],
    tagline: 'Investir. Créer. Accompagner. Faire grandir. Réinvestir.',
    intro:
      'Fonds privé congolais d’investissement, de création et d’accompagnement des petites et moyennes entreprises, microentreprises et activités génératrices de revenus.',
    image: {src: '/images/home-hero.webp', alt: 'Commerçant debout dans sa boutique de quartier, entouré de ses marchandises'},
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Nous découvrir', href: '/a-propos'},
    cards: {
      step: {label: 'Sur le terrain', title: 'Visiter', text: 'Nous venons voir et comprendre l’activité avant d’investir.'},
      sector: {label: 'Secteur prioritaire', title: 'Commerce et distribution'},
      place: {label: 'Au-delà du capital', title: 'Accompagnement'},
      pillars: {label: 'Ce qui nous distingue', title: 'Investir · Créer · Accompagner'},
    },
  },
  statement: {
    quote: 'Nous ne donnons pas. Nous investissons.',
    text: 'Le capital est un levier de création de valeur. Il doit permettre à une activité de se structurer, de produire davantage, de générer des revenus, de créer des emplois, d’accumuler du capital et, à terme, de contribuer elle-même au financement de nouvelles opportunités économiques.',
  },
  facts: {
    eyebrow: 'LOKAMBE en bref',
    title: 'Un fonds pensé pour durer',
    items: [
      {value: 7, label: 'secteurs prioritaires', text: 'De la restauration aux médias, en passant par le commerce, les services et la formation.'},
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
      {
        title: 'Médias et divertissement',
        text: 'Production audiovisuelle, médias numériques, création de contenu, production musicale, studios et équipements, agences créatives et formats culturels reproductibles.',
        tags: ['Audiovisuel', 'Musique', 'Création de contenu'],
        image: {src: '/images/sector-medias.webp', alt: 'Cadreur derrière sa caméra et ses moniteurs dans un studio de production'},
      },
      {
        title: 'Éducation et formation',
        text: 'Centres de formation professionnelle, formation technique et métiers, formation entrepreneuriale et gestion, édition pédagogique, équipements pour établissements scolaires.',
        tags: ['Formation', 'Métiers', 'Édition pédagogique'],
        image: {src: '/images/sector-education.webp', alt: 'Formateur expliquant à ses apprenants dans un atelier de menuiserie'},
      },
    ],
    link: {label: 'Voir les secteurs', href: '/secteurs-et-criteres'},
  },
  portfolio: {
    eyebrow: 'Portefeuille',
    title: 'Elles grandissent avec nous.',
    intro:
      'Sept entreprises financées ou créées par LOKAMBE. Cliquez sur l’une d’elles pour découvrir son activité, son secteur et l’avancement du projet.',
    items: [
      {
        id: 'bradamada',
        name: 'Bradamada',
        logo: '/images/portfolio/bradamada.webp',
        sector: 'Restauration',
        status: 'En développement',
        text: 'Un concept de restauration rapide expérientielle qui transforme l’univers, la personnalité et l’identité de figures publiques en expériences culinaires uniques, immersives et mémorables.',
      },
      {
        id: 'sitini',
        name: 'Sitini',
        logo: '/images/portfolio/sitini.webp',
        sector: 'Restauration',
        status: 'En pause',
        text: 'Une chaîne de malewa modernes proposant une cuisine congolaise authentique, généreuse, accessible et populaire, dans un cadre convivial et contemporain.',
      },
      {
        id: 'jaiant',
        name: 'JAIANT',
        logo: '/images/portfolio/jaiant.webp',
        sector: 'Métiers de bouche',
        status: 'En développement',
        text: 'Marque spécialisée dans les glaces, popsicles et créations glacées, proposant une offre gourmande, créative et accessible. Elle revisite les plaisirs glacés à travers des recettes originales, des saveurs inspirées du terroir congolais et des associations innovantes, dans un univers jeune, fun et populaire.',
      },
      {
        id: 'lecap',
        name: 'LECAP',
        logo: '/images/portfolio/lecap.webp',
        sector: 'Médias et divertissement',
        status: 'En développement',
        text: 'Média dédié à la politique, à la gouvernance et aux affaires publiques, pour décrypter les mécanismes du pouvoir et mieux comprendre les enjeux de la vie publique.',
      },
      {
        id: 'mololo',
        name: 'Mololo',
        logo: '/images/portfolio/mololo.webp',
        sector: 'Médias et divertissement',
        status: 'En cours',
        text: 'Média dédié à la culture, aux arts, aux créateurs et aux industries culturelles et créatives congolaises, mettant en lumière les talents, les tendances et les initiatives qui façonnent la scène culturelle et créative.',
      },
      {
        id: 'congolicious',
        name: 'Congolicious',
        logo: '/images/portfolio/congolicious.webp',
        sector: 'Médias et divertissement',
        status: 'En cours',
        text: 'Plateforme dédiée au tourisme, au lifestyle, à la gastronomie et à la découverte de la République démocratique du Congo, valorisant ses destinations, son patrimoine, sa culture et son art de vivre.',
      },
      {
        id: 'grand-mololo',
        name: 'Grand Mololo',
        logo: '/images/portfolio/grand-mololo.webp',
        sector: 'Médias et divertissement',
        status: 'En cours',
        text: 'Maison créative pluridisciplinaire spécialisée dans la production audiovisuelle, l’événementiel, le marketing, la communication et le conseil stratégique. Elle accompagne marques, institutions, entreprises et talents dans la conception et la réalisation de projets à fort impact.',
      },
    ],
    detail: {sectorLabel: 'Secteur', statusLabel: 'Statut du projet', pending: 'À renseigner', close: 'Fermer'},
    empty: 'Les premières entreprises du portefeuille seront présentées ici.',
  },
  partners: {
    eyebrow: 'Partenaires',
    title: 'Ceux qui avancent avec nous',
    intro: 'Partenaires financiers, techniques et institutionnels. Cliquez sur un partenaire pour voir son rôle.',
    // Aucun partenaire n'a encore été communiqué : la section reste masquée
    // tant que cette liste est vide, plutôt que d'afficher des noms inventés.
    items: [],
    detail: {sectorLabel: 'Type de partenariat', statusLabel: 'Depuis', pending: 'À renseigner', close: 'Fermer'},
    empty: 'Les partenaires de LOKAMBE seront présentés ici.',
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
};
