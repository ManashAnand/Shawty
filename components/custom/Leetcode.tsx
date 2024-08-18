"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  getLeetCodeStats,
  putLeetCodeStats,
  updateLeetCodeStats,
} from "@/actions/extraLinks";
import { toast } from "sonner";
import { useAuthenticateState } from "@/actions/zustand";
import { LeetCodeInterface } from "@/actions/interfaces";
import { SiLeetcode } from "react-icons/si";
import { useRouter } from "next/navigation";
import { ViewIcon } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QRCode } from "react-qrcode-logo";

const Leetcode = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [leetCode, setLeetCode] = useState<LeetCodeInterface | null>(null);
  const user = useAuthenticateState((state) => state.user);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const ref = useRef();

  const handleUpdate = async () => {
    setLoading(true);
    const resLeet = await updateLeetCodeStats(username, user?.user?.id);
    // console.log(data)
    if (resLeet && !resLeet.success) {
      // @ts-ignore
      toast(resLeet?.errorMessage);
      setLoading(false);
      return;
    }
    toast("Leetcode credentials updated successfully");
    setLoading(false);
  };

  const uploadFile = async (blob: any) => {
    const bucket = "qr";
    if (!blob) {
      alert("please select file");
      return;
    }
    const fileName = `qr-${Math.random().toString(36).substr(2, 6)}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, blob);

    if (error) {
      // @ts-ignore
      setErrors(error.message);
      // console.log(error);
      return { data: error, success: false };
    }
    console.log(data);
    return { data, success: true };
  };

  const handleConnect = async () => {
    if (ref && ref.current) {
        setLoading(true);
      //   @ts-ignore
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      const fileData = await uploadFile(blob);
      // console.log(fileData);
      if (fileData && !fileData.success) {
        // @ts-ignore
        toast(fileData?.error?.message ?? "Same image exists");
        
        setLoading(false);
        return;
    }
    
    // @ts-ignore
      const qr = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileData.data?.fullPath}`;
    
      const resLeet = await putLeetCodeStats(username, user?.user?.id,qr);
      // console.log(data)
      if (resLeet && !resLeet.success) {
        // @ts-ignore
        toast(resLeet?.errorMessage);
        setLoading(false);
        return;
      }
      toast("Leetcode credentials added successfully");
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchLeetCodeStats() {
      const LeetData = await getLeetCodeStats(user?.user?.id);
      console.log(LeetData);
      if (LeetData.success) {
        console.log(LeetData);
        // @ts-ignore
        setLeetCode(LeetData.data);
      }
    }

    fetchLeetCodeStats();
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="font-bold">
            <SiLeetcode />
            <span className="ml-2">Leetcode</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect your Leetcode profile?</DialogTitle>
            <DialogDescription className="">
              <Input
                placeholder="Enter your Leetcode profile Username"
                className="mt-6"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </DialogDescription>
            <span className="text-red-400 ml-2 text-xs ">
              This action cannot be undone.
            </span>
          </DialogHeader>
          <div className="flex gap-2  items-center justify-between">
            <Button
              className=" w-32"
              onClick={leetCode?.id ? handleUpdate : handleConnect}
            >
              {loading ? (
                "Loading..."
              ) : leetCode?.id ? (
                <Button>Regenerate</Button>
              ) : (
                <Button>Connect</Button>
              )}
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => router.push(`/leetcode/${leetCode?.user_id}`)}
            >
              <ViewIcon />
              <span className="ml-2">View</span>
            </Button>
          </div>
          {/* @ts-ignore */}
          <QRCode      ref={ref}
            size={250}
            value={`https://leetcode.com/${username}`}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Leetcode;
