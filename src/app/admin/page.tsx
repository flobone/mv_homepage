export default function AdminDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[
        ["News", "Artikel und Meldungen im Admin pflegen und veröffentlichen."],
        ["Termine", "ICS-Sync, Ausschlussregeln und manuelle Overrides."],
        ["Seiten", "Redaktionelle Seiten wie die Vereinschronik per Editor bearbeiten."],
        ["Galerie", "Uploads über Vercel Blob folgen als nächster Schritt."],
      ].map(([title, text]) => (
        <article key={title} className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
        </article>
      ))}
    </div>
  );
}
