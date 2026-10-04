import { Link, createFileRoute } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { useState } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — NOVA" },
      { name: "description", content: "Send yourself a NOVA password reset link." },
      { property: "og:title", content: "Reset your password — NOVA" },
      { property: "og:description", content: "Send yourself a NOVA password reset link." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthShell
      title={sent ? "Check your inbox" : "Reset your password"}
      subtitle={
        sent
          ? "If an account exists for that address, a reset link is on its way."
          : "We'll email you a link to set a new password."
      }
      footer={
        <Link to="/login" className="text-foreground underline underline-offset-4">
          Back to log in
        </Link>
      }
    >
      {sent ? (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
          <MailCheck className="size-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            Follow the instructions in the email to continue.
          </p>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setPending(true);
            setError(null);
            const form = new FormData(e.currentTarget);
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(
              String(form.get("email") ?? ""),
              { redirectTo: `${window.location.origin}/login` },
            );
            if (resetError) {
              setError(resetError.message);
              setPending(false);
              return;
            }
            setSent(true);
            setPending(false);
          }}
        >
          {error ? <p role="alert" className="rounded-lg border border-destructive/30 p-3 text-sm text-destructive">{error}</p> : null}
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
          <Button type="submit" disabled={pending} className="h-11 w-full rounded-xl">
            {pending ? "Sending…" : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
