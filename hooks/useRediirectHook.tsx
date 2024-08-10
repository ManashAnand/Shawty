"use client";


import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthenticateState } from "@/actions/zustand";
import { useRouter } from "next/navigation";

export const useRedirectTo = () => {
  const router = useRouter();
  const isAuthenticated = useAuthenticateState((state) => state.isAuthenticatad);
  const searchParams = useSearchParams();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/auth?${longLink ? `createNew=${longLink}` : ""}`);
    } 
  }, [isAuthenticated, router, longLink]);
};
