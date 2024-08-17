"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { toast } from "sonner"

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
  const { data, error } = await supabase.from("urls").insert({
    title: url.title,
    qr: url.qr,
    custom_url: url.customUrl,
    short_url: url.shorturl,
    original_url: url.longUrl,
    user_id: url.user_id,
  }).select("*");
  if (error) {
    console.log(error.message);

    throw new Error("Unable to create short URL");
  }
  return data;
}
