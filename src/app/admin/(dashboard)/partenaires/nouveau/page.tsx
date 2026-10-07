import type {Metadata} from 'next';
import {BackLink} from '@/components/admin/AdminButton';
import {PartnerForm} from '@/components/admin/collections/PartnerForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {listMedia} from '@/lib/api/admin-content';

export const metadata: Metadata = {title: 'Nouveau partenaire'};

export default async function NewPartnerPage() {
  const library = await listMedia({kind: 'image'}, 100);

  return (
    <>
      <BackLink href="/admin/partenaires">Partenaires</BackLink>
      <PageHeader
        eyebrow="Partenaires"
        title="Nouveau partenaire"
        description="Le nom suffit pour enregistrer ; posez le logo, puis publiez quand la fiche est prête à paraître."
      />
      <PartnerForm library={library.items} />
    </>
  );
}
