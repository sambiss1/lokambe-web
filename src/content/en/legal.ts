import {CONTACT_EMAIL, SITE_DOMAIN} from '@/lib/brand';
import type {LegalContent} from '../types';

export const legalNotice: LegalContent = {
  meta: {title: 'Legal notice', description: 'Legal notice for the LOKAMBE website.'},
  title: 'Legal notice',
  updatedLabel: 'Last updated',
  updatedAt: '28 September 2026',
  sections: [
    {
      title: 'Publisher',
      paragraphs: [
        `The site ${SITE_DOMAIN} is published by LOKAMBE, a Congolese private fund for investing in, creating and supporting small and medium-sized enterprises and income-generating activities, based in Kinshasa, Democratic Republic of the Congo.`,
        `Contact: ${CONTACT_EMAIL}`,
      ],
    },
    {
      title: 'Hosting',
      paragraphs: [
        'The site is hosted by Vercel Inc. (vercel.com), United States. The administration interface and the API behind it are hosted by Railway Corp. (railway.com), United States.',
        'Data sent through the forms, attachments included, is stored in a MongoDB database hosted in the United States. Transactional emails are sent through ZeptoMail (Zoho Corporation).',
      ],
    },
    {
      title: 'Intellectual property',
      paragraphs: [
        'The texts, the logo, the visual identity and the motto “Musapi moko esokolaka elongi te.” are the property of LOKAMBE. Any reproduction without prior permission is forbidden.',
        'The photographs come from royalty-free image libraries; their credits are available on request.',
      ],
    },
    {
      title: 'Nature of the information',
      paragraphs: [
        'The information published on this site presents LOKAMBE’s model and orientations. It constitutes neither an offer of financing, nor a solicitation to invest, nor financial advice.',
        'Any involvement by LOKAMBE is subject to its prior review and to its decision.',
      ],
    },
  ],
};

export const privacy: LegalContent = {
  meta: {
    title: 'Privacy policy',
    description: 'How LOKAMBE collects, uses and protects your personal data.',
  },
  title: 'Privacy policy',
  updatedLabel: 'Last updated',
  updatedAt: '28 September 2026',
  sections: [
    {
      title: 'Data collected',
      paragraphs: [
        'When you submit a project, we collect your contact details (first name, last name, phone, optional email, city, commune), information about your business and your financing need, and the documents you attach.',
        'When you use the contact form, we collect your name, your organisation, your contact details and your message.',
      ],
    },
    {
      title: 'Purpose',
      paragraphs: [
        'This data is used solely to study your application, to get back to you and to answer your requests. It is never sold, and never used for advertising.',
      ],
    },
    {
      title: 'Who has access',
      paragraphs: [
        'Your data is accessible only to the people at LOKAMBE in charge of studying your application. Outside experts may have access in that same context, under a confidentiality undertaking.',
      ],
    },
    {
      title: 'How long we keep it',
      paragraphs: [
        'Applications that are not taken forward, and messages, are kept for 3 years after the last exchange. Applications that led to an investment are kept for the whole duration of the relationship, then in line with the applicable legal obligations.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: [
        `You can ask to access, correct or delete your data at any time by writing to ${CONTACT_EMAIL}, giving your application reference if you have one.`,
      ],
    },
    {
      title: 'Cookies',
      paragraphs: [
        'The public site uses neither advertising cookies nor analytics trackers. A technical cookie is used only for the administration area reserved for the LOKAMBE team.',
      ],
    },
  ],
};
