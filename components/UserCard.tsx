"use client";

import { FullRecepi, UserType } from "@/types";
import { use, useState } from "react";
import { motion } from "framer-motion";
export default function UserCard({ data }: { data: UserType }) {
  console.log(data);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.2 }}
      className="md:w-[400px] w-[375px] rounded-3xl  h-[600px] border-4 overflow-hidden"
    >
      <div
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="h-full w-full"
      >
        <motion.div className="flex p-4 flex-col items-center justify-center h-full w-full bg-primary-dark  backdrop-filter backdrop-blur-sm bg-opacity-70">
          <div className="w-full flex justify-center items-center h-20 p-2 text-4xl">
            {data.name}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
