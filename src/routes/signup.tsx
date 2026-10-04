import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

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
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const googleSignIn = async () => {
    setPending(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      setError(result.error.message);
      setPending(false);
      return;
    }
    if (!result.redirected) await navigate({ to: "/app" });
  };

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
      {confirmationSent ? (
        <div className="rounded-xl border border-border bg-surface p-5 text-sm text-muted-foreground">
          Check your email to confirm your account, then return to log in.
        </div>
      ) : <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          setError(null);
          const form = new FormData(e.currentTarget);
          const fullName = String(form.get("name") ?? "").trim();
          const email = String(form.get("email") ?? "");
          const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password: String(form.get("password") ?? ""),
            options: { data: { full_name: fullName } },
          });
          if (signUpError) {
            setError(signUpError.message);
            setPending(false);
            return;
          }
          if (!data.user) {
            setError("Your account could not be created.");
            setPending(false);
            return;
          }
          if (data.session) {
            await supabase.from("profiles").upsert({ user_id: data.user.id, full_name: fullName });
            await navigate({ to: "/app" });
          } else {
            setConfirmationSent(true);
            setPending(false);
          }
        }}
      >
        {error ? <p role="alert" className="rounded-lg border border-destructive/30 p-3 text-sm text-destructive">{error}</p> : null}
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
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
        <Button type="submit" disabled={pending} className="h-11 w-full rounded-xl">
          {pending ? "Creating workspace…" : "Start for free"}
        </Button>
      </form>}

      {!confirmationSent ? <>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
        <Button type="button" variant="outline" className="h-11 w-full rounded-xl" disabled={pending} onClick={() => void googleSignIn()}>Continue with Google</Button>
      </> : null}
    </AuthShell>
  );
}
