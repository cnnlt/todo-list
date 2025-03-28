"use client";

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading, error } = useAuth(); // Add error to destructuring

  useEffect(() => {
    // Debug logging
    console.log("Auth State:", { user, loading, error });
  }, [user, loading, error]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4 p-8 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Login Required</h1>
          <p className="text-gray-600">
            {error
              ? `Error: ${error}`
              : "Please sign in to access the dashboard"}
          </p>
          <Button
            onClick={() => (window.location.href = "/login")}
            className="mt-4"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-4">{/* Your dashboard content */}</main>
      </div>
    </div>
  );
}
