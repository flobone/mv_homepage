import "server-only";

import { fallbackEvents, fallbackGalleryImages, fallbackNews } from "@/lib/fallback-content";
import { prisma } from "@/lib/prisma";

function dbEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function getNewsPosts(limit?: number) {
  if (!dbEnabled()) {
    return typeof limit === "number" ? fallbackNews.slice(0, limit) : fallbackNews;
  }

  try {
    return await prisma.newsPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  } catch {
    return typeof limit === "number" ? fallbackNews.slice(0, limit) : fallbackNews;
  }
}

export async function getEvents(limit?: number) {
  if (!dbEnabled()) {
    return typeof limit === "number" ? fallbackEvents.slice(0, limit) : fallbackEvents;
  }

  try {
    return await prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { startsAt: "asc" },
      take: limit,
    });
  } catch {
    return typeof limit === "number" ? fallbackEvents.slice(0, limit) : fallbackEvents;
  }
}

export async function getPublicContacts() {
  if (!dbEnabled()) {
    return [
      {
        id: "contact-1",
        name: "Musikverein Müsen",
        role: "Allgemeine Anfragen",
        email: "info@musikverein-muesen.de",
        phone: null,
      },
    ];
  }

  try {
    return await prisma.person.findMany({
      where: { isPublic: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
  } catch {
    return [
      {
        id: "contact-1",
        name: "Musikverein Müsen",
        role: "Allgemeine Anfragen",
        email: "info@musikverein-muesen.de",
        phone: null,
      },
    ];
  }
}

export async function getGalleryImages(limit?: number) {
  if (!dbEnabled()) {
    return typeof limit === "number" ? fallbackGalleryImages.slice(0, limit) : fallbackGalleryImages;
  }

  try {
    return await prisma.galleryImage.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return typeof limit === "number" ? fallbackGalleryImages.slice(0, limit) : fallbackGalleryImages;
  }
}
