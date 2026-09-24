import type {Metadata} from 'next';
import Link from 'next/link';
import {PageHeader} from '@/components/admin/PageHeader';
import {StatCard} from '@/components/admin/StatCard';
import {StatusBadge} from '@/components/admin/StatusBadge';
import {Panel, Surface} from '@/components/admin/Surface';
import {TrendChart} from '@/components/admin/TrendChart';
import {Reveal} from '@/components/motion/Reveal';
import {formatRelative, formatUsd, sectorLabel, STATUS_LABELS} from '@/lib/admin-format';
import {getStats, listApplications} from '@/lib/api/admin';
import {APPLICATION_STATUSES} from '@/lib/constants';

export const metadata: Metadata = {title: 'Tableau de bord'};

export default async function DashboardPage() {
  // Les deux appels sont indépendants : autant les mener de front.
  const [stats, recent] = await Promise.all([getStats(), listApplications({}, 5)]);

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Tableau de bord"
        description="Vue d’ensemble du pipeline d’investissement et des demandes reçues."
      />

      <Reveal as="section" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Candidatures reçues"
          value={stats.applicationsTotal}
          hint="Depuis l’ouverture du formulaire"
          href="/admin/candidatures"
          tone="blue"
        />
        <StatCard
          label="Candidatures (30 derniers jours)"
          value={stats.applicationsLast30Days}
          hint="Nouvelles demandes sur la période"
          tone="peach"
        />
        <StatCard
          label="Messages non lus"
          value={stats.unreadContacts}
          hint="À traiter dans la boîte de contact"
          href="/admin/messages?isRead=false"
        />
      </Reveal>

      <Reveal as="section" index={1}>
        <Panel title="Candidatures reçues sur 30 jours">
          <TrendChart data={stats.applicationsPerDay} />
        </Panel>
      </Reveal>

      <Reveal as="section" index={2} className="flex flex-col gap-4">
        <h2 className="display text-xl">Pipeline d’investissement</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {APPLICATION_STATUSES.map((status) => (
            <StatCard
              key={status}
              label={STATUS_LABELS[status]}
              value={stats.applicationsByStatus[status]}
              href={`/admin/candidatures?status=${status}`}
            />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" index={3} className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="display text-xl">Dernières candidatures</h2>
          <Link
            href="/admin/candidatures"
            className="text-sm font-bold text-lokambe-blue underline underline-offset-4 hover:text-lokambe-blue-deep"
          >
            Voir toutes les candidatures
          </Link>
        </div>

        <Surface className="divide-y divide-line overflow-hidden">
          {recent.items.map((application) => (
            <Link
              key={application.id}
              href={`/admin/candidatures/${application.id}`}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 transition-colors duration-200 hover:bg-lokambe-peach-soft/50 sm:px-6"
            >
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-extrabold tabular-nums">{application.reference}</span>
                  <StatusBadge status={application.status} />
                </p>
                <p className="mt-1 truncate text-sm text-ink-soft">
                  {application.applicant.firstName} {application.applicant.lastName} · {application.business.name} ·{' '}
                  {sectorLabel(application.business.sector, application.business.sectorOther)}
                </p>
              </div>
              <div className="flex w-full items-baseline justify-between gap-3 sm:w-auto sm:flex-col sm:items-end">
                <p className="font-bold tabular-nums">{formatUsd(application.need.amountUsd)}</p>
                <p className="text-sm text-ink-soft">{formatRelative(application.createdAt)}</p>
              </div>
            </Link>
          ))}
        </Surface>
      </Reveal>
    </>
  );
}
