# Musikverein Müsen 1919 e.V. – Website

Modernes Starter-Projekt für den Relaunch der Website des Musikverein Müsen 1919 e.V.
mit einer finalen Zielarchitektur auf Basis von:

- Next.js auf Vercel
- Neon Postgres für strukturierte Inhalte
- Vercel Blob für Bilder, PDFs und sonstige Dateien

## Enthaltene Seiten

- Home
- Aktuelles
- Termine
- Verein
- Jugendarbeit
- Galerie
- Kontakt
- Admin-Grundgerüst
- Impressum
- Datenschutz

## Lokale Entwicklung

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

Wenn bereits eine Neon-Datenbank verbunden ist:

```bash
npm run db:push
npm run db:seed
```

## Umgebungsvariablen

```env
DATABASE_URL="postgresql://..."
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

## Architektur

### Neon / Postgres
Strukturierte Daten liegen in Postgres:

- `NewsPost`
- `Event`
- `GalleryImage`
- `Person`

Die öffentlichen Seiten greifen bereits auf Neon zu. Falls lokal noch keine Datenbank
konfiguriert ist, verwendet die App automatisch Fallback-Inhalte, damit das Projekt sofort startet.

### Vercel Blob
Dateien wie Bilder oder PDFs werden über den Upload-Endpunkt nach Blob geschrieben:

- `POST /api/upload`

Die Admin-Seite unter `/admin` enthält bereits ein einfaches Upload-Interface.

## Vercel-Setup

1. Git-Repository nach GitHub pushen
2. Projekt in Vercel importieren
3. Neon-Integration mit dem Vercel-Projekt verbinden
4. Blob Store im Vercel-Projekt anlegen
5. Umgebungsvariablen in Vercel setzen
6. Deploy auslösen

## Nächste sinnvolle Schritte

- Login-Schutz für `/admin`
- Formulare für News, Termine und Galerie
- Rich-Text-Inhalte für Beiträge
- echtes Titelbild und echte Galerie
- optionale Kalender-Synchronisation
