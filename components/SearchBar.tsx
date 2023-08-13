"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Magnyfing_glass } from "./Icons";
export function SearchBar() {
  const router = useRouter();
  const [text, setText] = useState<string | undefined>(undefined);
  const [query] = useDebounce(text, 500);
  if (query != undefined && query != "") {
    router.push(`/all?searchParams=${query}`);
  }
  if (query == "") {
    router.push(`/all`);
  }

  return (
    <div className="w-[25rem] flex justify-between items-center  rounded-full h-10 bg-primary-light dark:bg-primary-dark">
      <input
        className="pl-3 rounded-full w-[25rem] h-9 dark:bg-primary-dark dark:text-text-dark"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>
      <div className="h-10 flex w-[4rem] bg-secondary-light items-center justify-center dark:bg-secondary-dark rounded-full">
        <Magnyfing_glass></Magnyfing_glass>
      </div>
    </div>
  );
}
