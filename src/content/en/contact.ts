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
};
