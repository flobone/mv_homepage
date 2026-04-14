import { Section } from "@/components/Section";

export default function GalleryPage() {
  return (
    <Section eyebrow="Galerie" title="Einblicke in das Vereinsleben">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "Konzert",
          "Frühschoppen",
          "Jugendorchester",
          "Festzug",
          "Probenwochenende",
          "Vereinsleben",
        ].map((label, index) => (
          <div key={index} className="card p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              {label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
