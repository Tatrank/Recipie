import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("userEmail");
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
  console.log(orderObject);
  const data = await db.recipe.findMany({
    where: { likes: { some: { User: { email: query } } } },
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
  return NextResponse.json(data);
}
