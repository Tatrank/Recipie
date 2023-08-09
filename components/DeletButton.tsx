"use client";
import { Box } from "@chakra-ui/react";
export default function DeleteButton({ id }: { id: string }) {
  console.log(id);
  return (
    <Box
      backgroundColor={"white"}
      onClick={() => {
        fetch(`http://localhost:3000/api/userRecipe?id=${id}`, {
          method: "DELETE",
        });
      }}
    >
      Delete
    </Box>
  );
}
