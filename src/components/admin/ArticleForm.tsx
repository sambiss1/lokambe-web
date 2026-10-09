'use client';

import {Trash2} from 'lucide-react';
import NextImage from 'next/image';
import {useRouter} from 'next/navigation';
import {useRef, useState, useTransition} from 'react';
import {FALLBACK_BLOG_CATEGORIES, type BlogCategory} from '@/content/blog';
import type {BlogCategoryId} from '@/content/blog';
import {createArticle, updateArticle} from '@/lib/api/admin-actions';
import type {ActionResult, ArticleInput} from '@/lib/api/admin-actions';
import {ACTION_FAILURES} from '@/lib/api/action-result';
import {AdminButtonLink} from './AdminButton';
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
 *
 * La suppression n'est plus ici : elle a sa propre page
 * (`/admin/articles/<id>/supprimer`), qui nomme ce qu'on perd. Une boîte
 * `window.confirm` ne disait rien et ne se testait qu'en détournant `window`.
 */

type Props = {
  article?: ApiArticle;
  /**
   * Les thèmes administrables, brouillons compris : on prépare un thème avant
   * de l'ouvrir, et l'article qui l'attend doit pouvoir le choisir. À défaut,
   * la liste livrée avec le site — un menu vide rendrait le formulaire
   * insoumissible.
   */
  themes?: readonly BlogCategory[];
};

type Feedback = {tone: 'ok' | 'erreur'; text: string};

/** Les messages communs, avec deux formulations propres à l'article. */
const FAILURES: Record<string, string> = {
  ...ACTION_FAILURES,
  invalid: 'L’API a refusé ces valeurs. Vérifiez le titre, le chapô et le contenu.',
  introuvable: 'Cet article n’existe plus.',
};

/** Ce que la route de téléversement accepte, vérifié avant de partir. */
const COVER_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_COVER_BYTES = 10 * 1024 * 1024;

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[0.95rem] font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

export function ArticleForm({article, themes = FALLBACK_BLOG_CATEGORIES}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(article?.title ?? '');
  const [slug, setSlug] = useState(article?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(article));
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? '');
  const [category, setCategory] = useState<BlogCategoryId>(article?.category ?? themes[0]?.id ?? '');
  const [author, setAuthor] = useState(article?.author ?? 'L’équipe LOKAMBE');
  const [content, setContent] = useState(article?.content ?? '');
  const [coverFileId, setCoverFileId] = useState<string | null>(article?.coverFileId ?? null);
  const [coverAlt, setCoverAlt] = useState(article?.coverAlt ?? '');
  const [uploadingCover, setUploadingCover] = useState(false);
  /**
   * L'image choisie, lue dans le navigateur, **montrée avant la fin de
   * l'envoi**. Le panneau restait vide le temps du téléversement : on ne
   * voyait qu'au bout de plusieurs secondes qu'on s'était trompé de fichier.
   */
  const [localCover, setLocalCover] = useState<string | null>(null);

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
        // L'article existe désormais : on passe sur sa fiche.
        router.push(`/admin/articles/${result.data.id}`);
        router.refresh();
        return;
      }
      handle(result, '');
    });
  }

  async function uploadCover(file: File) {
    if (!COVER_TYPES.includes(file.type)) {
      setFeedback({tone: 'erreur', text: 'Format refusé : choisissez une image JPEG, PNG ou WebP.'});
      return;
    }
    if (file.size > MAX_COVER_BYTES) {
      setFeedback({
        tone: 'erreur',
        text: `Image trop lourde (${Math.round(file.size / (1024 * 1024))} Mo). ${Math.round(MAX_COVER_BYTES / (1024 * 1024))} Mo au maximum.`,
      });
      return;
    }

    // L'aperçu d'abord, l'envoi ensuite : on voit tout de suite ce qu'on a pris.
    const preview = URL.createObjectURL(file);
    setLocalCover((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return preview;
    });
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
      // L'image est désormais servie par l'API — ou l'envoi a échoué : dans les
      // deux cas l'adresse locale n'a plus de raison de retenir le fichier.
      URL.revokeObjectURL(preview);
      setLocalCover(null);
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
                className={cx(buttonBase, 'bg-lokambe-red-strong text-white hover:bg-lokambe-red-strong-hover')}
              >
                Publier
              </button>
            )}

            {article && (
              <AdminButtonLink tone="danger" href={`/admin/articles/${article.id}/supprimer`}>
                <Trash2 aria-hidden="true" className="size-4" strokeWidth={2.2} />
                Supprimer
              </AdminButtonLink>
            )}
          </div>

          {feedback && (
            <p
              role={feedback.tone === 'erreur' ? 'alert' : 'status'}
              className={cx(
                'mt-4 rounded-xl px-3.5 py-2.5 text-sm font-medium',
                feedback.tone === 'ok'
                  ? 'bg-lokambe-peach-soft text-ink-soft'
                  : 'bg-lokambe-red/10 text-lokambe-red-strong',
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
                {themes.map((item) => (
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
              <Field
                label="Description de l’image"
                htmlFor="article-couverture-alt"
                hint="Lue par les lecteurs d’écran."
              >
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
              {localCover ? (
                <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl bg-lokambe-peach-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element -- fichier local (blob:), hors de portée de next/image */}
                  <img src={localCover} alt="" className="size-full object-cover" />
                  <span className="absolute inset-0 grid place-items-center bg-ink/45 text-sm font-bold text-white">
                    Téléversement…
                  </span>
                </div>
              ) : null}
              <p className="mt-3 text-sm text-ink-soft">
                Sans image, le site affiche une photo correspondant au thème choisi. JPEG, PNG ou WebP, 10 Mo au
                maximum.
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
            // Piloté par le bouton voisin, mais nommé : `sr-only` le laisse
            // lisible par un lecteur d'écran, et sans nom il n'annonce rien.
            aria-label="Choisir une image de couverture"
            tabIndex={-1}
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
