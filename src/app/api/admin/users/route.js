import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdminSession } from "@/lib/require-admin";
import { dbConnect } from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import { userSchema } from "@/validations/schemas";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const items = await AdminUser.find().select("-passwordHash").sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = userSchema.parse(body);

    await dbConnect();
    const exists = await AdminUser.findOne({ email: parsed.email.toLowerCase() });
    if (exists) {
      return NextResponse.json({ error: "البريد مستخدم بالفعل" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(parsed.password, 10);
    const user = await AdminUser.create({
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      passwordHash,
      disabled: parsed.disabled || false
    });

    const safeUser = user.toObject();
    delete safeUser.passwordHash;
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Invalid data" }, { status: 400 });
  }
}
