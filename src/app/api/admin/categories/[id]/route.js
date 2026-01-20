import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";
import { categorySchema } from "@/validations/schemas";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  const resolvedParams = await params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = categorySchema.partial().parse(body);
    const payload = { ...parsed };
    if (parsed.slug || parsed.name) {
      payload.slug = slugify(parsed.slug || parsed.name);
    }

    await dbConnect();
    if (payload.slug) {
      const exists = await Category.findOne({ slug: payload.slug, _id: { $ne: resolvedParams.id } });
      if (exists) {
        return NextResponse.json({ error: "Slug مستخدم بالفعل" }, { status: 400 });
      }
    }

    const updated = await Category.findByIdAndUpdate(resolvedParams.id, payload, { new: true });
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
  await Category.findByIdAndDelete(resolvedParams.id);
  return NextResponse.json({ success: true });
}
