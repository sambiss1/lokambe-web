import type {GovernanceContent} from '../types';

export const governance: GovernanceContent = {
  meta: {
    title: 'Gouvernance',
    description:
      'Organisation, Comité d’investissement, séparation des fonctions, gestion des risques et réseau d’experts de LOKAMBE.',
  },
  hero: {
    eyebrow: 'Gouvernance, organisation et équipe',
    title: 'Agilité entrepreneuriale, rigueur d’investisseur',
    intro:
      'La gouvernance de LOKAMBE concilie l’agilité d’une structure entrepreneuriale avec la rigueur nécessaire à la protection du capital, à la maîtrise des risques, à la qualité des décisions d’investissement et à la bonne gestion du portefeuille.',
    image: {src: '/images/governance-hero.webp', alt: 'Deux jeunes hommes en réunion autour d’une table de travail'},
  },
  team: {
    eyebrow: 'L’équipe permanente',
    title: 'Quatre collaborateurs permanents',
    intro:
      'Pour sa phase de démarrage, LOKAMBE adopte une organisation légère reposant sur quatre collaborateurs permanents, complétée par un Comité d’investissement chargé des décisions d’investissement. Cette organisation établit une distinction claire entre les fonctions de direction, d’analyse et de préparation des investissements, de décision et de gestion du portefeuille.',
    members: [
      {
        title: 'Fondateur & Président Directeur général',
        summary:
          'Assure la direction générale et le pilotage stratégique de LOKAMBE. Il définit la vision, les orientations stratégiques et les priorités de développement, supervise les activités, développe les relations avec les investisseurs et partenaires, et représente LOKAMBE.',
        responsibilitiesTitle: 'Principales responsabilités',
        responsibilities: [
          'Définir la vision et la stratégie de LOKAMBE',
          'Assurer la direction générale',
          'Superviser l’ensemble des activités',
          'Développer les relations avec les investisseurs',
          'Développer les partenariats stratégiques',
          'Représenter LOKAMBE auprès de ses parties prenantes',
          'Superviser la performance globale de la plateforme',
          'Présider le Comité d’investissement',
        ],
      },
      {
        title: 'Responsable des opérations & du développement',
        summary:
          'Assure la coordination du fonctionnement quotidien de LOKAMBE et contribue à son développement : organisation interne, gestion administrative et documentaire, respect des procédures, relations commerciales et communication institutionnelle.',
        responsibilitiesTitle: 'Principales responsabilités',
        responsibilities: [
          'Coordination des opérations quotidiennes',
          'Administration générale',
          'Organisation interne',
          'Gestion documentaire',
          'Suivi des procédures',
          'Coordination logistique',
          'Relations commerciales',
          'Communication institutionnelle',
          'Identification de nouvelles opportunités de développement',
          'Appui administratif aux opérations d’investissement et au suivi du portefeuille',
        ],
      },
      {
        title: 'Responsable des investissements & de la finance',
        summary:
          'Pilote la fonction d’investissement : identification, analyse, sélection et structuration des opportunités. Il réalise ou coordonne les diligences, évalue les risques, construit les modèles financiers et prépare les dossiers soumis au Comité d’investissement.',
        responsibilitiesTitle: 'Principales responsabilités',
        responsibilities: [
          'Identification et présélection des opportunités',
          'Analyse financière et opérationnelle',
          'Due diligence',
          'Analyse des risques',
          'Modélisation financière',
          'Structuration des investissements',
          'Préparation des dossiers d’investissement',
          'Formulation des recommandations au Comité d’investissement',
          'Suivi financier des investissements',
          'Reporting financier',
        ],
        note: 'Il prépare et présente les dossiers, mais ne dispose pas seul du pouvoir de décision sur les investissements soumis au Comité.',
      },
      {
        title: 'Responsable du portefeuille & de l’accompagnement',
        summary:
          'Assure le suivi des entreprises et activités financées. Principal relais opérationnel entre LOKAMBE et les entrepreneurs, il suit la performance, l’utilisation des fonds, les risques et la mise en œuvre des plans d’accompagnement.',
        responsibilitiesTitle: 'Principales responsabilités',
        responsibilities: [
          'Prospection et collecte d’informations',
          'Visites et contrôles de terrain',
          'Suivi des entreprises et activités financées',
          'Suivi des performances financières et opérationnelles',
          'Suivi de l’utilisation des fonds',
          'Identification et remontée des risques',
          'Accompagnement opérationnel des bénéficiaires',
          'Suivi des plans d’action',
          'Collecte des indicateurs de performance',
          'Production des rapports de suivi du portefeuille',
        ],
      },
    ],
  },
  committee: {
    eyebrow: 'Le Comité d’investissement',
    title: 'Une instance collégiale de décision',
    paragraphs: [
      'Le Comité d’investissement est une instance distincte de l’équipe permanente. Il constitue l’organe collégial chargé de prendre les décisions d’investissement conformément à la thèse d’investissement, aux critères d’éligibilité, aux seuils financiers et aux règles de gestion des risques de LOKAMBE.',
      'Pour préserver son efficacité tout en garantissant une pluralité de points de vue, le Comité est composé de cinq membres.',
    ],
    membersTitle: 'Composition',
    members: [
      'Le Fondateur & Président Directeur général, Président du Comité',
      'Le Responsable des investissements & de la finance, membre et rapporteur technique',
      'Un membre indépendant ou conseiller financier, apportant une expertise en investissement, finance ou gestion des risques',
      'Un membre disposant d’une expertise juridique, réglementaire ou en gouvernance',
      'Un membre disposant d’une expertise entrepreneuriale, sectorielle ou opérationnelle, en fonction des secteurs d’intervention de LOKAMBE',
    ],
    note: 'Le Responsable du portefeuille & de l’accompagnement et le Responsable des opérations & du développement peuvent être invités aux réunions du Comité lorsque leurs informations ou expertises sont nécessaires, sans disposer automatiquement d’un droit de vote.',
    powers: {
      title: 'Le Comité peut',
      items: [
        'Approuver une opération',
        'Demander des informations ou diligences complémentaires',
        'Modifier ou conditionner les modalités proposées',
        'Reporter une décision',
        'Rejeter une opération',
      ],
    },
    criteria: {
      title: 'Ses décisions reposent sur une analyse documentée portant notamment sur',
      items: [
        'L’éligibilité du projet ou de l’entreprise',
        'La qualité de l’équipe dirigeante',
        'Le modèle économique',
        'La viabilité financière',
        'Le potentiel de création de valeur',
        'Les besoins en financement',
        'Les risques identifiés',
        'Les garanties ou mécanismes de protection du capital',
        'Les perspectives de croissance',
        'La cohérence avec la thèse d’investissement de LOKAMBE',
      ],
    },
    closing:
      'Le Comité veille également au respect des limites d’exposition, des seuils financiers et des règles de gestion des risques définis par LOKAMBE.',
  },
  separation: {
    eyebrow: 'Séparation des fonctions',
    title: 'Personne ne contrôle seul le processus',
    intro: 'LOKAMBE adopte une séparation fonctionnelle entre les principales étapes du cycle d’investissement.',
    stageLabel: 'Étape',
    ownerLabel: 'Responsable',
    rows: [
      {stage: 'Identification de l’opportunité', owner: 'Responsable des opérations et du développement'},
      {stage: 'Analyse & due diligence', owner: 'Responsable des investissements & de la finance'},
      {stage: 'Préparation & structuration', owner: 'Responsable des investissements & de la finance'},
      {stage: 'Décision', owner: 'Comité d’investissement'},
      {stage: 'Exécution', owner: 'Direction générale avec les fonctions concernées'},
      {stage: 'Suivi & accompagnement', owner: 'Responsable du portefeuille & de l’accompagnement'},
      {
        stage: 'Reporting',
        owner: 'Responsable des investissements & de la finance et Responsable du portefeuille & de l’accompagnement',
      },
    ],
    closing: 'Cette séparation vise à éviter qu’une même personne ne contrôle seule l’ensemble du processus d’investissement.',
  },
  principles: {
    eyebrow: 'Principe fondamental',
    title: 'Aucune décision sur la seule intuition',
    paragraphs: [
      'Aucune décision d’investissement significative ne devra reposer sur la seule intuition ou appréciation d’un individu. Toute décision devra être fondée sur une analyse documentée, des critères prédéfinis, une évaluation des risques et une validation collégiale, selon les seuils établis par LOKAMBE.',
    ],
    values: ['Responsabilité', 'Transparence', 'Collégialité', 'Protection du capital'],
  },
  evolution: {
    eyebrow: 'Organisation',
    title: 'Une structure légère appelée à grandir',
    paragraphs: [
      'Cette organisation initiale privilégie une structure légère, polyvalente et responsabilisante, permettant à chaque collaborateur d’assumer plusieurs fonctions au démarrage tout en maintenant une séparation claire des responsabilités.',
      'À mesure que le portefeuille, les ressources financières et les besoins opérationnels augmenteront, l’organisation pourra être progressivement renforcée et spécialisée dans les domaines du risque, du juridique, de la finance, du suivi du portefeuille, de l’accompagnement des entreprises et de l’administration — sans perdre sa rapidité d’exécution, sa proximité avec les entrepreneurs et sa capacité à saisir les opportunités.',
    ],
  },
  risks: {
    eyebrow: 'Gestion des risques',
    title: 'Le risque maîtrisé à chaque étape',
    intro: 'LOKAMBE intègre la gestion des risques dans l’ensemble du cycle d’investissement.',
    risks: {
      title: 'Principaux risques considérés',
      items: [
        'Risque de marché',
        'Risque opérationnel',
        'Risque financier',
        'Risque de liquidité',
        'Risque de gouvernance',
        'Risque réglementaire',
        'Risque lié à l’entrepreneur',
        'Risque de concentration',
        'Risque de fraude',
      ],
    },
    controls: {
      title: 'Mécanismes de maîtrise',
      items: [
        'Due diligence',
        'Investissements progressifs',
        'Diversification',
        'Suivi régulier',
        'Reporting financier',
        'Contrôle interne',
        'Séparation des fonctions',
        'Contractualisation',
        'Indicateurs d’alerte',
        'Réserve de liquidité',
      ],
    },
  },
  experts: {
    eyebrow: 'Réseau d’experts',
    title: 'Une équipe resserrée, un réseau spécialisé',
    intro: 'LOKAMBE combine une équipe permanente resserrée et un réseau d’experts spécialisés.',
    items: [
      'Avocats',
      'Comptables',
      'Fiscalistes',
      'Auditeurs',
      'Consultants',
      'Experts sectoriels',
      'Experts techniques',
      'Spécialistes marketing',
      'Spécialistes des ressources humaines',
      'Experts en digitalisation',
    ],
    closing:
      'Cette organisation permet à LOKAMBE de conserver une structure maîtrisée tout en accédant à des compétences spécialisées lorsque cela est nécessaire.',
  },
  cta: {
    title: 'Vous êtes expert ou partenaire ?',
    text: 'Rejoignez le réseau LOKAMBE et mettez vos compétences au service des entreprises congolaises.',
    primary: {label: 'Nous rejoindre', href: '/carrieres'},
    secondary: {label: 'Nous contacter', href: '/contact'},
  },
};
