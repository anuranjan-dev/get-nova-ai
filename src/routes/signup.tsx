import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Request access — NOVA" },
      {
        name: "description",
        content: "Set up your brand workspace in NOVA — trend intelligence and on-brand social content for youth brands.",
      },
      { property: "og:title", content: "Request access — NOVA" },
      {
        property: "og:description",
        content: "Set up your brand workspace in NOVA — trend intelligence for youth-brand marketing teams.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <AuthShell
      title="Create your brand workspace"
      subtitle="For brand, social and growth teams. No credit card required."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-foreground underline underline-offset-4">
            Log in
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          setMessage("");
          const form = new FormData(e.currentTarget);
          const { data, error: authError } = await supabase.auth.signUp({
            email: String(form.get("email")),
            password: String(form.get("password")),
            options: {
              emailRedirectTo: import.meta.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
              data: { username: String(form.get("name")) },
            },
          });
          setPending(false);
          if (authError) {
            setMessage(authError.message.toLowerCase().includes("weak") ? "Use a stronger password with at least 8 characters." : "We couldn't create your account. Please check your details and try again.");
            return;
          }
          if (data.session) {
            await navigate({ to: "/app" });
          } else {
            setMessage("Account created. Check your email to confirm your account, then log in.");
          }
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Username</Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Ada Reyes"
            className="h-11 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="h-11 rounded-xl"
          />
        </div>
        {message && <p className="text-sm text-muted-foreground" role="status">{message}</p>}
        <Button type="submit" disabled={pending} className="h-11 w-full rounded-xl">
          {pending ? "Creating workspace…" : "Start for free"}
        </Button>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          By continuing you agree to the Terms of Service and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  );
}
