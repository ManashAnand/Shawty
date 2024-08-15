"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

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
  id: string;
  title: string;
  qr: string;
  custom_url?: string;
  short_url: string;
  original_url: string;
  created_at: string;
}

export async function createUrl(url: UrlStructure) {
  const { data, error } = await supabase.from("urls").insert([url]).select("*");
  if (error) {
    console.error(error.message);
    throw new Error("Unable to create short URL");
  }
  return data;
}
