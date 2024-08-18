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
import { useAuthenticateState } from "@/actions/zustand";
import { useRouter } from "next/navigation";
import { ViewIcon } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { toast } from "sonner";

const Github = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="font-bold">
            <FiGithub />
            <span className="ml-2">Github</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect your Github profile?</DialogTitle>
            <DialogDescription className="">
              <Input
                placeholder="Enter your Github profile Username"
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
              onClick={() => {
                if (username.length > 0) {
                  router.push(`/github/${username}`);
                } else {
                  toast("Please enter a valid username");
                }
              }}
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

export default Github;
