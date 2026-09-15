import {Reveal} from '../motion/Reveal';

type Props = {stageLabel: string; ownerLabel: string; rows: {stage: string; owner: string}[]};

/** Qui fait quoi à chaque étape : tableau sur grand écran, cartes sur mobile. */
export function ResponsibilityTable({stageLabel, ownerLabel, rows}: Props) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-line ring-inset">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{`${stageLabel} / ${ownerLabel}`}</caption>
          <thead className="max-sm:sr-only">
            <tr className="bg-lokambe-blue text-white">
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                {stageLabel}
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                {ownerLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.stage} className="border-t border-line align-top max-sm:grid max-sm:gap-1 max-sm:p-5 sm:hover:bg-lokambe-peach-soft">
                <th scope="row" className="text-left text-lg font-extrabold text-lokambe-blue sm:w-2/5 sm:px-6 sm:py-5">
                  {row.stage}
                </th>
                <td className="text-lg text-ink-soft sm:px-6 sm:py-5">{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
