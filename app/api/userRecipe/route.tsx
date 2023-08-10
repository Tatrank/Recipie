import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("userEmail");
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

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("id");

  if (query) {
    const id = await db.recipe.delete({
      where: { id: query },
      select: { image_key: true },
    });
    if (id.image_key) {
      await utapi.deleteFiles(id.image_key);
    }
  }
  return NextResponse.json("");
}
