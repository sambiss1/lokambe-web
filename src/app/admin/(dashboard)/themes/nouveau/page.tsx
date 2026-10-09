import type {Metadata} from 'next';
import {BackLink} from '@/components/admin/AdminButton';
import {ThemeForm} from '@/components/admin/collections/ThemeForm';
import {PageHeader} from '@/components/admin/PageHeader';

export const metadata: Metadata = {title: 'Nouveau thème'};

export default function NewThemePage() {
  return (
    <>
      <BackLink href="/admin/themes">Thèmes</BackLink>
      <PageHeader
        eyebrow="Thèmes"
        title="Nouveau thème"
        description="Donnez-lui son nom, enregistrez, publiez quand il doit apparaître dans les filtres du blog."
      />
      <ThemeForm />
    </>
  );
}
