import type {InvestorsContent} from '../types';

export const investors: InvestorsContent = {
  meta: {
    title: 'Investisseurs et partenaires',
    description:
      'Investisseurs, partenaires et experts : contribuez à faire du capital privé congolais un moteur de création d’entreprises.',
  },
  hero: {
    eyebrow: 'Investisseurs & partenaires',
    title: 'Le capital congolais au service de l’économie congolaise',
    intro:
      'Notre ambition : faire du capital privé un véritable moteur de création d’entreprises et de transformation de l’économie congolaise.',
    image: {src: '/images/investors-hero.webp', alt: 'Vue de Kinshasa depuis le fleuve Congo', position: '50% 90%'},
  },
  why: {
    eyebrow: 'Pourquoi LOKAMBE',
    title: 'Un capital productif, accompagné et bien gouverné',
    items: [
      {
        title: 'Un capital productif',
        text: 'Chaque investissement doit permettre de produire davantage, vendre davantage, améliorer la productivité ou créer de nouveaux actifs.',
      },
      {
        title: 'Un capital accompagné',
        text: 'Finance, commercial, marketing, opérations, ressources humaines : chaque investissement significatif est associé à un plan d’accompagnement.',
      },
      {
        title: 'Des décisions collégiales',
        text: 'Analyse documentée, critères prédéfinis, évaluation des risques et validation par un Comité d’investissement incluant des membres indépendants.',
      },
      {
        title: 'Rentabilité et impact',
        text: 'Démontrer que la rentabilité financière et la création de valeur économique locale peuvent progresser ensemble.',
      },
    ],
  },
  capital: {
    eyebrow: 'Besoin initial en capital',
    title: 'Trois enveloppes',
    intro: 'Le capital initial de LOKAMBE est structuré autour de trois grandes enveloppes.',
    items: [
      {
        title: 'A. Capital d’investissement',
        intro: 'Destiné directement aux :',
        items: ['PME', 'Microentreprises', 'Activités génératrices de revenus', 'Entreprises créées par LOKAMBE'],
      },
      {
        title: 'B. Capital opérationnel',
        intro: 'Destiné notamment à :',
        items: [
          'L’équipe',
          'La gestion',
          'Les déplacements',
          'Les outils',
          'Les études',
          'Le juridique',
          'La comptabilité',
          'La communication',
          'Les due diligences',
        ],
      },
      {
        title: 'C. Réserve stratégique',
        intro: 'Destinée notamment :',
        items: [
          'Aux opportunités',
          'Au suivi des investissements',
          'Au refinancement des entreprises performantes',
          'Aux imprévus',
          'Aux besoins de liquidité',
        ],
      },
    ],
    principle: 'La majorité du capital mobilisé doit être orientée vers la création directe de valeur économique.',
  },
  network: {
    eyebrow: 'Nous rejoindre',
    title: 'Plusieurs façons de s’engager',
    items: [
      {title: 'Investisseurs', text: 'Participer au capital de LOKAMBE ou co-investir aux côtés du fonds.'},
      {title: 'Partenaires', text: 'Partenaires financiers et stratégiques, pour démultiplier l’impact et le déploiement territorial.'},
      {
        title: 'Experts',
        text: 'Avocats, comptables, fiscalistes, auditeurs, consultants, experts sectoriels, techniques, marketing, RH ou digitalisation.',
      },
    ],
  },
  form: {title: 'Prendre contact'},
};
