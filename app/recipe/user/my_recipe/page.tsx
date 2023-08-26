import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import DeleteButton from "@/components/DeletButton";
import { Metadata } from "next";
import OrderBar from "@/components/OrderBar";
export const metadata: Metadata = {
  title: "Moje recepty",
};
export default async function Page({
  searchParams,
}: {
  searchParams: { orderBy: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackURL=/recipe/user/my_recipe");
  }
  const data = await fetch(
    `http://localhost:3000/api/userRecipe?userEmail=${session.user?.email}&page=0&my=true&orderBy=${searchParams.orderBy}`,
    { cache: "no-store" }
  );
  const json: FullRecepi[] = await data.json();
  return (
    <div
      className="flex flex-col items-center justify-center
    "
    >
      <OrderBar
        selected={searchParams.orderBy}
        url="/recipe/user/my_recipe"
      ></OrderBar>
      {json.length ? (
        <div className="flex flex-wrap justify-center h-fit w-9/10">
          {json.map((item: FullRecepi) => (
            <div key={item.id} className="w-fit  m-20 h-fit">
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
      ) : (
        <div className="text-3xl flex justify-center items-center">
          Tady zatím nic není.
          <Link href={"/post_recipe"}>
            <div className="rounded-md mx-4 flex items-center w-fit px-4 h-12 bg-primary-dark">
              Vytvořte něco
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
