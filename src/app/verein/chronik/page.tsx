import { ChronikTimeline } from "@/components/ChronikTimeline";

const chronikEntries = [
  {
    id: "1919-gruendung",
    year: "1919",
    label: "Gründung als Posaunenchor",
    title: "Gründung in einer Zeit des Aufbruchs",
    paragraphs: [
      "Im Juli 1919, kurz nach dem Ende des Ersten Weltkriegs, wurde der Verein zunächst als Posaunenchor Müsen gegründet. Die ersten 16 aktiven Musiker wollten kirchliche und weltliche Anlässe musikalisch begleiten und zugleich ein starkes Gemeinschaftsleben aufbauen.",
      "Von Beginn an gehörten gute Musik, Geselligkeit und ein offenes Miteinander zum Selbstverständnis des jungen Vereins. Gerade in einer Zeit des gesellschaftlichen Umbruchs war das gemeinsame Musizieren ein sichtbares Zeichen von Zusammenhalt im Ort.",
    ],
  },
  {
    id: "1921-umbenennung",
    year: "1921",
    label: "Neuer Name, neues Selbstverständnis",
    title: "Aus dem Posaunenchor wird der Musikverein Müsen",
    paragraphs: [
      "Bereits zwei Jahre nach der Gründung erhielt der junge Klangkörper seinen bis heute vertrauten Namen: Musikverein Müsen. In den folgenden Jahren wuchs die öffentliche Präsenz des Vereins spürbar.",
      "Mit Auftritten, Veranstaltungen und den ersten größeren Anschaffungen an Instrumenten und Uniformen entstand Schritt für Schritt ein Verein, der im Dorfleben fest verankert war.",
    ],
  },
  {
    id: "1920er-jahre",
    year: "1920er",
    label: "Aufbau und musikalische Vielfalt",
    title: "Musik wird Teil des Alltags",
    paragraphs: [
      "In den 1920er Jahren hatte gemeinsames Musizieren einen besonderen Stellenwert. Der Musikverein war nicht nur bei öffentlichen Anlässen präsent, sondern prägte auch das private und gesellschaftliche Leben mit.",
      "Neben dem Blasorchester entstand zeitweise sogar ein Streichorchester, das bei Familienfeiern und Hochzeiten spielte. Diese Phase zeigt, wie breit die musikalische Begeisterung im Ort schon früh angelegt war.",
    ],
  },
  {
    id: "1930er-jahre",
    year: "1930er",
    label: "Schwierige Jahre",
    title: "Der Verein bleibt trotz Spannungen bestehen",
    paragraphs: [
      "Die politischen Entwicklungen der 1930er Jahre gingen auch am Musikverein nicht spurlos vorbei. Die ursprünglich angestrebte politische Neutralität geriet unter Druck, es kam zu inneren Spannungen und personellen Veränderungen.",
      "Trotzdem gelang es den Mitgliedern, den Verein über diese Zeit hinweg zusammenzuhalten. Dass der Musikverein nicht zerfiel, war in diesen Jahren alles andere als selbstverständlich.",
    ],
  },
  {
    id: "neubeginn-nach-1945",
    year: "ab 1945",
    label: "Neubeginn nach dem Krieg",
    title: "Wiederaufbau und neues Vertrauen",
    paragraphs: [
      "Nach dem Zweiten Weltkrieg begann ein neuer Aufbau. In den späten 1940er und 1950er Jahren entwickelte sich der Musikverein erneut zu einem festen Bestandteil des kulturellen Lebens in Müsen und der Umgebung.",
      "Konzerte, Feierlichkeiten und Festtage bekamen wieder einen musikalischen Rahmen. Engagierte Vereinsverantwortliche und Dirigenten schufen in dieser Zeit das Fundament für viele Jahrzehnte erfolgreicher Vereinsarbeit.",
    ],
  },
  {
    id: "jubilaeen",
    year: "1959–1969",
    label: "Jubiläen als Meilensteine",
    title: "40 und 50 Jahre Vereinsgeschichte",
    paragraphs: [
      "Das 40-jährige Jubiläum im Jahr 1959 und das 50-jährige Bestehen 1969 wurden mit großen Feiern begangen. Diese Jubiläen waren weit mehr als reine Festtermine.",
      "Sie machten sichtbar, wie eng der Musikverein mit dem Dorfleben verbunden war und wie sehr er längst zu einem verlässlichen kulturellen Mittelpunkt geworden war.",
    ],
  },
  {
    id: "1970er-jahre",
    year: "1975–1979",
    label: "Neuordnung und Jubiläumszeit",
    title: "Zwischen neuer Satzung und 900 Jahre Müsen",
    paragraphs: [
      "In den 1970er Jahren stellte sich der Verein organisatorisch und musikalisch neu auf. 1975 gab er sich eine moderne Satzung und festigte damit die Grundlagen für die weitere Vereinsentwicklung.",
      "Das 60-jährige Jubiläum im Jahr 1979 fiel mit den Feierlichkeiten zu 900 Jahre Müsen zusammen. Gastvereine, Konzerte und ein großer Frühschoppen machten diese Zeit zu einem besonderen Kapitel der Vereinsgeschichte.",
    ],
  },
  {
    id: "jugendarbeit",
    year: "1980er–2000er",
    label: "Jugendarbeit als Zukunftsprojekt",
    title: "Nachwuchs wird zur tragenden Säule",
    paragraphs: [
      "Seit den 1980er Jahren gewann die Nachwuchsarbeit immer stärker an Bedeutung. Neue Uniformen, der Aufbau eines Jugendorchesters und später weitere Ausbildungsangebote stärkten den Verein nicht nur musikalisch, sondern auch personell.",
      "In den 1990er Jahren und zu Beginn der 2000er Jahre entwickelte sich diese Arbeit konsequent weiter. Kinder und Jugendliche fanden früh Zugang zur Orchestermusik und wuchsen nach und nach in das Hauptorchester hinein.",
    ],
  },
  {
    id: "heute",
    year: "heute",
    label: "Tradition mit Blick nach vorn",
    title: "Ein lebendiger Verein mit Geschichte",
    paragraphs: [
      "Heute steht der Musikverein Müsen für gelebte Tradition, musikalische Qualität und eine enge Verbundenheit mit dem Ort. Die Geschichte des Vereins zeigt, wie viel durch ehrenamtliches Engagement und generationenübergreifende Gemeinschaft entstehen kann.",
      "Die Chronik ist damit nicht nur ein Blick zurück. Sie erklärt auch, warum der Verein bis heute ein fester Bestandteil des kulturellen Lebens in Müsen ist und mit Zuversicht in die Zukunft schaut.",
    ],
  },
];

export default function ChronikPage() {
  return (
    <div className="container-page py-14 sm:py-16">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#7b1f3a]">
          Verein
        </p>
        <h1 className="section-title">Chronik</h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Die Geschichte des Musikverein Müsen ist eine Geschichte von Aufbruch,
          Gemeinschaft und musikalischer Beständigkeit. Auf dieser Seite wird die
          Entwicklung des Vereins als fließende Erzählung sichtbar, begleitet von
          einer Zeitleiste, die durch die wichtigsten Stationen führt.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f4d7a]">
              Zeitleiste
            </p>
            <ChronikTimeline
              items={chronikEntries.map(({ id, year, label }) => ({ id, year, label }))}
            />
          </div>
        </aside>

        <div className="space-y-6">
          {chronikEntries.map((entry) => (
            <section
              key={entry.id}
              id={entry.id}
              className="chronik-section card p-7 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="rounded-full bg-[#1f4d7a]/10 px-3 py-1 text-sm font-semibold text-[#1f4d7a]">
                  {entry.year}
                </span>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {entry.title}
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                {entry.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="section-text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
