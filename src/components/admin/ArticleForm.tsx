'use client';

import {Trash2} from 'lucide-react';
import NextImage from 'next/image';
import {useRouter} from 'next/navigation';
import {useRef, useState, useTransition} from 'react';
import {blogCategories} from '@/content/blog';
import type {BlogCategoryId} from '@/content/blog';
import {createArticle, deleteArticle, updateArticle} from '@/lib/api/admin-actions';
import type {ActionResult, ArticleInput} from '@/lib/api/admin-actions';
import {isEmptyHtml, mediaPath, slugify} from '@/lib/blog/article';
import type {ApiArticle} from '@/lib/blog/article';
import {cx} from '@/lib/cx';
import {controlClass, Field, selectChevronStyle, selectClass} from './Field';
import {RichTextEditor} from './RichTextEditor';
import {Surface} from './Surface';

/**
 * Formulaire d'un article : les mêmes champs pour la création et la reprise.
 *
 * L'enregistrement passe par des server actions, jamais par un appel direct à
 * l'API : le jeton reste dans le cookie httpOnly.
 */

type Props = {article?: ApiArticle};

type Feedback = {tone: 'ok' | 'erreur'; text: string};

const FAILURES: Record<string, string> = {
  session: 'Votre session a expiré. Reconnectez-vous puis réessayez.',
  invalid: 'L’API a refusé ces valeurs. Vérifiez le titre, le chapô et le contenu.',
  introuvable: 'Cet article n’existe plus.',
  indisponible: 'API injoignable. Rien n’a été enregistré.',
};

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[0.95rem] font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

export function ArticleForm({article}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(article?.title ?? '');
  const [slug, setSlug] = useState(article?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(article));
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? '');
  const [category, setCategory] = useState<BlogCategoryId>(article?.category ?? 'entrepreneuriat');
  const [author, setAuthor] = useState(article?.author ?? 'L’équipe LOKAMBE');
  const [content, setContent] = useState(article?.content ?? '');
  const [coverFileId, setCoverFileId] = useState<string | null>(article?.coverFileId ?? null);
  const [coverAlt, setCoverAlt] = useState(article?.coverAlt ?? '');
  const [uploadingCover, setUploadingCover] = useState(false);

  const status = article?.status ?? 'brouillon';
  const published = status === 'publie';

  function changeTitle(next: string) {
    setTitle(next);
    if (!slugTouched) setSlug(slugify(next));
  }

  function validate(): string | null {
    if (title.trim().length < 3) return 'Donnez un titre à l’article.';
    if (excerpt.trim().length < 10) return 'Le chapô doit faire au moins dix caractères.';
    if (isEmptyHtml(content)) return 'L’article est vide : écrivez au moins un paragraphe.';
    return null;
  }

  function payload(nextStatus?: 'brouillon' | 'publie'): ArticleInput {
    return {
      title: title.trim(),
      slug: slug.trim() === '' ? undefined : slugify(slug),
      excerpt: excerpt.trim(),
      content,
      category,
      author: author.trim() === '' ? undefined : author.trim(),
      status: nextStatus,
      coverFileId,
      coverAlt: coverFileId ? coverAlt.trim() : undefined,
    };
  }

  function handle(result: ActionResult<unknown>, message: string): boolean {
    if (result.ok) {
      setFeedback({tone: 'ok', text: message});
      return true;
    }
    setFeedback({tone: 'erreur', text: FAILURES[result.reason] ?? FAILURES.indisponible});
    return false;
  }

  function save(nextStatus?: 'brouillon' | 'publie') {
    const problem = validate();
    if (problem) {
      setFeedback({tone: 'erreur', text: problem});
      return;
    }

    startTransition(async () => {
      if (article) {
        const result = await updateArticle(article.id, payload(nextStatus));
        if (handle(result, nextStatus === 'publie' ? 'Article publié.' : 'Article enregistré.')) {
          router.refresh();
        }
        return;
      }

      const result = await createArticle(payload(nextStatus ?? 'brouillon'));
      if (result.ok) {
        // L'article existe désormais : on passe sur son écran de reprise.
        router.push(`/admin/articles/${result.data.id}`);
        router.refresh();
        return;
      }
      handle(result, '');
    });
  }

  function remove() {
    if (!article) return;
    if (!window.confirm(`Supprimer définitivement « ${article.title} » ?`)) return;

    startTransition(async () => {
      const result = await deleteArticle(article.id);
      if (result.ok) {
        router.push('/admin/articles');
        router.refresh();
        return;
      }
      handle(result, '');
    });
  }

  async function uploadCover(file: File) {
    setUploadingCover(true);
    setFeedback(null);
    try {
      const body = new FormData();
      body.append('file', file);
      const response = await fetch('/api/admin/articles/media', {method: 'POST', body});
      const data = (await response.json()) as {fileId?: string; error?: string};
      if (!response.ok || !data.fileId) {
        setFeedback({tone: 'erreur', text: data.error ?? 'Image refusée.'});
        return;
      }
      setCoverFileId(data.fileId);
    } catch {
      setFeedback({tone: 'erreur', text: 'Téléversement impossible : vérifiez votre connexion.'});
    } finally {
      setUploadingCover(false);
    }
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <Surface className="p-5 sm:p-6">
        <div className="grid gap-5">
          <Field label="Titre" htmlFor="article-titre">
            <input
              id="article-titre"
              value={title}
              onChange={(event) => changeTitle(event.target.value)}
              className={controlClass}
              placeholder="Tenir un livre de caisse qui tient la route"
            />
          </Field>

          <Field
            label="Adresse de l’article"
            htmlFor="article-slug"
            hint={`Le lien public sera /blog/${slug || 'titre-de-l-article'}`}
          >
            <input
              id="article-slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              className={controlClass}
            />
          </Field>

          <Field label="Chapô" htmlFor="article-chapo" hint="Deux phrases : c’est ce qu’on lit dans la liste du blog.">
            <textarea
              id="article-chapo"
              value={excerpt}
              rows={3}
              onChange={(event) => setExcerpt(event.target.value)}
              className={cx(controlClass, 'resize-y')}
            />
          </Field>

          <div>
            <p id="article-contenu-label" className="text-xs font-bold tracking-[0.08em] text-ink-soft uppercase">
              Contenu
            </p>
            <div className="mt-1.5">
              <RichTextEditor value={content} onChange={setContent} labelledBy="article-contenu-label" />
            </div>
          </div>
        </div>
      </Surface>

      <div className="grid gap-6">
        <Surface className="p-5 sm:p-6">
          <h2 className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Publication</h2>

          <p className="mt-3 text-sm text-ink-soft">
            {article
              ? published
                ? 'Cet article est visible sur le site public.'
                : 'Brouillon : personne ne le voit en dehors du back-office.'
              : 'Le nouvel article est créé en brouillon.'}
          </p>

          <div className="mt-4 grid gap-2.5">
            <button
              type="button"
              disabled={pending}
              onClick={() => save()}
              className={cx(buttonBase, 'bg-lokambe-blue text-white hover:bg-lokambe-blue-deep')}
            >
              {pending ? 'Enregistrement…' : 'Enregistrer'}
            </button>

            {published ? (
              <button
                type="button"
                disabled={pending}
                onClick={() => save('brouillon')}
                className={cx(buttonBase, 'border border-line text-ink-soft hover:border-ink-soft/40')}
              >
                Repasser en brouillon
              </button>
            ) : (
              <button
                type="button"
                disabled={pending}
                onClick={() => save('publie')}
                className={cx(buttonBase, 'bg-lokambe-red text-white hover:bg-lokambe-red/90')}
              >
                Publier
              </button>
            )}

            {article && (
              <button
                type="button"
                disabled={pending}
                onClick={remove}
                className={cx(buttonBase, 'text-lokambe-red hover:bg-lokambe-red/10')}
              >
                <Trash2 aria-hidden="true" className="size-4" strokeWidth={2.2} />
                Supprimer
              </button>
            )}
          </div>

          {feedback && (
            <p
              role="status"
              className={cx(
                'mt-4 rounded-xl px-3.5 py-2.5 text-sm font-medium',
                feedback.tone === 'ok' ? 'bg-lokambe-peach-soft text-ink-soft' : 'bg-lokambe-red/10 text-lokambe-red',
              )}
            >
              {feedback.text}
            </p>
          )}
        </Surface>

        <Surface className="p-5 sm:p-6">
          <h2 className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Classement</h2>

          <div className="mt-4 grid gap-5">
            <Field label="Thème" htmlFor="article-theme">
              <select
                id="article-theme"
                value={category}
                onChange={(event) => setCategory(event.target.value as BlogCategoryId)}
                className={selectClass}
                style={selectChevronStyle}
              >
                {blogCategories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Signature" htmlFor="article-auteur">
              <input
                id="article-auteur"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                className={controlClass}
              />
            </Field>
          </div>
        </Surface>

        <Surface className="p-5 sm:p-6">
          <h2 className="text-xs font-extrabold tracking-[0.12em] text-lokambe-blue uppercase">Image de couverture</h2>

          {coverFileId ? (
            <div className="mt-4 grid gap-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-lokambe-peach-soft">
                <NextImage
                  src={mediaPath(coverFileId)}
                  alt=""
                  fill
                  sizes="20rem"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <Field label="Description de l’image" htmlFor="article-couverture-alt" hint="Lue par les lecteurs d’écran.">
                <input
                  id="article-couverture-alt"
                  value={coverAlt}
                  onChange={(event) => setCoverAlt(event.target.value)}
                  className={controlClass}
                  placeholder="Commerçante devant son étal"
                />
              </Field>
              <button
                type="button"
                onClick={() => {
                  setCoverFileId(null);
                  setCoverAlt('');
                }}
                className={cx(buttonBase, 'border border-line text-ink-soft hover:border-ink-soft/40')}
              >
                Retirer l’image
              </button>
            </div>
          ) : (
            <>
              <p className="mt-3 text-sm text-ink-soft">
                Sans image, le site affiche une photo correspondant au thème choisi.
              </p>
              <button
                type="button"
                disabled={uploadingCover}
                onClick={() => coverInput.current?.click()}
                className={cx(buttonBase, 'mt-4 w-full border border-line text-ink-soft hover:border-ink-soft/40')}
              >
                {uploadingCover ? 'Téléversement…' : 'Choisir une image'}
              </button>
            </>
          )}

          <input
            ref={coverInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = '';
              if (file) void uploadCover(file);
            }}
          />
        </Surface>
      </div>
    </div>
  );
}
