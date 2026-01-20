import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/services/blogService";
import { renderContent } from "@/lib/content";
import { extractToc } from "@/lib/markdown";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) {
    return { title: "مقال غير موجود" };
  }
  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) {
    notFound();
  }

  const toc = post.contentType === "markdown" ? extractToc(post.content) : [];
  const html = renderContent(post.content, post.contentType);
  const related = await getRelatedPosts(post.slug);

  return (
    <div className="section-padding">
      <div className="container-page grid gap-10 lg:grid-cols-[2fr_1fr]">
        <article className="card">
          <p className="text-xs text-slate-500">{new Date(post.publishedAt || post.createdAt).toLocaleDateString("ar")}</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">{post.title}</h1>
          <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
          {post.coverImageUrl && (
            <img src={post.coverImageUrl} alt={post.title} className="mt-6 h-64 w-full rounded-2xl object-cover" />
          )}
          <div className="prose prose-slate mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        <aside className="space-y-6">
          {toc.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold">المحتويات</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {toc.map((item) => (
                  <li key={item.id} style={{ marginRight: `${item.depth * 12}px` }}>
                    <a href={`#${item.id}`} className="hover:text-blue-700">{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="card">
            <h2 className="text-lg font-semibold">مقالات ذات صلة</h2>
            <div className="mt-4 space-y-3">
              {related.map((item) => (
                <Link key={item._id} href={`/blog/${item.slug}`} className="block text-sm text-slate-700 hover:text-blue-700">
                  {item.title}
                </Link>
              ))}
              {!related.length && <p className="text-sm text-slate-500">لا توجد مقالات أخرى.</p>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
