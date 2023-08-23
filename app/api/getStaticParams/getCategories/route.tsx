import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const data = await db.category.findMany({
    select: { name: true, id: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(data);
}
