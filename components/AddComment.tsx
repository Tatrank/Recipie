"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion";
import { IP_ADDRESS } from "@/lib/files";
import { SendIcon } from "@/components/Icons";
export default function AddComment({
  recipe,
  user,
  userName,
  userImage,
}: {
  recipe: string;
  user: string;
  userName: string;
  userImage: string;
}) {
  const router = useRouter();
  const [data, setData] = useState({
    commentText: "",
    commentRecipe: recipe,
    commentUser: user,
  });

  const handleSubmit = async () => {
    if (data.commentText == "") {
      alert("Nejdřív něco napište");
      return;
    }
    try {
      const response = await fetch(`http://${IP_ADDRESS}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: data.commentText,
          recipe: data.commentRecipe,
          user: data.commentUser,
        }),
      });

      if (response.ok) {
        console.log("Comment added successfully");
        router.refresh();
      } else {
        alert("někde nastala chyba");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-wrap my-4 bg-primary-dark w-full border-2 border-secondary-dark p-5 h-fit rounded-3xl">
      <div className="flex mb-3 w-full justify-between items-center">
        <div className=" flex justify-between justify-items-center items-center h-14 w-[14rem] overflow-hidden">
          <div></div>
          <div className="border absolute z-10 rounded-full border-secondary-dark">
            <img className="w-12 h-12 rounded-full " src={userImage}></img>
          </div>
          <div
            onClick={() => {
              router.push("/recipe/user/my_recipe");
            }}
            className="w-[13rem] hover:cursor-pointer  h-9 flex justify-end p-3 rounded-2xl z-0 text-lg items-center bg-background-dark"
          >
            {userName}
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="md:p-4 p-2 rounded-3xl text-xl md:text-3xl hover:cursor-pointer"
          onClick={handleSubmit}
        >
          <SendIcon />
        </motion.div>
      </div>
      <TextareaAutosize
        onChange={(e) => {
          const { name, value } = e.target;
          setData((prevData) => ({ ...prevData, [name]: value }));
        }}
        placeholder="Vyjádřete se"
        name="commentText"
        className="w-full min-h-[6 rem] rounded-lg text-2xl h-fit p-7 bg-background-dark "
      ></TextareaAutosize>
    </div>
  );
}
