import type {AboutContent} from '../types';

export const about: AboutContent = {
  meta: {
    title: 'About',
    description:
      'The problem LOKAMBE set out to solve, what we believe, and our vision and mission for Congolese entrepreneurship.',
  },
  hero: {
    eyebrow: 'About',
    title: 'The talent is here. Capital must follow.',
    intro:
      'Across the DRC, entrepreneurs run profitable businesses they have no way of growing. LOKAMBE was created to bring them both missing pieces: productive capital, and someone standing beside them.',
    image: {src: '/images/about-hero.webp', alt: 'Tailor sewing at his machine'},
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Profitable businesses that never change scale',
    paragraphs: [
      'The DRC has a great many economic activities run by Congolese entrepreneurs. Restaurants, shops, workshops, bakeries, pastry shops, services, farming, food processing, transport, crafts, events, local trade and digital businesses all create income and economic activity every single day.',
      'Yet a large share of these ventures remains at the stage of a one-person activity, and rarely crosses over into a structured company.',
      'A restaurant owner may have loyal customers and still be unable to open a second place. A pastry chef may sell every day and still be unable to buy professional equipment. A shopkeeper may face strong demand and still lack working capital. An events company may win contracts and still have to rent its equipment for every job.',
      'So the problem is not always the absence of a market. It can simply be a shortage of productive capital and of structure.',
    ],
    obstacles: {
      title: 'Financing that rarely fits',
      intro: 'Small companies commonly run into:',
      items: [
        'No sufficient collateral',
        'A limited financial track record',
        'Little formal registration',
        'Bookkeeping that is not structured enough',
        'Difficult access to conventional financing',
        'High financing costs',
        'A financial offer poorly suited to their reality',
      ],
    },
    closing: [
      'Financing alone is not enough. A company can receive capital and still fail if it does not master its costs, stock, cash, prices, margins, purchasing, staff or sales development. That is why LOKAMBE combines capital, financial discipline and hands-on support.',
      'Some companies can also become more competitive by sharing certain resources: purchasing groups, equipment, production space, platforms, distribution networks or shared services. LOKAMBE may develop or support such arrangements where pooling genuinely improves productivity and profitability.',
    ],
  },
  convictions: {
    eyebrow: 'What we believe',
    title: 'The convictions we work from',
    intro: 'LOKAMBE rests on six core convictions.',
    items: [
      {
        title: 'Ideas are not what is missing',
        text: 'Congolese entrepreneurs do not lack ideas. What they often lack are the means and the structures to turn those ideas, or those activities, into solid companies.',
      },
      {
        title: 'Capital must be productive',
        text: 'An investment should make it possible to produce more, sell more, improve productivity or create new assets.',
      },
      {
        title: 'Capital must come with support',
        text: 'Money without discipline, skills and follow-up can be misused very quickly.',
      },
      {
        title: 'The ground matters as much as the figures',
        text: 'An investment decision has to rest on financial analysis, but also on a concrete understanding of the business, its customers, its suppliers and its environment.',
      },
      {
        title: 'Opportunities can be created',
        text: 'LOKAMBE should not only wait for the entrepreneurs who come looking for financing. It should also spot needs and build entrepreneurial answers itself.',
      },
      {
        title: 'Profitability and impact reinforce each other',
        text: 'A profitable company can create jobs, develop suppliers, raise incomes and stimulate the local economy.',
      },
    ],
  },
  vision: {
    eyebrow: 'Vision and mission',
    title: 'Where we are heading',
    items: [
      {
        title: 'Vision',
        text: 'To build a portfolio of Congolese companies that are solid, profitable, well organised, able to grow and creating jobs.',
      },
      {
        title: 'Mission',
        text: 'To identify, finance, create and support companies able to produce lasting value in the Democratic Republic of the Congo.',
      },
      {
        title: 'Ambition',
        text: 'To make private capital a genuine engine for creating companies and transforming the Congolese economy.',
      },
    ],
  },
  conclusion: {
    eyebrow: 'Our answer',
    title: 'Using capital to build companies',
    paragraphs: [
      'Our answer is not to hand out money. Our answer is to use capital to build companies.',
    ],
    pillars: [
      'Invest in those who are already building.',
      'Create what deserves to be developed.',
      'Support those who want to grow.',
      'Bring solid companies into being.',
      'Reinvest to create more.',
    ],
    evolutionTitle: 'LOKAMBE wants to help move',
    evolution: ['The activity', 'The company', 'The SME', 'The expansion', 'The group', 'A lasting economic base'],
    closing: [
      'Through this approach, LOKAMBE intends to take part in the rise of a Congolese economic fabric that is more formal, more productive, more competitive and financed to a greater extent by private capital.',
      'The ambition is to help build an economy in which Congolese capital finances more of the Congolese economy, Congolese entrepreneurs build more Congolese companies, and Congolese companies create more value in the DRC.',
    ],
  },
  cta: {
    title: 'Let us build together',
    text: 'Entrepreneur, investor, partner or expert: join the LOKAMBE momentum.',
    primary: {label: 'Submit a project', href: '/soumettre-un-projet'},
    secondary: {label: 'Our team', href: '/notre-equipe'},
  },
};
