import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="grid min-h-[60vh] place-items-center bg-lokambe-blue px-4 py-24 text-white">
      <div className="text-center">
        <p className="text-7xl font-extrabold md:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-bold uppercase md:text-4xl">{t('title')}</h1>
        <p className="mt-4 text-lg text-white/85">{t('text')}</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-bold uppercase text-lokambe-blue">
          {t('back')}
        </Link>
      </div>
    </section>
  );
}
