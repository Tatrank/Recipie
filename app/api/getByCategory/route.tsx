import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  console.log(request.json);
  const { searchParams } = new URL(request.url);
  const category: string | null = searchParams.get("categoryParams");
  const query_params = parseInt(searchParams.get("page")!);
  const order = searchParams.get("orderBy");
  console.log(order);
  let orderObject = {};
  switch (order) {
    case "likesAsc":
      orderObject = { likes: { _count: "asc" } };
      break;
    case "likesDesc":
      orderObject = { likes: { _count: "desc" } };
      break;
    case "nameAsc":
      orderObject = { name: "asc" };
      break;
    case "nameDesc":
      orderObject = { name: "desc" };
      break;
    case "dateAsc":
      orderObject = { published: "asc" };
      break;
    case "dateDesc":
      orderObject = { published: "desc" };
      break;
  }
  if (category) {
    const data = await db.recipe.findMany({
      include: {
        categories: true,
        likes: true,
        groceries_measueres: true,
        user: true,
      },
      where: { categories: { some: { name: category } } },
      take: 12,
      skip: 12 * query_params,
      orderBy: orderObject,
    });
    return NextResponse.json(data);
  } else return NextResponse.json([{}]);
}
