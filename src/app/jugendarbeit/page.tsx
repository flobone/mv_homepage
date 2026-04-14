import { Section } from "@/components/Section";

export default function YouthPage() {
  return (
    <Section eyebrow="Jugendarbeit" title="Musikalische Ausbildung mit Gemeinschaft">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-8">
          <p className="section-text">
            Die Jugendarbeit und die musikalische Ausbildung der Kinder und Jugendlichen im Ort
            ist ein wichtiger Schwerpunkt der Vereinsarbeit. Ziel ist es, junge Musikerinnen und
            Musiker an das Zusammenspiel im Orchester heranzuführen.
          </p>
        </div>

        <div className="card p-8">
          <p className="section-text">
            Mit dem Ausbildungskonzept möchte der Musikverein Müsen Kinder beim Erlernen eines
            Instruments unterstützen und parallel das Zusammenspiel in einer Gruppe fördern.
            Die Gemeinschaft ist dabei ein entscheidender Teil der Begeisterung für Orchestermusik.
          </p>
        </div>
      </div>
    </Section>
  );
}
