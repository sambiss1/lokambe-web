import type {AboutContent} from '../types';

export const about: AboutContent = {
  meta: {
    title: 'À propos',
    description:
      'Le problème que LOKAMBE veut résoudre, nos convictions, notre vision et notre mission pour l’entrepreneuriat congolais.',
  },
  hero: {
    eyebrow: 'À propos',
    title: 'La RDC ne manque pas d’entrepreneurs.',
    intro:
      'Elle manque de mécanismes permettant à davantage d’entrepreneurs de changer d’échelle. LOKAMBE est né pour y répondre.',
    image: {src: '/images/about-hero.webp', alt: 'Artisane congolaise dans son atelier'},
  },
  problem: {
    eyebrow: 'Le problème',
    title: 'Des activités rentables qui ne changent pas d’échelle',
    paragraphs: [
      'La RDC dispose d’une multitude d’activités économiques portées par des entrepreneurs congolais. Restaurants, commerces, ateliers, boulangeries, pâtisseries, services, agriculture, transformation alimentaire, transport, artisanat, événementiel, commerce de proximité et activités numériques participent chaque jour à la création de revenus et à l’activité économique.',
      'Cependant, une grande partie de ces initiatives demeure au stade de l’activité individuelle et franchit difficilement le cap de l’entreprise structurée.',
      'Un restaurateur peut avoir une clientèle fidèle sans pouvoir ouvrir un second établissement. Une pâtissière peut vendre quotidiennement sans pouvoir acquérir un équipement professionnel. Un commerçant peut faire face à une demande importante tout en manquant de fonds de roulement. Une entreprise événementielle peut obtenir des contrats tout en étant obligée de louer son matériel pour chaque prestation.',
      'Le problème n’est donc pas toujours l’absence de marché. Il peut être simplement celui d’un déficit de capital productif et de structuration.',
    ],
    obstacles: {
      title: 'Un financement souvent inadapté',
      intro: 'Les petites entreprises rencontrent notamment :',
      items: [
        'L’absence de garanties suffisantes',
        'Un historique financier limité',
        'Une faible formalisation',
        'Une comptabilité insuffisamment structurée',
        'Des difficultés d’accès au financement classique',
        'Des coûts de financement élevés',
        'Une offre financière peu adaptée à leur réalité',
      ],
    },
    closing: [
      'Le financement seul ne suffit pas. Une entreprise peut recevoir du capital et échouer si elle ne maîtrise pas ses coûts, ses stocks, sa trésorerie, ses prix, ses marges, ses achats, son personnel ou son développement commercial. C’est pourquoi LOKAMBE associe capital, discipline financière et accompagnement opérationnel.',
      'Certaines entreprises peuvent également améliorer leur compétitivité en partageant certains moyens : centrales d’achat, équipements, espaces de production, plateformes, réseaux de distribution ou services communs. LOKAMBE pourra développer ou soutenir de tels mécanismes lorsque leur mutualisation améliore concrètement la productivité et la rentabilité.',
    ],
  },
  convictions: {
    eyebrow: 'Nos convictions',
    title: 'Ce en quoi nous croyons',
    intro: 'LOKAMBE repose sur six convictions fondamentales.',
    items: [
      {
        title: 'Les idées ne manquent pas',
        text: 'Les entrepreneurs congolais ne manquent pas d’idées. Ils manquent souvent de moyens et de structures leur permettant de transformer leurs idées ou activités en entreprises solides.',
      },
      {
        title: 'Le capital doit être productif',
        text: 'Un investissement doit permettre de produire davantage, vendre davantage, améliorer la productivité ou créer de nouveaux actifs.',
      },
      {
        title: 'Le capital doit être accompagné',
        text: 'L’argent sans discipline, compétences et suivi peut rapidement être mal utilisé.',
      },
      {
        title: 'Le terrain compte autant que les chiffres',
        text: 'Une décision d’investissement doit reposer sur l’analyse financière, mais également sur la compréhension concrète de l’activité, de ses clients, de ses fournisseurs et de son environnement.',
      },
      {
        title: 'Les opportunités peuvent être créées',
        text: 'LOKAMBE ne doit pas seulement attendre les entrepreneurs qui viennent chercher un financement. Il doit également identifier des besoins et construire lui-même des réponses entrepreneuriales.',
      },
      {
        title: 'Rentabilité et impact se renforcent',
        text: 'Une entreprise rentable peut créer des emplois, développer des fournisseurs, augmenter les revenus et stimuler l’économie locale.',
      },
    ],
  },
  vision: {
    eyebrow: 'Vision et mission',
    title: 'Où nous allons',
    items: [
      {
        title: 'Vision',
        text: 'Construire un portefeuille d’entreprises congolaises solides, rentables, structurées, évolutives et créatrices d’emplois.',
      },
      {
        title: 'Mission',
        text: 'Identifier, financer, créer et accompagner des entreprises capables de produire durablement de la valeur en République démocratique du Congo.',
      },
      {
        title: 'Ambition',
        text: 'Faire du capital privé un véritable moteur de création d’entreprises et de transformation de l’économie congolaise.',
      },
    ],
  },
  conclusion: {
    eyebrow: 'Notre réponse',
    title: 'Utiliser le capital pour construire des entreprises',
    paragraphs: [
      'Notre réponse n’est pas de distribuer de l’argent. Notre réponse est d’utiliser le capital pour construire des entreprises.',
    ],
    pillars: [
      'Investir dans ceux qui créent déjà.',
      'Créer ce qui mérite d’être développé.',
      'Accompagner ceux qui veulent grandir.',
      'Faire émerger des entreprises solides.',
      'Réinvestir pour créer davantage.',
    ],
    evolutionTitle: 'LOKAMBE veut contribuer à faire évoluer',
    evolution: ['L’activité', 'L’entreprise', 'La PME', 'L’expansion', 'Le groupe', 'Un patrimoine économique durable'],
    closing: [
      'À travers cette approche, LOKAMBE entend participer à l’émergence d’un tissu économique congolais plus formel, plus productif, plus compétitif et davantage financé par le capital privé.',
      'L’ambition est de contribuer à bâtir une économie dans laquelle le capital congolais finance davantage l’économie congolaise, les entrepreneurs congolais construisent davantage d’entreprises congolaises, et les entreprises congolaises créent davantage de valeur en RDC.',
    ],
  },
  cta: {
    title: 'Construisons ensemble',
    text: 'Entrepreneur, investisseur, partenaire ou expert : rejoignez la dynamique LOKAMBE.',
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Investisseurs et partenaires', href: '/investisseurs-et-partenaires'},
  },
};
