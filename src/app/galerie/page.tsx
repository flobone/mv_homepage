import { Section } from "@/components/Section";
import { getGalleryImages } from "@/lib/site-data";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <Section eyebrow="Galerie" title="Einblicke in das Vereinsleben">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <div key={image.id} className="card p-4">
            {image.blobUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image.blobUrl}
                alt={image.altText ?? image.title}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                {image.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
