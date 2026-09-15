import localFont from 'next/font/local';

export const cabinetGrotesk = localFont({
  src: [
    {path: '../fonts/CabinetGrotesk-Regular.woff2', weight: '400', style: 'normal'},
    {path: '../fonts/CabinetGrotesk-Medium.woff2', weight: '500', style: 'normal'},
    {path: '../fonts/CabinetGrotesk-Bold.woff2', weight: '700', style: 'normal'},
    {path: '../fonts/CabinetGrotesk-Extrabold.woff2', weight: '800', style: 'normal'},
  ],
  variable: '--font-cabinet-grotesk',
  display: 'swap',
});
