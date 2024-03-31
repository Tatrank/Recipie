import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: { name: string; password: string; email: string } =
    await req.json();
  const exits = await db.user.findFirst({
    where: {
      name: data.name,
      password: data.password,
    },
  });
  if (exits) {
    return NextResponse.json("User already exists");
  }
  const y = await db.user.create({
    data: {
      name: data.name,
      password: data.password,
    },
  });
  return NextResponse.json("");
}
