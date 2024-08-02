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
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
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