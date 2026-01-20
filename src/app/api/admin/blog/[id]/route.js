import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import { blogPostSchema } from "@/validations/schemas";
import { slugify } from "@/lib/slug";
import { sanitizeContent } from "@/lib/sanitize";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  const resolvedParams = await params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = blogPostSchema.partial().parse(body);
    const payload = { ...parsed };

    if (parsed.slug || parsed.title) {
      payload.slug = slugify(parsed.slug || parsed.title);
    }

    if (parsed.content && parsed.contentType === "html") {
      payload.content = sanitizeContent(parsed.content);
    }

    await dbConnect();
    if (payload.slug) {
      const exists = await BlogPost.findOne({ slug: payload.slug, _id: { $ne: resolvedParams.id } });
      if (exists) {
        return NextResponse.json({ error: "Slug مستخدم بالفعل" }, { status: 400 });
      }
    }

    const current = await BlogPost.findById(resolvedParams.id);
    if (!current) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (payload.published && !current.publishedAt) {
      payload.publishedAt = new Date();
    }

    const updated = await BlogPost.findByIdAndUpdate(resolvedParams.id, payload, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Invalid data" }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  await BlogPost.findByIdAndDelete(resolvedParams.id);
  return NextResponse.json({ success: true });
}
