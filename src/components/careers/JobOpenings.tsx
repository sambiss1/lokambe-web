import type {CareersContent, JobPosting} from '@/content/careers';
import {Reveal} from '../motion/Reveal';
import {ButtonLink} from '../ui/Button';

type Labels = CareersContent['openings']['labels'];

function JobMeta({label, value}: {label: string; value: string}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-sm font-medium text-ink-soft">{label}</span>
      <span className="text-base font-bold text-ink">{value}</span>
    </div>
  );
}

function JobList({label, items}: {label: string; items: string[]}) {
  return (
    <div>
      <h4 className="text-base font-bold text-ink">{label}</h4>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-snug text-ink-soft">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lokambe-red" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Fiche d’une offre : intitulé, lieu, contrat, missions et profil recherché. */
function JobCard({job, labels, index}: {job: JobPosting; labels: Labels; index: number}) {
  return (
    <Reveal
      as="li"
      id={job.slug}
      index={index % 2}
      className="flex flex-col rounded-[1.75rem] bg-white p-7 ring-1 ring-line ring-inset"
    >
      <span aria-hidden="true" className="h-2.5 w-6 rounded-full bg-lokambe-red" />
      <h3 className="mt-5 text-xl leading-tight font-extrabold text-lokambe-blue uppercase">{job.title}</h3>
      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        <JobMeta label={labels.location} value={job.location} />
        <JobMeta label={labels.contract} value={job.contractType} />
      </div>
      <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">{job.summary}</p>
      <div className="mt-7 grid gap-8 border-t border-line pt-7 sm:grid-cols-2">
        <JobList label={labels.missions} items={job.missions} />
        <JobList label={labels.profile} items={job.profile} />
      </div>
      <div className="mt-8">
        <ButtonLink href="/contact" variant="blue">
          {labels.apply}
        </ButtonLink>
      </div>
    </Reveal>
  );
}

/** État affiché lorsqu’aucun poste n’est ouvert. */
function NoOpenings({empty}: {empty: CareersContent['openings']['empty']}) {
  return (
    <Reveal className="mx-auto max-w-3xl rounded-[1.75rem] bg-white px-7 py-14 text-center ring-1 ring-line ring-inset sm:px-14">
      <span aria-hidden="true" className="mx-auto block h-2.5 w-6 rounded-full bg-lokambe-red" />
      <p className="mx-auto mt-6 max-w-[34ch] text-xl leading-tight font-extrabold text-lokambe-blue uppercase sm:text-2xl">
        {empty.title}
      </p>
      <p className="mx-auto mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-soft">{empty.text}</p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href={empty.cta.href} variant="blue" size="lg">
          {empty.cta.label}
        </ButtonLink>
      </div>
    </Reveal>
  );
}

/** Liste des postes ouverts, ou l’état vide quand le tableau est vide. */
export function JobOpenings({jobs, openings}: {jobs: JobPosting[]; openings: CareersContent['openings']}) {
  if (jobs.length === 0) return <NoOpenings empty={openings.empty} />;

  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {jobs.map((job, index) => (
        <JobCard key={job.slug} job={job} labels={openings.labels} index={index} />
      ))}
    </ul>
  );
}
