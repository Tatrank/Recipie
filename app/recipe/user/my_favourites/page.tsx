"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import { Metadata } from "next";
import { useEffect, useRef, useState } from "react";
export const metadata: Metadata = {
  title: "Moje oblíbené",
};
export default function Page() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackURL=/recipe/user/my_favourites");
    },
  });

  const [noMoreFetches, setNoMoreFetches] = useState(false);
  const [page, setPage] = useState(0);

  const [json, setJSON] = useState<FullRecepi[]>([]);
  useEffect(() => {
    console.log(noMoreFetches);
    fetch(
      `http://localhost:3000/api/getFavourites?page=${page}&userEmail=${session?.user?.email}`
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
        <div className="text-3xl flex justify-center items-center">
          Tady zatím nic není.
          <Link href={"/all"}>
            <div className="rounded-md mx-4 flex items-center w-fit px-4 h-12 bg-primary-dark">
              Likněte něco
            </div>
          </Link>
        </div>
      )}
      <div ref={targetRef}></div>
    </>
  );
}
