"use client";
// components/Form.tsx

import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { motion } from "framer-motion";
import Alert from "./Alert";
import { IP_ADDRESS } from "@/lib/files";
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
  const [alert, setAlert] = useState(false);
  const [post, setPost] = useState(false);
  const [alertText, setAlertText] = useState<string>("");
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
    setPost(true);
    // Check if any required input fields are empty
    if (
      formData.name === "" ||
      formData.difficulty === "" ||
      formData.description === "" ||
      formData.time_difficulty === "" ||
      formData.stepByStep === "" ||
      formData.category[0] == "" ||
      formData.groceries_measueres[0][0] === "" ||
      formData.groceries_measueres[0][1] === ""
    ) {
      setPost(false);
      setAlert(true);
      setAlertText("Vyplňte všechna pole");
      return;
    }
    if (formData.name.length >= 25) {
      setPost(false);
      setAlert(true);
      setAlertText("Zkraťte jméno receptu");
      return;
    }
    if (formData.difficulty.length >= 25) {
      setAlert(true);
      setPost(false);
      setAlertText("Zkraťte obtížnost receptu");
      return;
    }
    if (formData.description.length >= 200) {
      setPost(false);
      setAlert(true);
      setAlertText("Zkraťte obsah receptu");
      return;
    }
    if (formData.time_difficulty.length >= 20) {
      setPost(false);
      setAlert(true);
      setAlertText("Zkraťte délku času receptu");
      return;
    }

    if (formData.stepByStep.length >= 1000) {
      setPost(false);
      setAlert(true);
      setAlertText("Zkraťte délku receptu");
      return;
    }

    if (formData.category.length >= 6) {
      setPost(false);
      setAlert(true);
      setAlertText("Hodně kategorií");
      return;
    }
    if (formData.groceries_measueres.length >= 30) {
      setPost(false);
      setAlert(true);
      setAlertText("Hodně surovin");
      return;
    }
    try {
      const response = await fetch(`http://${IP_ADDRESS}/api/create`, {
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
          `http://${IP_ADDRESS}/recipe/${res.categories[0].name}/${res.name}/${res.id}`
        );
      } else {
        setAlert(true);
        setAlertText("něco se nepovedlo");
        console.error("Error adding recipe");
      }
    } catch (error) {
      setAlert(true);
      setAlertText("něco se nepovedlo");
      console.error("An error occurred:", error);
    }
    setPost(false);
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
    if (formData.category.length > 6) {
      console.log("hey");
      return;
    }
    if (index + 1 === formData.category.length) {
      setFormData((prevData) => ({
        ...prevData,
        category: [...formData.category, ""],
      }));
    }
  }

  function addGroceriesAndMesuerements(index: number) {
    if (formData.groceries_measueres.length >= 30) {
      return;
    }
    if (index + 1 === formData.groceries_measueres.length) {
      setFormData((prevData) => ({
        ...prevData,
        groceries_measueres: [...formData.groceries_measueres, ["", ""]],
      }));
    }
  }

  return (
    <>
      <div
        onClick={() => {
          setAlert(false);
        }}
        className="pointer sticky block  w-full top-72 md:top-40 left-0 "
      >
        <div className="absolute ">
          {" "}
          <Alert text={alertText} visibility={alert}></Alert>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center justify-center w-[1000px]">
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
              placeholder="Zadejejte jméno pokrmu"
              className="w-full
              rounded-lg !border-t-primary-dark bg-secondary-dark placeholder-white text-black focus:!border-t-gray-900"
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
                setAlert(true);
                setAlertText(`ERROR! ${error.message}`);
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
                    `http://${IP_ADDRESS}/api/deleteImage?imageId=${formData.image_key}`,
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
            <label className="block font-bold">Popis</label>
            <TextareaAutosize
              name="description"
              value={formData.description}
              onChange={(e) => {
                const { value, name } = e.target;
                setFormData((prevData) => ({ ...prevData, [name]: value }));
              }}
              placeholder="Zadejte stručný popis jídla"
              className="w-full min-h-[10rem] rounded-lg !border-t-primary-dark bg-secondary-dark placeholder-white text-black focus:!border-t-gray-900"
              required
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-4"
          >
            <label className="block font-bold">Obtížnost</label>
            <input
              type="text"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              placeholder="Zadejte obtížnost jídla"
              className="w-full
              rounded-lg !border-t-primary-dark bg-secondary-dark placeholder-white text-black focus:!border-t-gray-900"
              required
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-4"
          >
            <label className="block font-bold">Čas potřebný k přípravě</label>
            <input
              type="text"
              name="time_difficulty"
              value={formData.time_difficulty}
              onChange={handleInputChange}
              placeholder="Zadejte časovou obtížnost jídla"
              className="w-full
              rounded-lg !border-t-primary-dark bg-secondary-dark placeholder-white text-black focus:!border-t-gray-900"
              required
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-4"
          >
            <label className="block font-bold">Krok za krokem</label>
            <TextareaAutosize
              className="w-full min-h-[15rem] rounded-lg !border-t-primary-dark bg-secondary-dark placeholder-white text-black focus:!border-t-gray-900"
              name="stepByStep"
              value={formData.stepByStep}
              onChange={(e) => {
                const { value, name } = e.target;
                setFormData((prevData) => ({ ...prevData, [name]: value }));
              }}
              placeholder="Zadejte postup k přípravě vašeho receptu"
              required
            />
          </motion.div>
          <div className="my-20">
            {formData.category.map((item, index) => (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-4"
                key={index}
              >
                <label className="block font-bold">
                  {index + 1}. Kategorie
                </label>
                <input
                  type="text"
                  name={`category_${index}`}
                  value={formData.category[index]}
                  onChange={handleInputChange}
                  placeholder="Kategorie"
                  onClick={() => {
                    addCategory(index);
                  }}
                  className="w-full
                  rounded-lg !border-t-primary-dark bg-secondary-dark placeholder-white text-black focus:!border-t-gray-900"
                  required
                />
              </motion.div>
            ))}
          </div>
          <div className="my-20">
            {formData.groceries_measueres.map((item, index) => (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-4"
                key={index}
              >
                <label className="block font-bold mt-4">
                  {index + 1}. Ingredience
                </label>
                <input
                  type="text"
                  name={`grocery_${index}`}
                  value={formData.groceries_measueres[index][0]}
                  onChange={handleInputChange}
                  placeholder="Sem zadejte pouze název potřebné ingredience, množství pak do kolonky množství"
                  onClick={() => {
                    addGroceriesAndMesuerements(index);
                  }}
                  className="w-full
                  rounded-lg !border-t-primary-dark bg-secondary-dark placeholder-white text-black focus:!border-t-gray-900"
                  required
                />
                <label className="block font-bold">
                  Množství {index + 1}. ingredience
                </label>
                <input
                  type="text"
                  name={`value_${index}`}
                  value={formData.groceries_measueres[index][1]}
                  onChange={handleInputChange}
                  placeholder="Množství"
                  className="w-full
                  rounded-lg !border-t-primary-dark bg-secondary-dark placeholder-white text-black focus:!border-t-gray-900"
                  required
                />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center w-full">
            <motion.button
              disabled={post}
              whileHover={{ scale: 1.08 }}
              onClick={handleSubmit}
              className="mt-4 m-auto py-8  text-4xl px-16  bg-primary-dark rounded"
            >
              Odeslat
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
