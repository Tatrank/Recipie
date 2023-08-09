import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const data = await db.recipe.findMany({ select: { id: true } });
  return NextResponse.json(data);
}
