import { db } from "@/lib/db";
import { Bodoni_Moda } from "next/font/google";
import { NextResponse } from "next/server";
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("commentId");
  if (id) {
    await db.comment.delete({
      where: { id: id },
    });
  }

  return NextResponse.json("deleted");
}

export async function POST(req: Request) {
  const body = await req.json();
  const create = await db.comment.create({
    data: {
      text: body.text,
      recipe: { connect: { id: body.recipe } },
      User: { connect: { email: body.user } },
    },
  });
  return NextResponse.json("vytvořeno");
}
