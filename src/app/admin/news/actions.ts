"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

type NewsFormState = {
  error?: string;
};

const newsSchema = z.object({
  title: z.string().trim().min(3, "Bitte einen Titel mit mindestens 3 Zeichen eingeben."),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().optional(),
  content: z.string().trim().optional(),
  coverImage: z.string().trim().url("Bitte eine gültige Bild-URL eingeben.").optional().or(z.literal("")),
  publishedAt: z.string().trim().min(1, "Bitte ein Veröffentlichungsdatum angeben."),
  isPublished: z.boolean(),
});

function parseNewsForm(formData: FormData) {
  const raw = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    publishedAt: String(formData.get("publishedAt") ?? ""),
    isPublished: formData.get("isPublished") === "on",
  };

  const parsed = newsSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "Die Eingaben sind ungültig.",
    };
  }

  const publishedAt = new Date(parsed.data.publishedAt);
  if (Number.isNaN(publishedAt.getTime())) {
    return {
      ok: false as const,
      error: "Bitte ein gültiges Veröffentlichungsdatum eingeben.",
    };
  }

  const computedSlug = slugify(parsed.data.slug || parsed.data.title);
  if (!computedSlug) {
    return {
      ok: false as const,
      error: "Aus Titel oder Slug konnte kein gültiger Slug erzeugt werden.",
    };
  }

  return {
    ok: true as const,
    data: {
      title: parsed.data.title,
      slug: computedSlug,
      excerpt: parsed.data.excerpt || null,
      content: parsed.data.content || null,
      coverImage: parsed.data.coverImage || null,
      publishedAt,
      isPublished: parsed.data.isPublished,
    },
  };
}

function revalidateNewsPaths() {
  revalidatePath("/admin/news");
  revalidatePath("/aktuelles");
  revalidatePath("/");
}

export async function createNewsPost(
  _prevState: NewsFormState | undefined,
  formData: FormData,
): Promise<NewsFormState> {
  const parsed = parseNewsForm(formData);
  if (!parsed.ok) {
    return { error: parsed.error };
  }

  const existing = await prisma.newsPost.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  });

  if (existing) {
    return { error: "Der Slug ist bereits vergeben. Bitte einen anderen Slug wählen." };
  }

  await prisma.newsPost.create({
    data: parsed.data,
  });

  revalidateNewsPaths();
  redirect("/admin/news");
}

export async function updateNewsPost(
  id: string,
  _prevState: NewsFormState | undefined,
  formData: FormData,
): Promise<NewsFormState> {
  const parsed = parseNewsForm(formData);
  if (!parsed.ok) {
    return { error: parsed.error };
  }

  const existing = await prisma.newsPost.findFirst({
    where: {
      slug: parsed.data.slug,
      id: { not: id },
    },
    select: { id: true },
  });

  if (existing) {
    return { error: "Der Slug ist bereits vergeben. Bitte einen anderen Slug wählen." };
  }

  await prisma.newsPost.update({
    where: { id },
    data: parsed.data,
  });

  revalidateNewsPaths();
  redirect("/admin/news");
}

export async function deleteNewsPost(id: string): Promise<void> {
  await prisma.newsPost.delete({ where: { id } });
  revalidateNewsPaths();
}

export async function toggleNewsPostPublished(id: string): Promise<void> {
  const post = await prisma.newsPost.findUnique({
    where: { id },
    select: { isPublished: true },
  });

  if (!post) {
    return;
  }

  await prisma.newsPost.update({
    where: { id },
    data: { isPublished: !post.isPublished },
  });

  revalidateNewsPaths();
}
