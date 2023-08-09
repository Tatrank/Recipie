import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("userID");
  const recipeID = searchParams.get("recipeID");
  if (userID && recipeID) {
    const exists = await db.like.findFirst({
      where: {
        AND: [
          {
            recipe: { id: recipeID },
          },
          { User: { id: userID } },
        ],
      },
      select: { id: true },
    });
    if (exists) {
      await db.like.delete({ where: exists });
    } else {
      await db.like.create({
        data: {
          recipe: { connect: { id: recipeID } },
          User: { connect: { id: userID } },
        },
      });
      return NextResponse.json("like přídán");
    }
  }
}
