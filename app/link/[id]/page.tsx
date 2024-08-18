"use client";
import { getLongUrl, storeClicks } from "@/actions/apiUrls";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { ClockLoader } from "react-spinners";
import { toast } from "sonner";

const RedirectLink = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  // console.log(id)

  const redirect = async () => {
    const redirectResponse = await getLongUrl(id);
    console.log(redirectResponse);
    if (redirectResponse.success) {
      // @ts-ignore
      const { original_url } = redirectResponse.data;
      // @ts-ignore

      const { success } = await storeClicks({ id, original_url });
      if (success) {
        router.push(original_url);
      }
    } else {
      toast("Error in generateing Link");
    }
  };

  useEffect(() => {
    redirect();
  }, []);
  return (
    <div className="flex justify-center items-center h-full w-full">
      <ClockLoader color="#fff" size={50} />
    </div>
  );
};

export default RedirectLink;
