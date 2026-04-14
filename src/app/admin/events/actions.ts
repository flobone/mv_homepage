"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

type EventsFormState = {
  error?: string;
  success?: string;
};

const sourceSchema = z.object({
  name: z.string().trim().min(2, "Bitte einen Namen mit mindestens 2 Zeichen eingeben."),
  icsUrl: z.string().trim().url("Bitte eine gültige ICS-URL eingeben."),
  isActive: z.boolean(),
});

const ruleSchema = z.object({
  sourceId: z.string().trim().min(1, "Bitte eine Quelle auswählen."),
  ruleType: z.enum(["UID_EQUALS", "TITLE_CONTAINS", "LOCATION_CONTAINS", "CATEGORY_EQUALS"]),
  value: z.string().trim().min(1, "Bitte einen Regelwert eingeben."),
  description: z.string().trim().optional(),
  isActive: z.boolean(),
});

function revalidateEventPaths() {
  revalidatePath("/admin/events");
  revalidatePath("/termine");
  revalidatePath("/");
}

export async function createCalendarSource(
  _prevState: EventsFormState | undefined,
  formData: FormData,
): Promise<EventsFormState> {
  const parsed = sourceSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    icsUrl: String(formData.get("icsUrl") ?? ""),
    isActive: formData.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Die Eingaben sind ungültig." };
  }

  await prisma.calendarSource.create({
    data: parsed.data,
  });

  revalidateEventPaths();
  return { success: "Kalenderquelle wurde angelegt." };
}

export async function createExclusionRule(
  _prevState: EventsFormState | undefined,
  formData: FormData,
): Promise<EventsFormState> {
  const parsed = ruleSchema.safeParse({
    sourceId: String(formData.get("sourceId") ?? ""),
    ruleType: String(formData.get("ruleType") ?? "TITLE_CONTAINS"),
    value: String(formData.get("value") ?? ""),
    description: String(formData.get("description") ?? ""),
    isActive: formData.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Die Eingaben sind ungültig." };
  }

  await prisma.calendarExclusionRule.create({
    data: {
      sourceId: parsed.data.sourceId,
      ruleType: parsed.data.ruleType,
      value: parsed.data.value,
      description: parsed.data.description || null,
      isActive: parsed.data.isActive,
    },
  });

  revalidateEventPaths();
  return { success: "Ausschlussregel wurde angelegt." };
}

export async function triggerCalendarSync(): Promise<void> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!baseUrl) {
    throw new Error("Keine Basis-URL für den Kalendersync konfiguriert.");
  }

  const normalizedBaseUrl = baseUrl.startsWith("http")
    ? baseUrl
    : `https://${baseUrl}`;

  const response = await fetch(
    `${normalizedBaseUrl}/api/cron/sync-calendar?secret=${process.env.CRON_SECRET ?? ""}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Kalendersync fehlgeschlagen: ${text}`);
  }

  revalidateEventPaths();
}

export async function deleteCalendarSource(sourceId: string): Promise<void> {
  await prisma.calendarSource.delete({ where: { id: sourceId } });
  revalidateEventPaths();
}

export async function toggleCalendarSourceActive(sourceId: string): Promise<void> {
  const source = await prisma.calendarSource.findUnique({
    where: { id: sourceId },
    select: { isActive: true },
  });

  if (!source) {
    return;
  }

  await prisma.calendarSource.update({
    where: { id: sourceId },
    data: { isActive: !source.isActive },
  });

  revalidateEventPaths();
}

export async function deleteExclusionRule(ruleId: string): Promise<void> {
  await prisma.calendarExclusionRule.delete({ where: { id: ruleId } });
  revalidateEventPaths();
}

export async function toggleExclusionRuleActive(ruleId: string): Promise<void> {
  const rule = await prisma.calendarExclusionRule.findUnique({
    where: { id: ruleId },
    select: { isActive: true },
  });

  if (!rule) {
    return;
  }

  await prisma.calendarExclusionRule.update({
    where: { id: ruleId },
    data: { isActive: !rule.isActive },
  });

  revalidateEventPaths();
}

export async function toggleEventHidden(eventId: string): Promise<void> {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { isHidden: true },
  });

  if (!event) {
    return;
  }

  await prisma.event.update({
    where: { id: eventId },
    data: {
      isHidden: !event.isHidden,
      exclusionReason: event.isHidden ? null : "Manuell im Admin ausgeblendet",
    },
  });

  revalidateEventPaths();
}

export async function toggleEventPublished(eventId: string): Promise<void> {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { isPublished: true },
  });

  if (!event) {
    return;
  }

  await prisma.event.update({
    where: { id: eventId },
    data: { isPublished: !event.isPublished },
  });

  revalidateEventPaths();
}
