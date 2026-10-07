import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {aMediaImage} from '@/lib/admin-fixtures';
import {MAX_MEDIA_IMAGE_BYTES, MAX_MEDIA_VIDEO_BYTES} from '@/lib/constants';
import {MediaUploadError, inspectFile, uploadMedia} from './upload';
import type {LocalMedia} from './upload';

/**
 * Le téléversement part du navigateur vers l'API, sans passer par Next.
 *
 * jsdom ne décode ni image ni vidéo : les mesures ne sont donc pas testables
 * ici, mais les **refus** le sont — et c'est eux qui comptent. Un fichier
 * refusé doit l'être avant l'envoi, avec une phrase qui dit quoi faire ; un
 * code brut de l'API ne doit jamais arriver à l'écran.
 */

/** Un fichier du bon type mais trop lourd, sans allouer les octets. */
function heavyFile(name: string, type: string, size: number): File {
  const file = new File([new Blob(['x'])], name, {type});
  Object.defineProperty(file, 'size', {value: size});
  return file;
}

beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:lokambe/apercu');
  URL.revokeObjectURL = vi.fn();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('inspectFile', () => {
  it('refuse un format que l’API refuserait, en nommant les formats acceptés', async () => {
    const pdf = new File([], 'devis.pdf', {type: 'application/pdf'});

    await expect(inspectFile(pdf)).rejects.toBeInstanceOf(MediaUploadError);
    await expect(inspectFile(pdf)).rejects.toThrow('Format refusé. Photos : JPEG, PNG, WebP. Vidéos : MP4, WebM.');
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });

  it('refuse une photo trop lourde en annonçant le plafond en mégaoctets', async () => {
    const file = heavyFile('affiche.png', 'image/png', MAX_MEDIA_IMAGE_BYTES + 1);

    await expect(inspectFile(file)).rejects.toThrow('Fichier trop lourd : 10 Mo au maximum pour une photo.');
  });

  it('refuse une vidéo trop lourde avec son propre plafond, plus haut', async () => {
    const file = heavyFile('film.mp4', 'video/mp4', MAX_MEDIA_VIDEO_BYTES + 1);

    await expect(inspectFile(file)).rejects.toThrow('Fichier trop lourd : 80 Mo au maximum pour une vidéo.');
  });

  /**
   * Les dimensions ne sont qu'un confort d'affichage : une image que le
   * navigateur n'arrive pas à décoder doit tout de même pouvoir partir.
   */
  it('laisse partir une photo dont la mesure échoue, sans dimensions', async () => {
    class UnreadableImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_value: string) {
        setTimeout(() => this.onerror?.(), 0);
      }
    }
    vi.stubGlobal('Image', UnreadableImage);

    const local = await inspectFile(new File([new Blob(['x'])], 'boutique.webp', {type: 'image/webp'}));

    expect(local.kind).toBe('image');
    expect(local.objectUrl).toBe('blob:lokambe/apercu');
    expect(local.width).toBeUndefined();
    expect(local.height).toBeUndefined();
  });
});

describe('uploadMedia', () => {
  const image: LocalMedia = {
    file: new File([new Blob(['x'])], 'boutique.webp', {type: 'image/webp'}),
    kind: 'image',
    objectUrl: 'blob:lokambe/apercu',
    width: 1600,
    height: 1200,
  };

  function respond(status: number, body?: unknown): Response {
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => {
        if (body === undefined) throw new Error('corps illisible');
        return body;
      },
    } as unknown as Response;
  }

  it('renvoie la fiche du média créé', async () => {
    const created = aMediaImage();
    global.fetch = vi.fn().mockResolvedValue(respond(201, created));

    await expect(uploadMedia('ticket-10min', image)).resolves.toEqual(created);
  });

  it('présente le ticket et le fichier, sans jeton de session', async () => {
    global.fetch = vi.fn().mockResolvedValue(respond(201, aMediaImage()));

    await uploadMedia('ticket-10min', image, {title: '  Boutique  ', alt: ' Une commerçante '});

    const [url, init] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toMatch(/\/media\/upload$/);
    expect(init.method).toBe('POST');
    expect(init.headers).toEqual({'X-Upload-Ticket': 'ticket-10min'});

    const body = init.body as FormData;
    expect(body).toBeInstanceOf(FormData);
    expect(body.get('file')).toBe(image.file);
    expect(body.get('title')).toBe('Boutique');
    expect(body.get('alt')).toBe('Une commerçante');
    expect(body.get('width')).toBe('1600');
    expect(body.get('height')).toBe('1200');
    expect(body.get('durationSeconds')).toBeNull();
  });

  it('n’envoie la durée que pour une vidéo qui en a une', async () => {
    global.fetch = vi.fn().mockResolvedValue(respond(201, aMediaImage()));

    await uploadMedia('ticket-10min', {
      file: new File([new Blob(['x'])], 'presentation.mp4', {type: 'video/mp4'}),
      kind: 'video',
      objectUrl: 'blob:lokambe/apercu',
      durationSeconds: 102.4,
    });

    const body = (vi.mocked(global.fetch).mock.calls[0][1] as RequestInit).body as FormData;
    expect(body.get('durationSeconds')).toBe('102.40');
    expect(body.get('width')).toBeNull();
    expect(body.get('height')).toBeNull();
    expect(body.get('title')).toBeNull();
  });

  it('traduit le code de format refusé plutôt que de le montrer tel quel', async () => {
    global.fetch = vi.fn().mockResolvedValue(respond(400, {message: 'FILE_TYPE_NOT_ALLOWED'}));

    await expect(uploadMedia('ticket-10min', image)).rejects.toThrow(
      'Format refusé. Photos : JPEG, PNG, WebP. Vidéos : MP4, WebM.',
    );
  });

  it('dit « trop lourd » quand l’API coupe la requête sans corps lisible', async () => {
    global.fetch = vi.fn().mockResolvedValue(respond(413));

    await expect(uploadMedia('ticket-10min', image)).rejects.toThrow('Fichier trop lourd pour la médiathèque.');
  });

  it('invite à patienter quand le rythme est limité', async () => {
    global.fetch = vi.fn().mockResolvedValue(respond(429, {message: 'TOO_MANY_REQUESTS'}));

    await expect(uploadMedia('ticket-10min', image)).rejects.toThrow(
      'Trop de téléversements d’affilée. Patientez quelques minutes.',
    );
  });

  it('parle de connexion quand la requête n’est jamais partie', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    const failure = await uploadMedia('ticket-10min', image).catch((error: unknown) => error);
    expect(failure).toBeInstanceOf(MediaUploadError);
    expect(failure).toMatchObject({
      message: 'Téléversement interrompu. Vérifiez votre connexion, puis réessayez.',
    });
  });
});
