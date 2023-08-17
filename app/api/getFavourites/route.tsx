import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("userEmail");
  const data = await db.recipe.findMany({
    where: { likes: { some: { User: { email: query } } } },
    include: {
      categories: true,
      likes: true,
      groceries_measueres: true,
      user: true,
    },
  });
  return Response.json(data);
}