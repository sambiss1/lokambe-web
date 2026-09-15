import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {cabinetGrotesk} from '../fonts';
import '../globals.css';

// Le back-office est hors de `[locale]` : il n'utilise pas next-intl et reste en français.
export const metadata: Metadata = {
  title: {default: 'Back-office', template: '%s · LOKAMBE admin'},
  robots: {index: false, follow: false},
};

export default function AdminRootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="fr" className={cabinetGrotesk.variable}>
      <body className="bg-white font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
