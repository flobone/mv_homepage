# Musikverein Müsen 1919 e.V. – Website

Modernes Starter-Projekt für den Relaunch der Website des Musikverein Müsen 1919 e.V.
auf Basis von Next.js, TypeScript, Prisma, Neon und Vercel Blob.

## Enthaltene Seiten

- Home
- Aktuelles
- Termine
- Verein
- Jugendarbeit
- Galerie
- Kontakt
- Impressum
- Datenschutz
- Admin-Grundgerüst

## Zielarchitektur

- **Vercel** für Hosting und Deployments
- **Neon / PostgreSQL** für News, Termine, Personen und Kalenderregeln
- **Vercel Blob** für Bilder, PDFs und andere Dateien
- **ICS-Import** für Termine mit Ausschlussregeln

## Lokal starten

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

## Datenbank einrichten

Nach dem Eintragen der echten `DATABASE_URL`:

```bash
npm run db:push
npm run db:seed
```

## ICS-Kalenderimport

Die Termine werden nicht direkt aus dem Frontend gelesen, sondern in Neon importiert.
Dadurch können Regeln greifen, um bestimmte Einträge automatisch auszublenden.

Umgebungsvariablen:

```bash
CALENDAR_ICS_URL="https://example.com/calendar.ics"
CRON_SECRET="replace-with-a-random-secret"
```

Manueller Sync lokal oder in Produktion:

```text
GET /api/cron/sync-calendar
```

Mit gesetztem `CRON_SECRET` muss entweder der Header
`Authorization: Bearer <secret>` oder `?secret=<secret>` verwendet werden.

## Unterstützte Ausschlussregeln

- `UID_EQUALS`
- `TITLE_CONTAINS`
- `LOCATION_CONTAINS`
- `CATEGORY_EQUALS`

Beispiele:

- alle internen Proben ausblenden
- Termine mit bestimmtem Ort ausblenden
- einen einzelnen ICS-Eintrag per UID unterdrücken
- Kategorien wie `intern` oder `probe` ausblenden

## Vercel Cron

In `vercel.json` ist ein Beispiel-Cron enthalten, der den Kalendersync alle 6 Stunden ausführt.

## Nächste sinnvolle Schritte

- geschützten Admin-Zugang ergänzen
- Formulare für Kalenderquellen und Ausschlussregeln bauen
- Sync-Protokoll im Admin-Bereich anzeigen
- manuelle Überschreibungen pro Termin ergänzen
- Galerie und Downloads vollständig an Blob anbinden
