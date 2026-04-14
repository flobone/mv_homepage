export function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-page py-14 sm:py-16">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="section-title">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
