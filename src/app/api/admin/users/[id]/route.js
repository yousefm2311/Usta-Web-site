import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import AdminUser from "@/models/AdminUser";

export const runtime = "nodejs";

export async function PATCH(request, { params }) {
  const resolvedParams = await params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await dbConnect();
  const updated = await AdminUser.findByIdAndUpdate(resolvedParams.id, { disabled: body.disabled }, { new: true }).select("-passwordHash");
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  await AdminUser.findByIdAndDelete(resolvedParams.id);
  return NextResponse.json({ success: true });
}
