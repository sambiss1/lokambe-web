export type LinkItem = {label: string; href: string};
export type TitledText = {title: string; text: string};
export type TitledList = {title: string; intro?: string; items: string[]};
export type ImageRef = {src: string; alt: string; /** `object-position` CSS, si le cadrage par défaut coupe mal. */ position?: string};
export type PageMeta = {title: string; description: string};
export type SectionHeading = {eyebrow?: string; title: string; intro?: string};
export type PageHeroContent = {eyebrow: string; title: string; intro: string; image?: ImageRef};
export type CtaContent = {title: string; text: string; primary: LinkItem; secondary?: LinkItem};
export type Phase = {label: string; title: string; text?: string; items?: string[]};
export type TextBlock = {title: string; paragraphs: string[]};
export type Pillar = {label: string; title: string; text: string; groups: TitledList[]; closing?: string};
export type TeamRole = {
  title: string;
  summary: string;
  responsibilitiesTitle: string;
  responsibilities: string[];
  note?: string;
};

export type Fact = {value: number; label: string; text: string};
export type FaqItem = {question: string; answer: string};
export type SectorCard = TitledText & {image: ImageRef; tags: string[]};
/** Une entreprise du portefeuille ou un partenaire. Le logo arrive plus tard. */
export type LogoEntry = {
  id: string;
  name: string;
  logo?: string;
  sector?: string;
  status?: string;
  text?: string;
  href?: string;
};

export type LogoWallContent = SectionHeading & {
  items: LogoEntry[];
  /** Libellés de la fiche qui s'ouvre au clic. */
  detail: {sectorLabel: string; statusLabel: string; pending: string; close: string};
  empty: string;
};

export type HomeContent = {
  meta: PageMeta;
  hero: {
    eyebrow: string;
    /** Titre découpé en lignes pour l'animation d'apparition. */
    titleLines: string[];
    tagline: string;
    intro: string;
    image: ImageRef;
    primary: LinkItem;
    secondary: LinkItem;
    cards: {
      step: {label: string; title: string; text: string};
      sector: {label: string; title: string};
      place: {label: string; title: string};
    };
  };
  marquee: string[];
  statement: {quote: string; text: string};
  facts: SectionHeading & {items: Fact[]};
  functions: SectionHeading & {items: TitledText[]; cycle: string[]; cycleLabel: string};
  sectors: SectionHeading & {items: SectorCard[]; link: LinkItem};
  portfolio: LogoWallContent;
  partners: LogoWallContent;
  formalisation: SectionHeading & {items: TitledText[]};
  support: SectionHeading & {items: TitledText[]};
  pilot: SectionHeading & {paragraphs: string[]; image: ImageRef; overlay: string; points: Phase[]; closing: string};
  faq: SectionHeading & {items: FaqItem[]; contactText: string; contact: LinkItem};
  cta: CtaContent & {image: ImageRef};
};

export type AboutContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  problem: SectionHeading & {paragraphs: string[]; obstacles: TitledList; closing: string[]};
  convictions: SectionHeading & {items: TitledText[]};
  vision: SectionHeading & {items: TitledText[]};
  conclusion: SectionHeading & {
    paragraphs: string[];
    pillars: string[];
    evolutionTitle: string;
    evolution: string[];
    closing: string[];
  };
  cta: CtaContent;
};

export type ModelContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  roles: SectionHeading & {items: TitledText[]; closing: string};
  pillars: SectionHeading & {items: Pillar[]};
  cta: CtaContent;
};

export type SectorsContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  thesis: SectionHeading & {items: TitledText[]};
  sectors: SectionHeading & {items: TitledList[]; closing: string};
  profile: SectionHeading & {items: string[]; note: string};
  cta: CtaContent;
};

export type ImpactContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  performance: SectionHeading & {groups: TitledList[]};
  impact: SectionHeading & {groups: TitledList[]; closing: string};
  vision: SectionHeading & {items: TitledText[]; ecosystemTitle: string; ecosystem: string[]; closing: string};
  cta: CtaContent;
};

export type ApplyContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  eligibility: SectionHeading & {items: string[]; note: string};
  documents: SectionHeading & {items: string[]; formats: string};
  form: {title: string; privacyText: string; privacyLink: LinkItem};
};

export type ContactContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  details: {title: string; items: {label: string; value: string; href?: string}[]};
  form: {title: string};
};

export type LegalContent = {
  meta: PageMeta;
  title: string;
  updatedLabel: string;
  updatedAt: string;
  sections: TextBlock[];
};

export type FormsContent = {
  common: {
    optional: string;
    required: string;
    previous: string;
    next: string;
    submit: string;
    sending: string;
    stepLabel: string;
    errorsTitle: string;
    honeypotLabel: string;
  };
  application: {
    steps: TitledText[];
    fields: Record<string, string>;
    sectors: Record<string, string>;
    needTypes: Record<string, string>;
    files: {cta: string; hint: string; empty: string; remove: string};
    review: {title: string; edit: string};
    success: {
      title: string;
      text: string;
      referenceLabel: string;
      next: string;
      back: string;
      demoNotice: string;
    };
  };
  contact: {
    fields: Record<string, string>;
    kinds: Record<string, string>;
    success: {title: string; text: string; again: string; demoNotice: string};
  };
};

export type SiteContent = {
  home: HomeContent;
  about: AboutContent;
  model: ModelContent;
  sectors: SectorsContent;
  impact: ImpactContent;
  apply: ApplyContent;
  contact: ContactContent;
  forms: FormsContent;
  legalNotice: LegalContent;
  privacy: LegalContent;
};
