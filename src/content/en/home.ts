import type {HomeContent} from '../types';

export const home: HomeContent = {
  meta: {
    title: 'Congolese private investment fund',
    description:
      'LOKAMBE invests in small and medium-sized enterprises, micro-businesses and income-generating activities in the DRC, creates companies and supports them as they grow.',
  },
  hero: {
    eyebrow: 'Private capital at the service of Congolese entrepreneurship',
    // Proverbe lingala, gardé tel quel : c'est le slogan de la marque.
    titleLines: ['Musapi moko', 'esokolaka', 'elongi te.'],
    tagline: 'Invest. Create. Support. Grow. Reinvest.',
    intro:
      'A Congolese private fund for investing in, creating and supporting small and medium-sized enterprises, micro-businesses and income-generating activities.',
    image: {src: '/images/home-hero.webp', alt: 'Shopkeeper standing in her neighbourhood store, surrounded by her goods'},
    primary: {label: 'Submit a project', href: '/soumettre-un-projet'},
    secondary: {label: 'Discover us', href: '/a-propos'},
    cards: {
      step: {label: 'On the ground', title: 'Visit', text: 'We come and see the business, and understand it, before we invest.'},
      sector: {label: 'Priority sector', title: 'Trade and distribution'},
      place: {label: 'Beyond capital', title: 'Support'},
    },
  },
  marquee: ['Invest', 'Create', 'Support', 'Grow', 'Reinvest'],
  statement: {
    quote: 'We do not give. We invest.',
    text: 'Capital is a lever for creating value. It should allow a business to get organised, produce more, generate revenue, create jobs, build up capital and, in time, help finance new economic opportunities itself.',
  },
  facts: {
    eyebrow: 'LOKAMBE at a glance',
    title: 'A fund built to last',
    items: [
      {value: 7, label: 'priority sectors', text: 'From restaurants to media, by way of trade, services and training.'},
      {value: 3, label: 'ways of stepping in', text: 'Invest in a business, create a new one, support its growth.'},
      {value: 5, label: 'areas of support', text: 'Finance, sales, marketing, operations and human resources.'},
    ],
  },
  functions: {
    eyebrow: 'Our model',
    title: 'Capital that circulates',
    intro:
      'The LOKAMBE model rests on two complementary pillars — investing and creating — and one function that runs through both: supporting. Capital that comes back finances new opportunities.',
    items: [
      {
        title: 'Invest',
        text: 'Identify and finance entrepreneurs and companies with genuine economic and financial potential.',
      },
      {
        title: 'Create',
        text: 'Identify market needs and create companies directly, in sectors that can be profitable, can grow and can be replicated.',
      },
      {
        title: 'Support',
        text: 'Give the companies we finance or create the skills, tools, networks and resources they need to develop.',
      },
    ],
    cycle: ['Invest', 'Create', 'Support', 'Grow', 'Reinvest'],
    cycleLabel: 'The LOKAMBE capital cycle',
  },
  sectors: {
    eyebrow: 'Priority sectors',
    title: 'Where we focus our efforts',
    intro: 'We concentrate on a limited number of sectors, so that we truly know them.',
    items: [
      {
        title: 'Restaurants and catering',
        text: 'Restaurants, fast food, caterers, event catering and specialised concepts.',
        tags: ['Restaurants', 'Fast food', 'Caterers'],
        image: {src: '/images/sector-restauration.webp', alt: 'Chef cooking over the flames in a restaurant kitchen'},
      },
      {
        title: 'Food crafts and processing',
        text: 'Bakery, pastry, chocolate making, food production, processing and packaging.',
        tags: ['Bakery', 'Pastry', 'Processing'],
        image: {src: '/images/sector-metiers-de-bouche.webp', alt: 'Young pastry chef presenting a decorated cake in her workshop'},
      },
      {
        title: 'Trade and distribution',
        text: 'Neighbourhood shops, specialised stores, distribution and food products.',
        tags: ['Local shops', 'Stores', 'Distribution'],
        image: {src: '/images/sector-commerce.webp', alt: 'Market seller holding tomatoes at her stall'},
      },
      {
        title: 'Events',
        text: 'Furniture and equipment rental, sound, lighting, decoration and logistics.',
        tags: ['Furniture', 'Sound', 'Decoration'],
        image: {src: '/images/sector-evenementiel.webp', alt: 'Long banquet table decorated with flowers for a reception'},
      },
      {
        title: 'Services',
        text: 'Maintenance, cleaning, logistics, business services and specialised services.',
        tags: ['Maintenance', 'Cleaning', 'Logistics'],
        image: {src: '/images/sector-services.webp', alt: 'Smiling repairer holding a bicycle wheel in his workshop'},
      },
      {
        title: 'Media and entertainment',
        text: 'Audiovisual production, digital media, content creation, music production, studios and equipment, creative agencies and cultural formats that can be replicated.',
        tags: ['Audiovisual', 'Music', 'Content creation'],
        image: {src: '/images/sector-medias.webp', alt: 'Camera operator behind his camera and monitors in a production studio'},
      },
      {
        title: 'Education and training',
        text: 'Vocational training centres, technical and trade training, entrepreneurship and management training, educational publishing, equipment for schools.',
        tags: ['Training', 'Trades', 'Educational publishing'],
        image: {src: '/images/sector-education.webp', alt: 'Trainer explaining to his apprentices in a carpentry workshop'},
      },
    ],
    link: {label: 'See the sectors', href: '/secteurs-et-criteres'},
  },
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'The companies we support',
    intro:
      'Every company financed or created by LOKAMBE joins this portfolio. Click on a company to see its sector and how far the project has come.',
    items: [
      {id: 'entreprise-1', name: 'Company 1'},
      {id: 'entreprise-2', name: 'Company 2'},
      {id: 'entreprise-3', name: 'Company 3'},
      {id: 'entreprise-4', name: 'Company 4'},
      {id: 'entreprise-5', name: 'Company 5'},
      {id: 'entreprise-6', name: 'Company 6'},
    ],
    detail: {sectorLabel: 'Sector', statusLabel: 'Project status', pending: 'To be confirmed', close: 'Close'},
    empty: 'The first companies in the portfolio will be presented here.',
  },
  partners: {
    eyebrow: 'Partners',
    title: 'Those moving forward with us',
    intro: 'Financial, technical and institutional partners. Click on a partner to see their role.',
    items: [
      {id: 'partenaire-1', name: 'Partner 1'},
      {id: 'partenaire-2', name: 'Partner 2'},
      {id: 'partenaire-3', name: 'Partner 3'},
      {id: 'partenaire-4', name: 'Partner 4'},
      {id: 'partenaire-5', name: 'Partner 5'},
    ],
    detail: {sectorLabel: 'Type of partnership', statusLabel: 'Since', pending: 'To be confirmed', close: 'Close'},
    empty: 'LOKAMBE’s partners will be presented here.',
  },
  formalisation: {
    eyebrow: 'Formalisation',
    title: 'Bringing the real economy into the formal sector',
    intro:
      'A large share of Congolese economic activity remains informal. Investing also means helping a business get organised, and making its growth measurable.',
    items: [
      {
        title: 'Organise before financing',
        text: 'Bookkeeping, cash register, stock and procedures: we help the entrepreneur put the business in order — the condition for capital to be well used.',
      },
      {
        title: 'Support registration',
        text: 'Trade register, tax identification, contracts and articles of association: formalisation becomes a step in the growth plan, not a barrier to entry.',
      },
      {
        title: 'Make the business financeable',
        text: 'An organised company gains easier access to credit, suppliers, public and private markets, and can hire for the long term.',
      },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'Capital is not enough',
    intro: 'Every investment comes with concrete support, on the subjects that make a company grow.',
    items: [
      {title: 'Finance', text: 'Bookkeeping, cash flow and margin tracking.'},
      {title: 'Sales', text: 'Pricing, customers and distribution.'},
      {title: 'Marketing', text: 'Brand, communication and digital presence.'},
      {title: 'Operations', text: 'Stock, purchasing and quality.'},
      {title: 'Human resources', text: 'Recruitment, organisation and management.'},
    ],
  },
  pilot: {
    eyebrow: 'Our commitment',
    title: 'What an investment changes',
    paragraphs: [
      'We invest in real businesses, alongside the entrepreneurs who run them day after day. Capital serves to produce more, sell more and employ more.',
    ],
    image: {src: '/images/home-kinshasa.webp', alt: 'Kinshasa boulevard with yellow taxis and motorbikes'},
    overlay: 'DRC.',
    points: [
      {
        label: 'What we finance',
        title: 'Equipment and stock',
        text: 'Machines, tools, raw materials and working capital.',
      },
      {
        label: 'What we bring',
        title: 'Support',
        text: 'Skills, tools and a network, alongside the entrepreneur.',
      },
      {
        label: 'What we aim for',
        title: 'Solid companies',
        text: 'Better organised, more independent, creating jobs and income.',
      },
    ],
    closing: 'We invest in those who are already building.',
  },
  faq: {
    eyebrow: 'Frequently asked questions',
    title: 'Something you would like to know?',
    items: [
      {
        question: 'Who can submit a project to LOKAMBE?',
        answer:
          'Entrepreneurs running a real business in the DRC: small and medium-sized enterprises, micro-businesses or income-generating activities, with identifiable customers and a precise need.',
      },
      {
        question: 'My business is not formally registered. Can I still apply?',
        answer:
          'Yes. An informal business with economic potential can be supported as it gets organised and registered.',
      },
      {
        question: 'Which sectors are priorities?',
        answer:
          'Restaurants and catering, food crafts and processing, trade and distribution, events, services, media and entertainment, education and training.',
      },
      {
        question: 'Does LOKAMBE make donations or give grants?',
        answer:
          'No. We do not give, we invest: capital is committed alongside the entrepreneur, and always comes with support.',
      },
    ],
    contactText: 'Another question? Our team will answer you.',
    contact: {label: 'Contact us', href: '/contact'},
  },
  cta: {
    title: 'Running a business that deserves to grow?',
    text: 'Tell us about your project: we study every application carefully, on the ground as well as in the figures.',
    primary: {label: 'Submit a project', href: '/soumettre-un-projet'},
    secondary: {label: 'Discover us', href: '/a-propos'},
    image: {src: '/images/cta-entrepreneur.webp', alt: 'Young woman entrepreneur in an orange blazer'},
  },
};
