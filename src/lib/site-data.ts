import "server-only";

import {
  fallbackChronikPage,
  fallbackEvents,
  fallbackGalleryImages,
  fallbackNews,
  fallbackSitePages,
} from "@/lib/fallback-content";
import { prisma } from "@/lib/prisma";
import { getManagedPageDefinition, managedPages } from "@/lib/page-config";
import type { Event, GalleryImage, NewsPost, Person, SitePage } from "@prisma/client";

function dbEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function getFallbackSitePage(slug: string): SitePage | null {
  const fallback = fallbackSitePages.find((page) => page.slug === slug);
  if (!fallback) {
    return null;
  }

  return {
    id: `page-${fallback.slug}`,
    slug: fallback.slug,
    title: fallback.title,
    contentHtml: fallback.contentHtml,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    updatedAt: new Date("2026-01-01T00:00:00Z"),
  };
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
          where: { isActive: true },
          orderBy: [{ value: "asc" }],
        },
      },
      orderBy: { name: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getPublicContacts(): Promise<Person[]> {
  const fallbackContacts: Person[] = [
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
      updatedAt: new Date("2023-10-21T12:00:00Z"),
    },
  ];

  if (!dbEnabled()) {
    return fallbackContacts;
  }

  try {
    return await prisma.person.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
  } catch {
    return fallbackContacts;
  }
}

export async function getGalleryImages(limit?: number): Promise<GalleryImage[]> {
  if (!dbEnabled()) {
    return typeof limit === "number"
      ? fallbackGalleryImages.slice(0, limit)
      : fallbackGalleryImages;
  }

  try {
    return await prisma.galleryImage.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return typeof limit === "number"
      ? fallbackGalleryImages.slice(0, limit)
      : fallbackGalleryImages;
  }
}

export async function getSitePageBySlug(slug: string): Promise<SitePage | null> {
  if (!dbEnabled()) {
    return getFallbackSitePage(slug);
  }

  try {
    const page = await prisma.sitePage.findUnique({
      where: { slug },
    });

    if (page) {
      return page;
    }
  } catch {
    // fall through to fallback
  }

  return getFallbackSitePage(slug);
}

export async function getManagedSitePages(): Promise<
  Array<{
    slug: string;
    adminTitle: string;
    publicTitle: string;
    publicPath: string;
    summary: string;
    timelineMode?: boolean;
    page: SitePage | null;
  }>
> {
  const pages = await Promise.all(
    managedPages.map(async (definition) => ({
      ...definition,
      page: await getSitePageBySlug(definition.slug),
    })),
  );

  return pages;
}

export { fallbackChronikPage };

export function getManagedPagePublicPath(slug: string): string | null {
  return getManagedPageDefinition(slug)?.publicPath ?? null;
}
