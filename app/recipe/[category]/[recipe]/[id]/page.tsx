import { FullRecepi } from "@/types";
import { get } from "http";
import Link from "next/link";

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
  const json: FullRecepi = await data.json();
  console.log(json);
  return (
    <h1>
      {json.name}
      <Link href={`/recipe/${json.categories[0].name}`}>
        {json.categories[0].name}
      </Link>
    </h1>
  );
}
