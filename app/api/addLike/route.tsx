import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userMail = searchParams.get("userID");
  const recipeID = searchParams.get("recipeID");
  if (userMail && recipeID) {
    const userID = await db.user.findUnique({
      where: { email: userMail },
      select: { id: true },
    });
    const exists = await db.like.findFirst({
      where: {
        AND: [
          {
            recipe: { id: recipeID },
          },
          { User: userID },
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
          User: { connect: userID! },
        },
      });
    }
    return NextResponse.json("like přídán");
  }
}
