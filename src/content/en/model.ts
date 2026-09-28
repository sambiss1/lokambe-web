import type {ModelContent} from '../types';

export const model: ModelContent = {
  meta: {
    title: 'Our model',
    description: 'Investor, creator and partner: the two pillars of how LOKAMBE steps in.',
  },
  hero: {
    eyebrow: 'Our model',
    title: 'Investor. Creator. Partner.',
    intro:
      'LOKAMBE does not stop at financing companies. It helps identify them, bring them into being, organise them, develop them and build their value.',
    image: {src: '/images/model-hero.webp', alt: 'Smiling baker behind his pastry display'},
  },
  roles: {
    eyebrow: 'The LOKAMBE model',
    title: 'Three complementary functions',
    intro: 'LOKAMBE sits at the meeting point of three complementary functions.',
    items: [
      {
        title: 'Investor',
        text: 'LOKAMBE raises and deploys capital in companies with the potential to create value, and seeks a return suited to the level of risk.',
      },
      {
        title: 'Creator',
        text: 'LOKAMBE identifies market opportunities and can create companies directly when the economics justify it.',
      },
      {
        title: 'Partner',
        text: 'LOKAMBE brings the companies in its portfolio the resources, skills, networks and tools their growth calls for.',
      },
    ],
    closing: 'That combination is what the model is.',
  },
  pillars: {
    eyebrow: 'Two pillars',
    title: 'Investing and creating',
    items: [
      {
        label: 'Pillar 1',
        title: 'Investing in entrepreneurs',
        text: 'LOKAMBE may invest in income-generating activities, micro-businesses, small companies, SMEs and young companies with potential. Its involvement can answer different needs.',
        groups: [
          {
            title: 'Growth capital',
            intro: 'To finance, among other things:',
            items: ['Raw materials', 'Stock', 'Purchasing', 'Working capital', 'Sales development'],
          },
          {
            title: 'Productive equipment',
            intro: 'In order to:',
            items: [
              'Increase production capacity',
              'Improve productivity',
              'Reduce costs',
              'Improve quality',
              'Create new products or services',
            ],
          },
          {
            title: 'Expansion',
            intro: 'In order to:',
            items: [
              'Open a new point of sale',
              'Enter a new geographic area',
              'Increase capacity',
              'Develop a new activity',
              'Launch a new product',
            ],
          },
        ],
      },
      {
        label: 'Pillar 2',
        title: 'Creating companies',
        text: 'LOKAMBE may also create companies directly when a clearly identified market need shows enough potential.',
        groups: [
          {
            title: 'What we may create',
            items: [
              'Restaurant concepts',
              'Production units',
              'Service companies',
              'Distribution platforms',
              'Equipment rental companies',
              'Networks of local shops',
              'Other replicable models',
            ],
          },
        ],
        closing: 'The aim is to turn an opportunity into a company, then a company into a model that can be replicated.',
      },
    ],
  },
  cta: {
    title: 'Does your business fit our model?',
    text: 'Look through our priority sectors, then tell us about your project.',
    primary: {label: 'Submit a project', href: '/soumettre-un-projet'},
    secondary: {label: 'Sectors', href: '/secteurs-et-criteres'},
  },
};
