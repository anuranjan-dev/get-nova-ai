import { createFileRoute } from "@tanstack/react-router";
import { Copy, Loader2, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { novaClient } from "@/lib/nova/nova-client";
import type { ContentPlatform, ContentResult, MarketingGoal } from "@/lib/nova/types";
import { useWorkspace } from "@/lib/nova/workspace-store";

export const Route = createFileRoute("/_authenticated/app/studio")({
  head: () => ({
    meta: [
      { title: "Content Studio — NOVA" },
      {
        name: "description",
        content:
          "Turn a short brief into post ideas, hooks, captions, ad copy, CTAs and hashtags that match your brand voice.",
      },
      { property: "og:title", content: "Content Studio — NOVA" },
      {
        property: "og:description",
        content: "Hooks, captions, ad copy and CTAs generated from one short brief.",
      },
    ],
  }),
  component: ContentStudio,
});

const platforms: ContentPlatform[] = [
  "TikTok",
  "Instagram",
  "YouTube Shorts",
  "X",
  "Email",
  "Landing page",
];

const goals: MarketingGoal[] = [
  "Awareness",
  "Engagement",
  "Followers",
  "Sales",
  "Launch hype",
  "Community",
];

function ContentStudio() {
  const { profile, logActivity } = useWorkspace();
  const [product, setProduct] = useState("");
  const [brandName, setBrandName] = useState(profile.brandName);
  const [audience, setAudience] = useState(profile.audience);
  const [tone, setTone] = useState(profile.tone);
  const [platform, setPlatform] = useState<ContentPlatform>("TikTok");
  const [goal, setGoal] = useState<MarketingGoal>("Engagement");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ContentResult | null>(null);

  useEffect(() => {
    setBrandName(profile.brandName);
    setAudience(profile.audience);
    setTone(profile.tone);
  }, [profile.brandName, profile.audience, profile.tone]);

  const generate = async () => {
    if (!product.trim()) {
      toast.error("Describe the product or campaign first.");
      return;
    }
    setLoading(true);
    try {
      const next = await novaClient.generateContent({
        brief: { brandName, product, audience, platform, goal, tone },
        profile,
      });
      setResult(next);
      logActivity("content", `Generated ${platform} content`, `${goal} · ${product.slice(0, 48)}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Content Studio"
        title="From brief to on-brand content"
        description="Describe what you're promoting. NOVA writes post ideas, hooks, captions, ad copy, CTAs and hashtags tuned to your platform and goal."
        demo
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[22rem_1fr]">
        <form
          className="space-y-4 rounded-2xl border border-border bg-surface p-5"
          onSubmit={(event) => {
            event.preventDefault();
            void generate();
          }}
        >
          <Field label="Product or campaign">
            <Input
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              placeholder="Limited drop of recycled cargo pants"
            />
          </Field>
          <Field label="Brand name">
            <Input
              value={brandName}
              onChange={(event) => setBrandName(event.target.value)}
              placeholder="NOVA"
            />
          </Field>
          <Field label="Target audience">
            <Input
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              placeholder="18–24 students in the UK"
            />
          </Field>
          <Field label="Platform">
            <Select value={platform} onValueChange={(v) => setPlatform(v as ContentPlatform)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Goal">
            <Select value={goal} onValueChange={(v) => setGoal(v as MarketingGoal)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {goals.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Tone">
            <Input
              value={tone}
              onChange={(event) => setTone(event.target.value)}
              placeholder="Playful, direct, never corporate"
            />
          </Field>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
            {loading ? "Generating" : "Generate content"}
          </Button>
          {profile.updatedAt ? (
            <p className="text-xs text-muted-foreground">
              Using your saved brand voice for tone and word choice.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Tip: define your brand voice once and every generation inherits it.
            </p>
          )}
        </form>

        <div className="min-w-0">
          {!result ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
              <Wand2 className="mx-auto size-6 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">Nothing generated yet</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
                Fill in the brief and NOVA will draft a full content set you can copy straight into
                your scheduler.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <Block title="Post ideas" items={result.postIdeas} />
              <Block title="Hooks" items={result.hooks} />
              <Block title="Captions" items={result.captions} />
              <Block title="Ad copy" items={result.adCopy} />
              <Block title="CTAs" items={result.ctas} />
              <Block title="Hashtags" items={result.hashtags} inline />
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Block({
  title,
  items,
  inline = false,
}: {
  title: string;
  items: string[];
  inline?: boolean;
}) {
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Clipboard unavailable");
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => void copy(items.join("\n"))}
          className="text-xs text-muted-foreground"
        >
          <Copy className="size-3.5" />
          Copy all
        </Button>
      </div>

      {inline ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="group flex items-start justify-between gap-3 rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted-foreground"
            >
              <span className="min-w-0">{item}</span>
              <button
                type="button"
                aria-label="Copy"
                onClick={() => void copy(item)}
                className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
              >
                <Copy className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
