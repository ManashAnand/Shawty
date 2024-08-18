"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function putLeetCodeStats(username: string, user_id: string,qr:string) {
  const data = await fetch(
    `https://leetcode-stats-api.herokuapp.com/${username}`
  );
  const res = await data.json();
  console.log(res);
  if (res.status == "success") {
    const { data, error } = await supabase
      .from("Leetcode")
      .insert({
        username: username,
        total_solved: res.totalSolved,
        easy_solved: res.easySolved,
        medium_solved: res.mediumSolved,
        hard_solved: res.hardSolved,
        acceptance_rate: res.acceptanceRate,
        user_id: user_id,
        leetcode_url: `https://leetcode.com/${username}`,
        leetcode_qr:qr
      })
      .select("*");
    if (error) {
      console.log(error);
      const errorObject = { errorMessage: error.message, success: false };
      return errorObject;
    }
    const dataObject = { data, success: true };
    return dataObject;
  } else {
    const errorObj = {
      success: false,
      errorMessage: "Error in fetching Leetcode data",
    };
    return errorObj;
  }
}

export async function updateLeetCodeStats(username: string, user_id: string) {
  const data = await fetch(
    `https://leetcode-stats-api.herokuapp.com/${username}`
  );
  const res = await data.json();
  console.log(res);
  if (res.status == "success") {
    const { data, error } = await supabase
      .from("Leetcode")
      .update({
        username: username,
        total_solved: res.totalSolved,
        easy_solved: res.easySolved,
        medium_solved: res.mediumSolved,
        hard_solved: res.hardSolved,
        acceptance_rate: res.acceptanceRate,
      })
      .eq("user_id", user_id)
      .single();
    if (error) {
      console.log(error);
      const errorObject = { errorMessage: error.message, success: false };
      return errorObject;
    }
    const dataObject = { data, success: true };
    return dataObject;
  } else {
    const errorObj = {
      success: false,
      errorMessage: "Error in fetching Leetcode data",
    };
    return errorObj;
  }
}

export async function getLeetCodeStats(user_id: string) {
  const { data, error } = await supabase
    .from("Leetcode")
    .select("*")
    .eq("user_id", user_id)
    .single();
  if (error) {
    console.log(error);
    const errorObject = { errorMessage: error.message, data:null,success: false };
    return errorObject;
  }
  const dataObject = { data, success: true };
  return dataObject;
}
