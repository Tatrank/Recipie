"use client";
import { Box } from "@chakra-ui/react";
export default function LikeButton({
  UserID,
  RecipeID,
  NumberLikes,
}: {
  UserID: string;
  NumberLikes: number;
  RecipeID: string;
}) {
  return (
    <Box
      color={"white"}
      onClick={() => {
        fetch(
          `http://localhost:3000/api/addLike?userID=${UserID}&recipeID=${RecipeID}`
        );
      }}
    >
      Likes {NumberLikes}
    </Box>
  );
}
