'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {type FormEvent, useState} from 'react';
import {Field, controlClass} from '@/components/admin/Field';
import {Button} from '@/components/ui/Button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Les identifiants partent vers `/api/admin/session`, qui interroge l'API et
 * range le jeton dans un cookie httpOnly. Rien de sensible ne transite par cet
 * écran en retour.
 */
const MESSAGES: Record<string, string> = {
  'identifiants-refuses': 'Email ou mot de passe incorrect.',
  'trop-de-tentatives': 'Trop de tentatives. Patientez quelques minutes avant de réessayer.',
  'api-absente': 'Le service n’est pas encore configuré. Contactez l’équipe technique.',
  'api-injoignable': 'Le service est momentanément injoignable. Réessayez dans quelques instants.',
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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

    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: trimmed, password}),
      });

      if (!response.ok) {
        const {error: code} = (await response.json().catch(() => ({}))) as {error?: string};
        setError(MESSAGES[code ?? ''] ?? 'La connexion a échoué. Réessayez.');
        setPending(false);
        return;
      }

      // `suite` porte l'écran demandé avant la redirection vers la connexion.
      const suite = searchParams.get('suite');
      router.replace(suite?.startsWith('/admin') ? suite : '/admin');
      // Le cookie vient d'être posé : il faut refaire le rendu serveur pour que
      // les écrans du back-office voient la session.
      router.refresh();
    } catch {
      setError('La connexion a échoué. Vérifiez votre réseau, puis réessayez.');
      setPending(false);
    }
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
