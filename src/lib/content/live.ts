import {listCollection, localized} from '@/lib/api/content';
import type {
  ApiFaqEntry,
  ApiJobPosting,
  ApiPartner,
  ApiPortfolioCompany,
  ApiTeamMember,
  ApiCity,
  ApiTheme,
} from '@/lib/api/content-types';
import type {ContractType as ApiContractType} from '@/lib/constants';
import {CONTRACT_TYPE_TEXTS} from '@/lib/vocabulary';
import {entryImageUrl} from '@/lib/media/url';
import type {BlogCategory} from '@/content/blog';
import type {JobPosting} from '@/content/careers';
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
 * Le type de contrat de l'API vers le libellé affiché par la page Carrières,
 * **dans la langue de la page**.
 *
 * La page anglaise affichait « CDI » et « Alternance » : des termes du droit
 * français et congolais, que la table de `@/lib/vocabulary` traduit.
 */
function contractLabel(type: ApiContractType, locale: string): string {
  const text = CONTRACT_TYPE_TEXTS[type];
  return locale === 'en' ? text.en : text.fr;
}

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
      contractType: contractLabel(posting.contractType, locale),
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

/**
 * Les thèmes du blog, servis par le back-office.
 *
 * Le repli n'est pas la liste brute de `src/content/blog.ts` mais celle que la
 * page construit depuis ses traductions : sans cela, une API muette ferait
 * perdre l'anglais des huit thèmes d'origine.
 */
export async function liveThemes(
  locale: string,
  fallback: readonly BlogCategory[],
): Promise<readonly BlogCategory[]> {
  const themes = await listCollection('themes');
  if (themes.length === 0) return fallback;
  return themes.map((theme: ApiTheme) => {
    const text = localized(theme.fr, theme.en, locale);
    return {id: theme.slug, label: text.name, short: text.name};
  });
}

/**
 * Les villes proposées par le formulaire de candidature.
 *
 * Le repli est la liste livrée avec le site : un champ obligatoire dont le
 * menu serait vide rendrait le formulaire insoumissible, et une candidature
 * perdue ne revient pas.
 */
export async function liveCities(
  locale: string,
  fallback: readonly string[],
): Promise<readonly string[]> {
  const cities = await listCollection('cities');
  if (cities.length === 0) return fallback;
  return cities.map((city: ApiCity) => localized(city.fr, city.en, locale).name);
}
