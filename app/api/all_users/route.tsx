import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  console.log("whadap");
  const { searchParams } = new URL(req.url);
  const userMail = searchParams.get("page");
  if (userMail) {
    const neco = await db.user.findMany({
      take: 2,
      skip: parseInt(userMail) * 2,
    });
    return NextResponse.json(neco);
  }
}
