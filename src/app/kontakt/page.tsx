import { Section } from "@/components/Section";

export default function ContactPage() {
  return (
    <Section eyebrow="Kontakt" title="So erreichen Sie uns">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-8">
          <h3 className="text-xl font-semibold">Musikverein Müsen 1919 e.V.</h3>
          <div className="mt-4 space-y-3 text-slate-700">
            <p>E-Mail: info@musikverein-muesen.de</p>
            <p>Ort: Hilchenbach-Müsen</p>
            <p>Für Anfragen, Auftritte und allgemeine Informationen freuen wir uns über Ihre Nachricht.</p>
          </div>
        </div>

        <div className="card p-8">
          <h3 className="text-xl font-semibold">Hinweis</h3>
          <p className="mt-4 section-text">
            Diese Seite kann später um ein echtes Kontaktformular, Ansprechpartner oder eine
            Anbindung an Social-Media-Kanäle ergänzt werden.
          </p>
        </div>
      </div>
    </Section>
  );
}
