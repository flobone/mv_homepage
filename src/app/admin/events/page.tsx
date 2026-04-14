import {
  deleteCalendarSource,
  deleteExclusionRule,
  toggleCalendarSourceActive,
  toggleEventHidden,
  toggleEventPublished,
  toggleExclusionRuleActive,
  triggerCalendarSync,
} from "@/app/admin/events/actions";
import { CalendarRuleForm } from "@/components/admin/CalendarRuleForm";
import { CalendarSourceForm } from "@/components/admin/CalendarSourceForm";
import { formatDate, formatTimeRange } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function AdminEventsPage() {
  const [sources, events] = await Promise.all([
    prisma.calendarSource.findMany({
      include: {
        rules: {
          orderBy: [{ isActive: "desc" }, { value: "asc" }],
        },
        _count: {
          select: { events: true },
        },
      },
      orderBy: { name: "asc" },
    }),
    prisma.event.findMany({
      orderBy: [{ startsAt: "asc" }, { title: "asc" }],
      take: 40,
      include: {
        source: {
          select: { name: true },
        },
      },
    }),
  ]);

  const sourceOptions = sources.map((source) => ({ id: source.id, name: source.name }));

  return (
    <div className="space-y-6">
      <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Termine verwalten</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Kalenderquellen anbinden, Ausschlussregeln pflegen und importierte Termine kontrollieren.
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await triggerCalendarSync();
          }}
        >
          <button className="button-primary">Kalender jetzt synchronisieren</button>
        </form>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-slate-900">Neue Kalenderquelle</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Hier wird ein externer ICS-Kalender hinterlegt, aus dem öffentliche Termine importiert werden.
          </p>
          <div className="mt-6">
            <CalendarSourceForm />
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-semibold text-slate-900">Neue Ausschlussregel</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Mit Regeln können interne Termine wie Proben, Vorstandssitzungen oder Kategorien ausgefiltert werden.
          </p>
          <div className="mt-6">
            <CalendarRuleForm sources={sourceOptions} />
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-slate-900">Kalenderquellen und Regeln</h3>
        </div>

        {sources.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">Es ist noch keine Kalenderquelle hinterlegt.</div>
        ) : (
          <div className="divide-y divide-slate-200">
            {sources.map((source) => (
              <section key={source.id} className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-lg font-semibold text-slate-900">{source.name}</h4>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          source.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {source.isActive ? "Aktiv" : "Inaktiv"}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {source._count.events} importierte Termine
                      </span>
                    </div>

                    <p className="mt-2 break-all text-sm text-slate-500">{source.icsUrl}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      Letzter Sync: {source.lastSyncedAt ? formatDate(source.lastSyncedAt) : "noch nie"}
                      {source.lastSyncStatus ? ` · Status: ${source.lastSyncStatus}` : ""}
                    </p>
                    {source.lastSyncMessage ? (
                      <p className="mt-1 text-sm text-slate-500">{source.lastSyncMessage}</p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <form
                      action={async () => {
                        "use server";
                        await toggleCalendarSourceActive(source.id);
                      }}
                    >
                      <button className="button-secondary">
                        {source.isActive ? "Deaktivieren" : "Aktivieren"}
                      </button>
                    </form>

                    <form
                      action={async () => {
                        "use server";
                        await deleteCalendarSource(source.id);
                      }}
                    >
                      <button className="rounded-full border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 hover:border-red-300">
                        Löschen
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Ausschlussregeln
                  </p>
                  {source.rules.length === 0 ? (
                    <p className="text-sm text-slate-500">Für diese Quelle gibt es noch keine Regeln.</p>
                  ) : (
                    <div className="space-y-3">
                      {source.rules.map((rule) => (
                        <article key={rule.id} className="rounded-2xl border border-slate-200 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{rule.ruleType}</p>
                              <p className="mt-1 font-mono text-sm text-slate-600">{rule.value}</p>
                              {rule.description ? (
                                <p className="mt-2 text-sm text-slate-500">{rule.description}</p>
                              ) : null}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <form
                                action={async () => {
                                  "use server";
                                  await toggleExclusionRuleActive(rule.id);
                                }}
                              >
                                <button className="button-secondary">
                                  {rule.isActive ? "Deaktivieren" : "Aktivieren"}
                                </button>
                              </form>
                              <form
                                action={async () => {
                                  "use server";
                                  await deleteExclusionRule(rule.id);
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
              </section>
            ))}
          </div>
        )}
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-slate-900">Importierte Termine</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Hier siehst du die nächsten importierten Termine und kannst sie zusätzlich manuell veröffentlichen oder ausblenden.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">Es wurden noch keine Termine importiert oder angelegt.</div>
        ) : (
          <div className="divide-y divide-slate-200">
            {events.map((event) => (
              <article key={event.id} className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-lg font-semibold text-slate-900">{event.title}</h4>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          event.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {event.isPublished ? "Veröffentlicht" : "Entwurf"}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          event.isHidden ? "bg-red-50 text-red-700" : "bg-sky-50 text-sky-700"
                        }`}
                      >
                        {event.isHidden ? "Ausgeblendet" : "Sichtbar"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      {formatDate(event.startsAt)} · {formatTimeRange(event.startsAt, event.endsAt)}
                      {event.location ? ` · ${event.location}` : ""}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Quelle: {event.source?.name ?? "manuell / unbekannt"}
                    </p>
                    {event.exclusionReason ? (
                      <p className="mt-2 text-sm text-red-700">Ausblendungsgrund: {event.exclusionReason}</p>
                    ) : null}
                    {event.categories.length > 0 ? (
                      <p className="mt-2 text-sm text-slate-500">Kategorien: {event.categories.join(", ")}</p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <form
                      action={async () => {
                        "use server";
                        await toggleEventPublished(event.id);
                      }}
                    >
                      <button className="button-secondary">
                        {event.isPublished ? "Depublizieren" : "Veröffentlichen"}
                      </button>
                    </form>
                    <form
                      action={async () => {
                        "use server";
                        await toggleEventHidden(event.id);
                      }}
                    >
                      <button className="button-secondary">
                        {event.isHidden ? "Einblenden" : "Ausblenden"}
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
