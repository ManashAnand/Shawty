"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { create } from "zustand";
import { useAuthenticateState } from "./zustand";
interface FormDataForLogin {
  email: string;
  password: string;
}

interface FormDataForSignup extends FormDataForLogin {
  name: string;
}

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function login(formData: FormDataForLogin) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
 
  try {
    const { email, password } = formData;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // console.log(data)
    const res = { success: true, error: "", data: {} };
    if (error) {
      // console.log(error)
      // redirect('/error')
      res.error = error?.message;
      res.success = false;
      return res;
    }
    res.data = data;
    return res;
  } catch (error) {
    console.log(error);
    return {error:error,success:false}
  } 
}

export async function signup(formData: FormDataForSignup, filePathUrl: string) {
  // const { email, password, name } = formData;
  const allData: { [key: string]: string } = {};
  // @ts-ignore
  for (const [key, value] of formData.entries()) {
    allData[key] = value;
  }

  const { name, email, password } = allData;
  console.log(name, email, password);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: filePathUrl,
      },
    },
  });
  console.log(data);
  const res = { success: true, error: "", data: {} };
  if (error) {
    // console.log(error)
    // redirect('/error')
    res.error = error?.message;
    res.success = false;
    return res;
  }
  res.data = data;
  return res;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}
