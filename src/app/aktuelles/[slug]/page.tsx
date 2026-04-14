import Link from "next/link";
import { notFound } from "next/navigation";

import { formatDate } from "@/lib/format";
import { getNewsPostBySlug } from "@/lib/site-data";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container-page py-14 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/aktuelles"
          className="text-sm font-semibold text-[#1f4d7a] hover:text-[#173a5c]"
        >
          ← Zurück zu Aktuelles
        </Link>

        <div className="mt-6 card p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7b1f3a]">
            {formatDate(post.publishedAt)}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-6 text-lg leading-8 text-slate-700">{post.excerpt}</p>
          ) : null}

          {post.coverImage ? (
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
            {(post.content ?? post.excerpt ?? "")
              .split(/\n{2,}/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={`${post.id}-${index}`}>{paragraph}</p>
              ))}
          </div>
        </div>
      </div>
    </article>
  );
}
