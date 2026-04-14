import { Section } from "@/components/Section";

export default function AboutPage() {
  return (
    <Section eyebrow="Über uns" title="KumiBrass stellt sich vor">
      <div className="card p-8">
        <p className="section-text">
          Hier kannst du euren Verein vorstellen: Wer ihr seid, woher ihr kommt, welche Musik
          ihr spielt und was euch besonders macht. Diese Seite ist ideal für eure Geschichte,
          Besetzung und musikalische Ausrichtung.
        </p>
      </div>
    </Section>
  );
}
