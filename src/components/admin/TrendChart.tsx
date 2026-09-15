import {formatDate} from '@/lib/admin-mock';

type Props = {data: {date: string; count: number}[]};

/**
 * Bandeau d'activité des 30 derniers jours. Un bâtonnet par jour, hauteur
 * proportionnelle au nombre de candidatures reçues ce jour-là.
 */
export function TrendChart({data}: Props) {
  const max = Math.max(1, ...data.map((entry) => entry.count));
  const first = data.at(0);
  const last = data.at(-1);

  return (
    <div>
      <div className="flex h-28 items-end gap-[3px]" role="img" aria-label={describe(data, max)}>
        {data.map((entry) => (
          <div
            key={entry.date}
            title={`${formatDate(`${entry.date}T12:00:00.000Z`)} — ${entry.count} candidature${entry.count > 1 ? 's' : ''}`}
            className="flex h-full flex-1 items-end"
          >
            <div
              className={
                entry.count > 0
                  ? 'w-full rounded-t-[4px] bg-lokambe-blue'
                  : 'w-full rounded-t-[4px] bg-lokambe-peach-soft'
              }
              style={{height: entry.count > 0 ? `${Math.max(12, (entry.count / max) * 100)}%` : '6%'}}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-ink-soft tabular-nums">
        <span>{first ? formatDate(`${first.date}T12:00:00.000Z`) : ''}</span>
        <span>
          Pic : {max} / jour
        </span>
        <span>{last ? formatDate(`${last.date}T12:00:00.000Z`) : ''}</span>
      </div>
    </div>
  );
}

function describe(data: {date: string; count: number}[], max: number): string {
  const total = data.reduce((sum, entry) => sum + entry.count, 0);
  return `Candidatures reçues sur les 30 derniers jours : ${total} au total, ${max} au maximum sur une journée.`;
}
