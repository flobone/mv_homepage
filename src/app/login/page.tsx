import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-md">
        <div className="card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f4d7a]">
            Adminbereich
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Anmelden
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Nur berechtigte Personen können auf den Verwaltungsbereich des
            Musikverein Müsen zugreifen.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
