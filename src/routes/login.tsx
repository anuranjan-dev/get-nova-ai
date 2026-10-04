import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { authErrorMessage, continueAfterAuth, signInWithGoogle } from "@/lib/nova/auth-routing";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — NOVA" }, { name: "description", content: "Log in to NOVA." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleSignIn = async () => {
    setPending(true); setError(null);
    const { error: oauthError } = await signInWithGoogle();
    if (oauthError) { setError(authErrorMessage(oauthError.message, "login")); setPending(false); }
  };

  return <AuthShell title="Welcome back" subtitle="Log in to your NOVA workspace." footer={<>New to NOVA? <Link to="/signup" className="text-foreground underline underline-offset-4">Create an account</Link></>}>
    <Button type="button" variant="outline" className="h-11 w-full rounded-xl" disabled={pending} onClick={() => void googleSignIn()}>Continue with Google</Button>
    <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
    <form className="space-y-4" onSubmit={async (e) => {
      e.preventDefault(); setPending(true); setError(null);
      const form = new FormData(e.currentTarget);
      const email = String(form.get("email") ?? "").trim(); const password = String(form.get("password") ?? "");
      if (!email || password.length < 8) { setError("Enter a valid email and password."); setPending(false); return; }
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) { setError(authErrorMessage(signInError.message, "login")); setPending(false); return; }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setError("We could not confirm your session. Please try again."); setPending(false); return; }
      await continueAfterAuth(user.id, navigate);
    }}>
      {error ? <p role="alert" className="rounded-lg border border-destructive/30 p-3 text-sm text-destructive">{error}</p> : null}
      <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="h-11 rounded-xl" /></div>
      <div className="space-y-2"><div className="flex items-center justify-between"><Label htmlFor="password">Password</Label><Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</Link></div><div className="relative"><Input id="password" name="password" type={showPassword ? "text" : "password"} required minLength={8} autoComplete="current-password" className="h-11 rounded-xl pr-11" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></div>
      <Button type="submit" disabled={pending} className="h-11 w-full rounded-xl">{pending ? "Signing in…" : "Log in"}</Button>
    </form>
  </AuthShell>;
}
