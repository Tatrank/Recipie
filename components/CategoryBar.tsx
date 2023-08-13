"use client";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function CategoryBar() {
  const [category, setData] = useState<{ name: string; id: string }[]>([
    {
      name: "",
      id: "",
    },
  ]);
  useEffect(() => {
    fetch("http://localhost:3000/api/getStaticParams/getCategories")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        console.log(res);
      });
  }, []);
  return (
    <div className="relative top-20">
      <div className="flex justify-center items-center w-full h-32 border-1 border border-primary-dark dark:bg-background-dark bg-background-light text-4xl">
        Kategorie
      </div>
      <div>
        <Link href={`/all`}>
          <div className="w-full  h-16 flex justify-center items-center border-5 border border-primary-dark dark:bg-background-dark bg-background-light text-md">
            Vše
          </div>
        </Link>
        {category.map((item) => {
          return (
            <Link href={`/recipe/${item.name}`}>
              <div className="w-full  h-16 flex justify-center items-center border-5 border border-primary-dark dark:bg-background-dark bg-background-light text-md">
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
