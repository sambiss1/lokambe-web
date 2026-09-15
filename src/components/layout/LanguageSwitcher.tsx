'use client';

import {useLocale, useTranslations} from 'next-intl';
import {enabledLocales} from '@/i18n/locales';
import {Link, usePathname} from '@/i18n/navigation';
import {cx} from '@/lib/cx';

/** Sélecteur de langue, masqué tant qu'une seule langue est activée. */
export function LanguageSwitcher({tone = 'blue'}: {tone?: 'blue' | 'white'}) {
  const t = useTranslations('language');
  const locale = useLocale();
  const pathname = usePathname();

  if (enabledLocales.length < 2) return null;

  return (
    <nav aria-label={t('label')} className="hidden items-center gap-1 text-sm font-bold uppercase sm:flex">
      {enabledLocales.map((code) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          lang={code}
          aria-label={t(code)}
          aria-current={code === locale ? 'true' : undefined}
          className={cx(
            'grid size-9 place-items-center rounded-full transition-colors',
            tone === 'white' ? 'text-white hover:bg-white/15' : 'text-lokambe-blue hover:bg-lokambe-peach-soft',
            code === locale && (tone === 'white' ? 'bg-white/15' : 'bg-lokambe-peach-soft'),
          )}
        >
          {code}
        </Link>
      ))}
    </nav>
  );
}
