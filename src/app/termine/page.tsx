import Link from "next/link";

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
            className="card grid gap-3 p-6 md:grid-cols-[180px_1fr_180px_180px] md:items-center"
          >
            <p className="font-semibold text-[#7b1f3a]">{formatDate(event.startsAt)}</p>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                <Link href={`/termine/${event.slug}`} className="hover:text-[#1f4d7a]">
                  {event.overrideTitle ?? event.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm font-semibold text-[#1f4d7a]">
                <Link href={`/termine/${event.slug}`}>Details ansehen →</Link>
              </p>
            </div>
            <p className="text-sm text-slate-600">
              {formatTimeRange(event.startsAt, event.endsAt ?? null)}
            </p>
            <p className="text-sm text-slate-600">{event.overrideLocation ?? event.location ?? "Ort folgt"}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
