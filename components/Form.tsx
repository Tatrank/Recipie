"use client";
// components/Form.tsx

import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { motion } from "framer-motion";
interface FormData {
  name: string;
  difficulty: string;
  description: string;
  time_difficulty: string;
  image_url: string;
  image_key: string;
  stepByStep: string;
  category: string[];
  groceries_measueres: [string, string][];
}

export default function Form(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [useableUpload, setUseableUpload] = useState(true);
  const [formData, setFormData] = useState<FormData>({
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Check if any required input fields are empty
    if (formData.name === "" || formData.difficulty === "") {
      alert("Please fill in required fields.");
      return;
    }

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name?.split("_")[0] === "category") {
      let copyData = [...formData.category];
      copyData[parseInt(name.split("_")[1])] = value;
      setFormData((prevData) => ({ ...prevData, category: copyData }));
    } else if (
      name?.split("_")[0] === "value" ||
      name?.split("_")[0] === "grocery"
    ) {
      let copyData = [...formData.groceries_measueres];

      if (name?.split("_")[0] === "grocery") {
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
    if (index + 1 === formData.category.length) {
      setFormData((prevData) => ({
        ...prevData,
        category: [...formData.category, ""],
      }));
    }
  }

  function addGroceriesAndMesuerements(index: number) {
    if (index + 1 === formData.groceries_measueres.length) {
      setFormData((prevData) => ({
        ...prevData,
        groceries_measueres: [...formData.groceries_measueres, ["", ""]],
      }));
    }
  }

  return (
    <div className="p-4 flex justify-center w-[1000px]">
      <div className="w-full  ">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-4"
        >
          <label className="block font-bold">Jméno</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Zadejejte svoje jméno"
            className="w-full
 bg-background-dark rounded border-secondary-dark bg-opacity-0 p-2"
            required
          />
        </motion.div>
        {useableUpload ? (
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
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
              alert(`ERROR! ${error.message}`);
            }}
          />
        ) : (
          <div className="w-full flex flex-col justify-between items-center">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              src={formData.image_url}
              alt="Recipe"
            />
            <motion.button
              whileHover={{ scale: 1.3 }}
              onClick={async () => {
                await fetch(
                  `http://localhost:3000/api/deleteImage?imageId=${formData.image_key}`,
                  { method: "DELETE" }
                );
                setUseableUpload(true);
              }}
              className="w-24
bg-primary-dark rounded p-2 mt-2 cursor-pointer"
            >
              Změnit obrázek
            </motion.button>
          </div>
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-4"
        >
          <label className="block font-bold">Description</label>
          <TextareaAutosize
            name="description"
            value={formData.description}
            onChange={(e) => {
              const { value, name } = e.target;
              setFormData((prevData) => ({ ...prevData, [name]: value }));
            }}
            placeholder="Enter difficulty of meal"
            className="w-full min-h-[10rem] bg-background-dark rounded border-secondary-dark bg-opacity-0 p-2"
            required
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-4"
        >
          <label className="block font-bold">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            placeholder="Enter difficulty of meal"
            className="w-full
 bg-background-dark rounded border-secondary-dark bg-opacity-0 p-2"
            required
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-4"
        >
          <label className="block font-bold">Time difficulty</label>
          <input
            type="text"
            name="time_difficulty"
            value={formData.time_difficulty}
            onChange={handleInputChange}
            placeholder="Enter time difficulty of meal"
            className="w-full
 bg-background-dark rounded border-secondary-dark bg-opacity-0 p-2"
            required
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-4"
        >
          <label className="block font-bold">Step by step</label>
          <TextareaAutosize
            className="w-full min-h-[15rem] bg-background-dark rounded border-secondary-dark bg-opacity-0 p-2"
            name="stepByStep"
            value={formData.stepByStep}
            onChange={(e) => {
              const { value, name } = e.target;
              setFormData((prevData) => ({ ...prevData, [name]: value }));
            }}
            placeholder="Enter step by step of cooking the meal"
            required
          />
        </motion.div>
        {formData.category.map((item, index) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-4"
            key={index}
          >
            <label className="block font-bold">Category {index + 1}</label>
            <input
              type="text"
              name={`category_${index}`}
              value={formData.category[index]}
              onChange={handleInputChange}
              placeholder="Category"
              onClick={() => {
                addCategory(index);
              }}
              className="w-full
 bg-background-dark rounded border-secondary-dark bg-opacity-0 p-2"
              required
            />
          </motion.div>
        ))}
        {formData.groceries_measueres.map((item, index) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-4"
            key={index}
          >
            <label className="block font-bold">Grocery {index + 1}</label>
            <input
              type="text"
              name={`grocery_${index}`}
              value={formData.groceries_measueres[index][0]}
              onChange={handleInputChange}
              placeholder="Grocery"
              onClick={() => {
                addGroceriesAndMesuerements(index);
              }}
              className="w-full
 bg-background-dark rounded border-secondary-dark bg-opacity-0 p-2"
              required
            />
            <label className="block font-bold">Value {index + 1}</label>
            <input
              type="text"
              name={`value_${index}`}
              value={formData.groceries_measueres[index][1]}
              onChange={handleInputChange}
              placeholder="Value"
              className="w-full
 bg-background-dark rounded border-secondary-dark bg-opacity-0 p-2"
              required
            />
          </motion.div>
        ))}
        <div className="flex justify-center w-full">
          <motion.button
            whileHover={{ scale: 1.08 }}
            onClick={handleSubmit}
            className="mt-4 m-auto py-8  text-4xl px-16  bg-primary-dark rounded"
          >
            Submit
          </motion.button>
        </div>
      </div>
    </div>
  );
}
