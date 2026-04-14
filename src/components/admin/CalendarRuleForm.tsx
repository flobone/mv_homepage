"use client";

import { useActionState } from "react";

type SourceOption = {
  id: string;
  name: string;
};

import { createExclusionRule } from "@/app/admin/events/actions";

const initialState = {
  error: "",
  success: "",
};

export function CalendarRuleForm({ sources }: { sources: SourceOption[] }) {
  const [state, formAction, pending] = useActionState(createExclusionRule, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="rule-source" className="mb-2 block text-sm font-medium text-slate-800">
          Kalenderquelle
        </label>
        <select
          id="rule-source"
          name="sourceId"
          required
          defaultValue={sources[0]?.id ?? ""}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
        >
          {sources.length === 0 ? <option value="">Keine Quelle vorhanden</option> : null}
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="rule-type" className="mb-2 block text-sm font-medium text-slate-800">
          Regeltyp
        </label>
        <select
          id="rule-type"
          name="ruleType"
          defaultValue="TITLE_CONTAINS"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
        >
          <option value="TITLE_CONTAINS">Titel enthält</option>
          <option value="LOCATION_CONTAINS">Ort enthält</option>
          <option value="CATEGORY_EQUALS">Kategorie ist genau</option>
          <option value="UID_EQUALS">UID ist genau</option>
        </select>
      </div>

      <div>
        <label htmlFor="rule-value" className="mb-2 block text-sm font-medium text-slate-800">
          Regelwert
        </label>
        <input
          id="rule-value"
          name="value"
          required
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          placeholder="z. B. Probe"
        />
      </div>

      <div>
        <label htmlFor="rule-description" className="mb-2 block text-sm font-medium text-slate-800">
          Interne Beschreibung
        </label>
        <input
          id="rule-description"
          name="description"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          placeholder="optional"
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-slate-700">
        <input type="checkbox" name="isActive" defaultChecked className="h-4 w-4 rounded border-slate-300" />
        Regel sofort aktiv schalten
      </label>

      {state?.error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{state.success}</p>
      ) : null}

      <button type="submit" disabled={pending || sources.length === 0} className="button-primary">
        {pending ? "Regel wird angelegt ..." : "Ausschlussregel anlegen"}
      </button>
    </form>
  );
}
