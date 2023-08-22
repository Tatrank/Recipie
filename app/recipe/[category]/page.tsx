"use client";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import { useEffect, useRef, useState } from "react";

export async function generateMetadata({
  params,
}: {
  params: { category: String };
}) {

  return {
    title: params.category,
  };
}

/* export async function generateStaticParams() {
  const category: { name: string; id: string }[] = await fetch(
    "http://localhost:3000/api/getStaticParams/getCategories"
  ).then((res) => res.json());

  return category.map((item) => ({
    category: item.name,
  }));
} */

export default function Page({ params }: { params: { category: string } }) {
  const targetRef = useRef<HTMLDivElement>(null);

  const [noMoreFetches, setNoMoreFetches] = useState(false);
  const [page, setPage] = useState(0);

  const [json, setJSON] = useState<FullRecepi[]>([]);
  useEffect(() => {
    console.log(noMoreFetches);
    fetch(
      `http://localhost:3000/api/getByCategory?page=${page}&categoryParams=${params.category}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.length === 0) {
          setNoMoreFetches(true);
          return;
        }
        setJSON((prevData) => [...prevData, ...res]);
      });
  }, [page]);

  useEffect(() => {
    console.log("změna targetu");
    const target = targetRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Intersection Observer fired", entries);
        const entry = entries[0];

        if (entry.isIntersecting && !noMoreFetches) {
          console.log(page);
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null, 
        rootMargin: "0px",
        threshold: 1,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [targetRef, noMoreFetches]);


  return (
    <div
      className="flex flex-col items-center justify-center
    "
    >
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
      <div ref={targetRef}></div>
    </div>
  );
}
