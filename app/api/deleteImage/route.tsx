import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get("imageId");
  imageId && (await utapi.deleteFiles(imageId));
  return NextResponse.json(" ");
}
