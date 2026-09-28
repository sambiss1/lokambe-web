import type {ApplyContent} from '../types';

export const apply: ApplyContent = {
  meta: {
    title: 'Submit a project',
    description:
      'Congolese entrepreneurs: tell LOKAMBE about your business to obtain productive capital and support that fits.',
  },
  hero: {
    eyebrow: 'Entrepreneurs',
    title: 'Tell us about your project',
    intro:
      'Running a real business and in need of productive capital and support to change scale? We do not give: we invest alongside you.',
    image: {src: '/images/apply-hero.webp', alt: 'Smiling shopkeeper at the counter of her store'},
  },
  eligibility: {
    eyebrow: 'Before you start',
    title: 'What we look at',
    items: [
      'A real activity',
      'Existing or demonstrable revenue',
      'Identifiable customers',
      'A precise need and a clear use for the capital',
      'Room for improvement and for growth',
    ],
    note: 'Your business is not formally registered yet? That is not necessarily an obstacle: LOKAMBE can support you as you get organised and registered.',
  },
  documents: {
    title: 'Useful documents',
    intro: 'Attach whatever helps us understand your business:',
    items: [
      'Photos of your business (premises, production, equipment)',
      'Sales records, cash book or invoices',
      'Quotes for the equipment or purchases you have in mind',
      'Trade register or administrative documents if your business is registered',
    ],
    formats: 'Accepted formats: PDF, JPG, PNG or WEBP — 5 files maximum, 10 MB per file.',
  },
  form: {
    title: 'Your application',
    privacyText: 'Your information is used solely so that the LOKAMBE team can study your application.',
    privacyLink: {label: 'Privacy policy', href: '/confidentialite'},
  },
};
