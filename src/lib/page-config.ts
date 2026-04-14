export type ManagedPageDefinition = {
  slug: string;
  adminTitle: string;
  publicTitle: string;
  publicPath: string;
  summary: string;
  timelineMode?: boolean;
};

export const managedPages: ManagedPageDefinition[] = [
  {
    slug: "vereinschronik",
    adminTitle: "Vereinschronik",
    publicTitle: "Chronik",
    publicPath: "/verein/chronik",
    summary: "Historische Vereinsseite mit Zeitleiste.",
    timelineMode: true,
  },
  {
    slug: "ueber-uns",
    adminTitle: "Über uns",
    publicTitle: "Über uns",
    publicPath: "/ueber-uns",
    summary: "Allgemeine Vorstellung des Vereins.",
  },
  {
    slug: "jugendarbeit",
    adminTitle: "Jugendarbeit",
    publicTitle: "Jugendarbeit",
    publicPath: "/jugendarbeit",
    summary: "Ausbildung und Nachwuchsarbeit.",
  },
];

export function getManagedPageDefinition(slug: string): ManagedPageDefinition | undefined {
  return managedPages.find((page) => page.slug === slug);
}
