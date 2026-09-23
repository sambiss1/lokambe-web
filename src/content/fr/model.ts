import type {ModelContent} from '../types';

export const model: ModelContent = {
  meta: {
    title: 'Notre modèle',
    description:
      'Investisseur, créateur et accompagnateur : les deux piliers d’intervention de LOKAMBE.',
  },
  hero: {
    eyebrow: 'Notre modèle',
    title: 'Investisseur. Créateur. Accompagnateur.',
    intro:
      'LOKAMBE ne se limite pas à financer des entreprises. Il contribue à les identifier, les faire naître, les structurer, les développer et les valoriser.',
    image: {src: '/images/model-hero.webp', alt: 'Boulanger souriant derrière sa vitrine de pâtisseries'},
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
  cta: {
    title: 'Votre activité correspond à notre modèle ?',
    text: 'Découvrez nos secteurs prioritaires puis présentez-nous votre projet.',
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Secteurs', href: '/secteurs-et-criteres'},
  },
};
