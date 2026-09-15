import {describe, expect, it} from 'vitest';
import {cx} from './cx';

describe('cx', () => {
  it('concatène les classes valides et ignore les valeurs falsy', () => {
    expect(cx('a', false, 'b', null, undefined, '', 'c')).toBe('a b c');
  });

  it('retourne une chaîne vide sans classe', () => {
    expect(cx()).toBe('');
  });
});
