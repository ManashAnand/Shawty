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
import { create } from "zustand";
import { useAuthenticateState } from "@/actions/zustand";

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const longLink = searchParams.get("createNew");

  const ToggleLoading = useAuthenticateState((state) => state.ToogleLoading);
  const ToggleAuthenitcation = useAuthenticateState(
    (state) => state.ToogleAuth
  );
  const ToggleUser = useAuthenticateState(state => state.ToogleUser)

  const supabase = createClientComponentClient();

  interface FormData {
    email: string;
    password: string;
    name: string;
    profile_pic?: File | null;
  }

  const uploadFile = async (file: any) => {
    const bucket = "profile_pic";
    console.log(file);
    if (!file) {
      alert("please select file");
      ToggleLoading(false)
      return;
    }
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    if (error) {
      // @ts-ignore
      setErrors(error.message);
      console.log(error);
      return {data:error,success: false};
    }
    console.log(data);
    return {data,success:true};
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
    // console.log(name, value, files);
  };

  const handleSignup = async () => {
    setErrors([]);

    const schema = z.object({
      email: z
        .string()
        .email("Invalid email address")
        .min(5, "Email is required"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      name: z.string().min(2, "Name is too short"),
    });

    const result = schema.safeParse(formData);
    console.log(formData);
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      setErrors(errorMessages);
    } else {
      try {
        ToggleLoading(true);
        console.log(formData);
        const fileData = await uploadFile(formData.profile_pic);
        if(!fileData?.success){
          // @ts-ignore
          alert(fileData?.error?.message ?? "Same image exists")
          return
        }
        // @ts-ignore

        const filePathUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileData?.data?.fullPath}`;
        // console.log(formDataToSend)
        const {name,email,password} = formData
        const newFormData = new FormData()
        newFormData.append("name",name)
        newFormData.append("email",email)
        newFormData.append("password",password)
        console.log(formData)
        // console.log(newFormData)
        // return
        // @ts-ignore
        const response = await signup(newFormData, filePathUrl);
        console.log(response);
        // const result = await response.json();

        if (!result.success) {
          // @ts-ignore
          setErrors([result.error || "Signup failed."]);
          return;
        }

        if (result.success){
          console.log("User created");
          ToggleAuthenitcation(true)
          ToggleUser(result.success)
        }
          

        ToggleLoading(false);
        router.push(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      } catch (error) {
        console.log("An unexpected error occurred:", error);

        ToggleLoading(false);
      } finally {
        ToggleLoading(false);
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
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
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
