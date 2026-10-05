import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — NOVA" },
      { name: "description", content: "Log in to your NOVA brand intelligence command center." },
      { property: "og:title", content: "Log in — NOVA" },
      { property: "og:description", content: "Log in to your NOVA brand intelligence command center." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to your brand intelligence command center."
      footer={
        <>
          New to NOVA?{" "}
          <Link to="/signup" className="text-foreground underline underline-offset-4">
            Create an account
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          setError("");
          const form = new FormData(e.currentTarget);
          const { error: authError } = await supabase.auth.signInWithPassword({
            email: String(form.get("email")),
            password: String(form.get("password")),
          });
          setPending(false);
          if (authError) {
            setError(authError.message.toLowerCase().includes("confirm") ? "Please confirm your email before signing in." : "Invalid email or password.");
            return;
          }
          await navigate({ to: "/app" });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="h-11 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="h-11 rounded-xl"
          />
        </div>
        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
        <Button type="submit" disabled={pending} className="h-11 w-full rounded-xl">
          {pending ? "Signing in…" : "Log in"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button
        variant="outline"
        className="h-11 w-full rounded-xl"
        type="button"
        onClick={async () => {
          setError("");
          const { error: authError } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });
          if (authError) setError("Google sign-in is unavailable right now.");
        }}
      >
        Continue with Google
      </Button>
    </AuthShell>
  );
}
