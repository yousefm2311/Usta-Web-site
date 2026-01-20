import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const items = await ContactMessage.find().sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ items });
}
