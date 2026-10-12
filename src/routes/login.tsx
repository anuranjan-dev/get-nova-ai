import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        onSubmit={(e) => {
          e.preventDefault();
          setPending(true);
          setTimeout(() => void navigate({ to: "/app" }), 500);
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
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
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="h-11 rounded-xl"
          />
        </div>
        <Button type="submit" disabled={pending} className="h-11 w-full rounded-xl">
          {pending ? "Signing in…" : "Log in"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button variant="outline" className="h-11 w-full rounded-xl" asChild>
        <Link to="/app">Continue with Google</Link>
      </Button>
    </AuthShell>
  );
}
