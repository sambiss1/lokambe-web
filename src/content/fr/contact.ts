import {CONTACT_EMAIL, SITE_DOMAIN} from '@/lib/brand';
import type {ContactContent} from '../types';

export const contact: ContactContent = {
  meta: {
    title: 'Contact',
    description: 'Contactez l’équipe LOKAMBE à Kinshasa.',
  },
  hero: {
    eyebrow: 'Contact',
    title: 'Parlons de votre projet',
    intro: 'Une question, une proposition de partenariat ou une demande d’information ? L’équipe LOKAMBE vous répond.',
    image: {src: '/images/contact-hero.webp', alt: 'Poignée de main entre deux entrepreneurs'},
  },
  details: {
    title: 'Coordonnées',
    items: [
      {label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`},
      {label: 'Site web', value: SITE_DOMAIN, href: `https://${SITE_DOMAIN}`},
      {label: 'Localisation', value: 'Kinshasa, République démocratique du Congo'},
    ],
  },
  form: {title: 'Écrivez-nous'},
};
