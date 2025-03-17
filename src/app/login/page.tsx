"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Cannabis, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  handleLogin as serverHandleLogin,
  handleRegistro as serverHandleRegistro,
} from "@/app/actions/auth";

export default function TabsDemo() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginSenha, setLoginSenha] = useState<string>("");
  const [registroEmail, setRegistroEmail] = useState<string>("");
  const [registroSenha, setRegistroSenha] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    show: boolean;
    type: "error" | "success";
    title: string;
    message: string;
  }>({
    show: false,
    type: "error",
    title: "",
    message: "",
  });

  // Função para mostrar alertas
  const showAlert = (
    type: "error" | "success",
    title: string,
    message: string
  ) => {
    setAlertInfo({
      show: true,
      type,
      title,
      message,
    });

    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  // Funções de validação
  const validarLogin = (): boolean => {
    if (!loginEmail || !loginSenha) {
      showAlert(
        "error",
        "Campos obrigatórios",
        "Por favor, preencha todos os campos."
      );
      return false;
    }
    return true;
  };

  const validarRegistro = (): boolean => {
    if (!registroEmail || !registroSenha || !confirmarSenha) {
      showAlert(
        "error",
        "Campos obrigatórios",
        "Por favor, preencha todos os campos."
      );
      return false;
    }
    if (registroSenha !== confirmarSenha) {
      showAlert("error", "Senhas diferentes", "As senhas não coincidem.");
      return false;
    }
    return true;
  };

  // Função de Login
  const handleLogin = async (): Promise<void> => {
    if (!validarLogin()) return;

    try {
      setIsLoading(true);
      const { error, data } = await serverHandleLogin(loginEmail, loginSenha);

      if (error) {
        showAlert("error", "Erro de login", "Erro ao fazer login: " + error);
      } else {
        showAlert(
          "success",
          "Login bem-sucedido",
          "Login realizado com sucesso!"
        );

        localStorage.setItem("authToken", data.session.access_token);
        router.push("/todo");
      }
    } catch (error) {
      showAlert(
        "error",
        "Erro de sistema",
        "Ocorreu um erro ao processar a solicitação."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Função de Registro
  const handleRegistro = async (): Promise<void> => {
    if (!validarRegistro()) return;

    try {
      setIsLoading(true);
      const { error, data } = await serverHandleRegistro(
        registroEmail,
        registroSenha
      );

      if (error) {
        showAlert("error", "Erro de registro", "Erro ao registrar: " + error);
      } else {
        showAlert(
          "success",
          "Registro bem-sucedido",
          "Registro realizado com sucesso! Verifique seu email para continuar com o login."
        );

        // Limpar campos
        setLoginEmail(registroEmail);
        setRegistroEmail("");
        setRegistroSenha("");
        setConfirmarSenha("");
        setActiveTab("login");
      }
    } catch (error) {
      let errorMessage = "Ocorreu um erro ao processar a solicitação.";
      if (error instanceof Error) {
        errorMessage += " " + error.message;
      }
      showAlert("error", "Erro de sistema", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {alertInfo.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert
            variant={alertInfo.type === "error" ? "destructive" : "default"}
            className={
              alertInfo.type === "success"
                ? "border-green-500 text-green-500"
                : ""
            }
          >
            {alertInfo.type === "error" ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertTitle>{alertInfo.title}</AlertTitle>
            <AlertDescription>{alertInfo.message}</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="w-full w-[95%] sm:w-[75%] md:w-[50%] lg:w-[40%] xl:w-[30%]">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col h-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex-1">
              Login
            </TabsTrigger>
            <TabsTrigger value="registro" className="flex-1">
              Registro
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="flex-1 overflow-auto">
            <Card className="h-full flex flex-col">
              <CardHeader className="mb-0">
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Faça login com seu email e senha.
                </CardDescription>
              </CardHeader>
              <div className="flex-grow flex justify-center items-center">
                <Cannabis strokeWidth={1} className="w-[160px] h-[40px]" />
              </div>
              <CardContent className="space-y-2 flex-1 pt-0">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    value={loginSenha}
                    onChange={(e) => setLoginSenha(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className="w-full"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Processando..." : "Entrar"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="registro" className="flex-1 overflow-auto">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Registro</CardTitle>
                <CardDescription>
                  Crie uma nova conta com seu email e senha.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex-1">
                <div className="space-y-1">
                  <Label htmlFor="email-registro">Email</Label>
                  <Input
                    id="email-registro"
                    type="email"
                    placeholder="Digite seu email"
                    value={registroEmail}
                    onChange={(e) => setRegistroEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="senha-registro">Senha</Label>
                  <Input
                    id="senha-registro"
                    type="password"
                    placeholder="Digite sua senha"
                    value={registroSenha}
                    onChange={(e) => setRegistroSenha(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmar-senha">Confirmar Senha</Label>
                  <Input
                    id="confirmar-senha"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className="w-full"
                  onClick={handleRegistro}
                  disabled={isLoading}
                >
                  {isLoading ? "Processando..." : "Criar Conta"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
