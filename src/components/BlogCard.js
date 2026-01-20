import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card group">
      <div className="flex h-40 items-center justify-center rounded-xl bg-blue-50 text-4xl text-blue-400">
        {post.coverImageUrl ? (
          <img src={post.coverImageUrl} alt={post.title} className="h-full w-full rounded-xl object-cover" />
        ) : (
          "📝"
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs text-slate-500">{new Date(post.publishedAt || post.createdAt).toLocaleDateString("ar")}</p>
        <h3 className="mt-2 text-base font-semibold text-slate-900 group-hover:text-blue-700">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
      </div>
    </Link>
  );
}
