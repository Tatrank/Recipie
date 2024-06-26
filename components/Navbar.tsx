"use client";

import Dropdown from "./Dropdown";
import { SearchBar } from "./SearchBar";
import { signIn, signOut, useSession } from "next-auth/react";
import CategoryBar from "./CategoryBar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const { data: session, status } = useSession();
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [x, setX] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState<boolean>(true);
  return (
    <>
      <div className=" z-50 sticky top-0 ml-auto">
        <motion.div
          initial={{ left: "-50rem" }}
          animate={{ left: !showCategory ? "-50rem" : "0" }}
          className="absolute  w-full md:w-72 overflow-y-auto overflow-x-hidden h-screen  bg-black
backdrop-filter backdrop-blur-lg bg-opacity-10"
        >
          <CategoryBar></CategoryBar>
        </motion.div>
      </div>
      <div className="z-50 hidden  md:flex justify-between justify-items-center flex-col md:flex-row items-center px-5 top-0 h-48 md:h-20   text-text-dark w-[100%] border-b border-secondary-dark   bg-background-dark sticky backdrop-filter backdrop-blur-lg bg-opacity-60 ">
        <div className="flex justify-between justify-items-center items-center h-14 w-[10rem]">
          <div
            className="flex cursor-pointer items-center flex-col justify-evenly h-[40px]"
            onClick={() => {
              setX(!x);
              setShowCategory(!showCategory);
              console.log(showCategory);
            }}
          >
            <motion.div
              animate={{
                rotate: x ? 45 : 0,
                position: x ? "relative" : "static",
                top: x ? 10 : 0,
              }}
              className=" w-[32px] bg-primary-dark h-[6px] rounded-sm"
            ></motion.div>
            <motion.div
              animate={{
                visibility: x ? "hidden" : "visible",
                position: x ? "absolute" : "static",
              }}
              className="w-[32px] bg-primary-dark h-[6px] rounded-sm"
            ></motion.div>
            <motion.div
              animate={{
                rotate: x ? -45 : 0,
                position: x ? "relative" : "static",
                top: x ? -5 : 0,
              }}
              className="w-[32px] bg-primary-dark h-[6px] rounded-sm"
            ></motion.div>
          </div>
          <div className="text-4xl">
            <Link href="/">ReciPie</Link>
          </div>
        </div>
        <SearchBar></SearchBar>
        <div className="flex">
          {!session && (
            <div
              className="hover:cursor-pointer flex justify-center items-center md:mb-0 mb-5 h-10 w-20 bg-primary-dark rounded-2xl bg"
              onClick={() => {
                router.push("/register");
              }}
            >
              Sing in
            </div>
          )}
          {session && (
            <>
              <Dropdown
                button={
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="hover:cursor-pointer flex justify-between justify-items-center  items-center h-14 w-[14rem] overflow-hidden"
                  >
                    <div></div>
                    <div className="w-[13rem] absolute h-9 flex p-3 rounded-2xl z-0 text-lg items-center bg-primary-dark">
                      {session.user?.name}
                    </div>
                    <div className="border z-10 rounded-full border-secondary-dark">
                      <img
                        className="w-12 h-12 rounded-full "
                        src={
                          session.user?.image
                            ? session.user?.image
                            : "https://t3.ftcdn.net/jpg/04/63/51/28/360_F_463512856_GEk2IrQkYatpRVR9YDhiZgRY2z00Zet3.jpg"
                        }
                      ></img>
                    </div>
                  </motion.div>
                }
                classNames={
                  "py-2 left-1 md:bottom-[-15.3rem]  bottom-[-14.6rem]"
                }
              >
                <div className=" z-50 ">
                  <div className="ml-auto  z-50 w-[15rem] h-56    text-text-dark border-t-0 border border-secondary-dark   bg-background-dark backdrop-filter backdrop-blur-sm bg-opacity-60">
                    <div
                      onClick={() => {
                        signOut();
                      }}
                      className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-b border-secondary-dark  "
                    >
                      Odhlásit
                    </div>
                    <Link href="/recipe/user/my_recipe">
                      <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-b border-secondary-dark ">
                        Moje
                      </div>
                    </Link>
                    <Link href="/post_recipe">
                      <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-b border-secondary-dark  ">
                        Vytvořit
                      </div>
                    </Link>
                    <Link href="/recipe/user/my_favourites">
                      <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-secondary-dark  ">
                        Oblíbené
                      </div>
                    </Link>
                  </div>
                </div>
              </Dropdown>
            </>
          )}
        </div>
      </div>
      <div className="p-3 z-50 md:hidden  flex justify-between justify-items-center flex-col md:flex-row items-center px-5 top-0 h-32 md:h-20   text-text-dark w-[100%] border-b border-secondary-dark   bg-background-dark sticky backdrop-filter backdrop-blur-lg bg-opacity-60 ">
        <div className="scale-75 flex  w-[125%] justify-between align-middle items-center">
          <div className="flex justify-between justify-items-center items-center h-14 w-[10rem]">
            <div
              className="flex cursor-pointer items-center flex-col justify-evenly h-[40px]"
              onClick={() => {
                setX(!x);
                setShowCategory(!showCategory);
                console.log(showCategory);
              }}
            >
              <motion.div
                animate={{
                  rotate: x ? 45 : 0,
                  position: x ? "relative" : "static",
                  top: x ? 10 : 0,
                }}
                className=" w-[32px] bg-primary-dark h-[6px] rounded-sm"
              ></motion.div>
              <motion.div
                animate={{
                  visibility: x ? "hidden" : "visible",
                  position: x ? "absolute" : "static",
                }}
                className="w-[32px] bg-primary-dark h-[6px] rounded-sm"
              ></motion.div>
              <motion.div
                animate={{
                  rotate: x ? -45 : 0,
                  position: x ? "relative" : "static",
                  top: x ? -5 : 0,
                }}
                className="w-[32px] bg-primary-dark h-[6px] rounded-sm"
              ></motion.div>
            </div>
            <div className="text-4xl">
              <Link href="/">ReciPie</Link>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {!session && (
              <div
                className="hover:cursor-pointer flex justify-center items-center  h-10 w-20 bg-primary-dark rounded-2xl bg"
                onClick={() => {
                  signIn();
                }}
              >
                Sing in
              </div>
            )}
            {session && (
              <>
                <Dropdown
                  button={
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="hover:cursor-pointer w-fit flex justify-between justify-items-center  items-center h-14  overflow-hidden"
                    >
                      <div></div>
                      <div className="hover:cursor-pointer flex justify-center items-center  h-10 w-fit pl-2 pr-2 bg-primary-dark rounded-2xl bg">
                        {session.user?.name}
                      </div>
                      <div className="border z-10 hidden rounded-full border-secondary-dark"></div>
                    </motion.div>
                  }
                  classNames={
                    "py-2 left-[-8.7rem] md:bottom-[-15.3rem]  bottom-[-14.6rem]"
                  }
                >
                  <div className=" z-50 ">
                    <div className="ml-auto  z-50 w-[15rem] h-56    text-text-dark border border-secondary-dark   bg-background-dark backdrop-filter backdrop-blur-sm bg-opacity-60">
                      <div
                        onClick={() => {
                          signOut();
                        }}
                        className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-b border-secondary-dark  "
                      >
                        Odhlásit
                      </div>
                      <Link href="/recipe/user/my_recipe">
                        <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-b border-secondary-dark ">
                          Moje
                        </div>
                      </Link>
                      <Link href="/post_recipe">
                        <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-b border-secondary-dark  ">
                          Vytvořit
                        </div>
                      </Link>
                      <Link href="/recipe/user/my_favourites">
                        <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-secondary-dark  ">
                          Oblíbené
                        </div>
                      </Link>
                    </div>
                  </div>
                </Dropdown>
              </>
            )}
          </div>
        </div>
        <div className="z-40">
          <SearchBar></SearchBar>
        </div>
      </div>
    </>
  );
}
