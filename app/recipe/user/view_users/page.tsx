"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useIntersection } from "@mantine/hooks";
interface UserData {
  name: string;
}

const something = [{ name: "me" }];

export default function Page() {
  const { data, fetchNextPage } = useInfiniteQuery(
    ["query"],
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        "http://localhost:3000/api/all_users?page=" + pageParam,
        { cache: "no-store" }
      );

      return (await res.json()) as Promise<UserData[]>;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length;
      },
    }
  );

  const last_item = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: last_item.current,
    threshold: 1,
  });
  if (entry?.isIntersecting) {
    fetchNextPage();
  }

  return (
    <>
      <>ssddf</>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.map((item, id) => {
            if ((id = page.length)) {
              return (
                <div
                  className="h-[80vh] w-[100vh]
              "
                  ref={ref}
                >
                  {item.name}
                </div>
              );
            }
            return (
              <div className="h-[120vh]" key={item.name}>
                {item.name}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
