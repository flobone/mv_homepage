import "server-only";

import ical from "node-ical";

import { prisma } from "@/lib/prisma";

type RuleKind = "UID_EQUALS" | "TITLE_CONTAINS" | "LOCATION_CONTAINS" | "CATEGORY_EQUALS";

type CalendarRule = {
  id: string;
  kind: RuleKind;
  value: string;
  description: string | null;
};

type ParsedCalendarEvent = {
  uid: string;
  title: string;
  description: string | null;
  location: string | null;
  startsAt: Date;
  endsAt: Date | null;
  categories: string[];
};

type SyncSourceResult = {
  sourceId: string;
  sourceName: string;
  imported: number;
  hidden: number;
  skippedWithoutUid: number;
  skippedInvalidDates: number;
};

type SyncResult = {
  ok: boolean;
  startedAt: string;
  finishedAt: string;
  sources: SyncSourceResult[];
};

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function extractCategories(rawCategories: unknown): string[] {
  if (!rawCategories) {
    return [];
  }

  if (Array.isArray(rawCategories)) {
    return rawCategories.flatMap((entry) => extractCategories(entry));
  }

  if (typeof rawCategories === "string") {
    return rawCategories
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  if (typeof rawCategories === "object" && rawCategories !== null && "val" in rawCategories) {
    return extractCategories((rawCategories as { val: unknown }).val);
  }

  return [];
}

function normalizeEvent(rawEvent: any): ParsedCalendarEvent | null {
  if (!rawEvent?.uid || !rawEvent?.start || !rawEvent?.summary) {
    return null;
  }

  const startsAt = new Date(rawEvent.start);
  const endsAt = rawEvent.end ? new Date(rawEvent.end) : null;

  if (Number.isNaN(startsAt.getTime())) {
    return null;
  }

  return {
    uid: String(rawEvent.uid),
    title: String(rawEvent.summary),
    description: rawEvent.description ? String(rawEvent.description) : null,
    location: rawEvent.location ? String(rawEvent.location) : null,
    startsAt,
    endsAt: endsAt && !Number.isNaN(endsAt.getTime()) ? endsAt : null,
    categories: extractCategories(rawEvent.categories),
  };
}

function checkRule(event: ParsedCalendarEvent, rule: CalendarRule): string | null {
  const needle = rule.value.trim().toLowerCase();
  if (!needle) {
    return null;
  }

  if (rule.kind === "UID_EQUALS" && event.uid.toLowerCase() === needle) {
    return rule.description ?? `UID ausgeschlossen: ${rule.value}`;
  }

  if (rule.kind === "TITLE_CONTAINS" && event.title.toLowerCase().includes(needle)) {
    return rule.description ?? `Titel ausgeschlossen: ${rule.value}`;
  }

  if (
    rule.kind === "LOCATION_CONTAINS" &&
    (event.location ?? "").toLowerCase().includes(needle)
  ) {
    return rule.description ?? `Ort ausgeschlossen: ${rule.value}`;
  }

  if (
    rule.kind === "CATEGORY_EQUALS" &&
    event.categories.some((category) => category.toLowerCase() === needle)
  ) {
    return rule.description ?? `Kategorie ausgeschlossen: ${rule.value}`;
  }

  return null;
}

function findExclusionReason(event: ParsedCalendarEvent, rules: CalendarRule[]): string | null {
  for (const rule of rules) {
    const match = checkRule(event, rule);
    if (match) {
      return match;
    }
  }
  return null;
}

export async function syncCalendars(): Promise<SyncResult> {
  const startedAt = new Date();

  const sources = await prisma.calendarSource.findMany({
    where: { isActive: true },
    include: {
      exclusionRules: {
        where: { isActive: true },
        orderBy: [{ kind: "asc" }, { value: "asc" }],
      },
    },
    orderBy: { name: "asc" },
  });

  const sourceResults: SyncSourceResult[] = [];

  for (const source of sources) {
    let imported = 0;
    let hidden = 0;
    let skippedWithoutUid = 0;
    let skippedInvalidDates = 0;

    try {
      const response = await fetch(source.icsUrl, {
        headers: { "user-agent": "musikverein-muesen-calendar-sync/1.0" },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`ICS konnte nicht geladen werden (${response.status})`);
      }

      const calendarText = await response.text();
      const parsed = ical.sync.parseICS(calendarText);
      const rawEvents = Object.values(parsed).filter((entry: any) => entry?.type === "VEVENT");
      const seenUids = new Set<string>();

      for (const rawEvent of rawEvents) {
        const event = normalizeEvent(rawEvent);

        if (!event?.uid) {
          skippedWithoutUid += 1;
          continue;
        }

        if (!event) {
          skippedInvalidDates += 1;
          continue;
        }

        if (seenUids.has(event.uid)) {
          continue;
        }
        seenUids.add(event.uid);

        const exclusionReason = findExclusionReason(event, source.exclusionRules as CalendarRule[]);
        const slugBase = `${slugify(event.title)}-${event.startsAt.toISOString().slice(0, 10)}`;

        await prisma.event.upsert({
          where: { externalUid: event.uid },
          update: {
            slug: slugBase || slugify(event.uid),
            title: event.title,
            description: event.description,
            location: event.location,
            startsAt: event.startsAt,
            endsAt: event.endsAt,
            categories: event.categories,
            isPublished: true,
            isHidden: Boolean(exclusionReason),
            exclusionReason,
            sourceId: source.id,
            lastImportedAt: new Date(),
          },
          create: {
            slug: slugBase || slugify(event.uid),
            externalUid: event.uid,
            title: event.title,
            description: event.description,
            location: event.location,
            startsAt: event.startsAt,
            endsAt: event.endsAt,
            categories: event.categories,
            isPublished: true,
            isHidden: Boolean(exclusionReason),
            exclusionReason,
            sourceId: source.id,
            lastImportedAt: new Date(),
          },
        });

        if (exclusionReason) {
          hidden += 1;
        } else {
          imported += 1;
        }
      }

      await prisma.calendarSource.update({
        where: { id: source.id },
        data: {
          lastSyncedAt: new Date(),
          lastSyncStatus: "ok",
          lastSyncMessage: `Importiert: ${imported}, ausgeblendet: ${hidden}`,
        },
      });
    } catch (error) {
      await prisma.calendarSource.update({
        where: { id: source.id },
        data: {
          lastSyncedAt: new Date(),
          lastSyncStatus: "error",
          lastSyncMessage: error instanceof Error ? error.message : "Unbekannter Fehler",
        },
      });
    }

    sourceResults.push({
      sourceId: source.id,
      sourceName: source.name,
      imported,
      hidden,
      skippedWithoutUid,
      skippedInvalidDates,
    });
  }

  return {
    ok: true,
    startedAt: startedAt.toISOString(),
    finishedAt: new Date().toISOString(),
    sources: sourceResults,
  };
}
