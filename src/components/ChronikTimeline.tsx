"use client";

import { useEffect, useState } from "react";

type TimelineItem = {
  id: string;
  year: string;
  label: string;
};

export function ChronikTimeline({ items }: { items: TimelineItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Zeitleiste der Vereinschronik" className="chronik-timeline">
      <div className="chronik-timeline__rail" aria-hidden="true" />
      <ol className="space-y-3">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                className={[
                  "chronik-timeline__link",
                  isActive ? "chronik-timeline__link--active" : "",
                ].join(" ")}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="chronik-timeline__dot" aria-hidden="true" />
                <span className="chronik-timeline__year">{item.year}</span>
                <span className="chronik-timeline__label">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
