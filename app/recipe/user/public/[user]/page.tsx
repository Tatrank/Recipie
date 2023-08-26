"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import { Metadata } from "next";
import { LoadingAnimated } from "@/components/LoadingAnimated";
import OrderBar from "@/components/OrderBar";
export const metadata: Metadata = {
  title: "Uživatel",
};
export default function Page({
  params,
  searchParams,
}: {
  params: { user: string };
  searchParams: { orderBy: string };
}) {
  const targetRef = useRef<HTMLDivElement>(null);

  const [noMoreFetches, setNoMoreFetches] = useState(false);
  const [page, setPage] = useState(0);
  const [loadin, setLoading] = useState(true);
  const [firstFetch, setFirstFetch] = useState(true);
  const [json, setJSON] = useState<FullRecepi[]>([]);
  useEffect(() => {
    setNoMoreFetches(false);
    setJSON([]);
    setPage(0);
    setFirstFetch(true);
  }, [, searchParams.orderBy]);
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:3000/api/userRecipe?page=${page}&userEmail=${params.user}&orderBy=${searchParams.orderBy}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        setFirstFetch(false);
        if (res.length === 0) {
          setNoMoreFetches(true);
          return;
        }
        console.log(res.length);
        setJSON((prevData) => [...prevData, ...res]);
      });
  }, [page, searchParams]);

  useEffect(() => {
    console.log("změna targetu");
    const target = targetRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Intersection Observer fired", entries);
        const entry = entries[0];

        if (entry.isIntersecting && !noMoreFetches && !firstFetch && !loadin) {
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
  }, [targetRef, noMoreFetches, firstFetch, loadin]);

  return (
    <div
      className="flex flex-col items-center justify-center
    "
    >
      <div className="w-full flex justify-center text-7xl">
        {json[0]?.user.name}
      </div>
      <OrderBar
        selected={searchParams.orderBy}
        url={`/recipe/user/public/${params.user}`}
      ></OrderBar>
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
        <div className="text-4xl my-10">Tady nic není</div>
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
  );
}
