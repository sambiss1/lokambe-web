import type {SectorsContent} from '../types';

export const sectors: SectorsContent = {
  meta: {
    title: 'Sectors',
    description: 'The seven sectors LOKAMBE invests in, and the profile of the companies we look for.',
  },
  hero: {
    eyebrow: 'Sectors',
    title: 'From kitchens to studios, from the counter to the classroom.',
    intro:
      'Restaurants and catering, food crafts, trade, events, services, media, education: these are the seven sectors LOKAMBE invests in, and the kind of company we look for in them.',
    image: {src: '/images/sectors-marche.webp', alt: 'Smiling shopkeeper at her stall of fabrics and accessories'},
  },
  thesis: {
    eyebrow: 'Investment thesis',
    title: 'What we look at before investing',
    intro:
      'The sector alone is not enough. Within each of them, we look for companies that bring together several of these conditions.',
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
    eyebrow: 'Our sectors, in detail',
    title: 'Where we invest',
    intro:
      'Seven sectors, chosen because they answer real demand in Kinshasa and elsewhere in the DRC, and because a company can grow in them without having to reinvent everything. Here is what each one covers.',
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
      'This list is not fixed: it will widen as the portfolio, the team and our knowledge of the ground grow.',
  },
  profile: {
    eyebrow: 'The profile we look for',
    title: 'What an application we take forward looks like',
    intro: 'Whatever the sector, here is what we look at first:',
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
    note: 'Your business is not formally registered yet? That is not a reason to say no. An informal business with economic potential can be supported as it gets organised and registered, before or during our involvement.',
  },
};
