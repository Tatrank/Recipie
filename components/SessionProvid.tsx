"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
export default function SessionProvid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </SessionProvider>
  );
}
