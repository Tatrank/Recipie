"use client";
import { useState, useEffect } from "react";
import { Magnyfing_glass } from "@/components/Icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IP_ADDRESS } from "@/lib/files";
export default function Page({
  searchParams,
}: {
  searchParams: { search: string | undefined };
}) {
  const [data, setData] = useState<{ name: string }[]>([]);
  let alphabet = "A";
  const [text, setText] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    fetch(
      `http://${IP_ADDRESS}/api/getStaticParams/getCategories?search=${
        searchParams.search ? searchParams.search : ""
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, [searchParams.search]);
  return (
    <div className="w-[78rem] flex  flex-col h-fit p-14">
      <div className="flex w-full justify-center md:scale-150 mb-12">
        <div className="w-[25rem] flex justify-between items-center  rounded-full h-10 bg-primary-light dark:bg-primary-dark">
          <input
            placeholder="Hleadat kategorii"
            className="pl-3 placeholder:text-text-dark rounded-full w-[25rem] p-l-[0.75rem] h-9 bg-primary-dark text-text-dark"
            value={text!}
            name="search"
            onChange={(e) => {
              console.log(e.target.value);
              setText(e.target.value);
            }}
          ></input>
          <div
            onClick={() => {
              if (text == undefined || text == "") {
                router.push("/category");
                return;
              }

              router.push("/category?search=" + text);
            }}
            className="h-10  cursor-pointer flex w-[4rem]  items-center justify-center  rounded-full"
          >
            <Magnyfing_glass></Magnyfing_glass>
          </div>
        </div>
      </div>
      {searchParams.search && (
        <div className="m-4 text-center text-4xl">
          Nyní hledáte kategorii: {searchParams.search}
        </div>
      )}
      {data.map((item) => {
        if (item.name[0].toUpperCase() != alphabet) {
          alphabet = item.name[0].toUpperCase();
          return (
            <div key={item.name}>
              <div className="text-9xl border-2 border-secondary-dark p-6 bg-primary-dark rounded-3xl my-8">
                {alphabet}
              </div>
              <Link href={"/recipe/" + item.name}>
                <div className="flex mx-10 border-2 border-secondary-dark rounded-xl bg-primary-dark px-4 my-2 py-5  text-5xl ">
                  {item.name}
                </div>
              </Link>
            </div>
          );
        }
        return (
          <Link href={"/recipe/" + item.name} key={item.name}>
            <div className="flex text-5xl  border-2 border-secondary-dark rounded-xl bg-primary-dark my-2 px-4 py-5  mx-10 ">
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
