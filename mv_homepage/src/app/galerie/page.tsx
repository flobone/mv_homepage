import { Section } from "@/components/Section";

export default function GalleryPage() {
  return (
    <Section eyebrow="Galerie" title="Bilder und Eindrücke">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="card p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              Bildplatzhalter {index + 1}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
