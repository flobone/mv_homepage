import Link from "next/link";

import { auth } from "@/auth";
import { RichChronikTimeline } from "@/components/RichChronikTimeline";
import { fallbackSitePages } from "@/lib/fallback-content";
import { addAnchorsToHtml } from "@/lib/rich-text";
import { getSitePageBySlug } from "@/lib/site-data";

export default async function ChronikPage() {
  const [session, storedPage] = await Promise.all([
    auth(),
    getSitePageBySlug("vereinschronik"),
  ]);

  const fallback = fallbackSitePages.find((page) => page.slug === "vereinschronik");
  const title = storedPage?.title ?? fallback?.title ?? "Chronik";
  const contentHtml = storedPage?.contentHtml ?? fallback?.contentHtml ?? "";
  const enriched = addAnchorsToHtml(contentHtml);
  const canEdit = session?.user?.role === "ADMIN" || session?.user?.role === "EDITOR";

  return (
    <div className="container-page py-14 sm:py-16">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#7b1f3a]">
          Verein
        </p>
        <h1 className="section-title">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Die Geschichte des Musikverein Müsen wird hier als fortlaufende Erzählung sichtbar,
          begleitet von einer Zeitleiste, die durch die wichtigsten Stationen führt.
        </p>
        {canEdit ? (
          <div className="mt-6">
            <Link href="/admin/pages/vereinschronik" className="button-secondary">
              Seite bearbeiten
            </Link>
          </div>
        ) : null}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f4d7a]">
              Zeitleiste
            </p>
            <RichChronikTimeline contentRootId="chronik-rich-content" />
          </div>
        </aside>

        <article className="card p-7 sm:p-8">
          <div
            id="chronik-rich-content"
            className="chronik-rich-content prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: enriched.html }}
          />
        </article>
      </div>
    </div>
  );
}
