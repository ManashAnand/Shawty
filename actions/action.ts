'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
interface FormData {
    email: string;
    password: string;
  }
  
const cookieStore = cookies()
export async function login(formData: FormData) {
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { email, password } = formData
  const { data,error } = await supabase.auth.signInWithPassword({ email, password })
  // console.log(data)
  const res = {success:true,error:"",data:{}}
  if (error) {
    // console.log(error)
    // redirect('/error')
    res.error = error?.message
    res.success = false
    return res
  }
  res.data = data
  return res
}

export async function signup(formData: FormData) {
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
 
  const { email, password } = formData
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}