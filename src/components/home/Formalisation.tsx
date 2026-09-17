import type {HomeContent} from '@/content/types';
import {CardGrid} from '../sections/CardGrid';
import {Container} from '../ui/Container';
import {SectionHeader} from '../ui/SectionHeader';

/** Comment LOKAMBE aide les activités informelles à se structurer. */
export function Formalisation({formalisation}: {formalisation: HomeContent['formalisation']}) {
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
