import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BrandProfile } from "@/lib/nova/types";
import { useWorkspace } from "@/lib/nova/workspace-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/voice")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Brand Voice — NOVA" },
      {
        name: "description",
        content:
          "Define your brand personality, audience, tone and word choices once so every NOVA generation stays on brand.",
      },
      { property: "og:title", content: "Brand Voice — NOVA" },
      {
        property: "og:description",
        content: "Set personality, audience, tone and word rules for consistent brand content.",
      },
    ],
  }),
  component: BrandVoice,
});

const personalities = [
  "Playful",
  "Bold",
  "Warm",
  "Minimal",
  "Rebellious",
  "Nerdy",
  "Premium",
  "Wholesome",
];

function BrandVoice() {
  const { profile, saveProfile, logActivity } = useWorkspace();
  const [draft, setDraft] = useState<BrandProfile>(profile);

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const toggle = (item: string) => {
    setDraft((prev) => ({
      ...prev,
      personality: prev.personality.includes(item)
        ? prev.personality.filter((p) => p !== item)
        : [...prev.personality, item],
    }));
  };

  const submit = () => {
    if (!draft.brandName.trim()) {
      toast.error("Add your brand name first.");
      return;
    }
    saveProfile(draft);
    logActivity("voice", "Updated brand voice", draft.personality.join(", ") || "Voice saved");
    toast.success("Brand voice saved");
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Brand Voice"
        title="Teach NOVA how you sound"
        description="Set this once. Content Studio uses it for every hook, caption and ad so your brand never drifts."
        action={
          profile.updatedAt ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="size-3.5 text-primary" />
              Saved {new Date(profile.updatedAt).toLocaleDateString()}
            </span>
          ) : undefined
        }
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <form
          className="space-y-6 rounded-2xl border border-border bg-surface p-6"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Brand name</Label>
              <Input
                value={draft.brandName}
                onChange={(event) => setDraft({ ...draft, brandName: event.target.value })}
                placeholder="NOVA"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Target audience</Label>
              <Input
                value={draft.audience}
                onChange={(event) => setDraft({ ...draft, audience: event.target.value })}
                placeholder="18–24, urban, creator-adjacent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Personality</Label>
            <div className="flex flex-wrap gap-2">
              {personalities.map((item) => {
                const active = draft.personality.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggle(item)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs transition-colors",
                      active
                        ? "border-primary bg-primary/15 text-foreground"
                        : "border-border bg-surface-2 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Tone of voice</Label>
            <Textarea
              rows={3}
              value={draft.tone}
              onChange={(event) => setDraft({ ...draft, tone: event.target.value })}
              placeholder="Direct and a bit cheeky. Short sentences. No corporate filler."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Words to use</Label>
              <Textarea
                rows={3}
                value={draft.useWords}
                onChange={(event) => setDraft({ ...draft, useWords: event.target.value })}
                placeholder="drop, crew, real talk"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Words to avoid</Label>
              <Textarea
                rows={3}
                value={draft.avoidWords}
                onChange={(event) => setDraft({ ...draft, avoidWords: event.target.value })}
                placeholder="synergy, leverage, revolutionary"
              />
            </div>
          </div>

          <Button type="submit">
            <Sparkles className="size-4" />
            Save brand voice
          </Button>
        </form>

        <aside className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-sm font-semibold text-foreground">Voice preview</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            How a caption reads with your current settings.
          </p>
          <div className="mt-4 rounded-xl bg-surface-2 p-4 text-sm text-muted-foreground">
            {draft.brandName.trim() ? (
              <p>
                <span className="text-foreground">{draft.brandName}</span> for{" "}
                {draft.audience.trim() || "your audience"} —{" "}
                {draft.personality.length
                  ? draft.personality.join(", ").toLowerCase()
                  : "clear and direct"}
                . {draft.tone.trim() || "Short sentences, no filler."}
              </p>
            ) : (
              <p>Add your brand name to see a preview.</p>
            )}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
