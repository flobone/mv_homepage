import { Section } from "@/components/Section";

export default function ContactPage() {
  return (
    <Section eyebrow="Kontakt" title="So erreichst du uns">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-8">
          <h3 className="text-xl font-semibold">Buchungsanfragen</h3>
          <div className="mt-4 space-y-3 text-slate-700">
            <p>E-Mail: kontakt@kumibrass.de</p>
            <p>Telefon: 01234 / 567890</p>
            <p>Ort: Siegerland</p>
          </div>
        </div>

        <div className="card p-8">
          <h3 className="text-xl font-semibold">Hinweis</h3>
          <p className="mt-4 section-text">
            Später kann hier ein echtes Kontaktformular ergänzt werden. Für den Start reicht oft
            eine E-Mail-Adresse, damit die Seite schnell online gehen kann.
          </p>
        </div>
      </div>
    </Section>
  );
}
