import { Section } from "@/components/Section";

const registers = [
  { title: "Flöten", names: "Julia Tiepelmann, Uwe Lautenschlager, Malte Jussen, Maike Schmidt, Ramona Reber" },
  { title: "Klarinetten", names: "Besetzung aus der aktuellen Website übernehmen" },
  { title: "Trompeten", names: "Gabriele Hassler, Alexander Spitzer, Antonia Hoffmann, Hans-Jürgen Reber" },
  { title: "Tenorhörner und Baritone", names: "Steffen Schmidt, Gennady Kichanov, weitere laut Vereinsregister-Seite" },
];

export default function RegisterPage() {
  return (
    <Section eyebrow="Verein" title="Register">
      <div className="grid gap-4 md:grid-cols-2">
        {registers.map((item) => (
          <article key={item.title} className="card p-6">
            <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.names}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
