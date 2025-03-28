"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

interface AlertMessageProps {
  show: boolean;
  type: "error" | "success";
  title: string;
  message: string;
}

export function AlertMessage({
  show,
  type,
  title,
  message,
}: AlertMessageProps) {
  if (!show) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <Alert
        variant={type === "error" ? "destructive" : "default"}
        className={type === "success" ? "border-green-500 text-green-500" : ""}
      >
        {type === "error" ? (
          <AlertCircle className="h-4 w-4" />
        ) : (
          <CheckCircle className="h-4 w-4" />
        )}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}
