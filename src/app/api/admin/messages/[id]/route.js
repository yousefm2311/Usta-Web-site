import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";

export const runtime = "nodejs";

export async function PATCH(request, { params }) {
  const resolvedParams = await params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await dbConnect();
  const updated = await ContactMessage.findByIdAndUpdate(resolvedParams.id, { status: body.status }, { new: true });
  return NextResponse.json(updated);
}
