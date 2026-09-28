import type {SectorsContent} from '../types';

export const sectors: SectorsContent = {
  meta: {
    title: 'Sectors',
    description: 'LOKAMBE’s seven priority sectors, and the profile of the companies we look for.',
  },
  hero: {
    eyebrow: 'Sectors',
    title: 'How does this company make money?',
    intro: 'That is the basic question LOKAMBE must be able to answer clearly before any investment.',
    image: {src: '/images/sectors-hero.webp', alt: 'Cook preparing pastries in a professional kitchen'},
  },
  thesis: {
    eyebrow: 'Investment thesis',
    title: 'What we look for',
    intro: 'LOKAMBE favours companies that combine several factors.',
    items: [
      {title: 'A real need', text: 'The product or service answers demand that can be identified and is large enough.'},
      {
        title: 'A committed entrepreneur',
        text: 'The entrepreneur genuinely knows the business and takes a direct part in developing it.',
      },
      {
        title: 'Economics we can follow',
        text: 'LOKAMBE must be able to answer one basic question clearly: how does this company make money?',
      },
      {
        title: 'Capital put to productive use',
        text: 'The capital invested must bring a measurable improvement to the business.',
      },
      {
        title: 'Room to grow',
        text: 'The investment must make a visible difference between the situation before and the situation after.',
      },
      {
        title: 'A realistic prospect of return',
        text: 'The investment must offer a realistic possibility of financial return given the risk.',
      },
      {
        title: 'Potential for impact',
        text: 'The company should be able to contribute to creating or securing jobs, generating income, increasing production, bringing suppliers on board and supporting local economic activity.',
      },
    ],
  },
  sectors: {
    eyebrow: 'Priority sectors',
    title: 'Seven priority sectors',
    intro:
      'LOKAMBE concentrates on a limited number of sectors, in order to build real expertise in them.',
    items: [
      {
        title: 'Restaurants and catering',
        items: ['Restaurants', 'Fast food', 'Takeaways', 'Caterers', 'Event catering', 'Specialised concepts'],
      },
      {
        title: 'Food crafts and processing',
        items: ['Bakery', 'Pastry', 'Chocolate making', 'Food production', 'Processing', 'Packaging'],
      },
      {
        title: 'Trade and distribution',
        items: ['Neighbourhood shops', 'Specialised stores', 'Distribution', 'Food products', 'Retail concepts'],
      },
      {
        title: 'Events',
        items: ['Furniture rental', 'Equipment', 'Sound', 'Lighting', 'Decoration', 'Logistics'],
      },
      {
        title: 'Services',
        items: ['Maintenance', 'Cleaning', 'Logistics', 'Business services', 'Specialised services'],
      },
      {
        title: 'Media and entertainment',
        items: [
          'Audiovisual production',
          'Digital media',
          'Content creation',
          'Music production',
          'Studios and equipment',
          'Creative agencies',
        ],
      },
      {
        title: 'Education and training',
        items: [
          'Vocational training centres',
          'Technical and trade training',
          'Entrepreneurship and management training',
          'Educational publishing',
          'Equipment for schools',
        ],
      },
    ],
    closing:
      'LOKAMBE may gradually widen its field as its portfolio, its team and its analytical capacity grow.',
  },
  profile: {
    eyebrow: 'Profile of the companies we look for',
    title: 'The companies we are looking for',
    intro: 'LOKAMBE favours companies that show:',
    items: [
      'A real activity',
      'Existing or demonstrable revenue',
      'Identifiable customers',
      'A clearly identified entrepreneur',
      'A precise need',
      'A clear use for the capital',
      'Room for improvement',
      'Potential for growth',
    ],
    note: 'Being formally registered will not necessarily be the only condition for applying. An informal business with economic potential may be supported as it gets organised and registered, before or during LOKAMBE’s involvement.',
  },
  cta: {
    title: 'Does your business tick these boxes?',
    text: 'Tell us about your project, even if your business is not formally registered yet.',
    primary: {label: 'Submit a project', href: '/soumettre-un-projet'},
    secondary: {label: 'Discover us', href: '/a-propos'},
  },
};
