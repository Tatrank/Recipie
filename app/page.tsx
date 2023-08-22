import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default async function Page() {
  return (
    <>
      <div className="flex justify-center flex-wrap items-center w-full p-10">
        <div className="m-10 md:text-7xl text-3xl flex justify-center w-full">
          Jedinečné stránky k prouzdání a vytváření receptů{" "}
        </div>
        <Link href={"/all"}>
          <div
            className="text-2xl bg-primary-dark
          rounded-2xl px-12 py-6"
          >
            Začít prohlížet
          </div>
        </Link>
      </div>
    </>
  );
}
