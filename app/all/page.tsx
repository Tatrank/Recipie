"use client";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import { Metadata } from "next";
import { useEffect, useRef, useState } from "react";
import { LoadingAnimated } from "@/components/LoadingAnimated";
import OrderBar from "@/components/OrderBar";
import { IP_ADDRESS } from "@/lib/files";
//export const metadata: Metadata = {
//  title: "Vše",
//  description: "Stránka, která zobrazuje vše",
//};

export default function Page({
  searchParams,
}: {
  searchParams: {
    searchParams: string | undefined;
    orderBy: string | undefined;
  };
}) {
  /*  const data = await fetch(
    `http://localhost:3000/api/getRecepi${
      searchParams.searchParams != undefined
        ? `?queryParams=${searchParams.searchParams}`
        : ""
    }`,
    {
      cache: "no-store",
    }
  ); */
  /*  const json: FullRecepi[] = await data.json(); */
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
  }, [searchParams.searchParams, searchParams.orderBy]);
  console.log(
    `http://${IP_ADDRESS}/api/getRecepi?page=${page}${
      searchParams.searchParams != undefined
        ? `&queryParams=${searchParams.searchParams}`
        : ""
    }&orderBy=${searchParams.orderBy}`
  );
  useEffect(() => {
    console.log("hey");
    console.log(page);
    setLoading(true);
    fetch(
      `http://${IP_ADDRESS}/api/getRecepi?page=${page}${
        searchParams.searchParams != undefined
          ? `&queryParams=${searchParams.searchParams}`
          : ""
      }&orderBy=${searchParams.orderBy}`
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
        setJSON((prevData) => [...prevData, ...res]);
      });
  }, [page, searchParams]);

  useEffect(() => {
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

  return (
    <div
      className="flex flex-col items-center justify-center
    "
    >
      {searchParams.searchParams && (
        <div className="flex justify-center w-[100vw] items-center h-20 text-4xl">
          Výsledky vyhledávání: {searchParams.searchParams}
        </div>
      )}
      <OrderBar
        selected={searchParams.orderBy}
        url={`/all${
          searchParams.searchParams
            ? "&searchParams=" + searchParams.searchParams
            : ""
        }`}
      ></OrderBar>

      {json.length ? (
        <>
          <div className="flex flex-wrap justify-center h-fit w-9/10">
            {json.map((item: FullRecepi, index) => (
              <div key={index} className="w-fit m-20 h-fit">
                <Link
                  href={`http://${IP_ADDRESS}/recipe/${item.categories[0].name}/${item.name}/${item.id}`}
                >
                  <RecepiCard data={item}></RecepiCard>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : !loadin ? (
        <div className="text-3xl my-7">Tady nic není</div>
      ) : (
        <div
          className={`flex md:m-[-10.5rem] m-[-30.5rem] justify-center items-center  w-[100vw] min-h-[1440px] h-[100vh] bg-black bg-opacity-40 sticky top-0  left-0 ${
            loadin && searchParams.searchParams
              ? "md:my-[-15.5rem] my-[-35.5rem]"
              : ""
          }`}
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
