import { Section } from "@/components/Section";

export default function ClubPage() {
  return (
    <Section eyebrow="Verein" title="Unser Verein">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-8">
          <p className="section-text">
            Der Musikverein Müsen wurde im Jahr 1919 gegründet. Er besteht zur Zeit aus
            etwa 50 aktiven Musikerinnen und Musikern. Außerdem unterstützen über 200
            passive Mitglieder die Vereinsarbeit finanziell und tatkräftig.
          </p>
        </div>

        <div className="card p-8">
          <p className="section-text">
            Ein jährlicher Höhepunkt ist das Jahreskonzert im Frühjahr. Über das Jahr verteilt
            tritt der Verein außerdem bei vielen weiteren Veranstaltungen in der Region auf,
            darunter Frühschoppen, Schützenfeste, Konzerte, Zapfenstreiche und Festzüge.
          </p>
        </div>
      </div>
    </Section>
  );
}
