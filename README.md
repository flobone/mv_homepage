# Musikverein Müsen 1919 e.V. – Website

Modernes Next.js-Projekt für den Relaunch der Website des Musikverein Müsen 1919 e.V.

## Enthalten

- öffentliche Vereinswebsite
- Login-Seite
- geschützter Adminbereich unter `/admin`
- Auth.js mit Credentials-Login
- Prisma + Postgres/Neon für Benutzerkonten
- Seed-Skript für das erste Adminkonto

## Lokal starten

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed-admin
npm run dev
```

## Ersten Admin anlegen

Trage in `.env` diese Werte ein:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
AUTH_SECRET="ein-langes-zufallsgeheimnis"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="ein-sicheres-passwort"
```

Danach:

```bash
npm run db:generate
npm run db:push
npm run db:seed-admin
```

## Nächste sinnvolle Schritte

- News im Admin editierbar machen
- ICS-Kalender-Sync hinter den Admin hängen
- Vercel Blob Uploads für Galerie ergänzen
- Rollenmodell erweitern


## Allgemeine Seitenverwaltung

Im Adminbereich können redaktionelle Seiten jetzt zentral unter `/admin/pages` gepflegt werden.
Aktuell sind `vereinschronik`, `ueber-uns` und `jugendarbeit` freigeschaltet.
