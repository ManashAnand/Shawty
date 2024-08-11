"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { BarLoader, ClockLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getUrls } from "@/actions/apiUrls";
import { useAuthenticateState } from "@/actions/zustand";
import { useRouter } from "next/navigation";
import { getClicksForUrl } from "@/actions/apiClicks";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const isAuth = useAuthenticateState((state) => state.isAuthenticatad);
  if (!isAuth) router.push("/auth");

  const user = useAuthenticateState((state) => state.user);
  const userId = user?.user?.id;

  const { isPending, error, data: urls } = useQuery({
    queryKey: ["repoData", userId],
    queryFn: () => getUrls(userId),
  });

  const url_id = urls?.map((u) => u.id.toString()) || [];
  console.log(url_id)
  const {
    data: clicks,
    error: clicksError,
    isPending: clicksPending,
  } = useQuery({
    queryKey: ["repoData", "clicksIds", url_id],
    queryFn: () => getClicksForUrl(url_id),
    enabled: !!url_id.length,
  });

  if (isPending || clicksPending) return <ClockLoader />;
  if (error || clicksError) return "Error";

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(urls)
  console.log(clicks)
  return (
    <>
      <div className="flex flex-col gap-8">-
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Links Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{urls?.length ?? "5"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{clicks?.length ?? "5"}</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-between">
          <h1 className="text-4xl font-extrabold">My Links</h1>
          {/* <CreateLink /> */}
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Filter Links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Filter className="absolute top-2 right-2 p-1" />
        </div>
        {(filteredUrls || [])?.map((url, i) => {
          return <div key={i}>{url?.custom_url}</div>;
        })}
      </div>
    </>
  );
};

export default Dashboard;
