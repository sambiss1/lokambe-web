import Link from 'next/link';
import {cabinetGrotesk} from './fonts';
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={cabinetGrotesk.variable}>
      <body className="grid min-h-screen place-items-center bg-lokambe-blue p-8 font-sans text-white">
        <div className="text-center">
          <p className="text-7xl font-extrabold">404</p>
          <h1 className="mt-4 text-2xl font-bold uppercase">Page introuvable</h1>
          <Link href="/fr" className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-bold text-lokambe-blue">
            Retour à l’accueil
          </Link>
        </div>
      </body>
    </html>
  );
}
