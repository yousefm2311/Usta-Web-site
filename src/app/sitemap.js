import { dbConnect } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import Category from "@/models/Category";

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  await dbConnect();

  const [posts, categories] = await Promise.all([
    BlogPost.find({ published: true }).select("slug updatedAt"),
    Category.find({ isActive: true }).select("slug updatedAt")
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/blog",
    "/contact",
    "/download",
    "/privacy",
    "/terms"
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteUrl}/services/${category.slug}`,
    lastModified: category.updatedAt || new Date()
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date()
  }));

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes];
}
