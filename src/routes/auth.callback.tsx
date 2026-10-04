import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { continueAfterAuthPath, ensureProfile } from "@/lib/nova/auth-routing";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({ meta: [{ title: "Signing you in — NOVA" }] }),
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function completeAuth() {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          if (active) setError("This sign-in link has expired. Please try again.");
          return;
        }
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        if (active) setError("We could not complete sign-in. Please return to login and try again.");
        return;
      }

      const fullName = user.user_metadata?.["full_name"] ?? user.user_metadata?.["name"] ?? null;
      await ensureProfile(user.id, fullName);
      const destination = await continueAfterAuthPath(user.id);
      await navigate({ to: destination });
    }

    void completeAuth();
    return () => { active = false; };
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center">
        {error ? (
          <>
            <h1 className="text-lg font-semibold">Sign-in needs another try</h1>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <button className="mt-5 text-sm font-medium underline underline-offset-4" onClick={() => void navigate({ to: "/login" })}>Return to login</button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground" role="status">Finishing your secure sign-in…</p>
        )}
      </div>
    </main>
  );
}
