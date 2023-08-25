"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import { Metadata } from "next";
import { LoadingAnimated } from "@/components/LoadingAnimated";
export const metadata: Metadata = {
  title: "Uživatel",
};
export default function Page({ params }: { params: { user: string } }) {
  const targetRef = useRef<HTMLDivElement>(null);

  const [noMoreFetches, setNoMoreFetches] = useState(false);
  const [page, setPage] = useState(0);
  const [loadin, setLoading] = useState(true);
  const [json, setJSON] = useState<FullRecepi[]>([]);
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:3000/api/userRecipe?page=${page}&userEmail=${params.user}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        if (res.length === 0) {
          setNoMoreFetches(true);
          return;
        }
        console.log(res.length);
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
        root: null, // Observe within viewport
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
      {" "}
      <div className="flex flex-wrap justify-center h-fit w-9/10">
        <div className="w-full flex justify-center text-7xl">
          {json[0]?.user.name}
        </div>
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
        ) : !loadin ? (
          <div className="text-3xl my-7">Tady nic není</div>
        ) : (
          <div
            className={`flex m-[-2.5rem] justify-center items-center  w-[100vw] min-h-[1440px] h-[100vh] bg-black bg-opacity-40 sticky top-0  left-0 `}
          >
            <div className="flex justify-center  w-full h-[100vh] ">
              <LoadingAnimated></LoadingAnimated>
            </div>
          </div>
        )}
        {loadin && <LoadingAnimated></LoadingAnimated>}
        <div ref={targetRef}></div>
      </div>
    </>
  );
}
