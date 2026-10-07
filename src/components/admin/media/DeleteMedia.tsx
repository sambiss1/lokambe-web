'use client';

import type {ReactNode} from 'react';
import {deleteMedia} from '@/lib/api/content-actions';
import type {ApiMediaUsage} from '@/lib/api/content-types';
import type {MediaKind} from '@/lib/constants';
import {DeleteConfirm} from '../form/DeleteConfirm';

/**
 * La suppression d'un média.
 *
 * Elle est **refusée tant que le média sert quelque part** : l'API répond 409,
 * et l'écran le dit avant même de proposer le bouton, en nommant les endroits
 * concernés. Supprimer sans cela viderait une image d'une page publiée sans
 * que personne ne s'en aperçoive.
 */
export function DeleteMedia({
  id,
  name,
  kind,
  usage,
  summary,
}: {
  id: string;
  name: string;
  kind: MediaKind;
  usage: ApiMediaUsage[];
  summary?: ReactNode;
}) {
  const used = usage.length > 0;

  return (
    <DeleteConfirm
      question={`Supprimer ${kind === 'video' ? 'la vidéo' : 'la photo'} « ${name} » ?`}
      consequence="Le fichier est retiré de la base. Les pages qui l’affichaient perdraient leur image : c’est pourquoi la suppression est refusée tant qu’il sert quelque part."
      summary={summary}
      cancelHref={`/admin/medias/${id}`}
      doneHref="/admin/medias"
      remove={() => deleteMedia(id)}
      blocked={
        used ? (
          <>
            Ce média est encore utilisé : {usage.map((place) => `${place.label} (${place.count})`).join(', ')}.
            Retirez-le de ces fiches, puis revenez ici.
          </>
        ) : undefined
      }
    />
  );
}
