// components/Sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Menu, ChevronLeft } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const { user, handleLogout, loading } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      <div
        className={`h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-0" : "w-80"
        }`}
      >
        <div className={`${isCollapsed ? "hidden" : "block"} h-full`}>
          <div className="flex flex-col h-full justify-between p-4 border-r">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Dashboard</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCollapsed(true)}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={user.user_metadata?.avatar_url}
                    alt={user.email || "User avatar"}
                  />
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">Bem-vindo!</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full"
            >
              Deslogar
            </Button>
          </div>
        </div>
      </div>

      {isCollapsed && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="absolute left-4 top-4"
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
