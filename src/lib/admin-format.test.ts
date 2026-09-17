import {describe, expect, it} from 'vitest';
import {
  formatBytes,
  formatDate,
  formatDateTime,
  formatRelative,
  formatUsd,
  sectorLabel,
  totalPages,
} from './admin-format';

describe('formatage', () => {
  it('affiche les dates à l’heure de Kinshasa', () => {
    // 09:00 UTC = 10:00 à Kinshasa (UTC+1, sans heure d'été).
    expect(formatDate('2026-09-15T09:00:00.000Z')).toBe('15/09/2026');
    expect(formatDateTime('2026-09-15T09:00:00.000Z')).toBe('15/09/2026 10:00');
  });

  it('affiche les montants sans décimales', () => {
    expect(formatUsd(4500)).toContain('4');
    expect(formatUsd(4500)).not.toContain(',00');
  });

  it('affiche les tailles de fichier en Ko puis en Mo', () => {
    expect(formatBytes(312_000)).toBe('305 Ko');
    expect(formatBytes(2_410_000)).toBe('2.3 Mo');
  });
});

describe('formatRelative', () => {
  const now = '2026-09-15T09:00:00.000Z';

  it('nomme les jours proches', () => {
    expect(formatRelative('2026-09-15T07:00:00.000Z', now)).toBe('aujourd’hui');
    expect(formatRelative('2026-09-14T07:00:00.000Z', now)).toBe('hier');
    expect(formatRelative('2026-09-12T07:00:00.000Z', now)).toBe('il y a 3 jours');
  });

  it('bascule en mois au-delà de trente jours', () => {
    expect(formatRelative('2026-08-01T07:00:00.000Z', now)).toBe('il y a 1 mois');
  });
});

describe('sectorLabel', () => {
  it('déplie le secteur « autre » avec sa précision', () => {
    expect(sectorLabel('autre', 'Artisanat du cuir')).toBe('Autre : Artisanat du cuir');
  });

  it('retombe sur le libellé simple quand rien n’est précisé', () => {
    expect(sectorLabel('autre')).toBe('Autre');
    expect(sectorLabel('education_formation')).toBe('Éducation & formation');
  });
});

describe('totalPages', () => {
  it('annonce toujours au moins une page', () => {
    expect(totalPages(0, 20)).toBe(1);
  });

  it('arrondit au nombre de pages supérieur', () => {
    expect(totalPages(21, 20)).toBe(2);
    expect(totalPages(40, 20)).toBe(2);
  });
});
