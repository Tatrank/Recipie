"use client";

import { useEffect, useRef, useState } from "react";
import { UserType } from "@/types";
import Link from "next/link";
import UserCard from "@/components/UserCard";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profily",
};

export default function Page() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<UserType[]>([]);
  const [noMoreFetches, setNoMoreFetches] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log(noMoreFetches);
    fetch("http://localhost:3000/api/all_users?page=" + page)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
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

        if (entry.isIntersecting && !noMoreFetches) {
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

  console.log(data);

  return (
    <>
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
      ) : (
        <div className="text-3xl my-7">Tady nic není</div>
      )}
    </>
  );
}
