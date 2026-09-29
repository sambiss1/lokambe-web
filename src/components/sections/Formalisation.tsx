import type {FormalisationContent} from '@/content/types';
import {Container} from '../ui/Container';
import {SectionHeader} from '../ui/SectionHeader';
import {CardGrid} from './CardGrid';

/** Comment LOKAMBE aide les activités informelles à se structurer. Page Impact. */
export function Formalisation({formalisation}: {formalisation: FormalisationContent}) {
  return (
    <section className="bg-lokambe-blue py-20 text-white sm:py-28">
      <Container>
        <SectionHeader
          tone="dark"
          eyebrow={formalisation.eyebrow}
          title={formalisation.title}
          intro={formalisation.intro}
          className="mb-14"
        />
        <CardGrid items={formalisation.items} tone="dark" />
      </Container>
    </section>
  );
}
