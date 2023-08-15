import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import DeleteButton from "@/components/DeletButton";
export default async function Page({}: {}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackURL=/post_recipe");
  }
  const data = await fetch(
    `http://localhost:3000/api/getFavourites?userEmail=${session.user?.email}`,
    {
      cache: "no-store",
    }
  );
  const json: FullRecepi[] = await data.json();
  return (
    <>
      {json.length ? (
        <div className="flex flex-wrap justify-center h-fit w-9/10">
          {json.map((item: FullRecepi) => (
            <div key={item.id} className="w-fit m-20 h-fit">
              <Link
                href={`http://localhost:3000/recipe/${item.categories[0].name}/${item.name}/${item.id}`}
              >
                <RecepiCard data={item}></RecepiCard>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-3xl">Tady nic není</div>
      )}
    </>
  );
}
