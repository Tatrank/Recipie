import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  console.log(request.json);
  const { searchParams } = new URL(request.url);
  const category: string | null = searchParams.get("categoryParams");
  if (category) {
    const data = await db.recipe.findMany({
      include: {
        categories: true,
        likes: true,
        groceries_measueres: true,
        user: true,
      },
      where: { categories: { some: { name: category } } },
    });
    return NextResponse.json(data);
  } else return NextResponse.json([{}]);
}
