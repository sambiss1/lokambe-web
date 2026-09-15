import {render} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import type {ReactElement} from 'react';
import type {Locale} from '@/i18n/locales';
import en from '../../messages/en.json';
import fr from '../../messages/fr.json';

const messages = {fr, en};

export function renderWithIntl(ui: ReactElement, locale: Locale = 'fr') {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="Africa/Kinshasa">
      {ui}
    </NextIntlClientProvider>,
  );
}
