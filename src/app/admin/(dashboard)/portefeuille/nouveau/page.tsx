import type {Metadata} from 'next';
import {BackLink} from '@/components/admin/AdminButton';
import {PortfolioForm} from '@/components/admin/collections/PortfolioForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {listMedia} from '@/lib/api/admin-content';

export const metadata: Metadata = {title: 'Nouvelle entreprise'};

export default async function NewPortfolioPage() {
  const library = await listMedia({kind: 'image'}, 100);

  return (
    <>
      <BackLink href="/admin/portefeuille">Portefeuille</BackLink>
      <PageHeader
        eyebrow="Portefeuille"
        title="Nouvelle entreprise"
        description="Renseignez la fiche, enregistrez, publiez quand elle est prête à paraître."
      />
      <PortfolioForm library={library.items} />
    </>
  );
}
