// components/Header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Página Principal</h1>
      <div className="md:hidden">
        <Sidebar />
      </div>
    </header>
  );
};
