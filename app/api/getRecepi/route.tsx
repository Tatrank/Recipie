import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("queryParams");

  try {
    const user = await db.recipe.findMany({
      where: { name: { contains: query ? query : "", mode: "insensitive" } },
      include: {
        categories: true,
        likes: true,
        groceries_measueres: true,
        user: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
