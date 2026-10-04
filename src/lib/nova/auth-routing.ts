import { supabase } from "@/integrations/supabase/client";

export async function ensureProfile(userId: string, fullName?: string | null) {
  const name = fullName?.trim();
  if (!name) return;
  await supabase.from("profiles").upsert({ user_id: userId, full_name: name }, { onConflict: "user_id" });
}

export async function getPostAuthRoute(userId: string) {
  const { data } = await supabase
    .from("brand_profiles")
    .select("brand_name, audience, tone")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.brand_name?.trim() && data?.audience?.trim() && data?.tone?.trim() ? "/app" : "/app/voice";
}

export function getAuthRedirectUrl() {
  return import.meta.env["NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL"] || `${window.location.origin}/auth/callback`;
}

export function authErrorMessage(message: string, mode: "login" | "signup") {
  const normalized = message.toLowerCase();
  if (normalized.includes("email not confirmed")) return "Confirm your email before logging in.";
  if (normalized.includes("password") && mode === "signup") return "Choose a password with at least 8 characters.";
  if (normalized.includes("rate limit") || normalized.includes("too many")) return "Too many attempts. Please wait a moment and try again.";
  if (mode === "login" && (normalized.includes("invalid") || normalized.includes("credentials"))) return "Invalid email or password.";
  return mode === "login" ? "We could not log you in. Please try again." : "We could not create your account. Please try again.";
}

export async function continueAfterAuth(userId: string, navigate: (options: { to: string }) => Promise<void>) {
  const destination = await getPostAuthRoute(userId);
  await navigate({ to: destination });
}

export async function continueAfterAuthPath(userId: string) {
  return getPostAuthRoute(userId);
}

export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: getAuthRedirectUrl(), queryParams: { prompt: "select_account" } },
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}
