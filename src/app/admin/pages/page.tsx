import Link from "next/link";

import { getManagedSitePages } from "@/lib/site-data";

export default async function AdminPagesOverviewPage() {
  const pages = await getManagedSitePages();

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f4d7a]">
          Seitenverwaltung
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">
          Redaktionelle Seiten bearbeiten
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Hier verwaltest du frei editierbare Vereinsseiten. Die Inhalte werden in der Datenbank
          gespeichert und öffentlich mit Fallback-Inhalten angezeigt.
        </p>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <article
            key={page.slug}
            className="card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{page.adminTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{page.summary}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                Öffentlich: {page.publicPath}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Letzte Änderung:{" "}
                {page.page
                  ? new Intl.DateTimeFormat("de-DE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(page.page.updatedAt)
                  : "noch nicht gespeichert"}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={page.publicPath} className="button-secondary">
                Seite ansehen
              </Link>
              <Link href={`/admin/pages/${page.slug}`} className="button-primary">
                Bearbeiten
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
