import Link from "next/link";

import { auth } from "@/auth";
import { fallbackSitePages } from "@/lib/fallback-content";
import { getSitePageBySlug } from "@/lib/site-data";

export default async function AboutPage() {
  const [session, storedPage] = await Promise.all([
    auth(),
    getSitePageBySlug("ueber-uns"),
  ]);

  const fallback = fallbackSitePages.find((page) => page.slug === "ueber-uns");
  const title = storedPage?.title ?? fallback?.title ?? "Über uns";
  const contentHtml = storedPage?.contentHtml ?? fallback?.contentHtml ?? "";
  const canEdit = session?.user?.role === "ADMIN" || session?.user?.role === "EDITOR";

  return (
    <div className="container-page py-14 sm:py-16">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#7b1f3a]">
          Verein
        </p>
        <h1 className="section-title">{title}</h1>
        {canEdit ? (
          <div className="mt-6">
            <Link href="/admin/pages/ueber-uns" className="button-secondary">
              Seite bearbeiten
            </Link>
          </div>
        ) : null}
      </div>

      <article className="card mt-10 p-7 sm:p-8">
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}
