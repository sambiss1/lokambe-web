import {STATUS_LABELS} from '@/lib/admin-format';
import type {ApplicationStatus} from '@/lib/constants';
import {cx} from '@/lib/cx';

/**
 * Une teinte par étape du pipeline. Les deux états terminaux (financé, rejeté) sont
 * pleins pour trancher avec les étapes intermédiaires — et pour éviter le rouge
 * sur rouge, illisible.
 */
const TONES: Record<ApplicationStatus, string> = {
  recu: 'bg-[#eef0f5] text-[#3d3d45] ring-[#d8dbe4]',
  preselection: 'bg-lokambe-peach-soft text-[#9a4a15] ring-lokambe-peach',
  visite: 'bg-[#fdf3d7] text-[#7c5306] ring-[#f3dfa2]',
  analyse: 'bg-[#e2f0fd] text-[#0d5589] ring-[#b7d9f5]',
  due_diligence: 'bg-[#e6e9fe] text-[#2f37a8] ring-[#c2c8fb]',
  comite: 'bg-[#efe6fd] text-[#5b2aa5] ring-[#d7c4f8]',
  finance: 'bg-lokambe-blue text-white ring-lokambe-blue',
  rejete: 'bg-lokambe-red text-white ring-lokambe-red',
};

type Props = {status: ApplicationStatus; className?: string};

export function StatusBadge({status, className}: Props) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ring-1 ring-inset',
        TONES[status],
        className,
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
