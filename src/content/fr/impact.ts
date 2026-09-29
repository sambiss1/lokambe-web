import type {ImpactContent} from '../types';

export const impact: ImpactContent = {
  meta: {
    title: 'Impact et vision',
    description:
      'La mesure de la performance, l’impact économique et social et la vision de LOKAMBE à 5–10 ans.',
  },
  hero: {
    eyebrow: 'Impact et vision',
    title: 'L’impact fait partie du résultat',
    intro:
      'Ce qu’une entreprise change autour d’elle — des emplois, des revenus, des fournisseurs qui tournent — compte autant que ce qu’elle rapporte. Nous suivons les deux, avec la même rigueur.',
    image: {src: '/images/impact-boutique.webp', alt: 'Jeune commerçante souriante derrière le comptoir de sa boutique'},
  },
  performance: {
    eyebrow: 'Mesure de la performance',
    title: 'Ce que nous suivons',
    intro: 'LOKAMBE suit simultanément la performance financière, opérationnelle et entrepreneuriale de son portefeuille.',
    groups: [
      {
        title: 'Performance financière',
        items: [
          'Capital investi',
          'Chiffre d’affaires des participations',
          'Rentabilité',
          'Croissance des entreprises financées',
        ],
      },
      {
        title: 'Performance opérationnelle',
        items: [
          'Entreprises financées',
          'Entreprises créées',
          'Entreprises accompagnées',
          'Nouveaux points de vente',
          'Augmentation de capacité',
          'Nouveaux marchés',
          'Croissance du chiffre d’affaires',
        ],
      },
    ],
  },
  impact: {
    eyebrow: 'Impact économique et social',
    title: 'Un impact mesuré',
    groups: [
      {title: 'Emploi', items: ['Emplois créés', 'Emplois consolidés', 'Évolution des effectifs']},
      {
        title: 'Entrepreneuriat',
        items: ['Entrepreneurs financés', 'Entrepreneurs accompagnés', 'Nouvelles entreprises créées'],
      },
      {
        title: 'Économie locale',
        items: ['Fournisseurs mobilisés', 'Production locale', 'Chiffre d’affaires généré', 'Nouveaux circuits de distribution'],
      },
      {
        title: 'Formalisation',
        items: [
          'Entreprises structurées',
          'Entreprises formalisées',
          'Amélioration de la gouvernance',
          'Amélioration de la gestion financière',
        ],
      },
    ],
    closing:
      'L’objectif est de démontrer que la rentabilité financière et la création de valeur économique locale peuvent progresser ensemble.',
  },
  vision: {
    eyebrow: 'Vision à 5–10 ans',
    title: 'Une plateforme congolaise de référence',
    items: [
      {
        title: 'À 5 ans',
        text: 'Un portefeuille diversifié d’entreprises, plusieurs entreprises créées ou détenues, une équipe renforcée, un réseau d’experts et des partenaires financiers et stratégiques.',
      },
      {
        title: 'À 10 ans',
        text: 'Faire de LOKAMBE une plateforme privée congolaise reconnue d’investissement et de création d’entreprises, capable de mobiliser des capitaux importants et de financer durablement l’économie réelle.',
      },
    ],
    ecosystemTitle: 'Un véritable écosystème',
    ecosystem: ['Investisseurs', 'LOKAMBE', 'Entrepreneurs', 'Entreprises', 'Emplois', 'Revenus', 'Rendements', 'Réinvestissement'],
    closing: 'L’objectif ultime est de créer un cycle de capitalisation privée congolaise capable de se renforcer dans le temps.',
  },
  formalisation: {
    eyebrow: 'Formalisation',
    title: 'Accompagner l’économie congolaise de l’informel vers le formel',
    intro:
      'Une grande partie de l’activité économique congolaise reste informelle. Investir, c’est aussi aider une activité à se structurer, et rendre sa croissance mesurable.',
    items: [
      {
        title: 'Structurer avant de financer',
        text: 'Comptabilité, caisse, stocks et procédures : nous aidons l’entrepreneur à mettre de l’ordre dans son activité, condition d’un capital bien utilisé.',
      },
      {
        title: 'Accompagner la formalisation',
        text: 'RCCM, identification fiscale, contrats et statuts : la formalisation devient une étape du plan de croissance, pas un obstacle à l’entrée.',
      },
      {
        title: 'Contribuer à la croissance de l’activité',
        text: 'Une entreprise structurée accède plus facilement au crédit, aux fournisseurs, aux marchés publics et privés, et peut recruter durablement.',
      },
    ],
  },
  cta: {
    title: 'Participez au cycle LOKAMBE',
    text: 'Investisseurs et partenaires : contribuez à construire le tissu économique congolais de demain.',
    primary: {label: 'Nous contacter', href: '/contact'},
    secondary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
  },
};
