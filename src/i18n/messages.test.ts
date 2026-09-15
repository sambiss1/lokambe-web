import {describe, expect, it} from 'vitest';
import en from '../../messages/en.json';
import fr from '../../messages/fr.json';

function flattenKeys(value: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(value)
    .flatMap(([key, child]) =>
      child !== null && typeof child === 'object'
        ? flattenKeys(child as Record<string, unknown>, `${prefix}${key}.`)
        : [`${prefix}${key}`],
    )
    .sort();
}

describe('messages', () => {
  it('fr et en ont exactement les mêmes clés', () => {
    expect(flattenKeys(en)).toEqual(flattenKeys(fr));
  });

  it('aucun libellé n’est vide', () => {
    for (const messages of [fr, en]) {
      const empty = flattenKeys(messages).filter((path) => {
        const leaf = path.split('.').reduce<unknown>((node, key) => (node as Record<string, unknown>)[key], messages);
        return typeof leaf !== 'string' || leaf.trim() === '';
      });
      expect(empty).toEqual([]);
    }
  });
});
