'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {Paperclip, X} from 'lucide-react';
import {useRef, useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import type {ApplyContent, FormsContent} from '@/content/types';
import {Link} from '@/i18n/navigation';
import {ALLOWED_FILE_TYPES, NEED_TYPES, SECTORS} from '@/lib/constants';
import {applicationSchema, mockReference, validateFiles, type ApplicationValues} from '@/lib/forms/schemas';
import {Reveal} from '../motion/Reveal';
import {Button, ButtonLink} from '../ui/Button';
import {CheckboxCard, Field, Honeypot, Input, Select, Textarea} from './Field';
import {FormSteps} from './FormSteps';
import {SuccessPanel} from './SuccessPanel';

type Props = {content: ApplyContent['form']; labels: FormsContent};

const FORM_TOP_ID = 'candidature';

const STEP_FIELDS = [
  ['applicant.firstName', 'applicant.lastName', 'applicant.phone', 'applicant.email', 'applicant.city', 'applicant.commune'],
  [
    'business.name',
    'business.sector',
    'business.sectorOther',
    'business.isFormal',
    'business.rccm',
    'business.foundedYear',
    'business.employeesCount',
    'business.monthlyRevenueUsd',
    'business.description',
  ],
  ['need.type', 'need.amountUsd', 'need.useOfFunds'],
  ['consent'],
] as const;

export function ApplicationForm({content, labels}: Props) {
  const f = labels.application.fields;
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [reference, setReference] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: {errors},
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    mode: 'onBlur',
    defaultValues: {
      applicant: {firstName: '', lastName: '', phone: '', email: '', city: '', commune: ''},
      business: {
        name: '',
        sector: undefined,
        sectorOther: '',
        isFormal: false,
        rccm: '',
        foundedYear: '',
        employeesCount: '',
        monthlyRevenueUsd: '',
        description: '',
      },
      need: {type: undefined, amountUsd: '', useOfFunds: ''},
      consent: false,
      website: '',
    } as unknown as ApplicationValues,
  });

  const sector = useWatch({control, name: 'business.sector'});
  const isFormal = useWatch({control, name: 'business.isFormal'});
  const consent = useWatch({control, name: 'consent'});

  const scrollToFormTop = () => {
    document.getElementById(FORM_TOP_ID)?.scrollIntoView?.({behavior: 'smooth', block: 'start'});
  };

  const goTo = (next: number) => {
    setStep(next);
    scrollToFormTop();
  };

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step] as unknown as Parameters<typeof trigger>[0], {shouldFocus: true});
    if (valid) goTo(Math.min(step + 1, STEP_FIELDS.length - 1));
  };

  const addFiles = (selected: FileList | null) => {
    if (!selected) return;
    const {accepted, errors: rejected} = validateFiles(Array.from(selected), files);
    setFiles((current) => [...current, ...accepted]);
    setFileErrors(rejected.map((error) => `${error.name} — ${error.reason}`));
    if (fileInput.current) fileInput.current.value = '';
  };

  const onSubmit = handleSubmit(async () => {
    setSending(true);
    // TODO(api) : remplacer par l'envoi multipart vers POST /api/applications.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSending(false);
    setReference(mockReference());
    scrollToFormTop();
  });

  if (reference) {
    return (
      <div id={FORM_TOP_ID}>
        <SuccessPanel
          title={labels.application.success.title}
          text={labels.application.success.text}
          notice={labels.application.success.demoNotice}
        >
          <p className="text-base font-medium text-ink-soft">{labels.application.success.referenceLabel}</p>
          <p className="mt-1 text-[clamp(2rem,6vw,3rem)] font-extrabold tracking-tight text-lokambe-blue tabular-nums">
            {reference}
          </p>
          <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-ink-soft">{labels.application.success.next}</p>
          <ButtonLink href="/" variant="blue" size="lg" className="mt-8">
            {labels.application.success.back}
          </ButtonLink>
        </SuccessPanel>
      </div>
    );
  }

  return (
    <div id={FORM_TOP_ID} className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <FormSteps steps={labels.application.steps} current={step} stepLabel={labels.common.stepLabel} onSelect={goTo} />
      </div>

      <Reveal className="lg:col-span-8">
        <form noValidate onSubmit={onSubmit} className="relative rounded-[2rem] bg-white p-6 ring-1 ring-line ring-inset sm:p-9">
          <h2 className="display text-[clamp(1.6rem,3vw,2.25rem)] text-lokambe-blue">{content.title}</h2>
          <Honeypot label={labels.common.honeypotLabel} {...register('website')} />

          {step === 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Field label={f.firstName} error={errors.applicant?.firstName?.message}>
                {({id, describedBy, invalid}) => (
                  <Input id={id} aria-describedby={describedBy} invalid={invalid} autoComplete="given-name" {...register('applicant.firstName')} />
                )}
              </Field>
              <Field label={f.lastName} error={errors.applicant?.lastName?.message}>
                {({id, describedBy, invalid}) => (
                  <Input id={id} aria-describedby={describedBy} invalid={invalid} autoComplete="family-name" {...register('applicant.lastName')} />
                )}
              </Field>
              <Field label={f.phone} hint={f.phoneHint} error={errors.applicant?.phone?.message}>
                {({id, describedBy, invalid}) => (
                  <Input id={id} type="tel" inputMode="tel" aria-describedby={describedBy} invalid={invalid} autoComplete="tel" {...register('applicant.phone')} />
                )}
              </Field>
              <Field label={f.email} hint={f.emailHint} optionalLabel={labels.common.optional} error={errors.applicant?.email?.message}>
                {({id, describedBy, invalid}) => (
                  <Input id={id} type="email" inputMode="email" aria-describedby={describedBy} invalid={invalid} autoComplete="email" {...register('applicant.email')} />
                )}
              </Field>
              <Field label={f.city} error={errors.applicant?.city?.message}>
                {({id, describedBy, invalid}) => (
                  <Input id={id} aria-describedby={describedBy} invalid={invalid} autoComplete="address-level2" {...register('applicant.city')} />
                )}
              </Field>
              <Field label={f.commune} optionalLabel={labels.common.optional} error={errors.applicant?.commune?.message}>
                {({id, describedBy, invalid}) => <Input id={id} aria-describedby={describedBy} invalid={invalid} {...register('applicant.commune')} />}
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Field label={f.businessName} error={errors.business?.name?.message}>
                {({id, describedBy, invalid}) => <Input id={id} aria-describedby={describedBy} invalid={invalid} {...register('business.name')} />}
              </Field>
              <Field label={f.sector} error={errors.business?.sector?.message}>
                {({id, describedBy, invalid}) => (
                  <Select id={id} aria-describedby={describedBy} invalid={invalid} defaultValue="" {...register('business.sector')}>
                    <option value="" disabled>
                      —
                    </option>
                    {SECTORS.map((value) => (
                      <option key={value} value={value}>
                        {labels.application.sectors[value]}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
              {sector === 'autre' && (
                <Field label={f.sectorOther} error={errors.business?.sectorOther?.message}>
                  {({id, describedBy, invalid}) => (
                    <Input id={id} aria-describedby={describedBy} invalid={invalid} {...register('business.sectorOther')} />
                  )}
                </Field>
              )}
              <Field label={f.employeesCount} error={errors.business?.employeesCount?.message}>
                {({id, describedBy, invalid}) => (
                  <Input id={id} type="number" inputMode="numeric" min={0} aria-describedby={describedBy} invalid={invalid} {...register('business.employeesCount')} />
                )}
              </Field>
              <Field label={f.foundedYear} optionalLabel={labels.common.optional} error={errors.business?.foundedYear?.message}>
                {({id, describedBy, invalid}) => (
                  <Input id={id} type="number" inputMode="numeric" min={1950} aria-describedby={describedBy} invalid={invalid} {...register('business.foundedYear')} />
                )}
              </Field>
              <Field label={f.monthlyRevenueUsd} optionalLabel={labels.common.optional} error={errors.business?.monthlyRevenueUsd?.message}>
                {({id, describedBy, invalid}) => (
                  <Input id={id} type="number" inputMode="decimal" min={0} aria-describedby={describedBy} invalid={invalid} {...register('business.monthlyRevenueUsd')} />
                )}
              </Field>
              <div className="sm:col-span-2">
                <CheckboxCard label={f.isFormal} checked={Boolean(isFormal)} {...register('business.isFormal')} />
              </div>
              {isFormal && (
                <Field label={f.rccm} optionalLabel={labels.common.optional} error={errors.business?.rccm?.message}>
                  {({id, describedBy, invalid}) => <Input id={id} aria-describedby={describedBy} invalid={invalid} {...register('business.rccm')} />}
                </Field>
              )}
              <div className="sm:col-span-2">
                <Field label={f.description} hint={f.descriptionHint} error={errors.business?.description?.message}>
                  {({id, describedBy, invalid}) => (
                    <Textarea id={id} rows={6} aria-describedby={describedBy} invalid={invalid} {...register('business.description')} />
                  )}
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label={f.needType} error={errors.need?.type?.message}>
                  {({id, describedBy, invalid}) => (
                    <Select id={id} aria-describedby={describedBy} invalid={invalid} defaultValue="" {...register('need.type')}>
                      <option value="" disabled>
                        —
                      </option>
                      {NEED_TYPES.map((value) => (
                        <option key={value} value={value}>
                          {labels.application.needTypes[value]}
                        </option>
                      ))}
                    </Select>
                  )}
                </Field>
              </div>
              <Field label={f.amountUsd} error={errors.need?.amountUsd?.message}>
                {({id, describedBy, invalid}) => (
                  <Input id={id} type="number" inputMode="decimal" min={0} aria-describedby={describedBy} invalid={invalid} {...register('need.amountUsd')} />
                )}
              </Field>
              <div className="sm:col-span-2">
                <Field label={f.useOfFunds} hint={f.useOfFundsHint} error={errors.need?.useOfFunds?.message}>
                  {({id, describedBy, invalid}) => (
                    <Textarea id={id} rows={6} aria-describedby={describedBy} invalid={invalid} {...register('need.useOfFunds')} />
                  )}
                </Field>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-base font-bold text-ink">{f.files}</p>
                <p className="mt-1 text-base text-ink-soft">{labels.application.files.hint}</p>
                <input
                  ref={fileInput}
                  type="file"
                  multiple
                  accept={ALLOWED_FILE_TYPES.join(',')}
                  onChange={(event) => addFiles(event.target.files)}
                  className="sr-only"
                  id="application-files"
                />
                <label
                  htmlFor="application-files"
                  className="mt-3 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line px-5 py-7 text-lg font-bold text-lokambe-blue transition-colors hover:border-lokambe-blue hover:bg-lokambe-peach-soft"
                >
                  <Paperclip aria-hidden="true" className="size-5" />
                  {labels.application.files.cta}
                </label>

                {fileErrors.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {fileErrors.map((error) => (
                      <li key={error} className="text-base font-medium text-lokambe-red">
                        {error}
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-4 space-y-2">
                  {files.length === 0 && <li className="text-base text-ink-soft">{labels.application.files.empty}</li>}
                  {files.map((file) => (
                    <li key={file.name} className="flex items-center gap-3 rounded-2xl bg-lokambe-peach-soft px-4 py-3">
                      <Paperclip aria-hidden="true" className="size-4 flex-none text-lokambe-blue" />
                      <span className="min-w-0 flex-1 truncate text-base text-ink">{file.name}</span>
                      <span className="flex-none text-sm text-ink-soft tabular-nums">{Math.round(file.size / 1024)} Ko</span>
                      <button
                        type="button"
                        onClick={() => setFiles((current) => current.filter((item) => item !== file))}
                        aria-label={labels.application.files.remove.replace('{name}', file.name)}
                        className="grid size-8 flex-none place-items-center rounded-full bg-white text-ink transition-colors hover:bg-lokambe-red hover:text-white"
                      >
                        <X aria-hidden="true" className="size-4" strokeWidth={2.5} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <CheckboxCard label={f.consent} checked={Boolean(consent)} error={errors.consent?.message} {...register('consent')} />

              <p className="text-base text-ink-soft">
                {content.privacyText}{' '}
                <Link href={content.privacyLink.href} className="font-bold text-lokambe-blue underline underline-offset-4">
                  {content.privacyLink.label}
                </Link>
              </p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            {step > 0 && (
              <Button type="button" variant="outline-blue" onClick={() => goTo(step - 1)}>
                {labels.common.previous}
              </Button>
            )}
            {step < STEP_FIELDS.length - 1 ? (
              <Button type="button" variant="blue" size="lg" onClick={goNext} className="ml-auto">
                {labels.common.next}
              </Button>
            ) : (
              <Button type="submit" variant="blue" size="lg" disabled={sending} className="ml-auto">
                {sending ? labels.common.sending : labels.common.submit}
              </Button>
            )}
          </div>
        </form>
      </Reveal>
    </div>
  );
}
