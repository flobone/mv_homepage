"use client";

import { useActionState } from "react";

import type { NewsPost } from "@prisma/client";

type NewsFormState = {
  error?: string;
};

type NewsPostFormProps = {
  action: (state: NewsFormState | undefined, formData: FormData) => Promise<NewsFormState>;
  submitLabel: string;
  post?: NewsPost;
};

const initialState: NewsFormState = {};

function toDateTimeLocalValue(value: Date | string): string {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function NewsPostForm({ action, submitLabel, post }: NewsPostFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-800">
            Titel
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={post?.title ?? ""}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
            placeholder="Zum Beispiel: Frühlingskonzert begeistert Publikum"
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-2 block text-sm font-medium text-slate-800">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={post?.slug ?? ""}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
            placeholder="Leer lassen für automatische Erzeugung"
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-slate-800">
          Kurztext
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={post?.excerpt ?? ""}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          placeholder="Kurze Zusammenfassung für Listenansichten"
        />
      </div>

      <div>
        <label htmlFor="content" className="mb-2 block text-sm font-medium text-slate-800">
          Inhalt
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          defaultValue={post?.content ?? ""}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          placeholder="Vollständiger News-Text"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label htmlFor="coverImage" className="mb-2 block text-sm font-medium text-slate-800">
            Titelbild-URL
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            defaultValue={post?.coverImage ?? ""}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
            placeholder="https://..."
          />
        </div>

        <div>
          <label htmlFor="publishedAt" className="mb-2 block text-sm font-medium text-slate-800">
            Veröffentlichungsdatum
          </label>
          <input
            id="publishedAt"
            name="publishedAt"
            type="datetime-local"
            required
            defaultValue={toDateTimeLocalValue(post?.publishedAt ?? new Date())}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={post?.isPublished ?? true}
          className="h-4 w-4 rounded border-slate-300"
        />
        Beitrag direkt veröffentlichen
      </label>

      {state?.error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={pending} className="button-primary">
          {pending ? "Speichert ..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
