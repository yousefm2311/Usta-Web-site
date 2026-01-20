import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import { blogPostSchema } from "@/validations/schemas";
import { slugify } from "@/lib/slug";
import { sanitizeContent } from "@/lib/sanitize";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const items = await BlogPost.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = blogPostSchema.parse(body);
    const slug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.title);

    await dbConnect();
    const exists = await BlogPost.findOne({ slug });
    if (exists) {
      return NextResponse.json({ error: "Slug مستخدم بالفعل" }, { status: 400 });
    }

    const payload = {
      ...parsed,
      slug,
      tags: parsed.tags || [],
      content: parsed.contentType === "html" ? sanitizeContent(parsed.content) : parsed.content
    };

    if (parsed.published) {
      payload.publishedAt = new Date();
    }

    const post = await BlogPost.create(payload);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Invalid data" }, { status: 400 });
  }
}
