import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";
import { categorySchema } from "@/validations/schemas";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const items = await Category.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = categorySchema.parse(body);
    const slug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.name);

    await dbConnect();
    const exists = await Category.findOne({ slug });
    if (exists) {
      return NextResponse.json({ error: "Slug مستخدم بالفعل" }, { status: 400 });
    }

    const category = await Category.create({ ...parsed, slug });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Invalid data" }, { status: 400 });
  }
}
