"use client";
import { useState, useEffect } from "react";
import { Favourite_add, Favourite_remove } from "./Icons";
import { useRouter } from "next/navigation";
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
      `http://localhost:3000/api/useLike?userID=${UserID}&recipeID=${RecipeID}`
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
      className="absolute top-[22rem] right-[500px]
     w-[100px] h-[100px] z-50 "
      onClick={async () => {
        await fetch(
          `http://localhost:3000/api/addLike?userID=${UserID}&recipeID=${RecipeID}`
        );
        setAddedLike(!addedLikes);
        router.refresh();
      }}
    >
      {addedLikes ? (
        <Favourite_remove></Favourite_remove>
      ) : (
        <Favourite_add></Favourite_add>
      )}
    </div>
  );
}
