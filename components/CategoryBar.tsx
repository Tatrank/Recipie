"use client";
import { IP_ADDRESS } from "@/lib/files";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LoadingAnimated } from "@/components/LoadingAnimated";
export default function CategoryBar() {
  const [category, setData] = useState<{ name: string; id: string }[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);
  const [noMoreFetches, setNoMoreFetches] = useState(false);
  const [page, setPage] = useState(0);
  const [loadin, setLoading] = useState(true);
  const [firstFetch, setFirstFetch] = useState(true);
  useEffect(() => {
    console.log("hey");
    console.log(page);
    setLoading(true);
    fetch(`http://${IP_ADDRESS}/api/getStaticParams/getCategories?page=${page}`)
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
    <div className="relative top-48 md:top-20 ">
      <Link href={"/recipe/user/view_users"}>
        <motion.div
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="flex justify-center items-center w-full h-16 border-1 border border-secondary-dark bg-background-dark  text-md"
        >
          Prohlížet profily
        </motion.div>
      </Link>
      <Link href="/category">
        <div className="flex justify-center  items-center w-full h-32 border-1 border border-secondary-dark bg-background-dark  text-4xl">
          Kategorie
        </div>
      </Link>
      <div>
        <Link href={`/all`}>
          <motion.div
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.4 }}
            className="w-full  h-16 flex justify-center items-center border-5 border border-secondary-dark bg-background-dark  text-md"
          >
            Vše
          </motion.div>
        </Link>
        {category.map((item) => {
          return (
            <Link key={item.name} href={`/recipe/${item.name}`}>
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.4 }}
                className="w-full  h-16 flex justify-center items-center border-5 border border-secondary-dark bg-background-dark  text-md"
              >
                {item.name}
              </motion.div>
            </Link>
          );
        })}
      </div>
      {loadin && (
        <div className="flex justify-center items-center">
          <LoadingAnimated></LoadingAnimated>
        </div>
      )}
      <div ref={targetRef}></div>
    </div>
  );
}
