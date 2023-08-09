import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";

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
    <div className="main-container">
      <div className="container">
        {json.map((item: FullRecepi) => (
          <Link
            href={`http://localhost:3000/recipe/${item.categories[0].name}/${item.name}/${item.id}`}
          >
            <RecepiCard data={item}></RecepiCard>´
          </Link>
        ))}
      </div>
    </div>
  );
}
