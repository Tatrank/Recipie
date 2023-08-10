"use client";
import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function AddComment({
  recipe,
  user,
}: {
  recipe: string;
  user: string;
}) {
  const [data, setData] = useState({
    commentText: "",
    commentRecipe: recipe,
    commentUser: user,
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/comments", {
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
        // Reset form or handle success in your application
      } else {
        console.error("Error adding comment");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Box p={4}>
      <form>
        <FormControl isRequired>
          <FormLabel>Comment Text</FormLabel>
          <Input
            type="text"
            name="commentText"
            value={data.commentText}
            onChange={handleInputChange}
            placeholder="Enter comment text"
          />
        </FormControl>

        <Button onClick={handleSubmit} mt={4} colorScheme="teal">
          Add Comment
        </Button>
      </form>
    </Box>
  );
}
