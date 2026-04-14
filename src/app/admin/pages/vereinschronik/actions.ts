"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const pageSchema = z.object({
  title: z.string().trim().min(2, "Bitte einen Titel eingeben."),
  contentHtml: z.string().trim().min(1, "Bitte einen Seiteninhalt eingeben."),
});

export async function saveChronikPage(formData: FormData): Promise<void> {
  const parsed = pageSchema.parse({
    title: String(formData.get("title") ?? ""),
    contentHtml: String(formData.get("contentHtml") ?? ""),
  });

  await prisma.sitePage.upsert({
    where: { slug: "vereinschronik" },
    update: {
      title: parsed.title,
      contentHtml: parsed.contentHtml,
    },
    create: {
      slug: "vereinschronik",
      title: parsed.title,
      contentHtml: parsed.contentHtml,
    },
  });

  revalidatePath("/verein/chronik");
  revalidatePath("/admin/pages/vereinschronik");
}
