import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import Form from "@/components/Form";
import { FullRecepi } from "@/types";
import DeleteButton from "@/components/DeletButton";
export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackURL=/post_recipe");
  }
  const data = await fetch(
    `http://localhost:3000/api/userRecipe?userEmail=${session.user?.email}`
  );
  const json: FullRecepi[] = await data.json();
  return (
    <div className="flex flex-wrap justify-center h-fit w-9/10">
      {json.map((item: FullRecepi) => (
        <div className="w-fit  m-20 h-fit">
          <div className="flex flex-col items-center justify-between ">
            <DeleteButton id={item.id}></DeleteButton>
            <Link
              href={`http://localhost:3000/recipe/${item.categories[0].name}/${item.name}/${item.id}`}
            >
              <RecepiCard data={item}></RecepiCard>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
