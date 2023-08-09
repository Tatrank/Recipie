"use client";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FullRecepi } from "@/types";
import { DarkModeColors } from "@/colors/color";
export default function RecepiCard({ data }: { data: FullRecepi }) {
  return (
    <Flex
      as={motion.div}
      wrap="wrap"
      justifyContent="center"
      align="center"
      alignItems="center"
      backgroundColor={DarkModeColors.secondary}
      w="20rem"
      h="27rem"
      color={DarkModeColors.text}
    >
      {data.name}
    </Flex>
  );
}
