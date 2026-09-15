'use client';

import {useRouter} from 'next/navigation';
import {type FormEvent, useState} from 'react';
import {Field, controlClass} from '@/components/admin/Field';
import {Button} from '@/components/ui/Button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !password) {
      setError('Email et mot de passe requis.');
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError('Cette adresse email n’est pas valide.');
      return;
    }

    setError(null);
    setPending(true);
    // TODO(api) : POST /auth/login, stockage du cookie httpOnly, gestion des 401 / 429.
    router.push('/admin');
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Field label="Email" htmlFor="login-email">
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="prenom@lokambe.example"
          className={controlClass}
        />
      </Field>

      <Field label="Mot de passe" htmlFor="login-password">
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={controlClass}
        />
      </Field>

      {error ? (
        <p role="alert" className="rounded-xl bg-lokambe-red/10 px-3.5 py-2.5 text-sm font-medium text-lokambe-red">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Connexion…' : 'Se connecter'}
      </Button>
    </form>
  );
}
