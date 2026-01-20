import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { contactSchema } from "@/validations/schemas";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.parse(body);

    await dbConnect();
    await ContactMessage.create(parsed);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error?.issues?.[0]?.message || error.message || "Invalid data";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
