"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { getManagedPageDefinition } from "@/lib/page-config";

const pageSchema = z.object({
  title: z.string().trim().min(2, "Bitte einen Titel eingeben."),
  contentHtml: z.string().trim().min(1, "Bitte einen Seiteninhalt eingeben."),
});

export async function saveManagedPage(slug: string, formData: FormData): Promise<void> {
  const definition = getManagedPageDefinition(slug);
  if (!definition) {
    throw new Error("Unbekannte Seite.");
  }

  const parsed = pageSchema.parse({
    title: String(formData.get("title") ?? ""),
    contentHtml: String(formData.get("contentHtml") ?? ""),
  });

  await prisma.sitePage.upsert({
    where: { slug },
    update: {
      title: parsed.title,
      contentHtml: parsed.contentHtml,
    },
    create: {
      slug,
      title: parsed.title,
      contentHtml: parsed.contentHtml,
    },
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/admin/pages/${slug}`);
  revalidatePath(definition.publicPath);
}
