/**
 * Contenu de la page « Notre équipe », en français et en anglais.
 *
 * Extrait volontairement réduit du dossier de gouvernance : seuls les quatre
 * rôles permanents et le principe de collégialité sont publiés. La composition
 * du Comité d’investissement, les seuils de décision, la répartition détaillée
 * des responsabilités et les contrôles de risques restent internes.
 *
 * Les postes sont présentés par rôle ; un nom n’apparaît que lorsqu’il est fourni.
 */

type LinkItem = {label: string; href: string};
type PageMeta = {title: string; description: string};
type HeroContent = {eyebrow: string; title: string; intro: string; image?: {src: string; alt: string; position?: string}};
type CtaContent = {title: string; text: string; primary: LinkItem; secondary?: LinkItem};
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
  decisions: {
    eyebrow: string;
    title: string;
    intro: string;
    paragraphs: string[];
    items: TitledText[];
    valuesTitle: string;
    values: string[];
  };
  cta: CtaContent;
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
      'Les quatre rôles permanents de LOKAMBE et la façon dont les décisions sont prises : collégialement et sur la base d’analyses documentées.',
  },
  hero: {
    eyebrow: 'Notre équipe',
    title: 'Une équipe resserrée, au plus près du terrain',
    intro:
      'LOKAMBE fonctionne avec une équipe permanente volontairement réduite : quatre rôles complémentaires, une séparation claire entre la direction, l’analyse des investissements et le suivi du portefeuille, et des décisions prises collégialement.',
    image: {src: '/images/governance-hero.webp', alt: 'Deux jeunes hommes en réunion autour d’une table de travail'},
  },
  roles: {
    eyebrow: 'L’équipe permanente',
    title: 'Quatre rôles permanents',
    intro:
      'Une organisation légère et polyvalente, qui distingue nettement la direction, la préparation des investissements et la gestion du portefeuille. Elle se renforcera à mesure que le portefeuille grandira.',
    members: teamRoles,
  },
  decisions: {
    eyebrow: 'Nos décisions',
    title: 'Collégiales et documentées',
    intro: 'Aucune décision d’investissement significative ne repose sur la seule appréciation d’une personne.',
    paragraphs: [
      'Chaque dossier est instruit par écrit, selon des critères définis à l’avance, puis soumis à une validation collégiale. L’analyse, la décision et le suivi relèvent de fonctions distinctes : personne ne contrôle seul l’ensemble du processus.',
    ],
    items: [
      {
        title: 'Analyse documentée',
        text: 'Chaque dossier est instruit par écrit : éligibilité, modèle économique, viabilité financière, risques identifiés.',
      },
      {
        title: 'Validation collégiale',
        text: 'Les décisions d’investissement sont prises collectivement, selon les règles que LOKAMBE s’est fixées.',
      },
      {
        title: 'Fonctions distinctes',
        text: 'Préparer, décider et suivre sont trois responsabilités séparées, confiées à des rôles différents.',
      },
    ],
    valuesTitle: 'Ce qui guide nos décisions',
    values: ['Responsabilité', 'Transparence', 'Collégialité', 'Protection du capital'],
  },
  cta: {
    title: 'Envie de rejoindre l’équipe ?',
    text: 'LOKAMBE recrute des profils de terrain, rigoureux et proches des entrepreneurs. Découvrez nos opportunités ou écrivez-nous.',
    primary: {label: 'Voir les carrières', href: '/carrieres'},
    secondary: {label: 'Nous contacter', href: '/contact'},
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
      'LOKAMBE’s four permanent roles, and how decisions are taken: collectively, and on the basis of written analysis.',
  },
  hero: {
    eyebrow: 'Our team',
    title: 'A small team, close to the ground',
    intro:
      'LOKAMBE runs with a deliberately small permanent team: four complementary roles, a clear separation between leadership, investment analysis and portfolio follow-up, and decisions taken collectively.',
    image: {src: '/images/governance-hero.webp', alt: 'Two young men in a meeting around a work table'},
  },
  roles: {
    eyebrow: 'The permanent team',
    title: 'Four permanent roles',
    intro:
      'A light, versatile organisation that clearly separates leadership, preparing investments and managing the portfolio. It will grow as the portfolio grows.',
    members: teamRolesEn,
  },
  decisions: {
    eyebrow: 'Our decisions',
    title: 'Collective and documented',
    intro: 'No significant investment decision rests on one person’s judgement alone.',
    paragraphs: [
      'Every application is examined in writing, against criteria set in advance, then submitted for collective approval. Analysis, decision and follow-up belong to separate functions: nobody controls the whole chain alone.',
    ],
    items: [
      {
        title: 'Written analysis',
        text: 'Every application is examined in writing: eligibility, business model, financial viability, identified risks.',
      },
      {
        title: 'Collective approval',
        text: 'Investment decisions are taken collectively, according to the rules LOKAMBE has set itself.',
      },
      {
        title: 'Separate functions',
        text: 'Preparing, deciding and following up are three separate responsibilities, given to different roles.',
      },
    ],
    valuesTitle: 'What guides our decisions',
    values: ['Accountability', 'Transparency', 'Collective judgement', 'Protecting capital'],
  },
  cta: {
    title: 'Interested in joining the team?',
    text: 'LOKAMBE hires people who like the field, work rigorously and stay close to entrepreneurs. Look through our openings or write to us.',
    primary: {label: 'See careers', href: '/carrieres'},
    secondary: {label: 'Contact us', href: '/contact'},
  },
};

/** La page « Notre équipe » dans la langue demandée. */
export function getTeam(locale: string): TeamPageContent {
  return locale === 'en' ? teamEn : team;
}
