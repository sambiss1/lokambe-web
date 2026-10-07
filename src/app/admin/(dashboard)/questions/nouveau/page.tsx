import type {Metadata} from 'next';
import {BackLink} from '@/components/admin/AdminButton';
import {FaqForm} from '@/components/admin/collections/FaqForm';
import {PageHeader} from '@/components/admin/PageHeader';

export const metadata: Metadata = {title: 'Nouvelle question'};

export default function NewFaqPage() {
  return (
    <>
      <BackLink href="/admin/questions">Questions fréquentes</BackLink>
      <PageHeader
        eyebrow="Questions fréquentes"
        title="Nouvelle question"
        description="Renseignez la question et sa réponse, enregistrez, publiez quand elle est prête à paraître."
      />
      <FaqForm />
    </>
  );
}
