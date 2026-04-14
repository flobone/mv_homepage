import "server-only";

import ICAL from "ical.js";

import { prisma } from "@/lib/prisma";

type RuleKind =
  | "UID_EQUALS"
  | "TITLE_CONTAINS"
  | "LOCATION_CONTAINS"
  | "CATEGORY_EQUALS";

type CalendarRule = {
  id: string;
  ruleType: RuleKind;
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

export type SyncResult = {
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

function normalizeText(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function extractCategoriesFromProperty(
  component: ICAL.Component,
): string[] {
  const props = component.getAllProperties("categories");
  const values = props.flatMap((prop) => {
    const value = prop.getValues();
    return value.map((entry) => String(entry).trim()).filter(Boolean);
  });

  return [...new Set(values)];
}

function normalizeEvent(vevent: ICAL.Component): ParsedCalendarEvent | null {
  const event = new ICAL.Event(vevent);

  const uid = normalizeText(event.uid);
  const title = normalizeText(event.summary);
  const startDate = event.startDate;

  if (!uid || !title || !startDate) {
    return null;
  }

  const startsAt = startDate.toJSDate();
  if (Number.isNaN(startsAt.getTime())) {
    return null;
  }

  const endDate = event.endDate ? event.endDate.toJSDate() : null;

  return {
    uid,
    title,
    description: normalizeText(event.description),
    location: normalizeText(event.location),
    startsAt,
    endsAt: endDate && !Number.isNaN(endDate.getTime()) ? endDate : null,
    categories: extractCategoriesFromProperty(vevent),
  };
}

function checkRule(
  event: ParsedCalendarEvent,
  rule: CalendarRule,
): string | null {
  const needle = rule.value.trim().toLowerCase();
  if (!needle) {
    return null;
  }

  if (rule.ruleType === "UID_EQUALS" && event.uid.toLowerCase() === needle) {
    return rule.description ?? `UID ausgeschlossen: ${rule.value}`;
  }

  if (
    rule.ruleType === "TITLE_CONTAINS" &&
    event.title.toLowerCase().includes(needle)
  ) {
    return rule.description ?? `Titel ausgeschlossen: ${rule.value}`;
  }

  if (
    rule.ruleType === "LOCATION_CONTAINS" &&
    (event.location ?? "").toLowerCase().includes(needle)
  ) {
    return rule.description ?? `Ort ausgeschlossen: ${rule.value}`;
  }

  if (
    rule.ruleType === "CATEGORY_EQUALS" &&
    event.categories.some((category) => category.toLowerCase() === needle)
  ) {
    return rule.description ?? `Kategorie ausgeschlossen: ${rule.value}`;
  }

  return null;
}

function findExclusionReason(
  event: ParsedCalendarEvent,
  rules: CalendarRule[],
): string | null {
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
      rules: {
        where: { isActive: true },
        orderBy: { value: "asc" },
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
      const jcalData = ICAL.parse(calendarText);
      const vcalendar = new ICAL.Component(jcalData);
      const vevents = vcalendar.getAllSubcomponents("vevent");
      const seenUids = new Set<string>();

      for (const vevent of vevents) {
        const event = normalizeEvent(vevent);

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

        const exclusionReason = findExclusionReason(event, source.rules);
        const slugBase = `${slugify(event.title)}-${event.startsAt
          .toISOString()
          .slice(0, 10)}`;
        const slug = slugBase || slugify(event.uid);

        await prisma.event.upsert({
          where: { externalUid: event.uid },
          update: {
            slug,
            title: event.title,
            description: event.description,
            location: event.location,
            startsAt: event.startsAt,
            endsAt: event.endsAt,
            categories: event.categories,
            isPublished: true,
            isHidden: exclusionReason !== null,
            exclusionReason,
            sourceId: source.id,
            lastImportedAt: new Date(),
          },
          create: {
            slug,
            externalUid: event.uid,
            title: event.title,
            description: event.description,
            location: event.location,
            startsAt: event.startsAt,
            endsAt: event.endsAt,
            categories: event.categories,
            isPublished: true,
            isHidden: exclusionReason !== null,
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
          lastSyncMessage:
            error instanceof Error ? error.message : "Unbekannter Fehler",
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