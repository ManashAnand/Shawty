"use client";


import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthenticateState } from "@/actions/zustand";
import { useRouter } from "next/navigation";

export const useRedirectTo = (from : string,to :string) => {
  const router = useRouter();
  const isAuthenticated = useAuthenticateState((state) => state.isAuthenticatad);
  const searchParams = useSearchParams();
  const longLink = searchParams.get("createNew");   
  console.log(isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated && from==="dashboard") {
      router.push(`/${to}?${longLink ? `createNew=${longLink}` : ""}`);
    } 
  }, [isAuthenticated, router, longLink]);
};
