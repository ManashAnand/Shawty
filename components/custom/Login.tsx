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
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { login } from "@/actions/action";
import { z } from "zod";
import { BeatLoader } from "react-spinners";
import Error from "./error";
// import useFetch from "@/hooks/use-fetch";
// import {UrlState} from "@/context";

const Login = () => {
  //   let [searchParams] = useSearchParams();
  //   const longLink = searchParams.get("createNew");

  //   const navigate = useNavigate();
  interface FormData {
    email: string;
    password: string;
  }

  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const loading = true;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setErrors([]);
    const schema = z.object({
      email: z.string().email("Email is required").min(5),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });
    const result = schema.safeParse(formData);
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      setErrors(errorMessages);
      console.log(errorMessages);
    } else {
      console.log("Form data is valid:", result.data);
    }
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
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
      <ul className="ml-8"> 
        {errors?.map((item) => {
          return <Error message={item} />;
        })}
      </ul>
    </Card>
  );
};

export default Login;
