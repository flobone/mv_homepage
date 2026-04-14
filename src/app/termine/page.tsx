import { Section } from "@/components/Section";

const events = [
  {
    date: "05. Oktober 2025",
    title: "Kürbisfest auf dem Irlenhof",
    time: "11:30 – 15:30 Uhr",
    place: "Ferndorf",
  },
  {
    date: "14. Dezember 2025",
    title: "Adventsnachmittag der Jugend",
    time: "15:00 – 17:00 Uhr",
    place: "Müsen",
  },
  {
    date: "21. Dezember 2025",
    title: "Adventskonzert Neurologische Klinik",
    time: "15:00 – 16:00 Uhr",
    place: "Hilchenbach",
  },
];

export default function EventsPage() {
  return (
    <Section eyebrow="Termine" title="Kommende Veranstaltungen">
      <div className="grid gap-4">
        {events.map((event) => (
          <article
            key={event.date + event.title}
            className="card grid gap-2 p-6 md:grid-cols-[180px_1fr_180px_160px] md:items-center"
          >
            <p className="font-semibold text-[#7b1f3a]">{event.date}</p>
            <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
            <p className="text-sm text-slate-600">{event.time}</p>
            <p className="text-sm text-slate-600">{event.place}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
