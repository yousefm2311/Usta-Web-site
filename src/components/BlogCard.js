import Link from "next/link";

export default function BlogCard({ post }) {
  const dateValue = post.publishedAt || post.createdAt;
  const dateLabel = dateValue
    ? new Date(dateValue).toLocaleDateString("ar", { year: "numeric", month: "short", day: "numeric" })
    : "";

  return (
    <Link href={`/blog/${post.slug}`} className="card card-luxe group">
      <div className="relative h-44 overflow-hidden rounded-2xl bg-blue-50">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-blue-300">📝</div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs text-slate-500">{dateLabel}</p>
        <h3 className="mt-2 text-base font-semibold text-slate-900 transition group-hover:text-blue-700">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
      </div>
    </Link>
  );
}
