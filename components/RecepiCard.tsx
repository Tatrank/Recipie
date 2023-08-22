"use client";

import { FullRecepi } from "@/types";
import { useState } from "react";
import { motion } from "framer-motion";
export default function RecepiCard({ data }: { data: FullRecepi }) {
  const [showData, setShowData] = useState(false);
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      whileHover={{ rotateY: 180 }}
      onMouseOver={() => {
        setTimeout(() => {
          setShowData(true);
        }, 200);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setShowData(false);
        }, 200);
      }}
      className="md:w-[400px] w-[375px] rounded-3xl  h-[600px] border-4 overflow-hidden"
    >
      <div
        style={{
          backgroundImage: `url(${data.image_url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="h-full w-full"
      >
        {!showData ? (
          <motion.div className="flex p-4 flex-col items-center justify-between h-full w-full bg-primary-dark  backdrop-filter backdrop-blur-sm bg-opacity-50">
            <div className="w-full h-20 p-2 text-4xl">{data.likes.length}</div>
            <div className="flex  justify-items-center items-center w-full  p-2 text-white text-5xl">
              {data.name}
            </div>
            <div
              className=" flex justify-center items-center text-white text-md
          w-40 h-10 bg-primary-dark rounded-2xl opacity-80"
            >
              {data.categories[0].name}
            </div>
          </motion.div>
        ) : (
          <div className="rotate flex p-5 flex-col justify-evenly items-center  h-full w-full bg-primary-dark  backdrop-filter backdrop-blur-sm bg-opacity-75">
            <div className="flex  items-center text-white w-full h-1/5 p-2 text-5xl">
              {data.name}
            </div>
            <div className="flex flex-col justify-between  w-full h-[28%] p-2 text-white text-5xl">
              <div className="flex justify-center text-[2rem] items-center  bg-background-dark w-fit px-5 rounded-full h-16">
                {data.time_difficulty}
              </div>
              <div className="flex justify-center text-[2rem] items-center  w-fit px-5 rounded-full h-16  bg-background-dark ">
                {data.difficulty}
              </div>
            </div>
            <div
              className="overflow-hidden flex   text-white text-md
          w-full h-1/3 p-4 text-xl rounded-2xl opacity-80"
            >
              {data.description}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
