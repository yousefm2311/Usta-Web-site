import { NextResponse } from "next/server";
import { getActiveTheme } from "@/services/themeService";

export const runtime = "nodejs";

export async function GET() {
  const theme = await getActiveTheme();
  return NextResponse.json(theme || {});
}
