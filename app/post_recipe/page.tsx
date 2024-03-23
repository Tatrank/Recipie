import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Form from "@/components/Form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Vytvořit",
};
export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/api/auth/signin?callbackURL=/post_recipe");
  }
  return <> {session && <Form></Form>}</>;
}
