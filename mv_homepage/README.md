# Vereinshomepage

Starter-Projekt für eine Vereinshomepage mit Next.js, TypeScript und Tailwind CSS.

## Lokal starten

```bash
npm install
npm run dev
```

Danach im Browser öffnen:

```text
http://localhost:3000
```

## Hinweise zu Tailwind

Dieses Projekt nutzt die aktuelle Tailwind-4-Integration mit:

- `tailwindcss`
- `@tailwindcss/postcss`
- `postcss.config.mjs`
- `@import "tailwindcss";` in `src/app/globals.css`

## Inhalte anpassen

Die Seiten liegen unter `src/app/`.
Gemeinsame Bausteine liegen unter `src/components/`.

## Deployment mit Vercel

1. Repository zu GitHub pushen
2. In Vercel ein neues Projekt importieren
3. Framework wird automatisch erkannt
4. Deploy auslösen
