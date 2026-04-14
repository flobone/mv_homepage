import Link from "next/link";

import { createNewsPost } from "@/app/admin/news/actions";
import { NewsPostForm } from "@/components/admin/NewsPostForm";

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Neuen Beitrag anlegen</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Neue Meldung für die Seite Aktuelles erstellen.
          </p>
        </div>
        <Link href="/admin/news" className="button-secondary">
          Zurück zur Übersicht
        </Link>
      </div>

      <div className="card p-6">
        <NewsPostForm action={createNewsPost} submitLabel="Beitrag anlegen" />
      </div>
    </div>
  );
}
