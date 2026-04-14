import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f4d7a]">
            Verwaltungsbereich
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Hallo, {session.user.name ?? session.user.email}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Rolle: {session.user.role}
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="button-secondary">Abmelden</button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="card p-4">
          <nav className="flex flex-col gap-2 text-sm">
            <Link className="rounded-xl px-3 py-2 hover:bg-slate-50" href="/admin">
              Übersicht
            </Link>
            <Link className="rounded-xl px-3 py-2 hover:bg-slate-50" href="/admin/news">
              News
            </Link>
            <Link className="rounded-xl px-3 py-2 hover:bg-slate-50" href="/admin/events">
              Termine
            </Link>
            <Link className="rounded-xl px-3 py-2 hover:bg-slate-50" href="/admin/gallery">
              Galerie
            </Link>
            <Link className="rounded-xl px-3 py-2 hover:bg-slate-50" href="/admin/pages">
              Seiten
            </Link>
            <Link className="rounded-xl px-3 py-2 hover:bg-slate-50" href="/admin/settings">
              Einstellungen
            </Link>
          </nav>
        </aside>

        <section>{children}</section>
      </div>
    </div>
  );
}
