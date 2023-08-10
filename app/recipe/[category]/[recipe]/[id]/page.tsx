import { FullRecepi } from "@/types";
import { get } from "http";
import Link from "next/link";
import RemoveComment from "@/components/RemoveComment";
import AddComment from "@/components/AddComment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
/* export async function generateStaticParams() {
  const category: { id: string }[] = await fetch(
    "http://localhost:3000/api/getStaticParams/getRecipeIDs"
  ).then((res) => res.json());

  return category.map((item) => ({
    id: item.id,
  }));
}
 */
export default async function page({
  params,
}: {
  params: { category: String; recipe: String; id: String };
}) {
  const data = await fetch(
    `http://localhost:3000/api/recipeBigDetail?id=${params.id}`,
    {
      cache: "no-store",
    }
  );
  const session = await getServerSession(authOptions);
  const json: FullRecepi = await data.json();
  console.log(json);
  return (
    <h1>
      {json.name}
      <Link href={`/recipe/${json.categories[0].name}`}>
        {json.categories[0].name}
      </Link>{" "}
      {session && (
        <AddComment recipe={json.id} user={session?.user?.email!}></AddComment>
      )}
      <div>
        {json.comments.map((item) => {
          return (
            <>
              {session?.user?.email == item.User.email && (
                <div>
                  <RemoveComment commentId={item.id}></RemoveComment>
                </div>
              )}

              {item.text}
            </>
          );
        })}
      </div>
    </h1>
  );
}
