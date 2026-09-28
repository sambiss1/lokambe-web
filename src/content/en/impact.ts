import type {ImpactContent} from '../types';

export const impact: ImpactContent = {
  meta: {
    title: 'Impact and vision',
    description: 'How LOKAMBE measures performance, its economic and social impact, and its five to ten year vision.',
  },
  hero: {
    eyebrow: 'Impact and vision',
    title: 'Profitability and local value, together',
    intro:
      'LOKAMBE treats impact as part of value creation, and measures it just as it measures financial performance.',
    image: {src: '/images/impact-hero.webp', alt: 'Two smiling employees at the counter of a street restaurant'},
  },
  performance: {
    eyebrow: 'Measuring performance',
    title: 'What we track',
    intro: 'LOKAMBE tracks the financial, operational and entrepreneurial performance of its portfolio side by side.',
    groups: [
      {
        title: 'Financial performance',
        items: [
          'Capital invested',
          'Revenue of portfolio companies',
          'Profitability',
          'Growth of the companies financed',
        ],
      },
      {
        title: 'Operational performance',
        items: [
          'Companies financed',
          'Companies created',
          'Companies supported',
          'New points of sale',
          'Added capacity',
          'New markets',
          'Revenue growth',
        ],
      },
    ],
  },
  impact: {
    eyebrow: 'Economic and social impact',
    title: 'Impact we can measure',
    groups: [
      {title: 'Employment', items: ['Jobs created', 'Jobs secured', 'Change in headcount']},
      {
        title: 'Entrepreneurship',
        items: ['Entrepreneurs financed', 'Entrepreneurs supported', 'New companies created'],
      },
      {
        title: 'Local economy',
        items: ['Suppliers brought on board', 'Local production', 'Revenue generated', 'New distribution channels'],
      },
      {
        title: 'Formalisation',
        items: [
          'Companies organised',
          'Companies formally registered',
          'Better governance',
          'Better financial management',
        ],
      },
    ],
    closing:
      'The aim is to show that financial profitability and local economic value can move forward together.',
  },
  vision: {
    eyebrow: 'Five to ten year vision',
    title: 'A Congolese platform of reference',
    items: [
      {
        title: 'At five years',
        text: 'A diversified portfolio of companies, several companies created or held, a strengthened team, a network of experts, and financial and strategic partners.',
      },
      {
        title: 'At ten years',
        text: 'To make LOKAMBE a recognised Congolese private platform for investing in and creating companies, able to raise substantial capital and finance the real economy for the long term.',
      },
    ],
    ecosystemTitle: 'A genuine ecosystem',
    ecosystem: ['Investors', 'LOKAMBE', 'Entrepreneurs', 'Companies', 'Jobs', 'Income', 'Returns', 'Reinvestment'],
    closing: 'The ultimate aim is a cycle of Congolese private capital that grows stronger over time.',
  },
  cta: {
    title: 'Take part in the LOKAMBE cycle',
    text: 'Investors and partners: help build tomorrow’s Congolese economic fabric.',
    primary: {label: 'Contact us', href: '/contact'},
    secondary: {label: 'Submit a project', href: '/soumettre-un-projet'},
  },
};
