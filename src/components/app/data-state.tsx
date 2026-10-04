import { AlertCircle, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export const AI_RESULT_LABEL = "AI-generated ideas based on your business";

export function AiResultLabel() {
  return (
    <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Sparkles className="size-3.5 text-primary" />
      {AI_RESULT_LABEL}
    </p>
  );
}

export function LoadingState({ label = "Loading your workspace…" }: { label?: string }) {
  return (
    <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" /> {label}
    </div>
  );
}

export function ErrorState({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div role="alert" className="rounded-xl border border-destructive/30 bg-surface p-5">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <AlertCircle className="size-4 text-destructive" /> This page could not load
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={retry}>
        Try again
      </Button>
    </div>
  );
}