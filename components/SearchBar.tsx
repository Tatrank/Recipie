"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Magnyfing_glass } from "./Icons";
export function SearchBar() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(true);
  const [text, setText] = useState<string | undefined>(undefined);
  const [query] = useDebounce(text, 500);
  if (query != undefined && query != "") {
    router.push(`/all?searchParams=${query}`);
  }
  if (query == "") {
    router.push(`/all`);
  }

  return (
    <motion.div
      animate={{
        width: showSearch ? "10rem" : "25rem",
      }}
      className="w-[25rem] flex justify-between items-center  rounded-full h-10 bg-primary-light dark:bg-primary-dark"
    >
      <motion.input
        animate={{
          width: showSearch ? 0 : "25rem",
          paddingLeft: showSearch ? 0 : "0.75rem",
        }}
        className="pl-3 rounded-full  h-9 dark:bg-primary-dark dark:text-text-dark"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></motion.input>
      <motion.div
        onClick={() => {
          setShowSearch(!showSearch);
        }}
        animate={{
          width: showSearch ? "12rem" : "4rem",
        }}
        transition={{}}
        className="h-10 flex w-[4rem] bg-secondary-light items-center justify-center dark:bg-secondary-dark rounded-full"
      >
        <Magnyfing_glass></Magnyfing_glass>
      </motion.div>
    </motion.div>
  );
}
