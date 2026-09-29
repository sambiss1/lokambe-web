/**
 * Contenu de la page « Notre équipe », en français et en anglais.
 *
 * Le client l'a recadrée le 29 septembre : la page met en avant l'engagement de
 * l'équipe, pas sa taille. Les sections « Nos décisions » et « Envie de
 * rejoindre l'équipe ? » en ont été retirées à sa demande.
 *
 * Rien de ce qui décrit la mécanique interne du fonds n'est publié : ni la
 * composition du Comité d'investissement, ni les seuils de décision, ni les
 * contrôles de risques.
 *
 * Les postes sont présentés par rôle ; un nom n’apparaît que lorsqu’il est fourni.
 */

type PageMeta = {title: string; description: string};
type HeroContent = {eyebrow: string; title: string; intro: string; image?: {src: string; alt: string; position?: string}};
type TitledText = {title: string; text: string};

/**
 * Portrait d’un rôle.
 *
 * `src` est le chemin **réservé** : le fichier n’existe pas encore, un bloc
 * d’initiales est affiché à la place. Dès que le portrait est déposé dans
 * `public/images/team/`, passer `ready` à `true` — le cadre et la mise en page
 * restent identiques.
 */
export type TeamPhoto = {src: string; alt: string; ready?: boolean};

/** Rôle permanent présenté publiquement : intitulé, résumé, portrait. */
export type TeamRoleCard = {
  slug: string;
  /** Nom publié, quand la personne est nommée. */
  name?: string;
  title: string;
  /** Monogramme affiché tant que le portrait n’est pas disponible. */
  initials: string;
  summary: string;
  photo: TeamPhoto;
};

export type TeamPageContent = {
  meta: PageMeta;
  hero: HeroContent;
  roles: {eyebrow: string; title: string; intro: string; members: TeamRoleCard[]};
  /** Ce qui réunit l'équipe : le cœur de la page depuis le 29 septembre. */
  values: {eyebrow: string; title: string; intro: string; items: TitledText[]};
};

/** Les quatre rôles permanents, dans l’ordre de présentation. */
export const teamRoles: TeamRoleCard[] = [
  {
    slug: 'president-directeur-general',
    name: 'Olivier M. Fwamba',
    title: 'Fondateur & Président Directeur général',
    initials: 'PDG',
    summary:
      'Assure la direction générale et le pilotage stratégique de LOKAMBE. Il définit la vision, les orientations stratégiques et les priorités de développement, supervise les activités, développe les relations avec les investisseurs et partenaires, et représente LOKAMBE.',
    photo: {
      src: '/images/team/president-directeur-general.webp',
      alt: 'Olivier M. Fwamba, fondateur et président directeur général de LOKAMBE',
      ready: true,
    },
  },
  {
    slug: 'operations-et-developpement',
    title: 'Responsable des opérations & du développement',
    initials: 'OPS',
    summary:
      'Assure la coordination du fonctionnement quotidien de LOKAMBE et contribue à son développement : organisation interne, gestion administrative et documentaire, respect des procédures, relations commerciales et communication institutionnelle.',
    photo: {
      src: '/images/team/operations-et-developpement.webp',
      alt: 'Portrait du Responsable des opérations & du développement de LOKAMBE',
    },
  },
  {
    slug: 'investissements-et-finance',
    title: 'Responsable des investissements & de la finance',
    initials: 'INV',
    summary:
      'Pilote la fonction d’investissement : identification, analyse, sélection et structuration des opportunités. Il réalise ou coordonne les diligences, évalue les risques, construit les modèles financiers et prépare les dossiers d’investissement.',
    photo: {
      src: '/images/team/investissements-et-finance.webp',
      alt: 'Portrait du Responsable des investissements & de la finance de LOKAMBE',
    },
  },
  {
    slug: 'portefeuille-et-accompagnement',
    title: 'Responsable du portefeuille & de l’accompagnement',
    initials: 'PTF',
    summary:
      'Assure le suivi des entreprises et activités financées. Principal relais opérationnel entre LOKAMBE et les entrepreneurs, il suit la performance, l’utilisation des fonds, les risques et la mise en œuvre des plans d’accompagnement.',
    photo: {
      src: '/images/team/portefeuille-et-accompagnement.webp',
      alt: 'Portrait du Responsable du portefeuille & de l’accompagnement de LOKAMBE',
    },
  },
];

export const team: TeamPageContent = {
  meta: {
    title: 'Notre équipe',
    description:
      'Celles et ceux qui font LOKAMBE : quatre rôles, une même conviction — le talent entrepreneurial congolais mérite du capital et de l’accompagnement.',
  },
  hero: {
    eyebrow: 'Notre équipe',
    title: 'Engagés aux côtés des entrepreneurs',
    intro:
      'Ce qui réunit l’équipe LOKAMBE tient en une conviction : le talent entrepreneurial congolais mérite mieux que des promesses. Chacun ici travaille au contact des entrepreneurs, sur le terrain, avec exigence et dans la durée.',
    image: {src: '/images/team-hero.webp', alt: 'Trois femmes en pleine discussion de travail autour d’un ordinateur portable'},
  },
  roles: {
    eyebrow: 'L’équipe permanente',
    title: 'Quatre rôles, un même engagement',
    intro:
      'Direction, investissement, portefeuille, opérations : quatre responsabilités distinctes, tenues par des personnes qui partagent la même exigence — connaître vraiment les entreprises qu’elles accompagnent, et rester proches de celles et ceux qui les dirigent.',
    members: teamRoles,
  },
  values: {
    eyebrow: 'Ce qui nous anime',
    title: 'Notre manière de travailler',
    intro: 'Ce que les entrepreneurs peuvent attendre de nous, à chaque étape.',
    items: [
      {
        title: 'La proximité',
        text: 'Nous allons voir. Une activité ne se juge pas sur un document : elle se comprend sur place, au contact de celui ou celle qui la dirige.',
      },
      {
        title: 'L’exigence',
        text: 'Nous regardons les chiffres en face et nous disons ce que nous voyons. Un accompagnement utile est un accompagnement franc.',
      },
      {
        title: 'La durée',
        text: 'Nous ne cherchons pas le coup d’éclat. Une entreprise se construit sur des années, et nous restons à ses côtés sur cette durée.',
      },
      {
        title: 'La détermination',
        text: 'Faire grandir une entreprise en RDC demande de la ténacité. Nous en attendons des entrepreneurs, et nous nous l’imposons à nous-mêmes.',
      },
    ],
  },
};



/* ------------------------------------------------------------------ anglais */

/** Les mêmes rôles, en anglais : mêmes photos, mêmes monogrammes. */
export const teamRolesEn: TeamRoleCard[] = [
  {
    slug: 'president-directeur-general',
    name: 'Olivier M. Fwamba',
    title: 'Founder & Chief Executive Officer',
    initials: 'CEO',
    summary:
      'Leads LOKAMBE and steers its strategy. He sets the vision, the strategic direction and the development priorities, oversees the fund’s activities, builds relationships with investors and partners, and represents LOKAMBE.',
    photo: {
      src: '/images/team/president-directeur-general.webp',
      alt: 'Olivier M. Fwamba, founder and chief executive officer of LOKAMBE',
      ready: true,
    },
  },
  {
    slug: 'operations-et-developpement',
    title: 'Head of operations & development',
    initials: 'OPS',
    summary:
      'Coordinates LOKAMBE’s day-to-day running and contributes to its development: internal organisation, administration and records, adherence to procedures, commercial relationships and institutional communication.',
    photo: {
      src: '/images/team/operations-et-developpement.webp',
      alt: 'Portrait of LOKAMBE’s head of operations & development',
    },
  },
  {
    slug: 'investissements-et-finance',
    title: 'Head of investment & finance',
    initials: 'INV',
    summary:
      'Leads the investment function: finding, analysing, selecting and structuring opportunities. Carries out or coordinates the reviews, assesses risk, builds the financial models and prepares investment files.',
    photo: {
      src: '/images/team/investissements-et-finance.webp',
      alt: 'Portrait of LOKAMBE’s head of investment & finance',
    },
  },
  {
    slug: 'portefeuille-et-accompagnement',
    title: 'Head of portfolio & support',
    initials: 'PTF',
    summary:
      'Follows the companies and activities financed. The main day-to-day link between LOKAMBE and the entrepreneurs, tracking performance, use of funds, risks and the delivery of support plans.',
    photo: {
      src: '/images/team/portefeuille-et-accompagnement.webp',
      alt: 'Portrait of LOKAMBE’s head of portfolio & support',
    },
  },
];

export const teamEn: TeamPageContent = {
  meta: {
    title: 'Our team',
    description:
      'The people behind LOKAMBE: four roles, one shared conviction — Congolese entrepreneurial talent deserves capital and real support.',
  },
  hero: {
    eyebrow: 'Our team',
    title: 'Standing with entrepreneurs',
    intro:
      'One conviction brings this team together: Congolese entrepreneurial talent deserves more than promises. Everyone here works alongside entrepreneurs, on the ground, demanding much and staying for the long haul.',
    image: {src: '/images/team-hero.webp', alt: 'Three women deep in a work discussion around a laptop'},
  },
  roles: {
    eyebrow: 'The permanent team',
    title: 'Four roles, one commitment',
    intro:
      'Leadership, investment, portfolio, operations: four distinct responsibilities held by people who share one demand — to know the companies they back inside out, and to stay close to the people running them.',
    members: teamRolesEn,
  },
  values: {
    eyebrow: 'What drives us',
    title: 'How we work',
    intro: 'What entrepreneurs can expect from us, at every stage.',
    items: [
      {
        title: 'Closeness',
        text: 'We go and look. A business cannot be judged from a document: it is understood on site, alongside whoever runs it.',
      },
      {
        title: 'Rigour',
        text: 'We look at figures squarely and say what we see. Support is only useful when it is honest.',
      },
      {
        title: 'The long haul',
        text: 'We are not after a quick win. A company is built over years, and we stay alongside it for that long.',
      },
      {
        title: 'Determination',
        text: 'Growing a company in the DRC takes grit. We expect it from entrepreneurs, and we hold ourselves to it too.',
      },
    ],
  },
};


/** La page « Notre équipe » dans la langue demandée. */
export function getTeam(locale: string): TeamPageContent {
  return locale === 'en' ? teamEn : team;
}
