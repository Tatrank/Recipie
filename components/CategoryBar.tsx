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
    <Flex position={"absolute"} top={"250px"} left={"20px"} color={"white"}>
      <ul>
        {category.map((item) => {
          return (
            <li>
              <Link href={`/recipe/${item.name}`}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </Flex>
  );
}
