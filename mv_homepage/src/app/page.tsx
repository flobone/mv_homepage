import Link from "next/link";
import { Section } from "@/components/Section";

const upcomingEvents = [
  { date: "24. Mai 2026", title: "Frühlingskonzert", place: "Bürgerhaus Wilnsdorf" },
  { date: "14. Juni 2026", title: "Sommerfest", place: "Innenstadt Siegen" },
  { date: "05. September 2026", title: "Hochzeitsbegleitung", place: "Region Siegerland" },
];

export default function HomePage() {
  return (
    <>
      <section className="container-page py-16 sm:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Moderne Blasmusik für jeden Anlass
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-ink sm:text-6xl">
              Musik, die Menschen zusammenbringt.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Wir sind KumiBrass aus dem Siegerland und spielen mit Freude auf Konzerten,
              Festen, Hochzeiten und Veranstaltungen jeder Art.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/kontakt" className="button-primary">
                Jetzt anfragen
              </Link>
              <Link href="/termine" className="button-secondary">
                Termine ansehen
              </Link>
            </div>
          </div>

          <div className="card p-8">
            <div className="rounded-3xl border border-dashed border-brand-teal/40 bg-brand-teal/5 p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">
                Platzhalter für Bild oder Logo
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Hier kann später ein großes Bühnenfoto, euer Vereinslogo oder ein Konzertmotiv hin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Über uns" title="Wer wir sind">
        <div className="card p-8">
          <p className="section-text">
            KumiBrass steht für einen bodenständigen, modernen Vereinsauftritt. Wir spielen
            ein vielseitiges Repertoire und begleiten Veranstaltungen mit musikalischem Gefühl,
            Energie und einem sympathischen Auftreten.
          </p>
        </div>
      </Section>

      <Section eyebrow="Termine" title="Die nächsten Auftritte">
        <div className="grid gap-4 md:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article key={event.title} className="card p-6">
              <p className="text-sm font-semibold text-brand-accent">{event.date}</p>
              <h3 className="mt-2 text-xl font-semibold text-brand-ink">{event.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{event.place}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Anfragen" title="Für welche Anlässe wir buchbar sind">
        <div className="grid gap-4 md:grid-cols-3">
          {["Hochzeiten", "Unterhaltung", "Konzerte"].map((item) => (
            <div key={item} className="card p-6">
              <h3 className="text-lg font-semibold">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Individuell, zuverlässig und passend zum Rahmen eurer Veranstaltung.
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
