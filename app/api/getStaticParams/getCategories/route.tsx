import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query_params = parseInt(searchParams.get("page")!);
  const search = searchParams.get("search");
  let whereObj = { name: { contains: "", mode: "insensitive" } };

  if (!Number.isNaN(query_params)) {
    const data = await db.category.findMany({
      select: { name: true, id: true },
      orderBy: { name: "asc" },
      take: 12,
      skip: 12 * query_params,
      where: { name: { contains: search ? search : "", mode: "insensitive" } },
    });
    return NextResponse.json(data);
  }
  const data = await db.category.findMany({
    select: { name: true, id: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(data);
}
