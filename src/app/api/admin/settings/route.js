import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { getSiteSettings, updateSiteSettings } from "@/services/siteSettingsService";
import { siteSettingsSchema } from "@/validations/schemas";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = siteSettingsSchema.parse(body);
    const settings = await updateSiteSettings(parsed);
    return NextResponse.json(settings);
  } catch (error) {
    const message = error?.issues?.[0]?.message || error.message || "Invalid data";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
