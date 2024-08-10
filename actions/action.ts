"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
interface FormDataForLogin {
  email: string;
  password: string;
}

interface FormDataForSignup extends FormDataForLogin {
  name: string;
  profile_pic: string;
}

const cookieStore = cookies();
const supabase = createClient(cookieStore);
export async function login(formData: FormDataForLogin) {
  // type-casting here for convenience
  // in practice, you should validate your inputs

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
}

export async function signup(formData: FormDataForSignup) {
  const { email, password, name, profile_pic } = formData;

  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic:`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile_pic/${fileName}`
      },
    },
  });

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
