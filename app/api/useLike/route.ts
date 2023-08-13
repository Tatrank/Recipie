import { NextResponse } from "next/server";
import { db } from "@/lib/db";
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
      return NextResponse.json({ value: true });
    } else {
      return NextResponse.json({ value: false });
    }
  }
}
