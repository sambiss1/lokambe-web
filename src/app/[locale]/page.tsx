import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('metadata');
  return <h1 className="p-8 text-4xl font-extrabold text-lokambe-blue">{t('defaultTitle')}</h1>;
}
