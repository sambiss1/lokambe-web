import {isLocale, type Locale} from '@/i18n/locales';
import {en} from './en';
import {fr} from './fr';
import type {SiteContent} from './types';

const contents: Record<Locale, SiteContent> = {fr, en};

export function getContent(locale: string): SiteContent {
  return isLocale(locale) ? contents[locale] : contents.fr;
}

export type * from './types';
