'use client';

import { useState } from "react";

type UploadResult = {
  url: string;
  pathname: string;
  contentType: string;
  size: number;
};

type SyncResult = {
  ok: boolean;
  error?: string;
  sources?: Array<{
    sourceId: string;
    sourceName: string;
    imported: number;
    hidden: number;
    skippedWithoutUid: number;
    skippedInvalidDates: number;
  }>;
};

export default function AdminPage() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    setError(null);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Upload fehlgeschlagen.");
      }

      setResult(payload);
      form.reset();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unbekannter Fehler.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSync() {
    setSyncing(true);
    setError(null);
    setSyncResult(null);

    try {
      const response = await fetch("/api/cron/sync-calendar");
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Kalendersync fehlgeschlagen.");
      }

      setSyncResult(payload);
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : "Unbekannter Fehler.");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="container-page py-14 sm:py-16">
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#7b1f3a]">
          Admin-Grundgerüst
        </p>
        <h1 className="section-title">Vercel + Neon + Blob + ICS-Sync</h1>
        <p className="mt-4 max-w-3xl section-text">
          Termine kommen künftig aus einem ICS-Kalender. Beim Import können Regeln greifen,
          um interne oder unerwünschte Einträge automatisch auszublenden.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card p-8">
          <h2 className="text-xl font-semibold text-slate-900">Kalender synchronisieren</h2>
          <p className="mt-3 section-text">
            Der Sync liest aktive Kalenderquellen aus Neon, importiert VEVENT-Einträge und wendet
            Ausschlussregeln wie Titel, Ort, UID oder Kategorie an.
          </p>

          <button className="button-primary mt-6" type="button" onClick={handleSync} disabled={syncing}>
            {syncing ? "Synchronisiert ..." : "Kalender jetzt synchronisieren"}
          </button>

          {syncResult?.sources?.length ? (
            <div className="mt-6 space-y-3">
              {syncResult.sources.map((source) => (
                <div key={source.sourceId} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  <p><strong>{source.sourceName}</strong></p>
                  <p>Importiert: {source.imported}</p>
                  <p>Ausgeblendet: {source.hidden}</p>
                  <p>Ohne UID übersprungen: {source.skippedWithoutUid}</p>
                  <p>Mit ungültigem Datum übersprungen: {source.skippedInvalidDates}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <section className="card p-8">
          <h2 className="text-xl font-semibold text-slate-900">Bild oder Datei in Blob hochladen</h2>
          <p className="mt-3 section-text">
            Für den Upload muss in Vercel oder lokal die Umgebungsvariable
            <code className="mx-1 rounded bg-slate-100 px-2 py-1 text-sm">BLOB_READ_WRITE_TOKEN</code>
            gesetzt sein.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleUpload}>
            <input
              className="block w-full rounded-2xl border border-slate-300 px-4 py-3"
              type="file"
              name="file"
              required
            />
            <button className="button-primary" type="submit" disabled={uploading}>
              {uploading ? "Lädt hoch ..." : "Datei hochladen"}
            </button>
          </form>

          {error ? (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          ) : null}

          {result ? (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <p><strong>URL:</strong> {result.url}</p>
              <p><strong>Pfad:</strong> {result.pathname}</p>
              <p><strong>Typ:</strong> {result.contentType}</p>
              <p><strong>Größe:</strong> {result.size} Bytes</p>
            </div>
          ) : null}
        </section>
      </div>

      <section className="card mt-6 p-8">
        <h2 className="text-xl font-semibold text-slate-900">Ausschlussregeln</h2>
        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
          <p>• <strong>UID_EQUALS</strong>: blendet genau einen bestimmten Kalendereintrag aus</p>
          <p>• <strong>TITLE_CONTAINS</strong>: blendet Einträge aus, deren Titel ein Wort oder Muster enthält</p>
          <p>• <strong>LOCATION_CONTAINS</strong>: blendet Einträge an bestimmten Orten aus</p>
          <p>• <strong>CATEGORY_EQUALS</strong>: blendet Einträge mit einer bestimmten ICS-Kategorie aus</p>
        </div>
      </section>
    </div>
  );
}
