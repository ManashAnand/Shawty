"use client";
import React, { useState } from "react";
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
import { getLeetCodeStats } from "@/actions/extraLinks";
import { toast } from "sonner";
import { useAuthenticateState } from "@/actions/zustand";

const Leetcode = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useAuthenticateState((state) => state.user);

  const handleConnect = async () => {
    // console.log(username);
    setLoading(true);
    const resLeet = await getLeetCodeStats(username,user?.user?.id);
    // console.log(data)
    if(resLeet && !resLeet.success){
        // @ts-ignore
        toast(resLeet?.errorMessage)
        setLoading(false);
        return;
    }
    toast("Leetcode credentials added successfully");
    setLoading(false);
    

  };
  return (
    <>
      <Dialog >
        <DialogTrigger>
          <Button className="font-bold">Leetcode</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect your Leetcode profile?</DialogTitle>
            <DialogDescription className="">
              <Input
                placeholder="Enter your Leetcode profile Username"
                className="mt-6"
                onChange={(e) => setUsername(e.target.value)}
              />
            </DialogDescription>
            <span className="text-red-400 ml-2 text-xs ">
              This action cannot be undone.
            </span>
          </DialogHeader>
          <div className="flex gap-2">
            <Button className="mt-4 w-32" onClick={handleConnect}>
              {loading? "Loading...":"Connect"}
              
            </Button>
            <Button className="mt-4 w-32" variant={"ghost"}>
              Regenerate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Leetcode;
