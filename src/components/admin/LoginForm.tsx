"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/login/actions";

const initialState = {
  error: "",
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(authenticate, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-800">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          placeholder="admin@musikverein-muesen.de"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-800">
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1f4d7a]"
          placeholder="••••••••"
        />
      </div>

      {state?.error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="button-primary w-full justify-center">
        {pending ? "Anmeldung läuft ..." : "Anmelden"}
      </button>
    </form>
  );
}
