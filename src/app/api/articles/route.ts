import { getAllArticles } from "@/lib/articles";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(getAllArticles());
}