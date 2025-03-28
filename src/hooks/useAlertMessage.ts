"use client";

import { useState } from "react";

export function useAlertMessage() {
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

  return {
    alertInfo,
    showAlert,
  };
}
