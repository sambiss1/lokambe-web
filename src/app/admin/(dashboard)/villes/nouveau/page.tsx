import type {Metadata} from 'next';
import {BackLink} from '@/components/admin/AdminButton';
import {CityForm} from '@/components/admin/collections/CityForm';
import {PageHeader} from '@/components/admin/PageHeader';

export const metadata: Metadata = {title: 'Nouvelle ville'};

export default function NewCityPage() {
  return (
    <>
      <BackLink href="/admin/villes">Villes</BackLink>
      <PageHeader
        eyebrow="Villes"
        title="Nouvelle ville"
        description="Donnez-lui son nom, enregistrez, publiez quand elle doit apparaître dans le formulaire de candidature."
      />
      <CityForm />
    </>
  );
}
