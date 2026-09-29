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
    image: {src: '/images/contact-hero.webp', alt: 'Poignée de main entre deux hommes en extérieur'},
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
  // Les questions fréquentes ont quitté l'accueil le 29 septembre : elles sont
  // ici, juste sous le formulaire, là où le visiteur se pose la question.
  faq: {
    eyebrow: 'Questions fréquentes',
    title: 'Vous vous posez des questions ?',
    items: [
      {
        question: 'Qui peut soumettre un projet à LOKAMBE ?',
        answer:
          'Les entrepreneurs qui développent une activité réelle en RDC : PME, microentreprises ou activités génératrices de revenus, avec une clientèle identifiable et un besoin précis.',
      },
      {
        question: 'Mon activité n’est pas formalisée. Puis-je candidater ?',
        answer:
          'Oui. Une activité informelle qui présente un potentiel économique peut être accompagnée dans sa structuration et sa formalisation.',
      },
      {
        question: 'Quels secteurs sont prioritaires ?',
        answer:
          'La restauration, les métiers de bouche et la transformation alimentaire, le commerce et la distribution, l’événementiel, les services, les médias et le divertissement, l’éducation et la formation.',
      },
      {
        question: 'LOKAMBE fait-il des dons ou des subventions ?',
        answer:
          'Non. Nous ne donnons pas, nous investissons : le capital est engagé aux côtés de l’entrepreneur, et toujours associé à un accompagnement.',
      },
    ],
    // Le bouton ne renvoie plus vers Contact — on y est : il mène au formulaire de candidature.
    contactText: 'Votre question n’est pas là ? Écrivez-nous avec le formulaire ci-dessus, ou présentez-nous directement votre projet.',
    contact: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
  },
};
