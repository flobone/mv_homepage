import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/aktuelles", label: "Aktuelles" },
  { href: "/termine", label: "Termine" },
  { href: "/verein", label: "Verein" },
  { href: "/jugendarbeit", label: "Jugendarbeit" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container-page flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-[#1f4d7a] sm:text-xl">
          Musikverein Müsen 1919 e.V.
        </Link>

        <nav className="hidden gap-5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-[#1f4d7a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/kontakt" className="button-primary">
          Kontakt
        </Link>
      </div>
    </header>
  );
}
