import {useTranslations} from 'next-intl';
import {ButtonLink} from '@/components/ui/Button';
import {Container} from '@/components/ui/Container';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="grid min-h-[70vh] place-items-center bg-lokambe-blue px-4 py-32 text-white">
      <Container className="text-center">
        <p className="display text-[clamp(5rem,18vw,12rem)] leading-none text-lokambe-peach">404</p>
        <h1 className="display mt-6 text-[clamp(1.75rem,5vw,3.5rem)]">{t('title')}</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/80">{t('text')}</p>
        <ButtonLink href="/" variant="white" size="lg" className="mt-10">
          {t('back')}
        </ButtonLink>
      </Container>
    </section>
  );
}
