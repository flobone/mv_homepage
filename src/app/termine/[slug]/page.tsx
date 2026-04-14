import Link from "next/link";
import { notFound } from "next/navigation";

import { formatDate, formatTimeRange } from "@/lib/format";
import { getEventBySlug } from "@/lib/site-data";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const title = event.overrideTitle ?? event.title;
  const description = event.overrideDescription ?? event.description;
  const location = event.overrideLocation ?? event.location;
  const imageUrl = event.overrideImageUrl;

  return (
    <div className="container-page py-14 sm:py-16">
      <article className="mx-auto max-w-4xl card p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7b1f3a]">
          Termin
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>

        <div className="mt-6 grid gap-4 rounded-3xl bg-slate-50 p-6 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Datum
            </p>
            <p className="mt-2 text-sm text-slate-700">{formatDate(event.startsAt)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Uhrzeit
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {formatTimeRange(event.startsAt, event.endsAt ?? null)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Ort
            </p>
            <p className="mt-2 text-sm text-slate-700">{location ?? "Ort folgt"}</p>
          </div>
        </div>

        {imageUrl ? (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <img
              src={imageUrl}
              alt={title}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}

        {description ? (
          <div className="mt-8 space-y-4 text-base leading-7 text-slate-700">
            {description.split(/\n\s*\n/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-base leading-7 text-slate-700">
            Weitere Informationen zu dieser Veranstaltung folgen.
          </p>
        )}

        <div className="mt-10">
          <Link href="/termine" className="button-secondary">
            Zurück zur Terminübersicht
          </Link>
        </div>
      </article>
    </div>
  );
}
