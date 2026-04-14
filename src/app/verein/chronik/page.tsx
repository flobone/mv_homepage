import { Section } from "@/components/Section";

export default function ChronikPage() {
  return (
    <Section eyebrow="Verein" title="Chronik">
      <div className="card p-8">
        <p className="section-text">
          Im Juli 1919, kurz nach dem Ersten Weltkrieg, wurde der Musikverein als
          Posaunenchor Müsen gegründet. Zunächst bestand er aus 16 aktiven Musikern,
          die sich gute Musik zu kirchlichen und nichtkirchlichen Anlässen sowie ein
          lebendiges Vereinsleben zum Ziel setzten.
        </p>
        <p className="section-text mt-4">
          Diese Seite ist als moderne Chronik-Seite vorbereitet und kann später mit
          einer ausführlichen Zeitleiste, historischen Fotos und Jubiläumsstationen
          erweitert werden.
        </p>
      </div>
    </Section>
  );
}
