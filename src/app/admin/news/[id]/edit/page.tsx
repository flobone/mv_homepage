import Link from "next/link";
import { notFound } from "next/navigation";

import { updateNewsPost } from "@/app/admin/news/actions";
import { NewsPostForm } from "@/components/admin/NewsPostForm";
import { prisma } from "@/lib/prisma";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.newsPost.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  const updateAction = updateNewsPost.bind(null, post.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Beitrag bearbeiten</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{post.title}</p>
        </div>
        <Link href="/admin/news" className="button-secondary">
          Zurück zur Übersicht
        </Link>
      </div>

      <div className="card p-6">
        <NewsPostForm action={updateAction} submitLabel="Änderungen speichern" post={post} />
      </div>
    </div>
  );
}
