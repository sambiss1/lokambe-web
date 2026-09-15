export type LinkItem = {label: string; href: string};
export type TitledText = {title: string; text: string};
export type TitledList = {title: string; intro?: string; items: string[]};
export type ImageRef = {src: string; alt: string};
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
export type ProcessPhase = {title: string; steps: TitledText[]};

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
  facts: SectionHeading & {items: Fact[]; note: string};
  functions: SectionHeading & {items: TitledText[]; cycle: string[]; cycleLabel: string};
  sectors: SectionHeading & {items: SectorCard[]; link: LinkItem};
  process: SectionHeading & {phases: ProcessPhase[]; link: LinkItem; stepLabel: string; prevLabel: string; nextLabel: string};
  support: SectionHeading & {items: TitledList[]; closing: string};
  pilot: SectionHeading & {paragraphs: string[]; image: ImageRef; phases: Phase[]; motto: string};
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
  instruments: SectionHeading & {items: TitledText[]; criteria: TitledList};
  portfolio: SectionHeading & {paragraphs: string[]; dimensions: TitledList};
  economics: SectionHeading & {items: TitledList[]; cycleTitle: string; cycle: string[]};
  cta: CtaContent;
};

export type ProcessContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  investment: SectionHeading & {steps: TitledText[]};
  creation: SectionHeading & {paragraphs: string[]; stepsTitle: string; steps: string[]};
  support: SectionHeading & {items: TitledList[]; closing: string};
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

export type GovernanceContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  team: SectionHeading & {members: TeamRole[]};
  committee: SectionHeading & {
    paragraphs: string[];
    membersTitle: string;
    members: string[];
    note: string;
    powers: TitledList;
    criteria: TitledList;
    closing: string;
  };
  separation: SectionHeading & {
    stageLabel: string;
    ownerLabel: string;
    rows: {stage: string; owner: string}[];
    closing: string;
  };
  principles: SectionHeading & {paragraphs: string[]; values: string[]};
  evolution: SectionHeading & {paragraphs: string[]};
  risks: SectionHeading & {risks: TitledList; controls: TitledList};
  experts: SectionHeading & {items: string[]; closing: string};
  cta: CtaContent;
};

export type ImpactContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  performance: SectionHeading & {groups: TitledList[]};
  impact: SectionHeading & {groups: TitledList[]; closing: string};
  deployment: SectionHeading & {phases: Phase[]; motto: string};
  pilot: SectionHeading & {questionsTitle: string; questions: string[]; tests: TitledList};
  strategy: SectionHeading & {phases: Phase[]};
  vision: SectionHeading & {items: TitledText[]; ecosystemTitle: string; ecosystem: string[]; closing: string};
  cta: CtaContent;
};

export type ApplyContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  eligibility: SectionHeading & {items: string[]; note: string};
  documents: SectionHeading & {items: string[]; formats: string};
  nextSteps: SectionHeading & {steps: TitledText[]};
  form: {title: string; privacyText: string; privacyLink: LinkItem};
};

export type InvestorsContent = {
  meta: PageMeta;
  hero: PageHeroContent;
  why: SectionHeading & {items: TitledText[]};
  capital: SectionHeading & {items: TitledList[]; principle: string};
  network: SectionHeading & {items: TitledText[]};
  form: {title: string};
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
  process: ProcessContent;
  sectors: SectorsContent;
  governance: GovernanceContent;
  impact: ImpactContent;
  apply: ApplyContent;
  investors: InvestorsContent;
  contact: ContactContent;
  forms: FormsContent;
  legalNotice: LegalContent;
  privacy: LegalContent;
};
