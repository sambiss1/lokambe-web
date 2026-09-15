'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import type {FormsContent} from '@/content/types';
import {CONTACT_KINDS} from '@/lib/constants';
import {contactSchema, type ContactValues} from '@/lib/forms/schemas';
import {Reveal} from '../motion/Reveal';
import {Button} from '../ui/Button';
import {Field, Honeypot, Input, Select, Textarea} from './Field';
import {SuccessPanel} from './SuccessPanel';

type Props = {title: string; labels: FormsContent; defaultKind?: ContactValues['kind']};

export function ContactForm({title, labels, defaultKind}: Props) {
  const f = labels.contact.fields;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {kind: defaultKind, fullName: '', organization: '', email: '', phone: '', message: '', website: ''},
  });

  const onSubmit = handleSubmit(async () => {
    setSending(true);
    // TODO(api) : remplacer par POST /api/contacts.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSending(false);
    setSent(true);
  });

  if (sent) {
    return (
      <SuccessPanel title={labels.contact.success.title} text={labels.contact.success.text} notice={labels.contact.success.demoNotice}>
        <Button
          variant="blue"
          size="lg"
          onClick={() => {
            reset();
            setSent(false);
          }}
        >
          {labels.contact.success.again}
        </Button>
      </SuccessPanel>
    );
  }

  return (
    <Reveal>
      <form noValidate onSubmit={onSubmit} className="relative rounded-[2rem] bg-white p-6 ring-1 ring-line ring-inset sm:p-9">
        <h2 className="display text-[clamp(1.6rem,3vw,2.25rem)] text-lokambe-blue">{title}</h2>
        <Honeypot label={labels.common.honeypotLabel} {...register('website')} />

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label={f.kind} error={errors.kind?.message}>
              {({id, describedBy, invalid}) => (
                <Select id={id} aria-describedby={describedBy} invalid={invalid} defaultValue={defaultKind ?? ''} {...register('kind')}>
                  <option value="" disabled>
                    —
                  </option>
                  {CONTACT_KINDS.map((kind) => (
                    <option key={kind} value={kind}>
                      {labels.contact.kinds[kind]}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
          </div>
          <Field label={f.fullName} error={errors.fullName?.message}>
            {({id, describedBy, invalid}) => (
              <Input id={id} aria-describedby={describedBy} invalid={invalid} autoComplete="name" {...register('fullName')} />
            )}
          </Field>
          <Field label={f.organization} optionalLabel={labels.common.optional} error={errors.organization?.message}>
            {({id, describedBy, invalid}) => (
              <Input id={id} aria-describedby={describedBy} invalid={invalid} autoComplete="organization" {...register('organization')} />
            )}
          </Field>
          <Field label={f.email} error={errors.email?.message}>
            {({id, describedBy, invalid}) => (
              <Input id={id} type="email" inputMode="email" aria-describedby={describedBy} invalid={invalid} autoComplete="email" {...register('email')} />
            )}
          </Field>
          <Field label={f.phone} optionalLabel={labels.common.optional} error={errors.phone?.message}>
            {({id, describedBy, invalid}) => (
              <Input id={id} type="tel" inputMode="tel" aria-describedby={describedBy} invalid={invalid} autoComplete="tel" {...register('phone')} />
            )}
          </Field>
          <div className="sm:col-span-2">
            <Field label={f.message} error={errors.message?.message}>
              {({id, describedBy, invalid}) => (
                <Textarea id={id} rows={6} aria-describedby={describedBy} invalid={invalid} {...register('message')} />
              )}
            </Field>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <Button type="submit" variant="blue" size="lg" disabled={sending}>
            {sending ? labels.common.sending : labels.common.submit}
          </Button>
        </div>
      </form>
    </Reveal>
  );
}
