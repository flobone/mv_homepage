import { Section } from "@/components/Section";
import { formatDate, formatTimeRange } from "@/lib/format";
import { getEvents } from "@/lib/site-data";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <Section eyebrow="Termine" title="Kommende Veranstaltungen">
      <div className="grid gap-4">
        {events.map((event) => (
          <article
            key={event.id}
            className="card grid gap-2 p-6 md:grid-cols-[180px_1fr_180px_160px] md:items-center"
          >
            <p className="font-semibold text-[#7b1f3a]">{formatDate(event.startsAt)}</p>
            <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
            <p className="text-sm text-slate-600">
              {formatTimeRange(event.startsAt, event.endsAt ?? null)}
            </p>
            <p className="text-sm text-slate-600">{event.location ?? "Ort folgt"}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
