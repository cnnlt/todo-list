// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        console.log("Fetching session...");
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        console.log("Session fetched:", session);

        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (e) {
        console.error("Auth error:", e);
        if (mounted) {
          setError(e.message);
          setLoading(false);
        }
      }
    };

    // Initial session check
    getSession();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", { event, user: session?.user });

      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    // Cleanup
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Debug current state
  useEffect(() => {
    console.log("Current auth state:", { user, loading, error });
  }, [user, loading, error]);

  return { user, loading, error };
}
