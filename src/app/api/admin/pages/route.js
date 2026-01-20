import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import StaticPage from "@/models/StaticPage";
import { pageSchema } from "@/validations/schemas";
import { sanitizeContent } from "@/lib/sanitize";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const items = await StaticPage.find().sort({ key: 1 }).lean();
  return NextResponse.json({ items });
}

export async function PUT(request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = pageSchema.parse(body);
    const payload = {
      ...parsed,
      content: parsed.contentType === "html" ? sanitizeContent(parsed.content) : parsed.content
    };

    await dbConnect();
    const updated = await StaticPage.findOneAndUpdate({ key: parsed.key }, payload, { new: true, upsert: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Invalid data" }, { status: 400 });
  }
}
