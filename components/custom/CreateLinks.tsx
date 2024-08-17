"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BeatLoader } from "react-spinners";
import { QRCode } from "react-qrcode-logo";
import { Card } from "../ui/card";
import { useAuthenticateState } from "@/actions/zustand";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { z } from "zod";
import Error from "./Error";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createUrl } from "@/actions/apiUrls";
import { toast } from "sonner";

export function CreateLink() {
  const user = useAuthenticateState((state) => state.user);
  const router = useRouter();
  const ref = useRef();
  console.log(user);

  const supabase = createClientComponentClient();
  const searchParams = useSearchParams();
  const longLink = searchParams.get("longLink");

  const [errors, setErrors] = useState<string[]>([]);
  const [formValues, setFormValues] = useState({
    user_id: user?.user?.id ?? "",
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = z.object({
    title: z.string(),
    longUrl: z.string().url("Must be a valid URL"),
    customUrl: z.string(),
  });

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
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

  const createNewLink = async () => {
    setErrors([]);
    try {
      const result = schema.safeParse(formValues);
      if (!result.success) {
        const errorMessages = result.error.errors.map((err) => err.message);
        setErrors(errorMessages);
      } else {
        if (ref && ref.current) {
          //   @ts-ignore
          const canvas = ref.current.canvasRef.current;
          const blob = await new Promise((resolve) => canvas.toBlob(resolve));
          
          const fileData = await uploadFile(blob);
          // console.log(fileData);
          if (  fileData  && !fileData.success) {
            // @ts-ignore
            toast(fileData?.error?.message ?? "Same image exists");
            return;
          }
          const shorturl = Math.random().toString(36).substr(2, 6);
          // @ts-ignore
          const qr = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileData.data?.fullPath}`;   
          console.log(formValues)
          // @ts-ignore
          const urlObj = {...formValues, qr, shorturl};
          const response = await createUrl(urlObj);
          console.log(response);
          if(response && response.success){
            // router.push(`/link/${response.data[0].id}`);
            toast("Short URL created successfully");
          }else{
            // @ts-ignore
            toast( response.message || "Unable to create short URL");
          }
        }
      }
    } catch (error) {
      setErrors(["Unable to create short URL"]);
      console.error(error);
    }
  };

  return (
    <Dialog
      // @ts-ignore
      defaultOpen={longLink ? longLink : false}
    >
      <DialogTrigger asChild>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>
        {formValues?.longUrl && (
          // @ts-ignore
          <QRCode ref={ref} size={250} value={formValues?.longUrl} />
        )}

        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
        />
        <Input
          id="longUrl"
          placeholder="Enter your Loooong URL"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <Card className="p-2">shawty.in</Card> /
          <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={createNewLink}
            // disabled={loading}
          >
            {true ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
          <ul className="ml-8">
            {/* {errors && errors.map((item: string, index) => (
              <Error key={index} message={item} />
            ))} */}
          </ul>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
