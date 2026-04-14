import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.newsPost.upsert({
    where: { slug: 'kuerbisfest-auf-dem-irlenhof' },
    update: {},
    create: {
      slug: 'kuerbisfest-auf-dem-irlenhof',
      title: 'Kürbisfest auf dem Irlenhof',
      excerpt: 'Zum zweiten Mal durfte der Musikverein das Kürbisfest begleiten.',
      content:
        'Zum zweiten Mal durfte der Musikverein in diesem Jahr das Kürbisfest auf dem Irlenhof in Ferndorf begleiten.',
      publishedAt: new Date('2023-10-21T12:00:00Z'),
      isPublished: true,
    },
  });

  const source = await prisma.calendarSource.upsert({
    where: { slug: 'vereinskalender' },
    update: {},
    create: {
      name: 'Vereinskalender',
      slug: 'vereinskalender',
      icsUrl: process.env.CALENDAR_ICS_URL ?? 'https://example.com/calendar.ics',
      isActive: true,
    },
  });

  await prisma.calendarExclusionRule.upsert({
    where: { id: 'seed-rule-title-probe' },
    update: {},
    create: {
      id: 'seed-rule-title-probe',
      sourceId: source.id,
      kind: 'TITLE_CONTAINS',
      value: 'Probe',
      description: 'Interne Proben nicht öffentlich anzeigen',
      isActive: true,
    },
  });

  await prisma.event.upsert({
    where: { slug: 'fruehschoppen-zum-1-mai-2026' },
    update: {},
    create: {
      slug: 'fruehschoppen-zum-1-mai-2026',
      title: 'Frühschoppen zum 1. Mai',
      location: 'Müsen',
      startsAt: new Date('2026-05-01T11:00:00+02:00'),
      endsAt: new Date('2026-05-01T16:00:00+02:00'),
      isPublished: true,
      isHidden: false,
    },
  });

  await prisma.person.upsert({
    where: { id: 'seed-public-contact-1' },
    update: {},
    create: {
      id: 'seed-public-contact-1',
      name: 'Musikverein Müsen',
      role: 'Allgemeine Anfragen',
      email: 'info@musikverein-muesen.de',
      isPublic: true,
      sortOrder: 1,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
