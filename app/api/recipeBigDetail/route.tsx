import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const recipe = await db.recipe.findUnique({
      include: {
        categories: true,
        likes: true,
        groceries_measueres: true,
        user: true,
      },
      where: { id: id },
    });
    return NextResponse.json(recipe);
  }
  return NextResponse.json({ id: id });
}
