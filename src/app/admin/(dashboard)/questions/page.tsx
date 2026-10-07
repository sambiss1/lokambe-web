import type {Metadata} from 'next';
import {AdminButtonLink} from '@/components/admin/AdminButton';
import {CollectionBrowser} from '@/components/admin/CollectionBrowser';
import {PageHeader} from '@/components/admin/PageHeader';
import {listCollectionAdmin} from '@/lib/api/admin-content';
import {PUBLICATION_STATUSES} from '@/lib/constants';
import {oneOf} from '@/lib/admin-search-params';
import type {SearchParams} from '@/lib/admin-search-params';

export const metadata: Metadata = {title: 'Questions fréquentes'};

export default async function FaqListPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const status = oneOf(sp.status, PUBLICATION_STATUSES);

  // Pas de `listMedia` ici, contrairement aux autres collections : une question
  // n'a pas d'illustration, donc la liste n'a pas de vignette à résoudre.
  const page = await listCollectionAdmin('faq', {status});

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Questions fréquentes"
        description="Les questions affichées sur la page Contact, juste sous le formulaire. L’ordre de cette liste est celui de la page Contact."
        actions={
          <AdminButtonLink tone="rouge" href="/admin/questions/nouveau">
            Nouvelle question
          </AdminButtonLink>
        }
      />
      <CollectionBrowser
        collection="faq"
        status={status}
        total={page.total}
        noun="question"
        emptyLabel="Aucune question pour l’instant."
        rows={page.items.map((entry) => ({
          ...entry,
          label: entry.fr.question,
          // La réponse est tronquée par la feuille de style : on la passe entière.
          detail: entry.fr.answer,
        }))}
      />
    </>
  );
}
