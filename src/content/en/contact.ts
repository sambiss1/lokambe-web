import {CONTACT_EMAIL, SITE_DOMAIN} from '@/lib/brand';
import type {ContactContent} from '../types';

export const contact: ContactContent = {
  meta: {
    title: 'Contact',
    description: 'Get in touch with the LOKAMBE team in Kinshasa.',
  },
  hero: {
    eyebrow: 'Contact',
    title: 'Let’s talk about your project',
    intro: 'A question, a partnership proposal or a request for information? The LOKAMBE team will answer you.',
    image: {src: '/images/contact-hero.webp', alt: 'Two men shaking hands outdoors'},
  },
  details: {
    title: 'Contact details',
    items: [
      {label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`},
      {label: 'Website', value: SITE_DOMAIN, href: `https://${SITE_DOMAIN}`},
      {label: 'Location', value: 'Kinshasa, Democratic Republic of the Congo'},
    ],
  },
  form: {title: 'Write to us'},
  faq: {
    eyebrow: 'Frequently asked questions',
    title: 'Still wondering about something?',
    items: [
      {
        question: 'Who can submit a project to LOKAMBE?',
        answer:
          'Entrepreneurs running a real business in the DRC: small and medium-sized enterprises, micro-businesses or income-generating activities, with identifiable customers and a precise need.',
      },
      {
        question: 'My business is not formalised. Can I still apply?',
        answer:
          'Yes. An informal business with economic potential can be supported through getting organised and formalised.',
      },
      {
        question: 'Which sectors are priorities?',
        answer:
          'Restaurants and catering, food crafts and food processing, trade and distribution, events, services, media and entertainment, education and training.',
      },
      {
        question: 'Does LOKAMBE make grants or donations?',
        answer:
          'No. We do not give, we invest: capital is committed alongside the entrepreneur, and always comes with support.',
      },
    ],
    contactText: 'Not the question you had? Write to us with the form above, or tell us about your project directly.',
    contact: {label: 'Submit a project', href: '/soumettre-un-projet'},
  },
};
