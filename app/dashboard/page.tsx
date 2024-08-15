"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { ClockLoader } from "react-spinners";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUrl, getUrls } from "@/actions/apiUrls";
import { useAuthenticateState } from "@/actions/zustand";
import { useRouter } from "next/navigation";
import { getClicksForUrl } from "@/actions/apiClicks";
import LinkCard from "@/components/custom/LinkCard";
import { Button } from "@/components/ui/button";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CreateLink } from "@/components/custom/CreateLinks";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const supabase = createClientComponentClient();

  const isAuth = useAuthenticateState((state) => state.isAuthenticatad);
  if (!isAuth) router.push("/auth");

  const user = useAuthenticateState((state) => state.user);
  const userId = user?.user?.id;

  const {
    isPending,
    error,
    data: urls,
  } = useQuery({
    queryKey: ["repoData", userId],
    queryFn: () => getUrls(userId),
  });

  const url_id = urls?.map((u) => u.id.toString()) || [];
  const {
    data: clicks,
    error: clicksError,
    isPending: clicksPending,
  } = useQuery({
    queryKey: ["repoData", "clicksIds", url_id],
    queryFn: () => getClicksForUrl(url_id),
    enabled: !!url_id.length,
  });

  const { mutate: deleteFn, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteUrl(id), // Pass the id here
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["repoData", userId]);
    },
  });

  if (isPending || clicksPending)
    return (
      <div className="w-full flex justify-between items-center">
        <ClockLoader />;
      </div>
    );
  if (error || clicksError) return "Error";

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uploadFile = async (file: any) => {
    const bucket = "qr";
    console.log(file);
    if (!file) {
      alert("please select file");
      return;
    }
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    if (error) {
      // @ts-ignore
      setErrors(error.message);
      console.log(error);
      return {data:error,success: false};
    }
    console.log(data);
    return {data,success:true};
  };

  return (
    <>
      <div className="flex flex-col gap-8">
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
          <>
            <CreateLink/>
          </>
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
        {(filteredUrls || []).map((url, i) => (
          <LinkCard
            key={i}
            url={url}
            userId={userId}
            deleteFn={deleteFn}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
