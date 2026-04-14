import Link from "next/link";

import { deleteNewsPost, toggleNewsPostPublished } from "@/app/admin/news/actions";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function AdminNewsPage() {
  const news = await prisma.newsPost.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">News verwalten</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Beiträge anlegen, bearbeiten, veröffentlichen oder ausblenden.
          </p>
        </div>

        <Link href="/admin/news/new" className="button-primary">
          Neuer Beitrag
        </Link>
      </div>

      <div className="card overflow-hidden">
        {news.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">
            Es sind noch keine News-Beiträge vorhanden.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {news.map((item) => (
              <article key={item.id} className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.isPublished
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.isPublished ? "Veröffentlicht" : "Entwurf"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      Slug: <span className="font-mono">{item.slug}</span>
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Veröffentlichung: {formatDate(item.publishedAt)}
                    </p>
                    {(item.excerpt ?? item.content) ? (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.excerpt ?? item.content}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/news/${item.id}/edit`} className="button-secondary">
                      Bearbeiten
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await toggleNewsPostPublished(item.id);
                      }}
                    >
                      <button className="button-secondary">
                        {item.isPublished ? "Depublizieren" : "Veröffentlichen"}
                      </button>
                    </form>

                    <form
                      action={async () => {
                        "use server";
                        await deleteNewsPost(item.id);
                      }}
                    >
                      <button className="rounded-full border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 hover:border-red-300">
                        Löschen
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
