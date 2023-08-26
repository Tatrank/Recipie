import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  console.log("whadap");
  const { searchParams } = new URL(req.url);
  const userMail = searchParams.get("page");
  const order = searchParams.get("orderBy");
  let orderObject = {};
  switch (order) {
    case "nameAsc":
      orderObject = { name: "asc" };
      break;
    case "nameDesc":
      orderObject = { name: "desc" };
      break;
  }
  if (userMail) {
    const neco = await db.user.findMany({
      take: 12,
      skip: parseInt(userMail) * 12,
      orderBy: orderObject,
    });
    return NextResponse.json(neco);
  }
}
