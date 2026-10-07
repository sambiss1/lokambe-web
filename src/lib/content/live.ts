import {listCollection, localized} from '@/lib/api/content';
import type {ApiFaqEntry, ApiJobPosting, ApiPartner, ApiPortfolioCompany, ApiTeamMember} from '@/lib/api/content-types';
import type {ContractType as ApiContractType} from '@/lib/constants';
import {entryImageUrl} from '@/lib/media/url';
import type {ContractType, JobPosting} from '@/content/careers';
import type {TeamRoleCard} from '@/content/team';
import type {FaqContent, LogoEntry, LogoWallContent} from '@/content/types';

/**
 * Le contenu éditorial du site, lu dans l'API quand elle en a, repris du code
 * sinon.
 *
 * **Le repli n'est pas une précaution de confort.** Le portefeuille, l'équipe
 * et les questions fréquentes sont déjà en ligne : si l'API ne répond pas, ou
 * si une collection est vide, le site doit afficher ce qu'il affichait hier,
 * pas une page amputée. Chaque fonction reçoit donc le contenu statique en
 * second argument et le rend tel quel dès que l'API n'a rien à dire.
 *
 * L'anglais complète le français champ par champ (`localized`) : une traduction
 * à moitié faite donne une page cohérente, pas des trous.
 */

/**
 * Le type de contrat de l'API vers le libellé affiché par la page Carrières.
 * La table est typée sur l'union du contenu statique : ajouter un type côté API
 * sans libellé ici ne compile pas.
 */
const CONTRACT_LABELS: Record<ApiContractType, ContractType> = {
  cdi: 'CDI',
  cdd: 'CDD',
  stage: 'Stage',
  consultance: 'Consultance',
  alternance: 'Alternance',
};

/** L'ordre vient de l'API (rang d'affichage) : on ne retrie pas ici. */
function toLogoEntry(company: ApiPortfolioCompany, locale: string): LogoEntry {
  const text = localized(company.fr, company.en, locale);
  return {
    id: company.slug,
    name: company.name,
    logo: entryImageUrl(company),
    sector: text.sector,
    status: text.status,
    text: text.description,
    href: company.websiteUrl,
  };
}

export async function livePortfolio(locale: string, fallback: LogoWallContent): Promise<LogoWallContent> {
  const companies = await listCollection('portfolio');
  if (companies.length === 0) return fallback;
  return {...fallback, items: companies.map((company) => toLogoEntry(company, locale))};
}

export async function livePartners(locale: string, fallback: LogoWallContent): Promise<LogoWallContent> {
  const partners = await listCollection('partners');
  if (partners.length === 0) return fallback;
  return {
    ...fallback,
    items: partners.map((partner: ApiPartner) => {
      const text = localized(partner.fr ?? {}, partner.en, locale);
      return {
        id: partner.slug,
        name: partner.name,
        logo: entryImageUrl(partner),
        text: text.description,
        href: partner.websiteUrl,
      };
    }),
  };
}

export async function liveTeamRoles(locale: string, fallback: TeamRoleCard[]): Promise<TeamRoleCard[]> {
  const members = await listCollection('team');
  if (members.length === 0) return fallback;
  return members.map((member: ApiTeamMember) => {
    const text = localized(member.fr, member.en, locale);
    const src = entryImageUrl(member);
    return {
      slug: member.slug,
      name: member.name,
      title: text.title,
      initials: member.initials,
      summary: text.summary,
      photo: {
        // Sans portrait, le composant affiche le monogramme et ne lit pas `src`.
        src: src ?? '',
        alt: text.photoAlt ?? text.title,
        ready: Boolean(src),
      },
    };
  });
}

export async function liveJobs(locale: string, fallback: JobPosting[]): Promise<JobPosting[]> {
  const postings = await listCollection('jobs');
  if (postings.length === 0) return fallback;
  return postings.map((posting: ApiJobPosting) => {
    const text = localized(posting.fr, posting.en, locale);
    return {
      slug: posting.slug,
      title: text.title,
      location: posting.location,
      contractType: CONTRACT_LABELS[posting.contractType],
      summary: text.summary,
      missions: text.missions,
      profile: text.profile,
    };
  });
}

export async function liveFaq(locale: string, fallback: FaqContent): Promise<FaqContent> {
  const entries = await listCollection('faq');
  if (entries.length === 0) return fallback;
  return {
    ...fallback,
    items: entries.map((entry: ApiFaqEntry) => {
      const text = localized(entry.fr, entry.en, locale);
      return {question: text.question, answer: text.answer};
    }),
  };
}
