"use client";
import { getClicksForUrl } from "@/actions/apiClicks";
import { deleteUrl, getUrlById } from "@/actions/apiUrls";
import DeviceStats from "@/components/custom/DeviceStats";
import Location from "@/components/custom/Location";
// import DeviceStats from "@/components/device-stats";
// import Location from "@/components/location-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
// import {getClicksForUrl} from "@/db/apiClicks";
// import {deleteUrl, getUrl} from "@/db/apiUrls";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BarLoader, BeatLoader } from "react-spinners";
import { toast } from "sonner";

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  const {
    isPending,
    error,
    data: UserData,
  } = useQuery({
    queryKey: ["repoData", "working", id],
    queryFn: async () => {
      const res = await getUrlById(id);
      if (!res.success) {
        toast("Error in fetching URL data");
      }
      // @ts-ignore
      const resClicks = await getClicksForUrl([id]);

      return {
        // @ts-ignore
        url: res.data,
        clicks: resClicks,
      };
    },
  });

  console.log(UserData);
  const downloadImage = () => {
    const imageUrl = UserData?.url?.qr;
    const fileName = UserData?.url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
    toast("Downloaded Image")
  };

    const router = useRouter()
  const [deleteLoading,setDeleteLoading] = useState<Boolean>(false);
  const handleDelete = async (id:string) => {
    setDeleteLoading(true);
        await deleteUrl(id);

    setDeleteLoading(false);
    router.push('/dashboard')
    toast("Url Deleted")
}

  return (
    <>
      {isPending && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {UserData?.url?.title || "Something.."}
          </span>
          <a
            // href={`https://trimrr.in/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://shawty.in/{UserData?.url?.short_url}
          </a>
          <a
            // href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {UserData?.url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(UserData?.url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://shawty/${UserData?.url?.short_url}`
                );

                toast("Copied to clipboard");
              }}
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleDelete(UserData?.url?.id)}
            >
              {deleteLoading ? <BeatLoader size={5} color="white" /> : <Trash />}
            </Button>
          </div>
          <Image
            src={UserData?.url?.qr}
            className="w-full self-center sm:self-start  p-1 object-contain"
            alt="qr code"
            height={500}
            width={500}
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {UserData?.clicks && UserData?.clicks.length > 0 ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{UserData?.clicks?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <Location stats={UserData?.clicks } />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={UserData?.clicks} />
            </CardContent>
          ) : (
            <CardContent>
              {
                //   loadingStats === false
                "No Statistics yet" 
              }
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Analytics;
