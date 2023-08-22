"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import RecepiCard from "@/components/RecepiCard";
import { FullRecepi } from "@/types";
import CryptoJS from "@/lib/encryption";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Uživatel",
};
export default function Page({ params }: { params: { user: string[] } }) {
  const fullUrl = decodeURIComponent(params.user.toString()).replace(",", "/");
  const bytes = CryptoJS.AES.decrypt(fullUrl, "secret key 123");
  const originalMail = bytes.toString(CryptoJS.enc.Utf8);

  const targetRef = useRef<HTMLDivElement>(null);

  const [noMoreFetches, setNoMoreFetches] = useState(false);
  const [page, setPage] = useState(0);

  const [json, setJSON] = useState<FullRecepi[]>([]);
  useEffect(() => {
    console.log(noMoreFetches);
    fetch(
      `http://localhost:3000/api/userRecipe?page=${page}&userEmail=${originalMail}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
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
        ) : (
          <div>Zde nic není</div>
        )}
        <div ref={targetRef}></div>
      </div>
    </>
  );
}
