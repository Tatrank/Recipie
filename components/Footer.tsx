import Link from "next/link";
import { Github } from "./Icons";
export default function Footer() {
  return (
    <div className="z-40 flex absolute bottom-0 px-52 justify-evenly justify-items-center items-center  mt-auto h-36 text-text-light  dark:text-text-dark w-[100%] border-t dark:border-secondary-dark  border-secondary-light bg-background-dark backdrop-filter backdrop-blur-lg bg-opacity-60 ">
      <div>Copyright 2023</div>
      <Link href="/about">O mně</Link>
      <Link href="https://github.com/Tatrank/Recipie"><Github></Github></Link>
    </div>
  );
}
