import type {ImpactContent} from '../types';

export const impact: ImpactContent = {
  meta: {
    title: 'Impact et vision',
    description:
      'La mesure de la performance, l’impact économique et social et la vision de LOKAMBE à 5–10 ans.',
  },
  hero: {
    eyebrow: 'Impact et vision',
    title: 'Rentabilité et création de valeur locale, ensemble',
    intro: 'LOKAMBE considère l’impact comme une composante de la création de valeur, et le mesure au même titre que la performance financière.',
    image: {src: '/images/impact-hero.webp', alt: 'Deux employés souriants au comptoir d’un restaurant de rue'},
  },
  performance: {
    eyebrow: 'Mesure de la performance',
    title: 'Ce que nous suivons',
    intro: 'LOKAMBE suit simultanément la performance financière, opérationnelle et entrepreneuriale de son portefeuille.',
    groups: [
      {
        title: 'Performance financière',
        items: [
          'Capital engagé',
          'Capital déployé',
          'Capital récupéré',
          'Rendement',
          'Taux de remboursement',
          'Taux de défaut',
          'Valeur du portefeuille',
          'Chiffre d’affaires des participations',
          'Rentabilité',
          'Cash-flow',
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
      {title: 'Impact territorial', items: ['Quartiers couverts', 'Communes', 'Villes', 'Provinces']},
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
        text: 'Un portefeuille diversifié d’entreprises, plusieurs entreprises créées ou détenues, un historique de performance, une équipe renforcée, un réseau d’experts, des partenaires financiers et stratégiques, et une présence dans plusieurs pôles économiques.',
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
  cta: {
    title: 'Participez au cycle LOKAMBE',
    text: 'Investisseurs et partenaires : contribuez à construire le tissu économique congolais de demain.',
    primary: {label: 'Nous contacter', href: '/contact'},
    secondary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
  },
};
