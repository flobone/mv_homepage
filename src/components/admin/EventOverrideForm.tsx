"use client";

import { useActionState } from "react";
import type { Event } from "@prisma/client";

type EventsFormState = {
  error?: string;
  success?: string;
};

type EventOverrideFormProps = {
  event: Event;
  action: (state: EventsFormState | undefined, formData: FormData) => Promise<EventsFormState>;
};

const initialState: EventsFormState = {};

export function EventOverrideForm({ event, action }: EventOverrideFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="overrideTitle" className="mb-2 block text-sm font-medium text-slate-800">
          Öffentlicher Titel
        </label>
        <input
          id="overrideTitle"
          name="overrideTitle"
          defaultValue={event.overrideTitle ?? ""}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          placeholder={event.title}
        />
      </div>

      <div>
        <label htmlFor="overrideDescription" className="mb-2 block text-sm font-medium text-slate-800">
          Öffentliche Beschreibung
        </label>
        <textarea
          id="overrideDescription"
          name="overrideDescription"
          rows={6}
          defaultValue={event.overrideDescription ?? ""}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          placeholder={event.description ?? "Optionaler Beschreibungstext für die Website"}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label htmlFor="overrideLocation" className="mb-2 block text-sm font-medium text-slate-800">
            Öffentlicher Ort
          </label>
          <input
            id="overrideLocation"
            name="overrideLocation"
            defaultValue={event.overrideLocation ?? ""}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
            placeholder={event.location ?? "Ort folgt"}
          />
        </div>

        <div>
          <label htmlFor="overrideImageUrl" className="mb-2 block text-sm font-medium text-slate-800">
            Bild-URL
          </label>
          <input
            id="overrideImageUrl"
            name="overrideImageUrl"
            type="url"
            defaultValue={event.overrideImageUrl ?? ""}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
            placeholder="https://..."
          />
        </div>
      </div>

      {state?.error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{state.success}</p>
      ) : null}

      <button type="submit" disabled={pending} className="button-primary">
        {pending ? "Speichert ..." : "Overrides speichern"}
      </button>
    </form>
  );
}
