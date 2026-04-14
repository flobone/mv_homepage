import { notFound } from "next/navigation";

import { RichTextPageEditor } from "@/components/admin/RichTextPageEditor";
import { fallbackSitePages } from "@/lib/fallback-content";
import { getManagedPageDefinition } from "@/lib/page-config";
import { getSitePageBySlug } from "@/lib/site-data";

import { saveManagedPage } from "./actions";

export default async function AdminManagedPageEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const definition = getManagedPageDefinition(slug);

  if (!definition) {
    notFound();
  }

  const [page, fallback] = await Promise.all([
    getSitePageBySlug(slug),
    Promise.resolve(fallbackSitePages.find((entry) => entry.slug === slug) ?? null),
  ]);

  const initialTitle = page?.title ?? fallback?.title ?? definition.publicTitle;
  const initialContentHtml = page?.contentHtml ?? fallback?.contentHtml ?? "";

  return (
    <div className="card p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f4d7a]">
        Seiteneditor
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">
        {definition.adminTitle} bearbeiten
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Diese Seite wird öffentlich unter <strong>{definition.publicPath}</strong> angezeigt.
        {definition.timelineMode
          ? " Die Zeitleiste am Rand wird automatisch aus den Überschriften der Ebene H2 erzeugt."
          : " Änderungen werden direkt auf der öffentlichen Seite sichtbar, sobald sie gespeichert sind."}
      </p>

      <div className="mt-8">
        <RichTextPageEditor
          initialTitle={initialTitle}
          initialContentHtml={initialContentHtml}
          action={saveManagedPage.bind(null, slug)}
        />
      </div>
    </div>
  );
}
