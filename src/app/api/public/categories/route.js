import { NextResponse } from "next/server";
import { getActiveCategories } from "@/services/categoryService";

export const runtime = "nodejs";

export async function GET() {
  const items = await getActiveCategories();
  return NextResponse.json({ items });
}
