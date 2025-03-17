// actions/auth.ts
"use server";

import { supabase, supabaseAdmin } from "@/lib/supabaseClient";

// Função para listar usuários cadastrados
export const listarUsuariosCadastrados = async (): Promise<string[]> => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error("Erro ao listar usuários:", error.message);
    return [];
  }

  // Extrair os emails dos usuários
  const emails = data.users.map((user) => user.email || "");
  return emails;
};

// Função para verificar se o email já está cadastrado
export const verificarEmailCadastrado = async (
  email: string
): Promise<boolean> => {
  const emailsCadastrados = await listarUsuariosCadastrados();
  return emailsCadastrados.includes(email);
};

// Função de Login
export const handleLogin = async (
  email: string,
  senha: string
): Promise<{ error?: string; data?: any }> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    return { error: error.message };
  }

  return { data };
};

// Função de Registro
export const handleRegistro = async (
  email: string,
  senha: string
): Promise<{ error?: string; data?: any }> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
  });

  if (error) {
    return { error: error.message };
  }

  return { data };
};
