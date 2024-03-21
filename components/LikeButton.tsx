"use client";
import { useState, useEffect } from "react";
import { Favourite_add, Favourite_remove } from "./Icons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { IP_ADDRESS } from "@/lib/files";
export default function LikeButton({
  UserID,
  RecipeID,
  NumberLikes,
}: {
  UserID: string;
  NumberLikes: number;
  RecipeID: string;
}) {
  const router = useRouter();
  const [addedLikes, setAddedLike] = useState(false);
  useEffect(() => {
    fetch(
      `http://${IP_ADDRESS}/api/useLike?userID=${UserID}&recipeID=${RecipeID}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAddedLike(res.value);
      });
  }, []);

  return (
    <div
      className="cursor-pointer 
      mx-5
     w-[100px] h-[100px] z-50 "
      onClick={async () => {
        await fetch(
          `http://${IP_ADDRESS}/api/addLike?userID=${UserID}&recipeID=${RecipeID}`
        );
        setAddedLike(!addedLikes);
        router.refresh();
      }}
    >
      {addedLikes ? (
        <AnimatePresence>
          <motion.div
            className="absolute"
            key="something1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Favourite_remove></Favourite_remove>
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div
            className="absolute"
            key="something2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Favourite_add></Favourite_add>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
