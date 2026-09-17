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
    image: {src: '/images/home-hero.webp', alt: 'Commerçant souriant derrière le comptoir de son épicerie'},
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Nous découvrir', href: '/a-propos'},
    cards: {
      step: {label: 'Sur le terrain', title: 'Visiter', text: 'Nous venons voir et comprendre l’activité avant d’investir.'},
      sector: {label: 'Secteur prioritaire', title: 'Commerce et distribution'},
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
    link: {label: 'Secteurs et critères', href: '/secteurs-et-criteres'},
  },
  portfolio: {
    eyebrow: 'Portefeuille',
    title: 'Les entreprises que nous accompagnons',
    intro:
      'Chaque entreprise financée ou créée par LOKAMBE rejoint ce portefeuille. Cliquez sur une entreprise pour voir son secteur et l’avancement du projet.',
    items: [
      {id: 'entreprise-1', name: 'Entreprise 1'},
      {id: 'entreprise-2', name: 'Entreprise 2'},
      {id: 'entreprise-3', name: 'Entreprise 3'},
      {id: 'entreprise-4', name: 'Entreprise 4'},
      {id: 'entreprise-5', name: 'Entreprise 5'},
      {id: 'entreprise-6', name: 'Entreprise 6'},
    ],
    detail: {sectorLabel: 'Secteur', statusLabel: 'Statut du projet', pending: 'À renseigner', close: 'Fermer'},
    empty: 'Les premières entreprises du portefeuille seront présentées ici.',
  },
  partners: {
    eyebrow: 'Partenaires',
    title: 'Ceux qui avancent avec nous',
    intro: 'Partenaires financiers, techniques et institutionnels. Cliquez sur un partenaire pour voir son rôle.',
    items: [
      {id: 'partenaire-1', name: 'Partenaire 1'},
      {id: 'partenaire-2', name: 'Partenaire 2'},
      {id: 'partenaire-3', name: 'Partenaire 3'},
      {id: 'partenaire-4', name: 'Partenaire 4'},
      {id: 'partenaire-5', name: 'Partenaire 5'},
    ],
    detail: {sectorLabel: 'Type de partenariat', statusLabel: 'Depuis', pending: 'À renseigner', close: 'Fermer'},
    empty: 'Les partenaires de LOKAMBE seront présentés ici.',
  },
  formalisation: {
    eyebrow: 'Formalisation',
    title: 'Faire entrer l’économie réelle dans le formel',
    intro:
      'Une grande partie de l’activité économique congolaise reste informelle. Investir, c’est aussi aider une activité à se structurer, et rendre sa croissance mesurable.',
    items: [
      {
        title: 'Structurer avant de financer',
        text: 'Comptabilité, caisse, stocks et procédures : nous aidons l’entrepreneur à mettre de l’ordre dans son activité, condition d’un capital bien utilisé.',
      },
      {
        title: 'Accompagner l’enregistrement',
        text: 'RCCM, identification fiscale, contrats et statuts : la formalisation devient une étape du plan de croissance, pas un obstacle à l’entrée.',
      },
      {
        title: 'Rendre l’activité finançable',
        text: 'Une entreprise structurée accède plus facilement au crédit, aux fournisseurs, aux marchés publics et privés, et peut recruter durablement.',
      },
    ],
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
    secondary: {label: 'Nous découvrir', href: '/a-propos'},
    image: {src: '/images/cta-entrepreneur.webp', alt: 'Jeune femme entrepreneure en blazer orange'},
  },
};
