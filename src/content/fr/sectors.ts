import type {SectorsContent} from '../types';

export const sectors: SectorsContent = {
  meta: {
    title: 'Secteurs',
    description:
      'Les sept secteurs dans lesquels LOKAMBE investit, et le profil des entreprises que nous recherchons.',
  },
  hero: {
    eyebrow: 'Secteurs',
    // L'intitulé « Secteurs » est juste au-dessus : le titre n'a pas à répéter
    // le mot. Il nomme les métiers eux-mêmes, aux quatre coins des sept
    // secteurs, pour que l'entrepreneur qui arrive se reconnaisse.
    title: 'Des cuisines aux studios, du comptoir à la salle de classe.',
    // Ne pas reprendre l'amorce de `sectors.sectors.intro`, plus bas dans la
    // page : le chapô annonce ce qu'on va lire, la section explique le choix.
    intro:
      'Restauration, métiers de bouche, commerce, événementiel, services, médias, éducation : voici les sept secteurs dans lesquels LOKAMBE investit, et le profil d’entreprise que nous y cherchons.',
    image: {src: '/images/sectors-marche.webp', alt: 'Commerçante souriante dans son étal de tissus et d’accessoires'},
  },
  thesis: {
    eyebrow: 'Thèse d’investissement',
    title: 'Ce que nous regardons avant d’investir',
    intro:
      'Le secteur ne suffit pas. Dans chacun d’eux, nous cherchons des entreprises qui réunissent plusieurs de ces conditions.',
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
    eyebrow: 'Nos secteurs, en détail',
    title: 'Là où nous investissons',
    intro:
      'Sept secteurs, choisis parce qu’ils répondent à une demande réelle à Kinshasa et ailleurs en RDC, et parce qu’une entreprise peut y grandir sans avoir à tout réinventer. Voici, secteur par secteur, les activités concernées.',
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
      'Cette liste n’est pas figée : elle s’élargira à mesure que le portefeuille, l’équipe et notre connaissance du terrain se développeront.',
  },
  profile: {
    eyebrow: 'Profil recherché',
    title: 'À quoi ressemble un dossier que nous retenons',
    intro: 'Quel que soit le secteur, voici ce que nous regardons en premier :',
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
    note: 'Votre activité n’est pas encore formalisée ? Ce n’est pas un motif de refus. Une activité informelle qui présente un potentiel économique peut être accompagnée dans sa structuration et sa formalisation, avant ou pendant notre intervention.',
  },
};
