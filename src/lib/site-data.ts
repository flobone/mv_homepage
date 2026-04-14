import "server-only";

import { fallbackEvents, fallbackGalleryImages, fallbackNews } from "@/lib/fallback-content";
import { prisma } from "@/lib/prisma";
import { NewsPost, GalleryImage, Person, Event } from "@prisma/client";


function dbEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function getNewsPosts(limit?: number): Promise<NewsPost[]> {
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


export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  if (!dbEnabled()) {
    return fallbackNews.find((item) => item.slug === slug && item.isPublished) ?? null;
  }

  try {
    return await prisma.newsPost.findFirst({
      where: {
        slug,
        isPublished: true,
      },
    });
  } catch {
    return fallbackNews.find((item) => item.slug === slug && item.isPublished) ?? null;
  }
}



export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (!dbEnabled()) {
    return (
      fallbackEvents.find((item) => item.slug === slug && item.isPublished && !item.isHidden) ?? null
    );
  }

  try {
    return await prisma.event.findFirst({
      where: {
        slug,
        isPublished: true,
        isHidden: false,
      },
    });
  } catch {
    return (
      fallbackEvents.find((item) => item.slug === slug && item.isPublished && !item.isHidden) ?? null
    );
  }
}

export async function getEvents(limit?: number): Promise<Event[]> {
  if (!dbEnabled()) {
    return typeof limit === "number" ? fallbackEvents.slice(0, limit) : fallbackEvents;
  }

  try {
    return await prisma.event.findMany({
      where: {
        isPublished: true,
        isHidden: false,
        startsAt: { gte: new Date() },
      },
      orderBy: { startsAt: "asc" },
      take: limit,
    });
  } catch {
    return typeof limit === "number" ? fallbackEvents.slice(0, limit) : fallbackEvents;
  }
}

export async function getCalendarSources() {
  if (!dbEnabled()) {
    return [];
  }

  try {
    return await prisma.calendarSource.findMany({
      include: {
        rules: {
          where: {isActive: true },
          orderBy: [{value: "asc" }],
        },
      },
      orderBy: { name: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getPublicContacts(): Promise<Person[]> {
  if (!dbEnabled()) {
    return [
      {
        id: "contact-1",
        name: "Musikverein Müsen",
        role: "Allgemeine Anfragen",
        email: "info@musikverein-muesen.de",
        phone: null,
        imageUrl: null,
        sortOrder: 0,
        isPublished: true,
        createdAt: new Date("2023-10-21T12:00:00Z"),
        updatedAt: new Date("2023-10-21T12:00:00Z")
      },
    ];
  }

  try {
    return await prisma.person.findMany({
      where: { isPublished: true },
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
        imageUrl: null,
        sortOrder: 0,
        isPublished: true,
        createdAt: new Date("2023-10-21T12:00:00Z"),
        updatedAt: new Date("2023-10-21T12:00:00Z")
      },
    ];
  }
}

export async function getGalleryImages(limit?: number): Promise<GalleryImage[]>{
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
