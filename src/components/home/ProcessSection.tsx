import type {HomeContent} from '@/content/types';
import {ButtonLink} from '../ui/Button';
import {Container} from '../ui/Container';
import {SectionHeader} from '../ui/SectionHeader';
import {ProcessTrack} from './ProcessTrack';

export function ProcessSection({process}: {process: HomeContent['process']}) {
  return (
    <section className="relative overflow-hidden bg-lokambe-blue py-24 text-white sm:py-32">
      <Container>
        <SectionHeader
          tone="dark"
          eyebrow={process.eyebrow}
          title={process.title}
          intro={process.intro}
          aside={
            <ButtonLink href={process.link.href} variant="outline-white" className="mt-6">
              {process.link.label}
            </ButtonLink>
          }
        />
      </Container>
      <div className="mt-16">
        <ProcessTrack process={process} />
      </div>
    </section>
  );
}
