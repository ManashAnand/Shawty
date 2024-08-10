"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useSearchParams } from "next/navigation";
import Login from "@/components/custom/Login";
import Signup from "@/components/custom/Signup";
import { useAuthenticateState } from "@/actions/zustand";
import { CircleLoader } from "react-spinners";
import { useRedirectTo } from "@/hooks/useRediirectHook";

const auth = () => {
  // const searchParams = "manash";
  useRedirectTo("auth","dashboard")
  
  const searchParams = useSearchParams();

  
  const mainLoading = useAuthenticateState(state => state.loading)

  if(mainLoading) return <div className="w-full flex justify-center items-center min-h-screen">
            <CircleLoader size={50} color="#36d7b7" /></div>
  return (
    <>
      <div className="mt-36 flex flex-col items-center gap-10">
        <h1 className="text-5xl font-extrabold">
          {searchParams?.get("createNew")
            ? "Hold up! Let's login first.."
            : "Login / Signup"}
        </h1>
        <Tabs defaultValue="login" className="w-[400px] border-2 border-white/25 p-2 rounded-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login /> 
          </TabsContent>
          <TabsContent value="signup">
            <Signup /> 
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default auth;
