export const SUPPORTED_LOCALES = ['fr', 'en'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function parseEnabledLocales(raw: string | undefined): Locale[] {
  const requested = (raw ?? '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(isLocale);

  const others = Array.from(new Set(requested)).filter((locale) => locale !== DEFAULT_LOCALE);
  return [DEFAULT_LOCALE, ...others];
}

export const enabledLocales: Locale[] = parseEnabledLocales(process.env.NEXT_PUBLIC_ENABLED_LOCALES);
