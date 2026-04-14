"use client";

import { useActionState } from "react";

import { createCalendarSource } from "@/app/admin/events/actions";

const initialState = {
  error: "",
  success: "",
};

export function CalendarSourceForm() {
  const [state, formAction, pending] = useActionState(createCalendarSource, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="source-name" className="mb-2 block text-sm font-medium text-slate-800">
          Name der Kalenderquelle
        </label>
        <input
          id="source-name"
          name="name"
          required
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          placeholder="Öffentlicher Vereinskalender"
        />
      </div>

      <div>
        <label htmlFor="source-icsUrl" className="mb-2 block text-sm font-medium text-slate-800">
          ICS-URL
        </label>
        <input
          id="source-icsUrl"
          name="icsUrl"
          type="url"
          required
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          placeholder="https://.../calendar.ics"
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-slate-700">
        <input type="checkbox" name="isActive" defaultChecked className="h-4 w-4 rounded border-slate-300" />
        Quelle sofort aktiv schalten
      </label>

      {state?.error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{state.success}</p>
      ) : null}

      <button type="submit" disabled={pending} className="button-primary">
        {pending ? "Quelle wird angelegt ..." : "Kalenderquelle anlegen"}
      </button>
    </form>
  );
}
