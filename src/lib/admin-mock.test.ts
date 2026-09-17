import {describe, expect, it} from 'vitest';
import {
  APPLICATION_STATUSES,
  applicationsToCsv,
  computeStats,
  CONTACT_KINDS,
  filterApplications,
  filterContacts,
  formatDateTime,
  formatUsd,
  MOCK_APPLICATIONS,
  MOCK_CONTACTS,
  NEED_TYPES,
  paginate,
  recentApplications,
  SECTORS,
  totalPages,
} from './admin-mock';

describe('mock dataset', () => {
  it('uses only the enum values shared with the API', () => {
    for (const application of MOCK_APPLICATIONS) {
      expect(APPLICATION_STATUSES).toContain(application.status);
      expect(SECTORS).toContain(application.business.sector);
      // Le back-office affichait des types de besoin que le formulaire public
      // n'envoie jamais : c'est cette assertion qui manquait.
      expect(NEED_TYPES).toContain(application.need.type);
    }
    for (const contact of MOCK_CONTACTS) {
      expect(CONTACT_KINDS).toContain(contact.kind);
    }
  });

  it('keeps every status history consistent with the current status', () => {
    for (const application of MOCK_APPLICATIONS) {
      expect(application.statusHistory.at(-1)?.status).toBe(application.status);
    }
  });

  it('only uses fake-safe contact details', () => {
    const emails = [
      ...MOCK_APPLICATIONS.map((application) => application.applicant.email),
      ...MOCK_CONTACTS.map((contact) => contact.email),
    ].filter(Boolean) as string[];

    expect(emails.length).toBeGreaterThan(0);
    for (const email of emails) expect(email).toMatch(/@example\.(cd|com)$/);
  });
});

describe('filterApplications', () => {
  it('filters by status and by sector', () => {
    const byStatus = filterApplications(MOCK_APPLICATIONS, {status: 'recu', sector: '', q: ''});
    expect(byStatus.length).toBeGreaterThan(0);
    expect(byStatus.every((application) => application.status === 'recu')).toBe(true);

    const bySector = filterApplications(MOCK_APPLICATIONS, {status: '', sector: 'restauration', q: ''});
    expect(bySector.every((application) => application.business.sector === 'restauration')).toBe(true);
  });

  it('searches the reference, the name and the business, ignoring case and accents', () => {
    expect(filterApplications(MOCK_APPLICATIONS, {status: '', sector: '', q: 'lkb-4f2a81'})).toHaveLength(1);
    expect(filterApplications(MOCK_APPLICATIONS, {status: '', sector: '', q: 'benedicte'})).toHaveLength(1);
    expect(filterApplications(MOCK_APPLICATIONS, {status: '', sector: '', q: 'Le Régal'})).toHaveLength(1);
  });

  it('combines filters and returns nothing when they conflict', () => {
    expect(filterApplications(MOCK_APPLICATIONS, {status: 'finance', sector: 'evenementiel', q: ''})).toHaveLength(0);
  });

  it('returns everything when no filter is set', () => {
    expect(filterApplications(MOCK_APPLICATIONS, {status: '', sector: '', q: '  '})).toHaveLength(
      MOCK_APPLICATIONS.length,
    );
  });
});

describe('filterContacts', () => {
  it('filters by kind and by read state', () => {
    const unread = filterContacts(MOCK_CONTACTS, {kind: '', isRead: 'false'});
    expect(unread.length).toBeGreaterThan(0);
    expect(unread.every((contact) => !contact.isRead)).toBe(true);

    const investors = filterContacts(MOCK_CONTACTS, {kind: 'investisseur', isRead: ''});
    expect(investors.every((contact) => contact.kind === 'investisseur')).toBe(true);
  });
});

describe('pagination', () => {
  it('never reports fewer than one page', () => {
    expect(totalPages(0, 6)).toBe(1);
    expect(totalPages(6, 6)).toBe(1);
    expect(totalPages(7, 6)).toBe(2);
  });

  it('slices the right window', () => {
    const items = [1, 2, 3, 4, 5, 6, 7];
    expect(paginate(items, 1, 3)).toEqual([1, 2, 3]);
    expect(paginate(items, 3, 3)).toEqual([7]);
    expect(paginate(items, 9, 3)).toEqual([]);
  });
});

describe('computeStats', () => {
  it('counts every status, the 30-day window and the unread messages', () => {
    const stats = computeStats(MOCK_APPLICATIONS, MOCK_CONTACTS);

    expect(stats.total).toBe(MOCK_APPLICATIONS.length);
    expect(Object.values(stats.applicationsByStatus).reduce((a, b) => a + b, 0)).toBe(MOCK_APPLICATIONS.length);
    expect(stats.unreadContacts).toBe(MOCK_CONTACTS.filter((contact) => !contact.isRead).length);
    expect(stats.perDay).toHaveLength(30);
    expect(stats.last30Days).toBe(stats.perDay.reduce((sum, entry) => sum + entry.count, 0));
    expect(stats.last30Days).toBeLessThanOrEqual(stats.total);
  });
});

describe('recentApplications', () => {
  it('returns the newest first', () => {
    const recent = recentApplications(MOCK_APPLICATIONS, 3);
    expect(recent).toHaveLength(3);
    expect(recent[0]!.createdAt >= recent[1]!.createdAt).toBe(true);
    expect(recent[1]!.createdAt >= recent[2]!.createdAt).toBe(true);
  });
});

describe('applicationsToCsv', () => {
  it('writes a header and one line per application', () => {
    const csv = applicationsToCsv(MOCK_APPLICATIONS.slice(0, 2));
    const lines = csv.split('\n');

    expect(lines).toHaveLength(3);
    expect(lines[0]).toContain('Référence;Date de réception');
    expect(lines[1]).toContain('LKB-4F2A81');
  });

  it('quotes cells containing the separator', () => {
    const csv = applicationsToCsv([
      {
        ...MOCK_APPLICATIONS[0]!,
        business: {...MOCK_APPLICATIONS[0]!.business, name: 'Chez Bénédicte; Kalamu'},
      },
    ]);
    expect(csv).toContain('"Chez Bénédicte; Kalamu"');
  });
});

describe('formatting', () => {
  it('formats dates in Kinshasa time', () => {
    expect(formatDateTime('2026-09-15T22:30:00.000Z')).toBe('15/09/2026 23:30');
  });

  it('formats amounts without decimals', () => {
    expect(formatUsd(4500)).toMatch(/4\s?500/);
  });
});
