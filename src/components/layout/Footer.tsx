import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {CONTACT_EMAIL, SITE_DOMAIN, SLOGAN} from '@/lib/brand';
import {ButtonLink} from '../ui/Button';
import {Container} from '../ui/Container';
import {Logo} from '../ui/Logo';
import {APPLY_HREF, MAIN_NAV} from './nav';

export function Footer() {
  const t = useTranslations('nav');
  const tf = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <Container className="pt-20 pb-10 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p lang="ln" className="display max-w-[12ch] text-[clamp(2.25rem,5vw,4rem)] text-lokambe-peach">
              {SLOGAN}
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">{tf('description')}</p>
            <ButtonLink href={APPLY_HREF} variant="white" size="lg" className="mt-8">
              {t('apply')}
            </ButtonLink>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {MAIN_NAV.filter((entry) => entry.kind === 'group').map((group) => (
              <div key={group.key}>
                <h2 className="text-sm font-medium text-white/50">{t(group.key)}</h2>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.key}>
                      <FooterLink href={item.href}>{t(item.key)}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="text-sm font-medium text-white/50">{tf('engageTitle')}</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <FooterLink href="/impact">{t('impact')}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/investisseurs-et-partenaires">{t('investors')}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">{t('contact')}</FooterLink>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <h2 className="text-sm font-medium text-white/50">{tf('contactTitle')}</h2>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 inline-block text-[clamp(1.5rem,3vw,2.25rem)] font-bold underline decoration-white/25 decoration-2 underline-offset-8 transition-colors hover:text-lokambe-peach hover:decoration-lokambe-peach"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-3 flex items-center gap-2.5 text-white/60">
                <span className="relative flex size-2.5">
                  <span className="absolute inset-0 animate-pulse-dot rounded-full bg-lokambe-red" />
                  <span className="relative size-2.5 rounded-full bg-lokambe-red" />
                </span>
                {tf('pilot')}
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pt-6">
        <Logo tone="white" className="w-full opacity-[0.97]" />
      </Container>

      <Container className="flex flex-col gap-4 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>{tf('rights', {year})}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <FooterLink href="/mentions-legales" small>
              {tf('legalNotice')}
            </FooterLink>
          </li>
          <li>
            <FooterLink href="/confidentialite" small>
              {tf('privacy')}
            </FooterLink>
          </li>
          <li>{SITE_DOMAIN}</li>
        </ul>
      </Container>
    </footer>
  );
}

function FooterLink({href, children, small}: {href: string; children: React.ReactNode; small?: boolean}) {
  return (
    <Link
      href={href}
      className={
        small
          ? 'transition-colors hover:text-white'
          : 'group inline-flex items-center gap-2 text-lg font-medium text-white/85 transition-colors hover:text-white'
      }
    >
      {children}
      {!small && (
        <span className="h-1.5 w-0 rounded-full bg-lokambe-red transition-[width] duration-300 group-hover:w-4" />
      )}
    </Link>
  );
}
