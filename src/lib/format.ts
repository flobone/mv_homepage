const germanDate = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const germanTime = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(date: Date | string): string {
  return germanDate.format(new Date(date));
}

export function formatTimeRange(start: Date | string, end?: Date | string | null): string {
  const startDate = new Date(start);
  if (!end) {
    return `${germanTime.format(startDate)} Uhr`;
  }

  const endDate = new Date(end);
  return `${germanTime.format(startDate)} – ${germanTime.format(endDate)} Uhr`;
}
