import type {SectorsContent} from '../types';

export const sectors: SectorsContent = {
  meta: {
    title: 'Secteurs',
    description:
      'Les sept secteurs prioritaires de LOKAMBE et le profil des entreprises que nous recherchons.',
  },
  hero: {
    eyebrow: 'Secteurs',
    title: 'Comment cette entreprise gagne-t-elle de l’argent ?',
    intro: 'C’est la question fondamentale à laquelle LOKAMBE doit pouvoir répondre clairement avant chaque investissement.',
    image: {src: '/images/sectors-hero.webp', alt: 'Cuisinière préparant des pâtisseries dans une cuisine professionnelle'},
  },
  thesis: {
    eyebrow: 'Thèse d’investissement',
    title: 'Ce que nous recherchons',
    intro: 'LOKAMBE privilégiera les entreprises qui combinent plusieurs facteurs.',
    items: [
      {title: 'Un besoin réel', text: 'Le produit ou service répond à une demande identifiable et suffisamment importante.'},
      {
        title: 'Un entrepreneur engagé',
        text: 'L’entrepreneur possède une connaissance réelle de son activité et participe directement à son développement.',
      },
      {
        title: 'Une économie compréhensible',
        text: 'LOKAMBE doit pouvoir répondre clairement à une question fondamentale : comment cette entreprise gagne-t-elle de l’argent ?',
      },
      {
        title: 'Un usage productif du capital',
        text: 'Le capital investi doit permettre de générer une amélioration mesurable de l’activité.',
      },
      {
        title: 'Un potentiel de croissance',
        text: 'L’investissement doit permettre un changement identifiable entre la situation avant et après l’investissement.',
      },
      {
        title: 'Une perspective de rendement',
        text: 'L’investissement doit présenter une possibilité réaliste de retour financier compte tenu du risque.',
      },
      {
        title: 'Un potentiel d’impact',
        text: 'L’entreprise doit pouvoir contribuer à la création ou consolidation d’emplois, la génération de revenus, l’augmentation de la production, la mobilisation de fournisseurs et l’activité économique locale.',
      },
    ],
  },
  sectors: {
    eyebrow: 'Secteurs prioritaires',
    title: 'Sept secteurs prioritaires',
    intro:
      'LOKAMBE concentre ses interventions sur un nombre limité de secteurs, afin d’y développer une véritable expertise.',
    items: [
      {
        title: 'Restauration',
        items: ['Restaurants', 'Restauration rapide', 'Fast-food', 'Traiteurs', 'Restauration événementielle', 'Concepts spécialisés'],
      },
      {
        title: 'Métiers de bouche et transformation alimentaire',
        items: ['Boulangerie', 'Pâtisserie', 'Chocolaterie', 'Production alimentaire', 'Transformation', 'Conditionnement'],
      },
      {
        title: 'Commerce et distribution',
        items: ['Commerces de proximité', 'Boutiques spécialisées', 'Distribution', 'Produits alimentaires', 'Concepts retail'],
      },
      {
        title: 'Événementiel',
        items: ['Location de mobilier', 'Équipements', 'Sonorisation', 'Éclairage', 'Décoration', 'Logistique'],
      },
      {
        title: 'Services',
        items: ['Maintenance', 'Nettoyage', 'Logistique', 'Services aux entreprises', 'Services spécialisés'],
      },
      {
        title: 'Médias et divertissement',
        items: [
          'Production audiovisuelle',
          'Médias numériques',
          'Création de contenu',
          'Production musicale',
          'Studios et équipements',
          'Agences créatives',
        ],
      },
      {
        title: 'Éducation et formation',
        items: [
          'Centres de formation professionnelle',
          'Formation technique et métiers',
          'Formation entrepreneuriale et gestion',
          'Édition pédagogique',
          'Équipements pour établissements scolaires',
        ],
      },
    ],
    closing:
      'LOKAMBE pourra progressivement élargir son champ d’intervention à mesure que son portefeuille, son équipe et ses capacités d’analyse se développeront.',
  },
  profile: {
    eyebrow: 'Profil des entreprises ciblées',
    title: 'Les entreprises que nous recherchons',
    intro: 'LOKAMBE privilégiera les entreprises présentant :',
    items: [
      'Une activité réelle',
      'Des revenus existants ou démontrables',
      'Une clientèle identifiable',
      'Un entrepreneur clairement identifié',
      'Un besoin précis',
      'Une utilisation claire du capital',
      'Une possibilité d’amélioration',
      'Un potentiel de croissance',
    ],
    note: 'Le niveau de formalisation ne constituera pas nécessairement le seul critère d’entrée. Une activité informelle présentant un potentiel économique pourra être accompagnée dans sa structuration et sa formalisation avant ou pendant l’intervention de LOKAMBE.',
  },
  cta: {
    title: 'Votre activité coche ces critères ?',
    text: 'Présentez-nous votre projet, même si votre activité n’est pas encore formalisée.',
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Nous découvrir', href: '/a-propos'},
  },
};
