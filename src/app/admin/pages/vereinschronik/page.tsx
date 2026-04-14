import { RichTextPageEditor } from "@/components/admin/RichTextPageEditor";
import { fallbackChronikPage } from "@/lib/fallback-content";
import { getSitePageBySlug } from "@/lib/site-data";

import { saveChronikPage } from "./actions";

export default async function AdminChronikPage() {
  const page = await getSitePageBySlug("vereinschronik");

  return (
    <div className="card p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f4d7a]">
        Seiteneditor
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">Vereinschronik bearbeiten</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Diese Seite wird öffentlich unter <strong>/verein/chronik</strong> angezeigt. Die Zeitleiste am Rand
        wird automatisch aus den Überschriften der Ebene H2 erzeugt.
      </p>

      <div className="mt-8">
        <RichTextPageEditor
          initialTitle={page?.title ?? fallbackChronikPage.title}
          initialContentHtml={page?.contentHtml ?? fallbackChronikPage.contentHtml}
          action={saveChronikPage}
        />
      </div>
    </div>
  );
}
