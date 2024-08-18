"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import {UAParser} from 'ua-parser-js';  


const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function getUrls(user_id: string) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;
}

export async function deleteUrl(id: string) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to Delete URLs");
  }
  return data;
}

interface UrlStructure {
  title: string;
  qr: string;
  customUrl?: string;
  shorturl: string;
  longUrl: string;
  user_id: string;
}

export async function createUrl(url: UrlStructure) {
  const { data, error } = await supabase
    .from("urls")
    .insert({
      title: url.title,
      qr: url.qr,
      custom_url: url.customUrl,
      short_url: url.shorturl,
      original_url: url.longUrl,
      user_id: url.user_id,
    })
    .select("*");
  if (error) {
    console.log(error);
    // @ts-ignore
    const errorObject = { message: error.message, success: false };
    return errorObject;
  }
  const dataObject = { data, success: true };
  return dataObject;
}

export async function getLongUrl(id: string) {
  const numericId = Number(id);
  console.log(numericId)
  if (isNaN(numericId)) {
    return { message: "Invalid ID provided. Not a number.", success: false };
  }
  const { data, error } = await supabase
    .from("urls")
    .select("id,original_url")
    .eq("id", numericId)
    .single()
    if (error) {
      console.log(error);
      // @ts-ignore
      const errorObject = { message: error.message, success: false };
      return errorObject;
    }
    const dataObject = { data, success: true };
    return dataObject;
}


const parser = new UAParser();

export const storeClicks = async({id,original_url}: {id: string, original_url: string}) => {

  try {
    const res = parser.getResult();
    // @ts-ignore
    const device = res.type || "desktop";
    console.log(device)
    const response = await fetch('https://ipapi.co/json');
    const {city,country_name:country,ip,latitude,longitude,region} = await response.json();
    console.log(city,country,ip,latitude,longitude,region);
    const data = await supabase.from('clicks').insert({
      url_id: id,
      device,
      city,
      country,
    });
    console.log(data)
    if(data.statusText === "Created"){
      console.log("clicks stored")
      return {success: true,original_url}
    }
    // window.location.href = original_url;
    // NextResponse.redirect(original_url)
    // redirect(original_url);
  } catch (error) {
    console.log(error);
    console.log("error redirecting click")
  }

}