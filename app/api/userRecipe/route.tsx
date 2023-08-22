import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query_params = parseInt(searchParams.get("page")!);

  const query = searchParams.get("userEmail");
  if (Number.isNaN(query_params)) {
    const data = await db.recipe.findMany({
      where: { user: { email: query } },
      include: {
        categories: true,
        likes: true,
        groceries_measueres: true,
        user: true,
      },
    });
    return Response.json(data);
  }
  const data = await db.recipe.findMany({
    where: { user: { email: query } },
    include: {
      categories: true,
      likes: true,
      groceries_measueres: true,
      user: true,
    },
    take: 12,
    skip: 12 * query_params,
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
