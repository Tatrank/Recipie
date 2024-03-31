"use client";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import { useEffect, useRef, useState } from "react";
import { LoadingAnimated } from "@/components/LoadingAnimated";
import OrderBar from "@/components/OrderBar";
import { IP_ADDRESS } from "@/lib/files";
//export async function generateMetadata({
//  params,
//}: {
//  params: { category: String };
//}) {
//  return {
//    title: params.category,
//  };
//}

/* export async function generateStaticParams() {
  const category: { name: string; id: string }[] = await fetch(
    "http://localhost:3000/api/getStaticParams/getCategories"
  ).then((res) => res.json());

  return category.map((item) => ({
    category: item.name,
  }));
} */

export default function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { orderBy: string | undefined };
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [loadin, setLoading] = useState(true);
  const [noMoreFetches, setNoMoreFetches] = useState(false);
  const [page, setPage] = useState(0);
  const [firstFetch, setFirstFetch] = useState(true);
  const [json, setJSON] = useState<FullRecepi[]>([]);
  useEffect(() => {
    setNoMoreFetches(false);
    setJSON([]);
    setPage(0);
    setFirstFetch(true);
  }, [searchParams.orderBy]);

  useEffect(() => {
    setLoading(true);

    fetch(
      `http://${IP_ADDRESS}/api/getByCategory?page=${page}&categoryParams=${params.category}&orderBy=${searchParams.orderBy}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setFirstFetch(false);
        setLoading(false);
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
        console.log("Intersection Observer fired", entries);
        const entry = entries[0];

        if (entry.isIntersecting && !noMoreFetches && !firstFetch && !loadin) {
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
  }, [targetRef, noMoreFetches, loadin, firstFetch]);

  return (
    <div
      className="flex flex-col items-center justify-center
    "
    >
      <div className="flex text-center justify-center w-[100vw] items-center h-20 text-4xl">
        Nyní prohlížíte {decodeURI(params.category)} kategorii
      </div>
      <OrderBar
        selected={searchParams.orderBy}
        url={`/recipe/${params.category}`}
      ></OrderBar>

      {json.length ? (
        <div className="flex flex-wrap justify-center h-fit w-9/10">
          {json.map((item: FullRecepi) => (
            <div key={item.id} className="w-fit m-20 h-fit">
              <Link
                href={`/recipe/${item.categories[0].name}/${item.name}/${item.id}`}
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
          className={`flex m-[-2.5rem] md:my-[-15.5rem] my-[-35.5rem] justify-center items-center  w-[100vw] min-h-[1440px] h-[100vh] bg-black bg-opacity-40 sticky top-0  left-0 `}
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
