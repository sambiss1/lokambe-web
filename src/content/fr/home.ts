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
      place: {label: 'Phase pilote', title: 'Kinshasa'},
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
      {value: 12, label: 'étapes d’investissement', text: 'De l’identification au réinvestissement, chaque décision est documentée.'},
      {value: 5, label: 'domaines d’accompagnement', text: 'Finance, commercial, marketing, opérations et ressources humaines.'},
      {value: 3, label: 'phases de déploiement', text: 'Kinshasa d’abord, puis d’autres pôles économiques, puis un réseau national.'},
    ],
    note: 'LOKAMBE est en phase pilote : nous publierons nos résultats lorsqu’ils seront mesurés.',
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
      'La phase pilote est volontairement concentrée sur un nombre limité de secteurs afin de développer une véritable expertise sectorielle.',
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
    intro: 'Chaque investissement significatif est associé à un plan d’accompagnement adapté.',
    items: [
      {title: 'Finance', items: ['Comptabilité', 'Trésorerie', 'Budget', 'Reporting', 'Contrôle des coûts', 'Suivi des marges']},
      {title: 'Commercial', items: ['Stratégie de prix', 'Développement de clientèle', 'Distribution', 'Partenariats']},
      {title: 'Marketing', items: ['Identité de marque', 'Communication', 'Présence digitale', 'Réseaux sociaux']},
      {title: 'Opérations', items: ['Gestion des stocks', 'Achats', 'Procédures', 'Qualité', 'Productivité']},
      {title: 'Ressources humaines', items: ['Recrutement', 'Organisation', 'Fiches de poste', 'Management', 'Culture d’entreprise']},
    ],
    closing: 'L’objectif : une entreprise plus autonome, plus structurée et plus performante.',
  },
  pilot: {
    eyebrow: 'Phase pilote',
    title: 'Kinshasa, laboratoire du modèle',
    paragraphs: [
      'LOKAMBE commence par Kinshasa, à travers une phase pilote destinée à tester le modèle, constituer un premier portefeuille, créer les premières entreprises, mesurer les performances et documenter les méthodes nécessaires à une expansion progressive vers d’autres pôles économiques de la RDC.',
    ],
    image: {src: '/images/home-kinshasa.webp', alt: 'Boulevard de Kinshasa avec taxis jaunes et motos'},
    phases: [
      {label: 'Phase 1', title: 'Kinshasa', text: 'Construire l’équipe, tester les procédures, constituer le premier portefeuille.'},
      {label: 'Phase 2', title: 'Extension', text: 'Déploiement progressif dans d’autres pôles économiques.'},
      {label: 'Phase 3', title: 'Réseau national', text: 'Un réseau d’entrepreneurs, d’entreprises et de partenaires dans plusieurs provinces.'},
    ],
    motto: 'Commencer concentré pour apprendre. Grandir progressivement pour durer.',
  },
  faq: {
    eyebrow: 'Questions fréquentes',
    title: 'Vous vous posez des questions ?',
    items: [
      {
        question: 'Qui peut soumettre un projet à LOKAMBE ?',
        answer:
          'Les entrepreneurs qui développent une activité réelle en RDC : PME, microentreprises ou activités génératrices de revenus, avec des revenus existants ou démontrables, une clientèle identifiable et un besoin précis. Pendant la phase pilote, nous étudions en priorité les projets situés à Kinshasa.',
      },
      {
        question: 'Mon activité n’est pas formalisée. Puis-je candidater ?',
        answer:
          'Oui. Le niveau de formalisation n’est pas le seul critère d’entrée. Une activité informelle présentant un potentiel économique peut être accompagnée dans sa structuration et sa formalisation, avant ou pendant l’intervention de LOKAMBE.',
      },
      {
        question: 'Quels secteurs sont prioritaires ?',
        answer:
          'Pendant la phase pilote : la restauration, les métiers de bouche et la transformation alimentaire, le commerce et la distribution, l’événementiel et les services. Le champ d’intervention s’élargira à mesure que le portefeuille et l’équipe se développeront.',
      },
      {
        question: 'LOKAMBE fait-il des dons ou des subventions ?',
        answer:
          'Non. Nous ne donnons pas, nous investissons. Selon le projet, LOKAMBE peut proposer un financement remboursable, une prise de participation, un co-investissement ou un partenariat entrepreneurial, toujours associé à un accompagnement.',
      },
      {
        question: 'Quels documents dois-je préparer ?',
        answer:
          'Tout ce qui aide à comprendre votre activité : photos du local et des équipements, relevés de ventes ou cahier de caisse, devis des achats envisagés, et le RCCM si votre activité est formalisée. Le formulaire accepte jusqu’à 5 fichiers.',
      },
      {
        question: 'Comment ma candidature est-elle étudiée ?',
        answer:
          'Vous recevez une référence de dossier. Un premier filtre est réalisé selon nos critères, puis, si votre dossier est présélectionné, nous venons visiter votre activité. L’analyse complète est ensuite présentée au Comité d’investissement, qui décide de façon collégiale.',
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
