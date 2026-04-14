import { Section } from "@/components/Section";
import { getPublicContacts } from "@/lib/site-data";

export default async function ContactPage() {
  const contacts = await getPublicContacts();

  return (
    <Section eyebrow="Kontakt" title="So erreichen Sie uns">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-8">
          <h3 className="text-xl font-semibold">Ansprechpartner</h3>
          <div className="mt-4 space-y-4 text-slate-700">
            {contacts.map((contact) => (
              <div key={contact.id}>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-slate-600">{contact.role}</p>
                {contact.email ? <p>{contact.email}</p> : null}
                {contact.phone ? <p>{contact.phone}</p> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="card p-8">
          <h3 className="text-xl font-semibold">Technische Richtung der finalen Seite</h3>
          <p className="mt-4 section-text">
            Ansprechpartner kommen künftig aus Neon. Bilder, Downloads und Galeriedateien
            werden in Vercel Blob abgelegt. So können Inhalte später ohne Änderungen am
            Quellcode gepflegt werden.
          </p>
        </div>
      </div>
    </Section>
  );
}
