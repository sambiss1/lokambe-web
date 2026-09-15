import type {ReactNode} from 'react';
import {cabinetGrotesk} from './fonts';
import './globals.css';

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="fr" className={cabinetGrotesk.variable}>
      <body className="bg-white font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
