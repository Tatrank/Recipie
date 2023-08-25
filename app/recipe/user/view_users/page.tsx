"use client";

import { useEffect, useRef, useState } from "react";
import { UserType } from "@/types";
import Link from "next/link";
import UserCard from "@/components/UserCard";
import { LoadingAnimated } from "@/components/LoadingAnimated";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profily",
};

export default function Page() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<UserType[]>([]);
  const [noMoreFetches, setNoMoreFetches] = useState(false);
  const [page, setPage] = useState(0);
  const [loadin, setLoading] = useState(true);
  const [firstFetch, setFirstFetch] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log(noMoreFetches);
    fetch("http://localhost:3000/api/all_users?page=" + page)
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
        setData((prevData) => [...prevData, ...res]);
      });
  }, [page]);

  useEffect(() => {
    console.log("změna targetu");
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !noMoreFetches && !firstFetch && !loadin) {
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

  console.log(data);

  return (
    <div className="flex flex-wrap justify-center h-fit w-9/10">
      {data.length ? (
        <div className="flex flex-wrap justify-center h-fit w-9/10">
          {data.map((item: UserType) => {
            return (
              <div key={item.id} className="w-fit m-20 h-fit">
                <Link href={`/recipe/user/public/${item.id}`}>
                  <UserCard data={item}></UserCard>
                </Link>
              </div>
            );
          })}
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
    </div>
  );
}
