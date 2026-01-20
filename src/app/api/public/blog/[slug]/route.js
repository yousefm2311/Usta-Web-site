import { NextResponse } from "next/server";
import { getPostBySlug } from "@/services/blogService";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}
