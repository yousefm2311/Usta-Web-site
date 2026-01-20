import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import Theme from "@/models/Theme";
import { themeSchema } from "@/validations/schemas";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const items = await Theme.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = themeSchema.parse(body);
    const slug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.name);

    await dbConnect();
    const exists = await Theme.findOne({ slug });
    if (exists) {
      return NextResponse.json({ error: "Slug مستخدم بالفعل" }, { status: 400 });
    }

    const theme = await Theme.create({
      name: parsed.name,
      slug,
      tokens: parsed.tokens
    });

    return NextResponse.json(theme);
  } catch (error) {
    const message = error?.issues?.[0]?.message || error.message || "Invalid data";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
