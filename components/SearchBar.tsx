"use client";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
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
    <Input
      w="16rem"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
    ></Input>
  );
}
