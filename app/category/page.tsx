"use client";
import { useState, useEffect } from "react";
export default async function ({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const [data, setData] = useState<{ name: string }[]>([]);
  let alphabet = "A";
  useEffect(() => {
    fetch(
      `http://localhost:3000/api/getStaticParams/getCategories?search=${searchParams.search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, []);

  return (
    <>
      {data.map((item) => {
        if (item.name[0].toUpperCase() != alphabet) {
          alphabet = item.name[0].toUpperCase();
          return (
            <div>
              <div className="text-7xl">{alphabet}</div>
              <div>{item.name}</div>
            </div>
          );
        }
        return <div>{item.name}</div>;
      })}
    </>
  );
}
