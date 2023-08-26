import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query_params = parseInt(searchParams.get("page")!);
  const where = searchParams.get("my");
  const query = searchParams.get("userEmail");
  const order = searchParams.get("orderBy");
  const search = where
    ? { user: { email: query as string } }
    : { user: { id: query as string } };
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
  console.log(search)
  
  if (where) {
    const data = await db.recipe.findMany({
      where: search,
      include: {
        categories: true,
        likes: true,
        groceries_measueres: true,
        user: true,
      },
      orderBy: orderObject,
    });
    return Response.json(data);
  }
  const data = await db.recipe.findMany({
    where: search,
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
  return Response.json(data);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("id");

  if (query) {
    const id = await db.recipe.delete({
      where: { id: query },
      select: { image_key: true, id: true, comments: true, likes: true },
    });
    const deleteComments = id.comments.map(async (item) => {
      const commentId = await db.comment.delete({ where: { id: item.id } });
      return commentId;
    });
    await Promise.all(deleteComments);
    const deleteLikes = id.likes.map(async (item) => {
      const LikeId = await db.like.delete({ where: { id: item.id } });
      return LikeId;
    });
    await Promise.all(deleteLikes);
    if (id.image_key) {
      await utapi.deleteFiles(id.image_key);
    }
  }
  return NextResponse.json("deleted");
}
