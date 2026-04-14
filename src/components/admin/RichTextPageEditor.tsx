"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

function EditorButton({
  label,
  onClick,
  isActive = false,
}: {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-xl border px-3 py-2 text-sm font-medium transition",
        isActive
          ? "border-[#1f4d7a] bg-[#1f4d7a]/10 text-[#1f4d7a]"
          : "border-slate-300 bg-white text-slate-700 hover:border-[#1f4d7a] hover:text-[#1f4d7a]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export function RichTextPageEditor({
  initialTitle,
  initialContentHtml,
  action,
}: {
  initialTitle: string;
  initialContentHtml: string;
  action: (formData: FormData) => void;
}) {
  const [html, setHtml] = useState(initialContentHtml);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
    ],
    immediatelyRender: false,
    content: initialContentHtml,
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] rounded-2xl border border-slate-300 px-5 py-4 focus:outline-none prose prose-slate max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      setHtml(editor.getHTML());
    },
  });

  useEffect(() => {
    setHtml(initialContentHtml);
  }, [initialContentHtml]);

  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-800">
          Seitentitel
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initialTitle}
          required
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-800">Inhalt</p>
        <p className="mb-4 text-sm leading-6 text-slate-600">
          Für die Zeitleiste sollten Zwischenüberschriften als <strong>Überschrift 2</strong> geschrieben werden,
          idealerweise im Format <strong>„1919 — Überschrift“</strong>.
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          <EditorButton label="Absatz" onClick={() => editor?.chain().focus().setParagraph().run()} />
          <EditorButton
            label="Zwischenüberschrift"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor?.isActive("heading", { level: 2 })}
          />
          <EditorButton
            label="Unterüberschrift"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor?.isActive("heading", { level: 3 })}
          />
          <EditorButton
            label="Fett"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            isActive={editor?.isActive("bold")}
          />
          <EditorButton
            label="Kursiv"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            isActive={editor?.isActive("italic")}
          />
          <EditorButton
            label="Liste"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            isActive={editor?.isActive("bulletList")}
          />
        </div>

        <div className="rounded-2xl bg-white">
          <EditorContent editor={editor} />
        </div>
      </div>

      <input type="hidden" name="contentHtml" value={html} />

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="button-primary">
          Seite speichern
        </button>
      </div>
    </form>
  );
}
