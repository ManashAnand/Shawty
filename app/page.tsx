"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import banner from "../public/banner.jpg";
import { BentoGrid } from "@/components/custom/BentoGrid";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const router = useRouter();

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (longUrl) router.push(`/auth?createNew=${longUrl}`);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="h-[30rem] w-full rounded-md flex md:items-center md:justify-center bg-transparent antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Short Url&rsquo;s <br /> is the new trend.
            </h1>
            <div className="mt-4 font-normal text-base text-neutral-300 flex justify-center items-center text-center mx-auto">
              <form
                onSubmit={handleShorten}
                className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
              >
                <Input
                  type="url"
                  placeholder="Enter your loooong URL"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="h-full flex-1 py-4 px-4"
                />
                <Button type="submit" className="h-full" variant="destructive">
                  Shorten!
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* <Image
        src={banner} // replace with 2 in small screens
        className="w-full my-11 md:px-11"
        alt="banner image"
        width={500}
        height={500}
        fill={true}
      /> */}

        <BentoGrid />

        <Accordion
          type="single"
          collapsible
          className="w-full md:px-11 rounded-xl  rounded-xlw-full  border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0 "
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How does the Shawty URL shortener works?
            </AccordionTrigger>
            <AccordionContent>
              When you enter a long URL, our system generates a shorter version
              of that URL. This shortened URL redirects to the original long URL
              when accessed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Do I need an account to use the app?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Creating an account allows you to manage your URLs, view
              analytics, and customize your short URLs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What analytics are available for my shortened URLs?
            </AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geolocation data of the clicks
              and device types (mobile/desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
