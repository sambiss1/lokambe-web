'use client';

import TiptapImage from '@tiptap/extension-image';
import {EditorContent, useEditor} from '@tiptap/react';
import type {Editor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from 'lucide-react';
import {useRef, useState} from 'react';
import {cx} from '@/lib/cx';

/**
 * Éditeur de texte du back-office.
 *
 * Il produit du HTML, que l'API renettoie avant l'enregistrement : ce qui est
 * refusé ici (script, style, attribut d'événement) l'est aussi là-bas. La barre
 * d'outils ne propose que les balises que le site sait mettre en page.
 */

type Props = {
  value: string;
  onChange: (html: string) => void;
  /** Identifiant du libellé décrivant la zone, pour les lecteurs d'écran. */
  labelledBy: string;
};

type ToolButtonProps = {
  label: string;
  icon: typeof Bold;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
};

function ToolButton({label, icon: Icon, onClick, active = false, disabled = false}: ToolButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        'inline-flex size-9 items-center justify-center rounded-lg transition-colors duration-200',
        'disabled:cursor-not-allowed disabled:opacity-40',
        active ? 'bg-lokambe-blue text-white' : 'text-ink-soft hover:bg-lokambe-peach-soft hover:text-lokambe-blue',
      )}
    >
      <Icon aria-hidden="true" className="size-[1.05rem]" strokeWidth={2.2} />
    </button>
  );
}

function Separator() {
  return <span aria-hidden="true" className="mx-1 h-6 w-px flex-none bg-line" />;
}

export function RichTextEditor({value, onChange, labelledBy}: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    // Next rend d'abord côté serveur : sans cela, l'éditeur crie à l'hydratation.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Le titre de l'article est le h1 de la page : le corps commence à h2.
        heading: {levels: [2, 3]},
        link: {openOnClick: false, autolink: true},
        codeBlock: false,
        code: false,
      }),
      TiptapImage.configure({inline: false}),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'article-rich min-h-[24rem] px-5 py-6 focus:outline-none',
        'aria-labelledby': labelledBy,
      },
    },
    onUpdate: ({editor: current}) => onChange(current.getHTML()),
  });

  if (!editor) {
    return <div className="min-h-[28rem] rounded-xl border border-line bg-white" aria-hidden="true" />;
  }

  function openLink(current: Editor) {
    setLinkValue(current.getAttributes('link').href ?? '');
    setLinkOpen(true);
  }

  function applyLink() {
    const href = linkValue.trim();
    if (href === '') {
      editor!.chain().focus().unsetLink().run();
    } else {
      editor!.chain().focus().extendMarkRange('link').setLink({href}).run();
    }
    setLinkOpen(false);
  }

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append('file', file);
      const response = await fetch('/api/admin/articles/media', {method: 'POST', body});
      const data = (await response.json()) as {url?: string; error?: string};
      if (!response.ok || !data.url) {
        setError(data.error ?? 'Image refusée.');
        return;
      }
      editor!.chain().focus().setImage({src: data.url, alt: ''}).run();
    } catch {
      setError('Téléversement impossible : vérifiez votre connexion.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white focus-within:border-lokambe-blue">
      <div role="toolbar" aria-label="Mise en forme" className="flex flex-wrap items-center gap-0.5 border-b border-line px-2 py-1.5">
        <ToolButton
          label="Gras"
          icon={Bold}
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolButton
          label="Italique"
          icon={Italic}
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <Separator />
        <ToolButton
          label="Titre de section"
          icon={Heading2}
          active={editor.isActive('heading', {level: 2})}
          onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
        />
        <ToolButton
          label="Sous-titre"
          icon={Heading3}
          active={editor.isActive('heading', {level: 3})}
          onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
        />
        <Separator />
        <ToolButton
          label="Liste à puces"
          icon={List}
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolButton
          label="Liste numérotée"
          icon={ListOrdered}
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolButton
          label="Citation"
          icon={Quote}
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <Separator />
        <ToolButton label="Lien" icon={Link2} active={editor.isActive('link')} onClick={() => openLink(editor)} />
        <ToolButton
          label={uploading ? 'Téléversement…' : 'Insérer une image'}
          icon={ImagePlus}
          disabled={uploading}
          onClick={() => fileInput.current?.click()}
        />
        <Separator />
        <ToolButton
          label="Annuler"
          icon={Undo2}
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolButton
          label="Rétablir"
          icon={Redo2}
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        />
      </div>

      {linkOpen && (
        <div className="flex flex-wrap items-center gap-2 border-b border-line bg-lokambe-peach-soft/60 px-3 py-2">
          <label htmlFor="editeur-lien" className="text-xs font-bold tracking-[0.08em] text-ink-soft uppercase">
            Adresse du lien
          </label>
          <input
            id="editeur-lien"
            type="url"
            value={linkValue}
            placeholder="https://exemple.com"
            onChange={(event) => setLinkValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                applyLink();
              }
            }}
            className="min-w-56 flex-1 rounded-lg border border-line bg-white px-3 py-1.5 text-sm focus:border-lokambe-blue focus:outline-none"
          />
          <button
            type="button"
            onClick={applyLink}
            className="rounded-lg bg-lokambe-blue px-3 py-1.5 text-sm font-bold text-white"
          >
            {linkValue.trim() === '' ? 'Retirer' : 'Appliquer'}
          </button>
          <button
            type="button"
            onClick={() => setLinkOpen(false)}
            className="rounded-lg px-3 py-1.5 text-sm font-bold text-ink-soft hover:text-lokambe-blue"
          >
            Annuler
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="border-b border-line bg-lokambe-red/10 px-4 py-2 text-sm font-medium text-lokambe-red">
          {error}
        </p>
      )}

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (file) void upload(file);
        }}
      />

      <EditorContent editor={editor} />
    </div>
  );
}
