'use client';

import {FileText} from 'lucide-react';
import {useEffect, useMemo} from 'react';

/**
 * La vignette d'une pièce jointe choisie, **avant l'envoi**.
 *
 * Une ligne ne portait que le nom du fichier : « IMG_4821.jpg » ne dit pas
 * quelle photo on vient de joindre, et un entrepreneur qui en joint cinq ne
 * peut pas vérifier qu'il n'a pas pris deux fois la même. L'image se lit dans
 * le navigateur, sans rien envoyer.
 *
 * Un PDF n'a pas de vignette : il garde son icône.
 */
export function AttachmentThumb({file}: {file: File}) {
  // L'adresse est calculée au rendu, et non posée dans un état depuis un effet :
  // la vignette paraît du premier coup, sans rendu en cascade.
  const preview = useMemo(
    () => (file.type.startsWith('image/') ? URL.createObjectURL(file) : null),
    [file],
  );

  // Elle retient le fichier en mémoire tant qu'elle existe.
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  if (preview) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- fichier local (blob:), hors de portée de next/image
      <img
        src={preview}
        alt=""
        className="size-12 flex-none rounded-xl border border-line bg-white object-cover"
      />
    );
  }

  return (
    <span className="grid size-12 flex-none place-items-center rounded-xl border border-line bg-white text-lokambe-blue">
      <FileText aria-hidden="true" className="size-5" strokeWidth={2} />
    </span>
  );
}
