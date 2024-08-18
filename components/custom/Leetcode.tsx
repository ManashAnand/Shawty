"use client";
import React, { useEffect, useState } from "react";
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
import { getLeetCodeStats, putLeetCodeStats } from "@/actions/extraLinks";
import { toast } from "sonner";
import { useAuthenticateState } from "@/actions/zustand";
import { LeetCodeInterface } from "@/actions/interfaces";
import { SiLeetcode } from "react-icons/si";
import { useRouter } from "next/navigation";
import { ViewIcon } from "lucide-react";

const Leetcode = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [leetCode, setLeetCode] = useState<LeetCodeInterface | null>(null);
  const user = useAuthenticateState((state) => state.user);
  const router = useRouter();

  const handleConnect = async () => {
    setLoading(true);
    const resLeet = await putLeetCodeStats(username, user?.user?.id);
    // console.log(data)
    if (resLeet && !resLeet.success) {
      // @ts-ignore
      toast(resLeet?.errorMessage);
      setLoading(false);
      return;
    }
    toast("Leetcode credentials added successfully");
    setLoading(false);
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
            <Button className=" w-32" onClick={handleConnect}>
              {loading ? "Loading..." : leetCode?.id ? "Regenerate" : "Connect"}
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => router.push(`/leetcode/${leetCode?.id}`)}
            >
              <ViewIcon />
              <span className="ml-2">View</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Leetcode;
