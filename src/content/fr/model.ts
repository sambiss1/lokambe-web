import type {ModelContent} from '../types';

export const model: ModelContent = {
  meta: {
    title: 'Notre modèle',
    description:
      'Investisseur, créateur et accompagnateur : les deux piliers d’intervention, les instruments et le modèle économique de LOKAMBE.',
  },
  hero: {
    eyebrow: 'Notre modèle',
    title: 'Investisseur. Créateur. Accompagnateur.',
    intro:
      'LOKAMBE ne se limite pas à financer des entreprises. Il contribue à les identifier, les faire naître, les structurer, les développer et les valoriser.',
    image: {src: '/images/model-hero.webp', alt: 'Boulangère congolaise présentant sa production'},
  },
  roles: {
    eyebrow: 'Le modèle LOKAMBE',
    title: 'Trois fonctions complémentaires',
    intro: 'LOKAMBE se positionne à l’intersection de trois fonctions complémentaires.',
    items: [
      {
        title: 'Investisseur',
        text: 'LOKAMBE mobilise et déploie du capital dans des entreprises présentant un potentiel de création de valeur et recherche un rendement adapté au niveau de risque.',
      },
      {
        title: 'Créateur',
        text: 'LOKAMBE identifie des opportunités de marché et peut créer directement des entreprises lorsque les conditions économiques le justifient.',
      },
      {
        title: 'Accompagnateur',
        text: 'LOKAMBE apporte aux entreprises de son portefeuille les ressources, compétences, réseaux et outils nécessaires à leur croissance.',
      },
    ],
    closing: 'Cette combinaison constitue l’identité du modèle.',
  },
  pillars: {
    eyebrow: 'Deux piliers d’intervention',
    title: 'Investir et créer',
    items: [
      {
        label: 'Pilier 1',
        title: 'Investir dans les entrepreneurs',
        text: 'LOKAMBE pourra investir dans des activités génératrices de revenus, des microentreprises, des petites entreprises, des PME et de jeunes entreprises à potentiel. Les interventions pourront répondre à différents besoins.',
        groups: [
          {
            title: 'Capital de croissance',
            intro: 'Pour financer notamment :',
            items: ['Matières premières', 'Stocks', 'Achats', 'Fonds de roulement', 'Développement commercial'],
          },
          {
            title: 'Équipements productifs',
            intro: 'Pour :',
            items: [
              'Augmenter la capacité de production',
              'Améliorer la productivité',
              'Réduire les coûts',
              'Améliorer la qualité',
              'Créer de nouveaux produits ou services',
            ],
          },
          {
            title: 'Expansion',
            intro: 'Pour :',
            items: [
              'Ouvrir un nouveau point de vente',
              'Pénétrer une nouvelle zone géographique',
              'Augmenter les capacités',
              'Développer une nouvelle activité',
              'Lancer un nouveau produit',
            ],
          },
        ],
      },
      {
        label: 'Pilier 2',
        title: 'Créer des entreprises',
        text: 'LOKAMBE pourra également créer directement des entreprises lorsqu’un besoin de marché clairement identifié présente un potentiel suffisant.',
        groups: [
          {
            title: 'Ce que nous pourrons créer',
            items: [
              'Concepts de restauration',
              'Unités de production',
              'Entreprises de services',
              'Plateformes de distribution',
              'Entreprises de location d’équipements',
              'Réseaux de commerce de proximité',
              'Autres modèles reproductibles',
            ],
          },
        ],
        closing: 'L’objectif est de transformer une opportunité en entreprise, puis une entreprise en modèle duplicable.',
      },
    ],
  },
  instruments: {
    eyebrow: 'Instruments d’investissement',
    title: 'Des instruments adaptés à chaque projet',
    intro: 'Selon la nature du projet et le cadre juridique applicable, LOKAMBE pourra utiliser différents instruments.',
    items: [
      {title: 'Financement remboursable', text: 'Adapté aux activités générant des flux de trésorerie réguliers.'},
      {title: 'Prise de participation', text: 'Adaptée aux entreprises présentant un potentiel de croissance et de valorisation important.'},
      {title: 'Co-investissement', text: 'Association avec d’autres investisseurs ou partenaires financiers.'},
      {title: 'Création directe', text: 'LOKAMBE crée, finance et détient une entreprise.'},
      {
        title: 'Partenariat entrepreneurial',
        text: 'Association avec un entrepreneur apportant son expertise, son réseau ou sa capacité opérationnelle.',
      },
    ],
    criteria: {
      title: 'Le choix de l’instrument dépendra notamment',
      items: [
        'Du niveau de risque',
        'Du besoin de financement',
        'De la maturité de l’entreprise',
        'Du potentiel de croissance',
        'De la capacité de remboursement',
        'Du rendement attendu',
        'De la structure juridique',
      ],
    },
  },
  portfolio: {
    eyebrow: 'Politique de portefeuille',
    title: 'Un portefeuille équilibré',
    paragraphs: [
      'LOKAMBE cherchera à construire un portefeuille équilibré plutôt qu’à multiplier les investissements.',
      'Au démarrage, LOKAMBE privilégiera un nombre limité d’entreprises afin de garantir un niveau élevé de suivi et d’accompagnement. Une réserve de capital sera également maintenue pour répondre aux opportunités, accompagner les entreprises performantes, financer certains besoins de suivi et faire face aux imprévus.',
    ],
    dimensions: {
      title: 'La diversification pourra être organisée selon',
      items: [
        'Les secteurs',
        'La taille des entreprises',
        'Leur niveau de maturité',
        'Les modèles économiques',
        'Les zones géographiques',
        'Les instruments financiers',
        'Les niveaux de risque',
      ],
    },
  },
  economics: {
    eyebrow: 'Modèle économique',
    title: 'La création de valeur comme moteur',
    intro:
      'Le modèle économique de LOKAMBE reposera principalement sur la création de valeur au niveau des entreprises et investissements de son portefeuille. Les revenus pourront notamment provenir :',
    items: [
      {title: 'Des financements', items: ['Intérêts', 'Rendements contractuels', 'Autres revenus liés aux instruments de financement']},
      {title: 'Des participations', items: ['Dividendes', 'Plus-values', 'Distributions']},
      {title: 'Des entreprises détenues', items: ['Bénéfices', 'Dividendes', 'Valorisation des actifs']},
      {title: 'Des cessions', items: ['Vente totale ou partielle de participations', 'Réalisation de plus-values']},
    ],
    cycleTitle: 'Le cycle économique',
    cycle: ['Capital', 'Entreprise / Actif', 'Croissance', 'Cash-flow', 'Rendement', 'Réinvestissement'],
  },
  cta: {
    title: 'Votre activité correspond à notre modèle ?',
    text: 'Découvrez nos critères d’investissement puis présentez-nous votre projet.',
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Secteurs et critères', href: '/secteurs-et-criteres'},
  },
};
