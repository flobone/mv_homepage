import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-[#1f4d7a]">Musikverein Müsen 1919 e.V.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Musik verbindet Generationen. Unser Verein steht seit vielen Jahrzehnten
            für Blasmusik, Gemeinschaft und Engagement im Ort.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">Navigation</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            <Link href="/aktuelles">Aktuelles</Link>
            <Link href="/termine">Termine</Link>
            <Link href="/verein">Verein</Link>
            <Link href="/jugendarbeit">Jugendarbeit</Link>
            <Link href="/galerie">Galerie</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">Rechtliches</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
