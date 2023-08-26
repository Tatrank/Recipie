"use client";
import Link from "next/link";
export default function OrderBar({
  url,
  selected,
}: {
  url: string;
  selected: string | undefined;
}) {
  return (
    <div className="overflow-hidden rounded-lg lg:rounded-full border-2 border-secondary-dark mt-16  lg:w-[70rem] lg:h-16 bg-accent-light flex lg:flex-row flex-col w-72 h-96 items-center">
      <Link
        className="lg:w-1/6 w-full h-1/6  border-r-secondary-dark border-r-2  lg:h-full"
        href={`${url}?orderBy=nameAsc`}
      >
        <div
          className={`w-full  flex items-center justify-center ${
            selected == "nameAsc" ? "bg-background-dark" : "bg-primary-dark"
          } h-full`}
        >
          Abecedně
        </div>
      </Link>
      <Link
        className="lg:w-1/6 w-full h-1/6 border-r-2 border-r-secondary-dark  lg:h-full"
        href={`${url}?orderBy=nameDesc
        `}
      >
        <div
          className={`w-full  flex items-center justify-center  ${
            selected == "nameDesc" ? "bg-background-dark" : "bg-primary-dark"
          } h-full`}
        >
          Abecedně pozpátku
        </div>
      </Link>
      <Link
        className="lg:w-1/6 w-full h-1/6 border-r-2 border-r-secondary-dark  lg:h-full"
        href={`${url}?orderBy=likesDesc`}
      >
        <div
          className={`w-full  flex items-center justify-center  ${
            selected == "likesDesc" ? "bg-background-dark" : "bg-primary-dark"
          } h-full `}
        >
          Počet like sestupně
        </div>
      </Link>
      <Link
        className="lg:w-1/6 w-full h-1/6 border-r-2 border-r-secondary-dark  lg:h-full"
        href={`${url}?orderBy=likesAsc `}
      >
        <div
          className={`w-full  flex items-center justify-center  ${
            selected == "likesAsc" ? "bg-background-dark" : "bg-primary-dark"
          } h-full `}
        >
          Počet like vzestupně
        </div>
      </Link>
      <Link
        className="lg:w-1/6 w-full h-1/6 border-r-2 border-r-secondary-dark  lg:h-full"
        href={`${url}?orderBy=dateAsc`}
      >
        <div
          className={`w-full  flex items-center justify-center  ${
            selected == "dateAsc" ? "bg-background-dark" : "bg-primary-dark"
          } h-full `}
        >
          Nejstarší
        </div>
      </Link>
      <Link
        className="lg:w-1/6 w-full h-1/6   lg:h-full"
        href={`${url}?orderBy=dateDesc`}
      >
        <div
          className={`w-full  flex items-center justify-center  ${
            selected == "dateDesc" ? "bg-background-dark" : "bg-primary-dark"
          } h-full `}
        >
          Nejnovější
        </div>
      </Link>
    </div>
  );
}
