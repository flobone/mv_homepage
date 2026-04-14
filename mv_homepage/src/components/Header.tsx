import Link from "next/link";

const links = [
  { href: "/", label: "Start" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/termine", label: "Termine" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container-page flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand-primary">
          KumiBrass
        </Link>

        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-brand-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/kontakt" className="button-primary">
          Anfrage senden
        </Link>
      </div>
    </header>
  );
}
