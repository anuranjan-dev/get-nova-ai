import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — NOVA" }, { name: "description", content: "Create your NOVA workspace." }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const googleSignIn = async () => {
    setPending(true); setError(null);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: import.meta.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin, extraParams: { prompt: "select_account" } });
    if (result.error) { setError("Google sign-in is unavailable right now. Try creating an account with email."); setPending(false); return; }
    if (!result.redirected) await navigate({ to: "/app" });
  };

  return <AuthShell title="Create your NOVA account" subtitle="Start with your name and business details." footer={<>Already have an account? <Link to="/login" className="text-foreground underline underline-offset-4">Log in</Link></>}>
    {!confirmationSent ? <>
      <Button type="button" variant="outline" className="h-11 w-full rounded-xl" disabled={pending} onClick={() => void googleSignIn()}>Continue with Google</Button>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
      <form className="space-y-4" onSubmit={async (e) => {
        e.preventDefault(); setPending(true); setError(null);
        const form = new FormData(e.currentTarget);
        const fullName = String(form.get("name") ?? "").trim(); const email = String(form.get("email") ?? "").trim(); const password = String(form.get("password") ?? "");
        if (!fullName || !email || password.length < 8) { setError("Enter your full name, a valid email, and a password with at least 8 characters."); setPending(false); return; }
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, name: fullName }, emailRedirectTo: import.meta.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback` } });
        if (signUpError) { setError(signUpError.message.toLowerCase().includes("password") ? "Choose a stronger password." : "We could not create your account. Check your details and try again."); setPending(false); return; }
        if (!data.user) { setError("Your account could not be created. Try again."); setPending(false); return; }
        if (data.session) { await supabase.from("profiles").upsert({ user_id: data.user.id, full_name: fullName }); await navigate({ to: "/app/voice" }); } else { setConfirmationSent(true); setPending(false); }
      }}>
        {error ? <p role="alert" className="rounded-lg border border-destructive/30 p-3 text-sm text-destructive">{error}</p> : null}
        <div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" name="name" required autoComplete="name" placeholder="Your full name" className="h-11 rounded-xl" /></div>
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="h-11 rounded-xl" /></div>
        <div className="space-y-2"><Label htmlFor="password">Password</Label><div className="relative"><Input id="password" name="password" type={showPassword ? "text" : "password"} required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" className="h-11 rounded-xl pr-11" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></div>
        <Button type="submit" disabled={pending} className="h-11 w-full rounded-xl">{pending ? "Creating account…" : "Create account"}</Button>
      </form>
    </> : <div className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">Check your email to confirm your account, then return to log in.</div>}
  </AuthShell>;
}
