"use client";

import { useEffect, useRef, useState } from "react";

// Usage example:
export default function Page() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [data, setData] = useState<{ name: string }[]>([]);
  const [noMoreFetches, setNoMoreFetches] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log(noMoreFetches);
    fetch("http://localhost:3000/api/all_users?page=" + page)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.length === 0) {
          setNoMoreFetches(true);
          return;
        }
        setData((prevData) => [...prevData, ...res]);
      });
  }, [page]);

  useEffect(() => {
    console.log("změna targetu");
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !noMoreFetches) {
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
    <div>
      <div className="w-[100vw] bg-accent-light h-[150vh]"></div>
      {/* Your content */}
      <div>
        {data.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
      <div ref={targetRef}></div>
    </div>
  );
}
