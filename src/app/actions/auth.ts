"use server";

import {
  login,
  registrar,
  verificarEmailCadastrado,
} from "@/app/services/authService";

// Função de Login
export const handleLogin = async (email: string, senha: string) => {
  try {
    const data = await login(email, senha);
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

// Função de Registro
export const handleRegistro = async (email: string, senha: string) => {
  try {
    const emailJaCadastrado = await verificarEmailCadastrado(email);

    if (emailJaCadastrado) {
      return { error: "Email já cadastrado." };
    }

    const data = await registrar(email, senha);
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};
