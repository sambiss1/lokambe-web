'use client';

import type {ReactNode} from 'react';
import {deleteArticle} from '@/lib/api/admin-actions';
import {DeleteConfirm} from './form/DeleteConfirm';

/**
 * La suppression d'un article.
 *
 * Elle remplace le `window.confirm` qui demandait confirmation jusqu'ici : une
 * boîte du navigateur ne dit pas ce qu'on perd, ne s'habille pas, et ne se
 * teste qu'en détournant `window`. Cette page nomme l'article, rappelle que
 * l'adresse publique cessera de répondre, et montre le chapô pour qu'on
 * vérifie qu'il s'agit bien du bon texte.
 */
export function DeleteArticle({
  id,
  title,
  published,
  summary,
}: {
  id: string;
  title: string;
  published: boolean;
  summary?: ReactNode;
}) {
  return (
    <DeleteConfirm
      question={`Supprimer définitivement « ${title} » ?`}
      consequence={
        published
          ? 'L’article disparaît du blog : son adresse publique cessera de répondre, et les liens déjà partagés mèneront à une page introuvable. La couverture est supprimée avec lui.'
          : 'Le brouillon et sa couverture sont supprimés. Rien ne change sur le site public, où il n’apparaissait pas.'
      }
      summary={summary}
      cancelHref={`/admin/articles/${id}`}
      doneHref="/admin/articles"
      remove={() => deleteArticle(id)}
    />
  );
}
