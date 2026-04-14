import type { NewsPost, Event, GalleryImage } from "@prisma/client";

export type FallbackSitePage = {
  slug: string;
  title: string;
  contentHtml: string;
};

export const fallbackNews: NewsPost[] = [
  {
    id: "news-1",
    slug: "kuerbisfest-auf-dem-irlenhof",
    title: "Kürbisfest auf dem Irlenhof",
    excerpt:
      "Zum zweiten Mal durfte der Musikverein in diesem Jahr das Kürbisfest auf dem Irlenhof in Ferndorf begleiten.",
    content:
      "Zum zweiten Mal durfte der Musikverein in diesem Jahr das Kürbisfest auf dem Irlenhof in Ferndorf begleiten. Es war eine stimmungsvolle Veranstaltung mit vielen Besucherinnen und Besuchern.",
    publishedAt: new Date("2023-10-21T12:00:00Z"),
    isPublished: true,
    coverImage: null,
    createdAt: new Date("2023-10-21"),
    updatedAt: new Date("2023-10-21"),
  },
  {
    id: "news-2",
    slug: "fruehschoppen-zum-1-mai",
    title: "Frühschoppen zum 1. Mai",
    excerpt:
      "Bei gutem Wetter gab es ein buntes Programm aus klassischer und moderner Blasmusik.",
    content:
      "Beim traditionellen Frühschoppen gab es neben Bier, Würstchen und Pizza ein buntes Programm aus klassischer und moderner Blasmusik.",
    publishedAt: new Date("2023-05-08T12:00:00Z"),
    isPublished: true,
    coverImage: null,
    createdAt: new Date("2023-10-21"),
    updatedAt: new Date("2023-10-21"),
  },
  {
    id: "news-3",
    slug: "fruehlingskonzert-in-hilchenbach",
    title: "Frühlingskonzert in Hilchenbach",
    excerpt:
      "Das Frühlingskonzert bot einen abwechslungsreichen Mix aus traditioneller Literatur und moderner Musik.",
    content:
      "Das Frühlingskonzert fand in der Aula der Carl-Krämer-Realschule statt und bot ein abwechslungsreiches Programm mit Beiträgen aller Jugendgruppen.",
    publishedAt: new Date("2023-05-08T16:00:00Z"),
    isPublished: true,
    coverImage: null,
    createdAt: new Date("2023-10-21"),
    updatedAt: new Date("2023-10-21"),
  },
];

export const fallbackEvents: Event[] = [
  {
    id: "event-1",
    slug: "fruehlingskonzert-2027",
    title: "Frühlingskonzert",
    description: null,
    location: "Hilchenbach",
    startsAt: new Date("2027-03-20T19:00:00+01:00"),
    endsAt: new Date("2027-03-20T22:00:00+01:00"),
    isPublished: true,
    isHidden: false,
    externalUid: null,
    categories: [],
    exclusionReason: null,
    sourceId: null,
    lastImportedAt: null,
    overrideTitle: null,
    overrideDescription: null,
    overrideLocation: null,
    overrideImageUrl: null,
    createdAt: new Date("2027-01-01T00:00:00+01:00"),
    updatedAt: new Date("2027-01-01T00:00:00+01:00"),
  },
  {
    id: "event-2",
    slug: "maibaum-aufstellen-2026",
    title: "Maibaum Aufstellen",
    description: null,
    location: "Müsen",
    startsAt: new Date("2026-04-30T18:00:00+02:00"),
    endsAt: new Date("2026-04-30T20:00:00+02:00"),
    isPublished: true,
    isHidden: false,
    externalUid: null,
    categories: [],
    exclusionReason: null,
    sourceId: null,
    lastImportedAt: null,
    overrideTitle: null,
    overrideDescription: null,
    overrideLocation: null,
    overrideImageUrl: null,
    createdAt: new Date("2026-01-01T00:00:00+01:00"),
    updatedAt: new Date("2026-01-01T00:00:00+01:00"),
  },
  {
    id: "event-3",
    slug: "fruehschoppen-zum-1-mai-2026",
    title: "Frühschoppen zum 1. Mai",
    description: null,
    location: "Müsen",
    startsAt: new Date("2026-05-01T11:00:00+02:00"),
    endsAt: new Date("2026-05-01T16:00:00+02:00"),
    isPublished: true,
    isHidden: false,
    externalUid: null,
    categories: [],
    exclusionReason: null,
    sourceId: null,
    lastImportedAt: null,
    overrideTitle: null,
    overrideDescription: null,
    overrideLocation: null,
    overrideImageUrl: null,
    createdAt: new Date("2026-01-01T00:00:00+01:00"),
    updatedAt: new Date("2026-01-01T00:00:00+01:00"),
  },
];

export const fallbackGalleryImages: GalleryImage[] = [
  {
    id: "gallery-1",
    title: "Konzert",
    slug: "konzert",
    imageUrl: "",
    altText: "Konzert",
    caption: "Vereinsleben",
    isPublished: true,
    createdAt: new Date("2026-01-01T00:00:00+01:00"),
    updatedAt: new Date("2026-01-01T00:00:00+01:00"),
  },
  {
    id: "gallery-2",
    title: "Frühschoppen",
    slug: "fruehschoppen",
    imageUrl: "",
    altText: "Frühschoppen",
    caption: "Vereinsleben",
    isPublished: true,
    createdAt: new Date("2026-01-01T00:00:00+01:00"),
    updatedAt: new Date("2026-01-01T00:00:00+01:00"),
  },
  {
    id: "gallery-3",
    title: "Jugendorchester",
    slug: "jugendorchester",
    imageUrl: "",
    altText: "Jugendorchester",
    caption: "Jugend",
    isPublished: true,
    createdAt: new Date("2026-01-01T00:00:00+01:00"),
    updatedAt: new Date("2026-01-01T00:00:00+01:00"),
  },
];

export const fallbackSitePages: FallbackSitePage[] = [
  {
    slug: "vereinschronik",
    title: "Chronik",
    contentHtml: `
      <h2>1919 — Gründung in einer Zeit des Aufbruchs</h2>
      <p>Im Juli 1919, kurz nach dem Ende des Ersten Weltkriegs, wurde der Verein zunächst als Posaunenchor Müsen gegründet. Die ersten 16 aktiven Musiker wollten kirchliche und weltliche Anlässe musikalisch begleiten und zugleich ein starkes Gemeinschaftsleben aufbauen.</p>
      <p>Von Beginn an gehörten gute Musik, Geselligkeit und ein offenes Miteinander zum Selbstverständnis des jungen Vereins. Gerade in einer Zeit des gesellschaftlichen Umbruchs war das gemeinsame Musizieren ein sichtbares Zeichen von Zusammenhalt im Ort.</p>

      <h2>1921 — Aus dem Posaunenchor wird der Musikverein Müsen</h2>
      <p>Bereits zwei Jahre nach der Gründung erhielt der junge Klangkörper seinen bis heute vertrauten Namen: Musikverein Müsen. In den folgenden Jahren wuchs die öffentliche Präsenz des Vereins spürbar.</p>
      <p>Mit Auftritten, Veranstaltungen und den ersten größeren Anschaffungen an Instrumenten und Uniformen entstand Schritt für Schritt ein Verein, der im Dorfleben fest verankert war.</p>

      <h2>1920er — Musik wird Teil des Alltags</h2>
      <p>In den 1920er Jahren hatte gemeinsames Musizieren einen besonderen Stellenwert. Der Musikverein war nicht nur bei öffentlichen Anlässen präsent, sondern prägte auch das private und gesellschaftliche Leben mit.</p>
      <p>Neben dem Blasorchester entstand zeitweise sogar ein Streichorchester, das bei Familienfeiern und Hochzeiten spielte. Diese Phase zeigt, wie breit die musikalische Begeisterung im Ort schon früh angelegt war.</p>

      <h2>1930er — Der Verein bleibt trotz Spannungen bestehen</h2>
      <p>Die politischen Entwicklungen der 1930er Jahre gingen auch am Musikverein nicht spurlos vorbei. Die ursprünglich angestrebte politische Neutralität geriet unter Druck, es kam zu inneren Spannungen und personellen Veränderungen.</p>
      <p>Trotzdem gelang es den Mitgliedern, den Verein über diese Zeit hinweg zusammenzuhalten. Dass der Musikverein nicht zerfiel, war in diesen Jahren alles andere als selbstverständlich.</p>

      <h2>ab 1945 — Wiederaufbau und neues Vertrauen</h2>
      <p>Nach dem Zweiten Weltkrieg begann ein neuer Aufbau. In den späten 1940er und 1950er Jahren entwickelte sich der Musikverein erneut zu einem festen Bestandteil des kulturellen Lebens in Müsen und der Umgebung.</p>
      <p>Konzerte, Feierlichkeiten und Festtage bekamen wieder einen musikalischen Rahmen. Engagierte Vereinsverantwortliche und Dirigenten schufen in dieser Zeit das Fundament für viele Jahrzehnte erfolgreicher Vereinsarbeit.</p>

      <h2>1959–1969 — Jubiläen als Meilensteine</h2>
      <p>Das 40-jährige Jubiläum im Jahr 1959 und das 50-jährige Bestehen 1969 wurden mit großen Feiern begangen. Diese Jubiläen waren weit mehr als reine Festtermine.</p>
      <p>Sie machten sichtbar, wie eng der Musikverein mit dem Dorfleben verbunden war und wie sehr er längst zu einem verlässlichen kulturellen Mittelpunkt geworden war.</p>

      <h2>1975–1979 — Zwischen neuer Satzung und 900 Jahre Müsen</h2>
      <p>In den 1970er Jahren stellte sich der Verein organisatorisch und musikalisch neu auf. 1975 gab er sich eine moderne Satzung und festigte damit die Grundlagen für die weitere Vereinsentwicklung.</p>
      <p>Das 60-jährige Jubiläum im Jahr 1979 fiel mit den Feierlichkeiten zu 900 Jahre Müsen zusammen. Gastvereine, Konzerte und ein großer Frühschoppen machten diese Zeit zu einem besonderen Kapitel der Vereinsgeschichte.</p>

      <h2>1980er–2000er — Nachwuchs wird zur tragenden Säule</h2>
      <p>Seit den 1980er Jahren gewann die Nachwuchsarbeit immer stärker an Bedeutung. Neue Uniformen, der Aufbau eines Jugendorchesters und später weitere Ausbildungsangebote stärkten den Verein nicht nur musikalisch, sondern auch personell.</p>
      <p>In den 1990er Jahren und zu Beginn der 2000er Jahre entwickelte sich diese Arbeit konsequent weiter. Kinder und Jugendliche fanden früh Zugang zur Orchestermusik und wuchsen nach und nach in das Hauptorchester hinein.</p>

      <h2>Heute — Ein lebendiger Verein mit Geschichte</h2>
      <p>Heute steht der Musikverein Müsen für gelebte Tradition, musikalische Qualität und eine enge Verbundenheit mit dem Ort. Die Geschichte des Vereins zeigt, wie viel durch ehrenamtliches Engagement und generationenübergreifende Gemeinschaft entstehen kann.</p>
      <p>Die Chronik ist damit nicht nur ein Blick zurück. Sie erklärt auch, warum der Verein bis heute ein fester Bestandteil des kulturellen Lebens in Müsen ist und mit Zuversicht in die Zukunft schaut.</p>
    `.trim(),
  },
  {
    slug: "ueber-uns",
    title: "Über uns",
    contentHtml: `
      <h2>Musikverein Müsen 1919 e.V.</h2>
      <p>Der Musikverein Müsen steht seit mehr als einem Jahrhundert für Blasmusik, Gemeinschaft und kulturelles Engagement im Ort. Aus einer langen Tradition heraus ist ein Verein entstanden, der heute generationenübergreifend wirkt und das musikalische Leben in Müsen und darüber hinaus mitgestaltet.</p>
      <p>Rund 50 aktive Musikerinnen und Musiker bilden das Orchester. Hinzu kommen zahlreiche passive Mitglieder, Unterstützerinnen und Unterstützer, die den Verein im Hintergrund mittragen.</p>

      <h2>Musik und Gemeinschaft</h2>
      <p>Der Verein begleitet Konzerte, Frühschoppen, kirchliche und dörfliche Anlässe sowie viele weitere Veranstaltungen in der Region. Dabei gehört nicht nur die Musik zum Selbstverständnis des Vereins, sondern auch das Miteinander innerhalb des Orchesters und mit dem Publikum.</p>
      <p>Tradition und Offenheit schließen sich dabei nicht aus. Der Musikverein Müsen pflegt seine Wurzeln und entwickelt sich zugleich musikalisch und organisatorisch weiter.</p>

      <h2>Engagement im Ort</h2>
      <p>Als Teil des kulturellen Lebens in Müsen ist der Verein eng mit dem Ort verbunden. Viele Veranstaltungen im Jahreslauf wären ohne musikalische Begleitung durch den Musikverein kaum denkbar.</p>
      <p>So trägt der Verein nicht nur zur musikalischen Gestaltung bei, sondern auch zum Zusammenhalt im Dorf und zur Pflege gemeinsamer Traditionen.</p>
    `.trim(),
  },
  {
    slug: "jugendarbeit",
    title: "Jugendarbeit",
    contentHtml: `
      <h2>Früh fördern, gemeinsam wachsen</h2>
      <p>Die Jugendarbeit ist ein wesentlicher Bestandteil der Vereinsarbeit des Musikverein Müsen. Kinder und Jugendliche sollen früh an Musik, Instrumente und das Zusammenspiel in einer Gruppe herangeführt werden.</p>
      <p>Dabei geht es nicht nur um musikalische Ausbildung, sondern auch um Gemeinschaft, Verlässlichkeit und die Freude daran, gemeinsam etwas zu gestalten.</p>

      <h2>Ausbildung mit Perspektive</h2>
      <p>Der Verein unterstützt junge Musikerinnen und Musiker beim Einstieg in die Instrumentalausbildung und begleitet sie auf dem Weg in Ensemble- und Orchesterspiel. So entsteht nach und nach eine Verbindung zwischen Lernen, Proben und ersten Auftritten.</p>
      <p>Auf diese Weise wächst aus der Jugendarbeit ein tragfähiges Fundament für die Zukunft des Hauptorchesters.</p>

      <h2>Jugend als Zukunft des Vereins</h2>
      <p>Die Erfahrungen der vergangenen Jahrzehnte zeigen, wie wichtig eine lebendige Nachwuchsarbeit für die Entwicklung des Vereins ist. Viele heutige Mitglieder haben ihre ersten musikalischen Schritte in den Jugendgruppen des Vereins gemacht.</p>
      <p>Jugendarbeit ist deshalb keine Nebenaufgabe, sondern ein zentraler Teil dessen, was den Musikverein Müsen langfristig trägt.</p>
    `.trim(),
  },
];

export const fallbackChronikPage = fallbackSitePages[0];
