"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import { Metadata } from "next";
import { useEffect, useRef, useState } from "react";
import { LoadingAnimated } from "@/components/LoadingAnimated";
import OrderBar from "@/components/OrderBar";
export const metadata: Metadata = {
  title: "Moje oblíbené",
};
export default function Page({
  searchParams,
}: {
  searchParams: {
    orderBy: string | undefined;
  };
}) {
  const targetRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackURL=/recipe/user/my_favourites");
    },
  });

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
  }, [searchParams.orderBy]);

  useEffect(() => {
    if (session) {
      console.log(page);
      setLoading(true);
      fetch(
        `http://localhost:3000/api/getFavourites?page=${page}&userEmail=${session?.user?.email}&orderBy=${searchParams.orderBy}`
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
          console.log(res);
          setJSON((prevData) => [...prevData, ...res]);
        });
    }
  }, [page, searchParams, session]);

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
        root: null,
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
      <OrderBar url={`/recipe/user/my_favourites`}></OrderBar>
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
        <div className="text-3xl flex justify-center items-center">
          Tady zatím nic není.
          <Link href={"/all"}>
            <div className="rounded-md mx-4 flex items-center w-fit px-4 h-12 bg-primary-dark">
              Likněte něco
            </div>
          </Link>
        </div>
      ) : (
        <div
          className={`flex m-[-2.5rem] justify-center items-center  w-[100vw] min-h-[1440px] h-[100vh] bg-black bg-opacity-40 sticky top-0  left-0 
       
          `}
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
