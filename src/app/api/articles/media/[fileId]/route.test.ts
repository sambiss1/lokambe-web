import {afterEach, describe, expect, it, vi} from 'vitest';

const configured = {value: true};

vi.mock('@/lib/api/articles', () => ({
  get isBlogApiConfigured() {
    return configured.value;
  },
  apiMediaUrl: (fileId: string) => `http://api.test/api/articles/media/${fileId}`,
}));

const {GET} = await import('./route');

const params = (fileId = 'abc123') => ({params: Promise.resolve({fileId})});

function apiAnswers(contentType: string, status = 200) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(new Response('des octets', {status, headers: {'Content-Type': contentType}})),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  configured.value = true;
});

describe('relais des images d’article', () => {
  it('sert une image en interdisant la devinette de type', async () => {
    apiAnswers('image/webp');
    const response = await GET(new Request('http://site.test'), params());

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('image/webp');
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(response.headers.get('Content-Disposition')).toBe('inline');
  });

  it('refuse de servir autre chose qu’une image sur le domaine du site', async () => {
    apiAnswers('text/html');
    const response = await GET(new Request('http://site.test'), params());
    expect(response.status).toBe(415);
  });

  it('accepte un type suivi de son jeu de caractères', async () => {
    apiAnswers('image/png; charset=binary');
    const response = await GET(new Request('http://site.test'), params());
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('image/png');
  });

  it('répercute le refus de l’API', async () => {
    apiAnswers('image/png', 404);
    const response = await GET(new Request('http://site.test'), params());
    expect(response.status).toBe(404);
  });

  it('rend 502 quand l’API est injoignable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('réseau')));
    const response = await GET(new Request('http://site.test'), params());
    expect(response.status).toBe(502);
  });

  it('rend 404 tant que l’API n’a pas d’adresse', async () => {
    configured.value = false;
    const response = await GET(new Request('http://site.test'), params());
    expect(response.status).toBe(404);
  });
});
