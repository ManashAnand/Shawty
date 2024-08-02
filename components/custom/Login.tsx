"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {Button} from "../ui/button";
import {useEffect, useState} from "react";
import { Input } from "../ui/input";
import { login } from "@/actions/action";
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
  

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

//   const {loading, error, fn: fnLogin, data} = useFetch(login, formData);
//   const {fetchUser} = UrlState();

//   useEffect(() => {
//     if (error === null && data) {
//       fetchUser();
//       navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [error, data]);

  const handleLogin = async () => {
    console.log(formData)

    const pass = await login(formData)
    console.log(pass)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
        {/* {error && <Error message={error.message} />} */}
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
        {/* {errors.email && <Error message={errors.email} />} */}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {/* {errors.password && <Error message={errors.password} />} */}
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {/* {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"} */}
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;