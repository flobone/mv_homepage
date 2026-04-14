import Link from "next/link";
import { Section } from "@/components/Section";

const upcomingEvents = [
  {
    date: "05. Oktober 2025",
    title: "Kürbisfest auf dem Irlenhof",
    place: "Ferndorf",
  },
  {
    date: "14. Dezember 2025",
    title: "Adventsnachmittag der Jugend",
    place: "Müsen",
  },
  {
    date: "21. Dezember 2025",
    title: "Adventskonzert Neurologische Klinik",
    place: "Hilchenbach",
  },
];

const newsItems = [
  {
    title: "Kürbisfest auf dem Irlenhof",
    text: "Zum zweiten Mal durfte der Verein das Kürbisfest auf dem Irlenhof in Ferndorf begleiten.",
  },
  {
    title: "Frühschoppen zum 1. Mai",
    text: "Bei gutem Wetter gab es ein buntes Programm aus klassischer und moderner Blasmusik.",
  },
  {
    title: "Frühlingskonzert in Hilchenbach",
    text: "Das Frühjahrskonzert bot einen abwechslungsreichen Mix aus traditioneller Literatur und moderner Musik.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="container-page py-16 sm:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7b1f3a]">
              Musikverein Müsen 1919 e.V.
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Musikverein Müsen ...
            </h1>
            <p className="mt-2 text-2xl font-semibold text-[#1f4d7a]">
              ... anders als man denkt.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Seit 1919 steht der Musikverein Müsen für Blasmusik, Gemeinschaft und
              musikalisches Engagement im Ort und in der Region.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/termine" className="button-primary">
                Termine ansehen
              </Link>
              <Link href="/verein" className="button-secondary">
                Mehr über den Verein
              </Link>
            </div>
          </div>

          <div className="card p-8">
            <div className="rounded-3xl border border-dashed border-[#1f4d7a]/30 bg-[#1f4d7a]/5 p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f4d7a]">
                Platzhalter für Titelbild oder Video
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Hier kann später ein großes Vereinsfoto, das Imagevideo oder ein stimmungsvolles
                Konzertbild eingebunden werden.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Aktuelles" title="Neuigkeiten aus dem Vereinsleben">
        <div className="grid gap-4 md:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.title} className="card p-6">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Termine" title="Die nächsten Veranstaltungen">
        <div className="grid gap-4 md:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article key={event.title} className="card p-6">
              <p className="text-sm font-semibold text-[#7b1f3a]">{event.date}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{event.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{event.place}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Verein" title="Tradition und Gemeinschaft seit 1919">
        <div className="card p-8">
          <p className="section-text">
            Der Musikverein Müsen wurde im Jahr 1919 gegründet und besteht heute aus etwa
            50 aktiven Musikerinnen und Musikern. Darüber hinaus wird die Vereinsarbeit von
            über 200 passiven Mitgliedern unterstützt.
          </p>
        </div>
      </Section>
    </>
  );
}
