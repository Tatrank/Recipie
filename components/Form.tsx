"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
export default function Form() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [useableUpload, setUseableUpload] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    difficulty: "",
    description: "",
    time_difficulty: "",
    image_url:
      "https://simply-delicious-food.com/wp-content/uploads/2018/07/mexican-lunch-bowls-6.jpg",
    image_key: "",
    stepByStep: "",
    category: [""],
    groceries_measueres: [["", ""]],
  });
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      email: session?.user?.email,
    }));
  }, [session?.user?.email]);

  async function handleSubmit() {
    try {
      const response = await fetch("http://localhost:3000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      if (response.ok) {
        const res = await response.json();
        router.push(
          `http://localhost:3000/recipe/${res.categories[0].name}/${res.name}/${res.id}`
        );
      } else {
        alert("něco se nepovedlo");
        console.error("Error adding recipe");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name?.split("_")[0] == "category") {
      let copyData = formData.category;
      copyData[parseInt(name.split("_")[1]) as number] = value;
      setFormData((prevData) => ({ ...prevData, category: copyData }));
    } else if (
      name?.split("_")[0] == "value" ||
      name?.split("_")[0] == "grocery"
    ) {
      let copyData = formData.groceries_measueres;

      if (name?.split("_")[0] == "grocery") {
        copyData[parseInt(name.split("_")[1])][0] = value;
      } else {
        copyData[parseInt(name.split("_")[1])][1] = value;
      }

      setFormData((prevData) => ({
        ...prevData,
        groceries_measueres: copyData,
      }));
    } else setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  function addCategory(index: number) {
    if (index + 1 == formData.category.length) {
      setFormData((prevData) => ({
        ...prevData,
        category: [...formData.category, ""],
      }));
    }
  }

  function addGroceriesAndMesuerements(index: number) {
    if (index + 1 == formData.groceries_measueres.length) {
      setFormData((prevData) => ({
        ...prevData,
        groceries_measueres: [...formData.groceries_measueres, ["", ""]],
      }));
    }
  }
  return (
    <Box p={4}>
      <form>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </FormControl>
        {useableUpload ? (
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log(res);
              setUseableUpload(false);
              if (res)
                setFormData((prevData) => ({
                  ...prevData,
                  image_url: res[0].url,
                  image_key: res[0].key,
                }));
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        ) : (
          <>
            <img src={formData.image_url}></img>
            <Button
              onClick={async () => {
                await fetch(
                  `http://localhost:3000/api/deleteImage?imageId=${formData.image_key}`,
                  { method: "DELETE" }
                );
                setUseableUpload(true);
              }}
            >
              Změnit obrázek
            </Button>
          </>
        )}

        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter difficulty of meal"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Difficulty</FormLabel>
          <Input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            placeholder="Enter difficulty of meal"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Time difficulty</FormLabel>
          <Input
            type="text"
            name="time_difficulty"
            value={formData.time_difficulty}
            onChange={handleInputChange}
            placeholder="Enter difficulty of meal"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Step by step</FormLabel>
          <Input
            type="text"
            name="stepByStep"
            value={formData.stepByStep}
            onChange={handleInputChange}
            placeholder="Enter step by step of cooking the meal"
          />
        </FormControl>
        {formData.category.map((item, index) => {
          return (
            <FormControl mt={4} key={index}>
              <FormLabel>Category {index + 1}</FormLabel>
              <Input
                type="text"
                name={`category_${index}`}
                value={formData.category[index]}
                onChange={handleInputChange}
                placeholder="Category"
                onClick={() => {
                  addCategory(index);
                }}
              />
            </FormControl>
          );
        })}
        {formData.groceries_measueres.map((item, index) => {
          return (
            <>
              {" "}
              <FormControl mt={4} display={"inline"} key={index + 0}>
                <FormLabel>Grocery {index + 1}</FormLabel>
                <Input
                  type="text"
                  name={`grocery_${index}`}
                  value={formData.groceries_measueres[index][0]}
                  onChange={handleInputChange}
                  placeholder="Category"
                  onClick={() => {
                    addGroceriesAndMesuerements(index);
                  }}
                />
              </FormControl>
              <FormControl mt={4} display={"inline"} key={index + 1}>
                <FormLabel>Value {index + 1}</FormLabel>
                <Input
                  type="text"
                  name={`value_${index}`}
                  value={formData.groceries_measueres[index][1]}
                  onChange={handleInputChange}
                  placeholder="Category"
                />
              </FormControl>
            </>
          );
        })}
        <Button onClick={handleSubmit} mt={4} colorScheme="teal">
          Submit
        </Button>
      </form>
    </Box>
  );
}
