/**
 * Contenu de la page « Carrières » (français).
 *
 * Aucun effectif, aucune rémunération, aucun avantage n’est annoncé : la page
 * décrit la réalité du travail chez LOKAMBE et accueille les candidatures.
 *
 * Pour publier une offre : ajouter un objet à `jobPostings` ci-dessous. La page
 * bascule automatiquement de l’état vide à la liste des postes.
 */

type LinkItem = {label: string; href: string};
type PageMeta = {title: string; description: string};
type HeroContent = {eyebrow: string; title: string; intro: string; image?: {src: string; alt: string; position?: string}};
type CtaContent = {title: string; text: string; primary: LinkItem; secondary?: LinkItem};
type TitledText = {title: string; text: string};

/** Type de contrat proposé. */
export type ContractType = 'CDI' | 'CDD' | 'Stage' | 'Consultance' | 'Alternance';

/** Une offre d’emploi publiée sur la page « Carrières ». */
export type JobPosting = {
  /** Identifiant d’URL / d’ancre, en minuscules et sans accent. */
  slug: string;
  title: string;
  /** Lieu d’exercice, par exemple « Kinshasa, RDC ». */
  location: string;
  contractType: ContractType;
  /** Deux ou trois phrases sur la raison d’être du poste. */
  summary: string;
  missions: string[];
  profile: string[];
};

export type CareersContent = {
  meta: PageMeta;
  hero: HeroContent;
  culture: {eyebrow: string; title: string; intro: string; items: TitledText[]};
  openings: {
    eyebrow: string;
    title: string;
    intro: string;
    /** État affiché tant que `jobPostings` est vide. */
    empty: {title: string; text: string; cta: LinkItem};
    labels: {location: string; contract: string; missions: string; profile: string; apply: string};
  };
  cta: CtaContent;
};

/**
 * Postes ouverts. Tableau volontairement vide : la page affiche l’état
 * « aucun poste ouvert » tant qu’aucune offre n’y est ajoutée.
 */
export const jobPostings: JobPosting[] = [];

export const careers: CareersContent = {
  meta: {
    title: 'Carrières',
    description:
      'Travailler chez LOKAMBE : le terrain, la rigueur et la proximité avec les entrepreneurs congolais. Postes ouverts et candidatures spontanées.',
  },
  hero: {
    eyebrow: 'Carrières',
    title: 'Construire LOKAMBE, sur le terrain',
    intro:
      'LOKAMBE se construit avec une équipe resserrée, exigeante et proche des entrepreneurs qu’elle finance. Retrouvez ici nos postes ouverts — et, à tout moment, la possibilité de nous adresser une candidature spontanée.',
    image: {src: '/images/process-hero.webp', alt: 'Trois femmes échangeant autour d’un ordinateur portable'},
  },
  culture: {
    eyebrow: 'Travailler chez LOKAMBE',
    title: 'Le terrain, puis la rigueur',
    intro:
      'Une structure légère, où chacun assume plusieurs fonctions, documente son travail et rend compte de ses décisions.',
    items: [
      {
        title: 'Le terrain d’abord',
        text: 'Visites d’entreprises, collecte d’informations sur place, contrôles réguliers : nos décisions s’appuient sur ce que nous avons vu et vérifié nous-mêmes.',
      },
      {
        title: 'La rigueur comme méthode',
        text: 'Analyses écrites, critères définis à l’avance, suivi des procédures et des indicateurs. Rien ne repose sur la seule intuition.',
      },
      {
        title: 'La proximité avec les entrepreneurs',
        text: 'Nous accompagnons les entreprises financées dans la durée. Le dialogue avec les dirigeants fait partie du quotidien.',
      },
      {
        title: 'Des responsabilités réelles',
        text: 'Une équipe resserrée signifie un périmètre large, des décisions visibles et une contribution directe à la construction de LOKAMBE.',
      },
    ],
  },
  openings: {
    eyebrow: 'Postes ouverts',
    title: 'Nos opportunités',
    intro: 'Les postes actuellement ouverts au recrutement.',
    empty: {
      title: 'Aucun poste ouvert pour le moment',
      text: 'Écrivez-nous, les candidatures spontanées sont les bienvenues.',
      cta: {label: 'Envoyer une candidature', href: '/contact'},
    },
    labels: {
      location: 'Lieu',
      contract: 'Contrat',
      missions: 'Missions',
      profile: 'Profil recherché',
      apply: 'Postuler',
    },
  },
  cta: {
    title: 'Candidature spontanée',
    text: 'Présentez-vous en quelques lignes, précisez le rôle qui vous intéresse et joignez votre CV. Nous revenons vers chaque candidature étudiée.',
    primary: {label: 'Nous écrire', href: '/contact'},
    secondary: {label: 'Découvrir l’équipe', href: '/notre-equipe'},
  },
};
