import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { category: String };
}) {
  // read route params

  // fetch data

  return {
    title: params.category,
  };
}

export async function generateStaticParams() {
  const category: { name: string; id: string }[] = await fetch(
    "http://localhost:3000/api/getStaticParams/getCategories"
  ).then((res) => res.json());

  return category.map((item) => ({
    category: item.name,
  }));
}

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const data = await fetch(
    `http://localhost:3000/api/getByCategory?categoryParams=${params.category}`
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
