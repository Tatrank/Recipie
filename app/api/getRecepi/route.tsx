import page from "@/app/recipe/[category]/[recipe]/[id]/page";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("queryParams");
  const query_params = parseInt(searchParams.get("page")!);
  const order = searchParams.get("orderBy");
  
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
  try {
    const user = await db.recipe.findMany({
      where: { name: { contains: query ? query : "", mode: "insensitive" } },
      include: {
        categories: true,
        likes: true,
        groceries_measueres: true,
        user: true,
      },
      take: 12,
      skip: 12 * query_params,
      orderBy: orderObject,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
