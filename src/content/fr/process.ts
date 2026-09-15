import type {ProcessContent} from '../types';

export const investmentProcess: ProcessContent = {
  meta: {
    title: 'Processus d’investissement',
    description:
      'De l’identification au réinvestissement : le processus d’investissement, de création d’entreprises et d’accompagnement de LOKAMBE.',
  },
  hero: {
    eyebrow: 'Processus',
    title: 'De l’identification au réinvestissement',
    intro: 'Le processus d’investissement de LOKAMBE suit une démarche structurée, documentée et collégiale.',
    image: {src: '/images/process-hero.webp', alt: 'Échange de travail entre un entrepreneur et un analyste'},
  },
  investment: {
    eyebrow: 'Processus d’investissement',
    title: 'Douze étapes structurées',
    steps: [
      {title: 'Identifier', text: 'Recherche proactive et réception de projets.'},
      {title: 'Présélectionner', text: 'Premier filtre selon les critères d’investissement.'},
      {title: 'Visiter', text: 'Vérification de terrain et compréhension de l’activité.'},
      {title: 'Analyser', text: 'Analyse commerciale, financière, opérationnelle et entrepreneuriale.'},
      {title: 'Due diligence', text: 'Vérification des informations essentielles.'},
      {title: 'Structurer', text: 'Détermination du montant, de l’instrument et des conditions d’intervention.'},
      {title: 'Décider', text: 'Validation selon les règles de gouvernance et les seuils établis.'},
      {title: 'Investir', text: 'Déploiement du capital.'},
      {title: 'Accompagner', text: 'Mise en œuvre du plan de croissance.'},
      {title: 'Suivre', text: 'Reporting, indicateurs et contrôle.'},
      {
        title: 'Valoriser',
        text: 'Remboursement, dividendes, cession, plus-value ou autre mécanisme de retour selon la nature de l’investissement.',
      },
      {title: 'Réinvestir', text: 'Réallocation du capital récupéré vers de nouvelles opportunités.'},
    ],
  },
  creation: {
    eyebrow: 'Création d’entreprises',
    title: 'Créer ce qui mérite d’être développé',
    paragraphs: [
      'LOKAMBE pourra identifier des opportunités indépendamment de l’existence d’un entrepreneur candidat. Lorsqu’un besoin de marché est important mais que l’offre existante est insuffisante, trop coûteuse, fragmentée ou mal structurée, LOKAMBE pourra décider de construire directement une réponse entrepreneuriale.',
      'Cette approche permet à LOKAMBE de devenir un créateur actif d’entreprises, et non uniquement un financeur.',
    ],
    stepsTitle: 'Le processus de création',
    steps: [
      'Identifier le besoin',
      'Étudier le marché',
      'Construire le modèle économique',
      'Tester',
      'Investir',
      'Créer',
      'Recruter',
      'Développer',
      'Dupliquer',
    ],
  },
  support: {
    eyebrow: 'Accompagnement post-investissement',
    title: 'Un plan d’accompagnement pour chaque investissement',
    intro: 'Chaque investissement significatif devra être associé à un plan d’accompagnement adapté.',
    items: [
      {title: 'Finance', items: ['Comptabilité', 'Trésorerie', 'Budget', 'Reporting', 'Contrôle des coûts', 'Suivi des marges']},
      {title: 'Commercial', items: ['Stratégie de prix', 'Développement de clientèle', 'Distribution', 'Partenariats']},
      {title: 'Marketing', items: ['Identité de marque', 'Communication', 'Présence digitale', 'Réseaux sociaux']},
      {title: 'Opérations', items: ['Gestion des stocks', 'Achats', 'Procédures', 'Qualité', 'Productivité']},
      {
        title: 'Ressources humaines',
        items: ['Recrutement', 'Organisation', 'Fiches de poste', 'Management', 'Culture d’entreprise'],
      },
    ],
    closing: 'L’objectif est de rendre progressivement l’entreprise plus autonome, plus structurée et plus performante.',
  },
  cta: {
    title: 'Prêt à engager la première étape ?',
    text: 'Chaque dossier commence par une identification. Présentez-nous votre activité.',
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Notre gouvernance', href: '/gouvernance'},
  },
};
