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
import { useActionState, useState } from "react";
import { Input } from "../ui/input";
import { login } from "@/actions/action";
import { z } from "zod";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthenticateState } from "@/actions/zustand";

const Login = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const longLink = searchParams.get("createNew");
  interface FormData {
    email: string;
    password: string;
  }

  interface LoginResponse {
    isLoading: Boolean;
    success: boolean;
    error: string;
    data: {};
  }

  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const ToggleLoading = useAuthenticateState((state) => state.ToogleLoading);
  const ToggleAuthenitcation = useAuthenticateState(
    (state) => state.ToogleAuth
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const mutation = useMutation<LoginResponse, Error, FormData>({
    //@ts-ignore
    mutationFn: login, // Define the mutation function here
    onError: (error: Error) => {
      setErrors([error.message || "Login failed. Please try again."]);
    },
  });

  const handleLogin = async () => {
    setErrors([]);
    ToggleLoading(true);

    const schema = z.object({
      email: z
        .string()
        .email("Invalid email address")
        .min(5, "Email is required"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const result = schema.safeParse(formData);

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      setErrors(errorMessages);
      console.log(errorMessages);
    } else {
      try {
        const response = await mutation.mutateAsync(formData);

        if (!response.success) {
          setErrors([response.error || "Login failed."]);
          return;
        }

        ToggleLoading(false);
        ToggleAuthenitcation(true);
        console.log(response.data);
        router.push(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      } catch (error) {
        console.log("An unexpected error occurred:", error);
      }
    }
    ToggleLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
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
      </CardContent>
      <CardFooter>
        {/* @ts-ignore */}
        <Button onClick={handleLogin} disabled={mutation.isLoading}>
          {/* @ts-ignore */}
          {mutation.isLoading ? (
            <BeatLoader size={10} color="#36d7b7" />
          ) : (
            "Login"
          )}
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

export default Login;
