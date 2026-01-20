import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import Theme from "@/models/Theme";
import { setActiveTheme } from "@/services/themeService";
import { themeSchema } from "@/validations/schemas";
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
    const parsed = themeSchema.partial().parse(body);
    const payload = { ...parsed };

    if (parsed.slug || parsed.name) {
      payload.slug = slugify(parsed.slug || parsed.name);
    }

    await dbConnect();
    if (payload.slug) {
      const exists = await Theme.findOne({ slug: payload.slug, _id: { $ne: resolvedParams.id } });
      if (exists) {
        return NextResponse.json({ error: "Slug مستخدم بالفعل" }, { status: 400 });
      }
    }

    const updated = await Theme.findByIdAndUpdate(resolvedParams.id, payload, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    const message = error?.issues?.[0]?.message || error.message || "Invalid data";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request, { params }) {
  const resolvedParams = await params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body?.activate) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await dbConnect();
  const theme = await Theme.findById(resolvedParams.id);
  if (!theme) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await setActiveTheme(theme.slug);
  const updated = await Theme.findById(resolvedParams.id);

  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  await Theme.findByIdAndDelete(resolvedParams.id);
  return NextResponse.json({ success: true });
}
