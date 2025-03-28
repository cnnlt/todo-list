"use server";

import { supabase } from "@/lib/supabaseClient";

export async function handleLogin(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { error: null, data };
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: error.message,
      data: null,
    };
  }
}

export async function handleRegistro(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return { error: null, data };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: error.message,
      data: null,
    };
  }
}
