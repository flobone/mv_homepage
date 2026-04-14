import Link from "next/link";
import { notFound } from "next/navigation";

import { resetEventOverrides, updateEventOverrides } from "@/app/admin/events/actions";
import { EventOverrideForm } from "@/components/admin/EventOverrideForm";
import { formatDate, formatTimeRange } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function AdminEventEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      source: {
        select: { name: true },
      },
    },
  });

  if (!event) {
    notFound();
  }

  const effectiveTitle = event.overrideTitle ?? event.title;
  const effectiveDescription = event.overrideDescription ?? event.description;
  const effectiveLocation = event.overrideLocation ?? event.location;

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <Link href="/admin/events" className="text-sm font-semibold text-[#1f4d7a] hover:underline">
          ← Zurück zur Terminverwaltung
        </Link>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">Termin-Overrides bearbeiten</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Hier kannst du Titel, Beschreibung, Ort und optional ein Bild für die öffentliche Website überschreiben,
          ohne den zugrunde liegenden ICS-Kalender zu ändern.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-slate-900">Override-Felder</h3>
          <div className="mt-6">
            <EventOverrideForm
              event={event}
              action={updateEventOverrides.bind(null, event.id)}
            />
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <form
              action={async () => {
                "use server";
                await resetEventOverrides(event.id);
              }}
            >
              <button className="rounded-full border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 hover:border-red-300">
                Alle Overrides zurücksetzen
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900">Importierte Kalendersicht</h3>
            <dl className="mt-4 space-y-3 text-sm text-slate-600">
              <div>
                <dt className="font-semibold text-slate-900">Titel</dt>
                <dd>{event.title}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Datum</dt>
                <dd>{formatDate(event.startsAt)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Zeit</dt>
                <dd>{formatTimeRange(event.startsAt, event.endsAt ?? null)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Ort</dt>
                <dd>{event.location ?? "Ort folgt"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Quelle</dt>
                <dd>{event.source?.name ?? "Manuell / unbekannt"}</dd>
              </div>
            </dl>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900">Öffentliche Darstellung</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-900">Titel:</span> {effectiveTitle}</p>
              <p><span className="font-semibold text-slate-900">Ort:</span> {effectiveLocation ?? "Ort folgt"}</p>
              <p><span className="font-semibold text-slate-900">Beschreibung:</span> {effectiveDescription ?? "Keine Beschreibung hinterlegt."}</p>
              <p><span className="font-semibold text-slate-900">Bild:</span> {event.overrideImageUrl ?? "Kein Bild gesetzt"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
