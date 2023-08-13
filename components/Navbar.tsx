"use client";
import { Flex, ChakraProvider, Box } from "@chakra-ui/react";
import Dropdown from "./Dropdown";
import { SearchBar } from "./SearchBar";
import { signIn, signOut, useSession } from "next-auth/react";
import CategoryBar from "./CategoryBar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
export default function Navbar() {
  const { data: session, status } = useSession();
  const [showCategory, setShowCategory] = useState<boolean>(false);
  return (
    <>
      <div className="z-50 sticky top-0 ml-auto">
        <motion.div
          initial={{ left: "-20rem" }}
          animate={{ left: !showCategory ? "-20rem" : "0" }}
          className="absolute  w-72 overflow-y-auto h-screen  bg-black
backdrop-filter backdrop-blur-lg bg-opacity-10"
        >
          <CategoryBar></CategoryBar>
        </motion.div>
      </div>
      <div className="z-50 flex justify-between justify-items-center items-center px-5 top-0 h-20 text-text-light  dark:text-text-dark w-[100%] border-b dark:border-secondary-dark  border-secondary-light bg-background-dark sticky backdrop-filter backdrop-blur-lg bg-opacity-60 ">
        <div className="flex justify-between justify-items-center items-center h-14 w-[10rem]">
          <div
            className="flex items-center flex-col justify-evenly h-10"
            onClick={() => {
              setShowCategory(!showCategory);
              console.log(showCategory);
            }}
          >
            <div className=" w-[2rem] bg-primary-dark h-1.5 rounded-sm"></div>
            <div className="w-[2rem] bg-primary-dark h-1.5 rounded-sm"></div>
            <div className="w-[2rem] bg-primary-dark h-1.5 rounded-sm"></div>
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
                  <div className="hover:cursor-pointer flex justify-between justify-items-center items-center h-14 w-[14rem] overflow-hidden">
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
                  </div>
                }
                children={
                  <div className=" z-50 ">
                    <div className="ml-auto  z-50 w-[15rem] h-44  text-text-light  dark:text-text-dark border-t-0 border dark:border-secondary-dark  border-secondary-light bg-background-dark backdrop-filter backdrop-blur-sm bg-opacity-60">
                      <div
                        onClick={() => {
                          signOut();
                        }}
                        className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/3 border-b dark:border-secondary-dark  border-secondary-light"
                      >
                        Odhlásit
                      </div>
                      <Link href="/recipe/user/my_recipe">
                        <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/3 border-b dark:border-secondary-dark  border-secondary-light">
                          Moje
                        </div>
                      </Link>
                      <Link href="/post_recipe">
                        <div className="hover:cursor-pointer flex justify-center items-center text-xl w-full h-1/3 dark:border-secondary-dark  border-secondary-light">
                          Vytvořit
                        </div>
                      </Link>
                    </div>
                  </div>
                }
                classNames={"py-2 left-1 bottom-[-12.3rem] "}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
