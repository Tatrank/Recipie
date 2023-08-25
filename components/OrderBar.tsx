"use client"
import Link from "next/link";
export default function OrderBar({url} : {url: string}) {
    return ( <div className=" mt-16  lg:w-[70rem] lg:h-16 bg-accent-light flex lg:flex-row flex-col w-72 h-96 items-center">
      <Link
        className="lg:w-1/6 w-full h-1/6  lg:h-full"
        href={`${url}?orderBy=nameAsc`}
      >
        <div className="w-full  flex items-center justify-center h-full border-2 border-b-accent-dark">
          Abecedně
        </div>
      </Link>
      <Link
        className="lg:w-1/6 w-full h-1/6  lg:h-full"
        href={`${url}?orderBy=nameDesc
        `}
      >
        <div className="w-full  flex items-center justify-center h-full border-2 border-b-accent-dark">
          Abecedně pozpátku
        </div>
      </Link>
      <Link
        className="lg:w-1/6 w-full h-1/6  lg:h-full"
        href={`${url}?orderBy=likesDesc`}
      >
        <div className="w-full  flex items-center justify-center h-full border-2 border-b-accent-dark">
          Počet like sestupně
        </div>
      </Link>
      <Link
        className="lg:w-1/6 w-full h-1/6  lg:h-full"
        href={`${url}?orderBy=likesAsc`}
      >
        <div className="w-full  flex items-center justify-center h-full border-2 border-b-accent-dark">
          Počet like vzestupně
        </div>
      </Link>
      <Link
        className="lg:w-1/6 w-full h-1/6  lg:h-full"
        href={`${url}?orderBy=dateAsc`}
      >
        <div className="w-full  flex items-center justify-center h-full border-2 border-b-accent-dark">
          Nejstarší
        </div>
      </Link>
      <Link
        className="lg:w-1/6 w-full h-1/6  lg:h-full"
        href={`${url}?orderBy=dateDesc`}
      >
        <div className="w-full  flex items-center justify-center h-full border-2 border-b-accent-dark">
          Nejnovější
        </div>
      </Link>
    </div>)
}