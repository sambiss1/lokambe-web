import {CONTACT_EMAIL, SITE_DOMAIN} from '@/lib/brand';
import type {LegalContent} from '../types';

export const legalNotice: LegalContent = {
  meta: {title: 'Mentions légales', description: 'Mentions légales du site LOKAMBE.'},
  title: 'Mentions légales',
  updatedLabel: 'Dernière mise à jour',
  updatedAt: '15 septembre 2026',
  sections: [
    {
      title: 'Éditeur du site',
      paragraphs: [
        `Le site ${SITE_DOMAIN} est édité par LOKAMBE, fonds privé congolais d’investissement, de création et d’accompagnement des petites et moyennes entreprises et des activités génératrices de revenus, basé à Kinshasa, République démocratique du Congo.`,
        `Contact : ${CONTACT_EMAIL}`,
      ],
    },
    {
      title: 'Hébergement',
      paragraphs: [
        'Le site et son API sont hébergés par Railway Corp. (railway.com), États-Unis.',
        'Les données transmises via les formulaires, y compris les pièces jointes, sont stockées dans une base MongoDB hébergée sur Railway. Les emails transactionnels sont envoyés via ZeptoMail (Zoho Corporation).',
      ],
    },
    {
      title: 'Propriété intellectuelle',
      paragraphs: [
        'Les textes, le logo, l’identité visuelle et le slogan « Musapi moko esokolaka elongi te. » sont la propriété de LOKAMBE. Toute reproduction sans autorisation préalable est interdite.',
        'Les photographies proviennent de banques d’images libres de droits ; leurs crédits sont disponibles sur demande.',
      ],
    },
    {
      title: 'Nature des informations',
      paragraphs: [
        'Les informations publiées sur ce site présentent le modèle et les orientations de LOKAMBE. Elles ne constituent ni une offre de financement, ni une sollicitation d’investissement, ni un conseil financier.',
        'Toute intervention de LOKAMBE est soumise à son processus d’analyse et à la décision de son Comité d’investissement.',
      ],
    },
  ],
};

export const privacy: LegalContent = {
  meta: {
    title: 'Politique de confidentialité',
    description: 'Comment LOKAMBE collecte, utilise et protège vos données personnelles.',
  },
  title: 'Politique de confidentialité',
  updatedLabel: 'Dernière mise à jour',
  updatedAt: '15 septembre 2026',
  sections: [
    {
      title: 'Données collectées',
      paragraphs: [
        'Lorsque vous soumettez un projet, nous collectons vos coordonnées (nom, prénom, téléphone, email facultatif, ville, commune), les informations sur votre activité et votre besoin de financement, ainsi que les documents que vous joignez.',
        'Lorsque vous utilisez le formulaire de contact, nous collectons votre nom, votre organisation, vos coordonnées et votre message.',
      ],
    },
    {
      title: 'Finalités',
      paragraphs: [
        'Ces données sont utilisées exclusivement pour étudier votre candidature selon le processus d’investissement de LOKAMBE, vous recontacter et répondre à vos demandes. Elles ne sont jamais vendues ni utilisées à des fins publicitaires.',
      ],
    },
    {
      title: 'Destinataires',
      paragraphs: [
        'Vos données sont accessibles uniquement à l’équipe permanente de LOKAMBE et, pour les dossiers qui lui sont soumis, aux membres du Comité d’investissement. Des experts du réseau LOKAMBE peuvent y avoir accès dans le cadre de l’analyse d’un dossier, sous engagement de confidentialité.',
      ],
    },
    {
      title: 'Durée de conservation',
      paragraphs: [
        'Les candidatures non retenues et les messages sont conservés 3 ans après le dernier échange. Les dossiers ayant donné lieu à un investissement sont conservés pendant toute la durée de la relation, puis selon les obligations légales applicables.',
      ],
    },
    {
      title: 'Vos droits',
      paragraphs: [
        `Vous pouvez demander l’accès, la rectification ou la suppression de vos données à tout moment en écrivant à ${CONTACT_EMAIL}, en précisant votre référence de dossier si vous en avez une.`,
      ],
    },
    {
      title: 'Cookies',
      paragraphs: [
        'Le site public n’utilise ni cookies publicitaires ni traceurs de mesure d’audience. Un cookie technique est utilisé uniquement pour l’espace d’administration réservé à l’équipe LOKAMBE.',
      ],
    },
  ],
};
