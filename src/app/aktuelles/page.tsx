import { Section } from "@/components/Section";

const news = [
  {
    title: "Kürbisfest auf dem Irlenhof",
    date: "21. Oktober 2023",
    text: "Zum zweiten Mal durfte der Musikverein in diesem Jahr das Kürbisfest auf dem Irlenhof in Ferndorf begleiten. Es war eine stimmungsvolle Veranstaltung mit vielen Besucherinnen und Besuchern.",
  },
  {
    title: "Frühschoppen zum 1. Mai",
    date: "08. Mai 2023",
    text: "Beim traditionellen Frühschoppen gab es neben Bier, Würstchen und Pizza ein buntes Programm aus klassischer und moderner Blasmusik. Auch Mini- und Jugendorchester waren dabei.",
  },
  {
    title: "Frühlingskonzert in Hilchenbach",
    date: "08. Mai 2023",
    text: "Das Frühlingskonzert fand in der Aula der Carl-Krämer-Realschule statt und bot ein abwechslungsreiches Programm mit Beiträgen aller Jugendgruppen.",
  },
];

export default function NewsPage() {
  return (
    <Section eyebrow="Aktuelles" title="Neuigkeiten aus dem Vereinsleben">
      <div className="grid gap-4">
        {news.map((item) => (
          <article key={item.title} className="card p-8">
            <p className="text-sm font-semibold text-[#7b1f3a]">{item.date}</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-4 section-text">{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
