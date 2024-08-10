"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { signup } from "@/actions/action";
import { create } from 'zustand'
import { useAuthenticateState } from "@/actions/zustand";

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const longLink = searchParams.get("createNew");

  const ToggleLoading = useAuthenticateState(state => state.ToogleLoading)
  const mainLoading = useAuthenticateState(state => state.loading)
  const supabase = createClientComponentClient();

  if(mainLoading) return "Loading...."
  interface FormData {
    email: string;
    password: string;
    name: string;
    profile_pic: File | null;
  }



  const uploadFile = async (file: any) => {
    // const file = event.target.files[0];
    const bucket = "profile_pic";

    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    // Handle error if upload failed
    if (error) {
      // alert("Error uploading file.");
      // @ts-ignore
      setErrors(error.message);
      console.log(error)
      return;
    }

    // alert('File uploaded successfully!');
    console.log(data);
    return data;
  };

  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignup = async () => {
    setErrors([]);
    ToggleLoading(true)

    const schema = z.object({
      email: z
        .string()
        .email("Invalid email address")
        .min(5, "Email is required"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      name: z.string().min(2, "Name is too short"),
    });

    const result = schema.safeParse(formData);

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      setErrors(errorMessages);
    } else {
      try {
        const formDataToSend = new FormData();
        const {name,email,password} = formData
        formDataToSend.append("name", name);
        formDataToSend.append("email", email);
        formDataToSend.append("password", password);
        const fileData = await uploadFile(formData.profile_pic);
        // @ts-ignore
        const filePathUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileData?.fullPath}`;
        // console.log(formDataToSend)
        // @ts-ignore
        const response = await signup(formDataToSend, filePathUrl);
        console.log(response)
        // @ts-ignore
        // const result = await response.json();

        // if (!result.success) {
        //   setErrors([result.error || "Signup failed."]);
        //   return;
        // }

        // router.push(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      } catch (error) {
        console.log("An unexpected error occurred:", error);
      } finally {
        ToggleLoading(false)
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven't already
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-1">
          <Input name="profile_pic" type="file" accept="image/*" />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup} disabled={false}>
          {false ? <BeatLoader size={10} color="#36d7b7" /> : "Create Account"}
        </Button>
      </CardFooter>
      <ul className="ml-8">
        {errors.map((item, index) => (
          <Error key={index} message={item} />
        ))}
      </ul>
    </Card>
  );
};

export default Signup;
