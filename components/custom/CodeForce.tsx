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
import { ViewIcon } from "lucide-react";
import { toast } from "sonner";
import { SiCodeforces } from "react-icons/si";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CodeForce = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const handleCodeForceData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${username}`
      );
      const data = await res.json();
      console.log(data?.result[0]);
      setData(data?.result[0]);
    } catch (error) {
      toast("Error in generating data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="font-bold">
            <SiCodeforces />
            <span className="ml-2">CodeForce</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect your CodeForce profile?</DialogTitle>
            <DialogDescription className="">
              <Input
                placeholder="Enter your CodeForce profile Username"
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
            <Button onClick={handleCodeForceData} disabled={loading}>
              <ViewIcon />
              <span className="ml-2">{loading ? "Loading...":"View"}</span>
            </Button>
          </div>
          {data?.firstName && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>CodeForce Stats</CardTitle>
                  <CardDescription className=" flex gap-2 items-center ">
                    <div>
                      <Avatar>
                        <AvatarImage src={data?.avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-xl">
                      {data?.firstName} {data?.lastName}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Country: {data?.country}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p>Current Rank: {data?.rank}</p>
               
                  <p>MaxRank: {data?.maxRank}</p>
                </CardFooter>
                <CardFooter className="flex justify-between">
                  <p>Rating: {data?.rating}</p>
               
                  <p>Max Rating: {data?.maxRating}</p>
                </CardFooter>
              </Card>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CodeForce;
