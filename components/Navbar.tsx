"use client";

import Dropdown from "./Dropdown";
import { SearchBar } from "./SearchBar";
import { signIn, signOut, useSession } from "next-auth/react";
import CategoryBar from "./CategoryBar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { position } from "@chakra-ui/react";
export default function Navbar() {
  const { data: session, status } = useSession();
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [x, setX] = useState(false);
  return (
    <>
      <div className="z-50 sticky top-0 ml-auto">
        <motion.div
          initial={{ left: "-20rem" }}
          animate={{ left: !showCategory ? "-20rem" : "0" }}
          className="absolute  w-72 overflow-y-auto overflow-x-hidden h-screen  bg-black
backdrop-filter backdrop-blur-lg bg-opacity-10"
        >

          <CategoryBar></CategoryBar>
        </motion.div>
      </div>
      <div className="z-50 flex justify-between justify-items-center items-center px-5 top-0 h-20 text-text-light  dark:text-text-dark w-[100%] border-b dark:border-secondary-dark  border-secondary-light bg-background-dark sticky backdrop-filter backdrop-blur-lg bg-opacity-60 ">
        <div className="flex justify-between justify-items-center items-center h-14 w-[10rem]">
          <div
            className="flex cursor-pointer items-center flex-col justify-evenly h-10"
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
              className=" w-[2rem] bg-primary-dark h-1.5 rounded-sm"
            ></motion.div>
            <motion.div
              animate={{
                visibility: x ? "hidden" : "visible",
                position: x ? "absolute" : "static",
              }}
              className="w-[2rem] bg-primary-dark h-1.5 rounded-sm"
            ></motion.div>
            <motion.div
              animate={{
                rotate: x ? -45 : 0,
                position: x ? "relative" : "static",
                top: x ? -5 : 0,
              }}
              className="w-[2rem] bg-primary-dark h-1.5 rounded-sm"
            ></motion.div>
          </div>
          <div className="text-4xl">
            <Link href="/all">ReciPie</Link>
          </div>
        </div>
        <SearchBar></SearchBar>
        <div className="flex">
          {!session && (
            <div
              className="hover:cursor-pointer flex justify-center items-center h-10 w-20 bg-primary-dark rounded-2xl bg"
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
                    className="hover:cursor-pointer flex justify-between justify-items-center items-center h-14 w-[14rem] overflow-hidden"
                  >
                    <div></div>
                    <div className="w-[13rem] absolute h-9 flex p-3 rounded-2xl z-0 text-lg items-center bg-primary-dark">
                      {session.user?.name}
                    </div>
                    <div className="border z-10 rounded-full border-secondary-dark">
                      <img
                        className="w-12 h-12 rounded-full "
                        src={session.user?.image!}
                      ></img>
                    </div>
                  </motion.div>
                }
                children={
                  <div className=" z-50 ">
                    <div className="ml-auto  z-50 w-[15rem] h-56  text-text-light  dark:text-text-dark border-t-0 border dark:border-secondary-dark  border-secondary-light bg-background-dark backdrop-filter backdrop-blur-sm bg-opacity-60">
                      <div
                        onClick={() => {
                          signOut();
                        }}
                        className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-b dark:border-secondary-dark  border-secondary-light"
                      >
                        Odhlásit
                      </div>
                      <Link href="/recipe/user/my_recipe">
                        <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-b dark:border-secondary-dark  border-secondary-light">
                          Moje
                        </div>
                      </Link>
                      <Link href="/post_recipe">
                        <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 border-b dark:border-secondary-dark  border-secondary-light">
                          Vytvořit
                        </div>
                      </Link>
                      <Link href="/recipe/user/my_favourites">
                        <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/4 dark:border-secondary-dark  border-secondary-light">
                          Oblíbené
                        </div>
                      </Link>
                    </div>
                  </div>
                }
                classNames={"py-2 left-1 bottom-[-15.3rem] "}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
