import { dbConnect } from "@/lib/db";
import BlogPost from "@/models/BlogPost";

export async function getPublishedPosts({ page = 1, pageSize = 6, search = "" }) {
  await dbConnect();
  const query = { published: true };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }
  const total = await BlogPost.countDocuments(query);
  const items = await BlogPost.find(query)
    .sort({ publishedAt: -1, createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return {
    items: items.map((item) => item.toObject()),
    total,
    page,
    pageSize
  };
}

export async function getPostBySlug(slug) {
  await dbConnect();
  const post = await BlogPost.findOne({ slug, published: true });
  return post ? post.toObject() : null;
}

export async function getRelatedPosts(slug, limit = 3) {
  await dbConnect();
  const posts = await BlogPost.find({ slug: { $ne: slug }, published: true })
    .sort({ publishedAt: -1 })
    .limit(limit);
  return posts.map((item) => item.toObject());
}
