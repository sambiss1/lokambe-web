import {defineRouting} from 'next-intl/routing';
import {DEFAULT_LOCALE, enabledLocales} from './locales';

export const routing = defineRouting({
  locales: enabledLocales,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
  localeDetection: false,
});
