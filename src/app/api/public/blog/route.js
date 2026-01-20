import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/services/blogService";

export const runtime = "nodejs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(Number(searchParams.get("page") || 1), 1);
  const pageSize = Math.max(Number(searchParams.get("pageSize") || 6), 1);
  const search = searchParams.get("search") || "";

  const data = await getPublishedPosts({ page, pageSize, search });
  return NextResponse.json(data);
}
