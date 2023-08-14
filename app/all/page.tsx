import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import LikeButton from "@/components/LikeButton";
import CategoryBar from "@/components/CategoryBar";
export default async function Page({
  searchParams,
}: {
  searchParams: { searchParams: string | undefined };
}) {
  const data = await fetch(
    `http://localhost:3000/api/getRecepi${
      searchParams.searchParams != undefined
        ? `?queryParams=${searchParams.searchParams}`
        : ""
    }`,
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
            <div className="w-fit m-20 h-fit">
              {/*           <LikeButton
            NumberLikes={item.likes.length}
            RecipeID={item.id}
            UserID={item.userId}
          ></LikeButton> */}
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
