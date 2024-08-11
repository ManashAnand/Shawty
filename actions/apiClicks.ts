"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function getClicksForUrl(url_ids: string[]) {
    const { data, error } = await supabase
      .from("clicks")
      .select("*")
      .in("url_id",url_ids)
  
    if (error) {
      console.error(error.message) 
      throw new Error("Unable to load Clicks");
    }
    return data;
  }
  