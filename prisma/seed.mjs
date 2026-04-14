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

  await prisma.event.upsert({
    where: { slug: 'adventsnachmittag-der-jugend-2025' },
    update: {},
    create: {
      slug: 'adventsnachmittag-der-jugend-2025',
      title: 'Adventsnachmittag der Jugend',
      location: 'Müsen',
      startsAt: new Date('2025-12-14T15:00:00+01:00'),
      endsAt: new Date('2025-12-14T17:00:00+01:00'),
      isPublished: true,
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
