import { NextResponse } from "next/server";
import { getStaticPage } from "@/services/pageService";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const page = await getStaticPage(resolvedParams.key);
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(page);
}
