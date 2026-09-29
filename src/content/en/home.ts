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
      sector: {label: 'Priority sector', title: 'Trade and distribution'},
      place: {label: 'Beyond capital', title: 'Support'},
      pillars: {label: 'What sets us apart', title: 'Invest · Create · Support'},
    },
  },
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
    title: 'Growing with us.',
    intro:
      'Seven companies financed or created by LOKAMBE. Click on one of them to see what it does, its sector and how far along the project is.',
    items: [
      {
        id: 'bradamada',
        name: 'Bradamada',
        logo: '/images/portfolio/bradamada.webp',
        sector: 'Restaurants and catering',
        status: 'In development',
        text: 'An experiential fast-food concept that turns the world, personality and identity of public figures into unique, immersive and memorable culinary experiences.',
      },
      {
        id: 'sitini',
        name: 'Sitini',
        logo: '/images/portfolio/sitini.webp',
        sector: 'Restaurants and catering',
        status: 'On hold',
        text: 'A chain of modern malewa serving authentic Congolese cooking — generous, affordable and popular — in a warm, contemporary setting.',
      },
      {
        id: 'jaiant',
        name: 'JAIANT',
        logo: '/images/portfolio/jaiant.webp',
        sector: 'Food crafts',
        status: 'In development',
        text: 'A brand built around ice cream, popsicles and frozen creations, with an indulgent, inventive and affordable range. It reworks frozen treats through original recipes, flavours drawn from Congolese produce and surprising combinations, in a young, playful and popular world.',
      },
      {
        id: 'lecap',
        name: 'LECAP',
        logo: '/images/portfolio/lecap.webp',
        sector: 'Media and entertainment',
        status: 'In development',
        text: 'A media outlet covering politics, governance and public affairs, decoding how power works and what is at stake in public life.',
      },
      {
        id: 'mololo',
        name: 'Mololo',
        logo: '/images/portfolio/mololo.webp',
        sector: 'Media and entertainment',
        status: 'Under way',
        text: 'A media outlet covering culture, the arts, creators and the Congolese cultural and creative industries, shining a light on the talent, trends and ventures shaping that scene.',
      },
      {
        id: 'congolicious',
        name: 'Congolicious',
        logo: '/images/portfolio/congolicious.webp',
        sector: 'Media and entertainment',
        status: 'Under way',
        text: 'A platform devoted to travel, lifestyle, food and discovering the Democratic Republic of the Congo, showcasing its destinations, heritage, culture and way of life.',
      },
      {
        id: 'grand-mololo',
        name: 'Grand Mololo',
        logo: '/images/portfolio/grand-mololo.webp',
        sector: 'Media and entertainment',
        status: 'Under way',
        text: 'A multidisciplinary creative house working across audiovisual production, events, marketing, communication and strategic advice. It works alongside brands, institutions, companies and talent to design and deliver high-impact projects.',
      },
    ],
    detail: {sectorLabel: 'Sector', statusLabel: 'Project status', pending: 'To be confirmed', close: 'Close'},
    empty: 'The first companies in the portfolio will be presented here.',
  },
  partners: {
    eyebrow: 'Partners',
    title: 'Those moving forward with us',
    intro: 'The partners supporting LOKAMBE as it grows.',
    items: [{id: 'niwali', name: 'NIWALI', logo: '/images/partners/niwali.webp'}],
    detail: {sectorLabel: 'Type of partnership', statusLabel: 'Since', pending: 'To be confirmed', close: 'Close'},
    empty: 'LOKAMBE’s partners will be presented here.',
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
      'A large share of Congolese economic activity remains informal. Investing also means helping a business get organised, and making its growth measurable.',
    ],
    image: {src: '/images/home-kinshasa.webp', alt: 'Kinshasa boulevard with yellow taxis and motorbikes'},
    overlay: 'DRC.',
    // The three formalisation texts, moved here at the client's request on
    // 29 September. Same titles and descriptions as the Impact page; only the
    // kickers above them are new, the timeline needs one per step.
    points: [
      {
        label: 'Where we start',
        title: 'Organise before financing',
        text: 'Bookkeeping, cash register, stock and procedures: we help the entrepreneur put the business in order — the condition for capital to be well used.',
      },
      {
        label: 'What we support',
        title: 'Support formalisation',
        text: 'Trade register, tax identification, contracts and articles of association: formalisation becomes a step in the growth plan, not a barrier to entry.',
      },
      {
        label: 'What we aim for',
        title: 'Help the business grow',
        text: 'An organised company gains easier access to credit, suppliers, public and private markets, and can hire for the long term.',
      },
    ],
    closing: 'We invest in those who are already building.',
  },
};
