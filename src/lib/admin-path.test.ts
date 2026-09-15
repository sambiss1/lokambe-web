import {describe, expect, it} from 'vitest';
import {isAdminPath} from './admin-path';

describe('isAdminPath', () => {
  it('reconnaît /admin et ses sous-chemins', () => {
    expect(isAdminPath('/admin')).toBe(true);
    expect(isAdminPath('/admin/')).toBe(true);
    expect(isAdminPath('/admin/candidatures/123')).toBe(true);
  });

  it('ne confond pas les chemins voisins ou localisés', () => {
    expect(isAdminPath('/administration')).toBe(false);
    expect(isAdminPath('/fr/admin')).toBe(false);
    expect(isAdminPath('/')).toBe(false);
  });
});
