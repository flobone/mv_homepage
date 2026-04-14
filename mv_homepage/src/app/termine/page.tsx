import { Section } from "@/components/Section";

const events = [
  { date: "24. Mai 2026", title: "Frühlingskonzert", place: "Bürgerhaus Wilnsdorf" },
  { date: "14. Juni 2026", title: "Sommerfest", place: "Innenstadt Siegen" },
  { date: "05. September 2026", title: "Hochzeitsbegleitung", place: "Region Siegerland" },
  { date: "03. Oktober 2026", title: "Herbstkonzert", place: "Kulturhalle" },
];

export default function EventsPage() {
  return (
    <Section eyebrow="Termine" title="Kommende Auftritte">
      <div className="grid gap-4">
        {events.map((event) => (
          <article key={event.date + event.title} className="card grid gap-2 p-6 md:grid-cols-[180px_1fr_220px] md:items-center">
            <p className="font-semibold text-brand-accent">{event.date}</p>
            <h3 className="text-lg font-semibold text-brand-ink">{event.title}</h3>
            <p className="text-sm text-slate-600">{event.place}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
