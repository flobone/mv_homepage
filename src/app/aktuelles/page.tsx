import { Section } from "@/components/Section";
import { formatDate } from "@/lib/format";
import { getNewsPosts } from "@/lib/site-data";


export default async function NewsPage() {
  const news = await getNewsPosts();

  return (
    <Section eyebrow="Aktuelles" title="Neuigkeiten aus dem Vereinsleben">
      <div className="grid gap-4">
        {news.map((item) => (
          <article key={item.id} className="card p-8">
            <p className="text-sm font-semibold text-[#7b1f3a]">{formatDate(item.publishedAt)}</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-4 section-text">{item.content ?? item.excerpt ?? ""}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
