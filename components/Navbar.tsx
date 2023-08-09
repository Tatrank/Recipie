"use client";
import { Flex, ChakraProvider, Box } from "@chakra-ui/react";
import { DarkModeColors } from "@/colors/color";
import { SearchBar } from "./SearchBar";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <ChakraProvider>
      <Flex
        w="100%"
        height="6rem"
        justifyContent="space-between"
        alignItems="center"
        justifyItems="center"
        padding="2rem"
        bg={DarkModeColors.secondary}
        color={DarkModeColors.text}
      >
        <Flex>
          <Link href="/"> domů</Link>
          <Link href="/all"> all</Link>
        </Flex>
        <SearchBar></SearchBar>
        <Flex>
          {!session && (
            <h1
              onClick={() => {
                signIn();
              }}
            >
              sing in
            </h1>
          )}
          {session && [
            session.user?.name,
            <h1
              key="1"
              onClick={() => {
                signOut();
              }}
            >
              dssd
            </h1>,
          ]}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
