import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

/**
 * Le module lit `NEXT_PUBLIC_API_URL` à l'import : chaque test recharge donc le
 * module après avoir posé la variable.
 */
async function loadClient(apiUrl?: string) {
  vi.resetModules();
  if (apiUrl === undefined) {
    vi.stubEnv('NEXT_PUBLIC_API_URL', '');
  } else {
    vi.stubEnv('NEXT_PUBLIC_API_URL', apiUrl);
  }
  return import('./client');
}

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as unknown as Response;
}

describe('isApiConfigured', () => {
  it('est faux tant que l’adresse de l’API est absente', async () => {
    const {isApiConfigured} = await loadClient();
    expect(isApiConfigured).toBe(false);
  });

  it('est vrai dès que l’adresse est fournie, barre oblique finale ignorée', async () => {
    const {isApiConfigured, API_URL} = await loadClient('https://api.lokambe.com/api/');
    expect(isApiConfigured).toBe(true);
    expect(API_URL).toBe('https://api.lokambe.com/api');
  });

  it('ajoute le préfixe /api quand il a été oublié à la configuration', async () => {
    // Sans cela, une variable Vercel réglée sur la seule origine ferait
    // répondre 404 à tous les envois, sans message.
    const {API_URL} = await loadClient('https://api.lokambe.com');
    expect(API_URL).toBe('https://api.lokambe.com/api');
  });
});

describe('submitApplication', () => {
  it('envoie le dossier en multipart et rend la référence de l’API', async () => {
    const {submitApplication} = await loadClient('https://api.lokambe.com/api');
    fetchMock.mockResolvedValue(jsonResponse({reference: 'LKB-4F2A81'}));

    const file = new File(['contenu'], 'devis.pdf', {type: 'application/pdf'});
    const reference = await submitApplication({locale: 'fr'}, [file]);

    expect(reference).toBe('LKB-4F2A81');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.lokambe.com/api/applications');
    expect(init.method).toBe('POST');

    const body = init.body as FormData;
    expect(body.get('data')).toBe(JSON.stringify({locale: 'fr'}));
    expect(body.getAll('files')).toHaveLength(1);
    // Le navigateur doit poser lui-même la frontière multipart.
    expect(init.headers).toBeUndefined();
  });

  it('refuse une réponse sans référence exploitable', async () => {
    const {submitApplication, SubmitError} = await loadClient('https://api.lokambe.com/api');
    fetchMock.mockResolvedValue(jsonResponse({reference: ''}));

    await expect(submitApplication({}, [])).rejects.toMatchObject({kind: 'server'});
    await expect(submitApplication({}, [])).rejects.toBeInstanceOf(SubmitError);
  });

  it.each([
    [400, 'invalid'],
    [429, 'too-many'],
    [500, 'server'],
  ] as const)('traduit le statut %i en échec « %s »', async (status, kind) => {
    const {submitApplication} = await loadClient('https://api.lokambe.com/api');
    fetchMock.mockResolvedValue(jsonResponse({message: 'non'}, status));

    await expect(submitApplication({}, [])).rejects.toMatchObject({kind, status});
  });

  it('distingue une requête qui n’est jamais partie', async () => {
    const {submitApplication} = await loadClient('https://api.lokambe.com');
    // CORS refusé, DNS, réseau coupé : `fetch` lève au lieu de répondre.
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(submitApplication({}, [])).rejects.toMatchObject({kind: 'network'});
  });
});

describe('submitContact', () => {
  it('envoie le message en JSON', async () => {
    const {submitContact} = await loadClient('https://api.lokambe.com/api');
    fetchMock.mockResolvedValue(jsonResponse({ok: true}));

    await submitContact({kind: 'autre', locale: 'fr'});

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.lokambe.com/api/contacts');
    expect(init.headers).toEqual({'Content-Type': 'application/json'});
    expect(JSON.parse(init.body as string)).toEqual({kind: 'autre', locale: 'fr'});
  });

  it('remonte un 429 comme un échec « too-many »', async () => {
    const {submitContact} = await loadClient('https://api.lokambe.com/api');
    fetchMock.mockResolvedValue(jsonResponse({}, 429));

    await expect(submitContact({})).rejects.toMatchObject({kind: 'too-many'});
  });
});
