"use client";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import { IP_ADDRESS } from "@/lib/files";

export function SimpleRegistrationForm() {
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState<string>("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  async function postData() {
    try {
      if (
        formData.name === "" ||
        formData.email === "" ||
        formData.password === ""
      ) {
        return;
      }
      console.log(formData);
      const response = await fetch(`http://${IP_ADDRESS}/api/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      if (response.ok) {
        const res = await response.json();
        signIn("credentials", {
          username: formData.name,
          password: formData.password,
          callbackUrl: "/all",
        });
      } else {
        console.error("Error adding recipe");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  return (
    <Card color="blue-gray" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Přihlásit se
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Děkujeme za zájem o naše služby.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={(e) => {
          e.preventDefault();
          // Data získaná z formuláře jsou v proměnné formData
          console.log(formData);
          // Zde můžete zavolat funkci pro odeslání dat (postData)
          postData();
        }}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            name="name"
            placeholder="jmeno"
            className=" rounded-lg !border-t-primary-dark bg-secondary-dark placeholder-white text-black focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleInputChange}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            type="email"
            name="email"
            placeholder="name@mail.com"
            className="rounded-lg h-8 !border-t-blue-gray-200 placeholder-white text-black bg-secondary-dark focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleInputChange}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            name="password"
            type="password"
            size="lg"
            placeholder="********"
            className=" h-8 !border-t-blue-gray-200 placeholder-white text-black bg-secondary-dark focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleInputChange}
          />
        </div>

        <Button
          className="mt-6 h-10 bg-accent-dark"
          onClick={() => {
            postData();
          }}
          fullWidth
        >
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-gray-300"
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}
