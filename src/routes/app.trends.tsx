import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, ChevronsUpDown, Info, Loader2, Minus, Radar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { DemoBadge, PageHeader, PageShell } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { novaClient } from "@/lib/nova/nova-client";
import { momentumTag, trendCategories, type MomentumTag } from "@/lib/nova/trend-data";
import type { TrendReport } from "@/lib/nova/types";
import { useWorkspace } from "@/lib/nova/workspace-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/trends")({
  head: () => ({
    meta: [
      { title: "Trend Scanner — NOVA" },
      {
        name: "description",
        content:
          "Scan rising topics, hashtags and audience conversations in your category, then turn them into content ideas.",
      },
      { property: "og:title", content: "Trend Scanner — NOVA" },
      {
        property: "og:description",
        content: "Rising topics, hashtags and audience conversations for youth-focused brands.",
      },
    ],
  }),
  component: TrendScanner,
});

/** Total scan theatre duration, split evenly across the status lines. */
const SCAN_MS = 3600;

function scanSteps(brand: string, category: string) {
  return [
    "Scanning Instagram & TikTok conversations…",
    "Reading creator and community posts…",
    `Cross-referencing ${category} audience signals…`,
    `Scoring relevance and momentum for ${brand}…`,
    "Compiling marketing opportunities…",
  ];
}

function TrendScanner() {
  const { logActivity } = useWorkspace();
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [report, setReport] = useState<TrendReport | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const canScan = brandName.trim().length > 0 && category.trim().length > 0;

  const scan = async (nextCategory: string) => {
    const brand = brandName.trim();
    const cat = nextCategory.trim();
    if (!brand) {
      toast.error("Enter a brand name first.");
      return;
    }
    if (!cat) {
      toast.error("Enter a category or niche first.");
      return;
    }

    const lines = scanSteps(brand, cat);
    setSteps(lines);
    setStepIndex(0);
    setReport(null);
    setLoading(true);

    const per = SCAN_MS / lines.length;
    timers.current.forEach(clearTimeout);
    timers.current = lines.slice(1).map((_, i) =>
      setTimeout(() => setStepIndex(i + 1), per * (i + 1)),
    );

    try {
      const [result] = await Promise.all([
        novaClient.scanTrends({ category: cat, brandName: brand }),
        new Promise((resolve) => timers.current.push(setTimeout(resolve, SCAN_MS))),
      ]);
      setReport(result);
      logActivity(
        "trend",
        `Scanned ${result.category} for ${result.brandName}`,
        `${result.risingTopics.length} rising topics found`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Scan failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Trend Scanner"
        title="What your audience is talking about"
        description="Enter your brand and a category. NOVA returns rising topics, hashtags, audience conversations and ready-to-use content angles for that brand."
        demo
      />

      <form
        className="mt-6 grid gap-3 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          void scan(category);
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="brand-name">Brand name</Label>
          <Input
            id="brand-name"
            value={brandName}
            onChange={(event) => setBrandName(event.target.value)}
            placeholder="e.g. Nike, Gymshark"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="category">Category or niche</Label>
          <Input
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="e.g. streetwear, energy drinks, gaming"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={loading || !canScan} className="w-full sm:w-44">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Radar className="size-4" />}
            {loading ? "Scanning" : "Scan trends"}
          </Button>
          {!canScan ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Both a brand name and a category are needed to run a scan.
            </p>
          ) : null}
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {trendCategories.map((item) => (
          <button
            key={item}
            type="button"
            disabled={loading}
            onClick={() => {
              setCategory(item);
              void scan(item);
            }}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground disabled:opacity-50"
          >
            {item}
          </button>
        ))}
      </div>

      {loading ? <ScanningPanel steps={steps} activeIndex={stepIndex} /> : null}

      {!report && !loading ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <Radar className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium text-foreground">No scan yet</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Add your brand name and pick a category to see rising topics and the conversations
            behind them.
          </p>
        </div>
      ) : null}

      {report && !loading ? (
        <div className="mt-10 space-y-10">
          <section>
            <SectionTitle title="Rising topics" note={`${report.category} · ${report.brandName}`} />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {report.risingTopics.map((topic) => (
                <article key={topic.title} className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-medium text-foreground">{topic.title}</h3>
                    <Badge variant="outline" className="border-border-strong text-xs">
                      {topic.momentum}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{topic.summary}</p>
                  <div className="mt-3 rounded-xl bg-primary-soft p-3">
                    <p className="text-[0.7rem] font-medium tracking-wide text-primary uppercase">
                      Why this matters for {report.brandName}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{topic.brandAngle}</p>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${topic.momentum}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{topic.window}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle title={`Content ideas for ${report.brandName}`} />
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {report.contentIdeas.map((idea) => (
                <li key={idea} className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
                  {idea}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionTitle title="Hashtags" />
            <div className="mt-4 flex flex-wrap gap-2">
              {report.hashtags.map((tag) => (
                <span
                  key={tag.tag}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground"
                >
                  {tag.tag}
                  <span className="text-muted-foreground">{tag.volume}</span>
                  {tag.trend === "up" ? (
                    <ArrowUpRight className="size-3.5 text-primary" />
                  ) : (
                    <Minus className="size-3.5 text-muted-foreground" />
                  )}
                </span>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle title="Audience conversations" />
            <div className="mt-4 space-y-3">
              {report.conversations.map((row) => (
                <blockquote key={row.quote} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">{row.audience}</p>
                  <p className="mt-2 text-sm text-foreground">“{row.quote}”</p>
                  <p className="mt-2 text-sm text-muted-foreground">{row.takeaway}</p>
                </blockquote>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </PageShell>
  );
}

function ScanningPanel({ steps, activeIndex }: { steps: string[]; activeIndex: number }) {
  const progress = ((activeIndex + 1) / steps.length) * 100;

  return (
    <div className="mt-10 rounded-2xl border border-border bg-surface p-8 sm:p-10">
      <div className="relative mx-auto flex size-14 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary-soft animate-radar" />
        <span
          className="absolute inset-0 rounded-full bg-primary-soft animate-radar"
          style={{ animationDelay: "0.6s" }}
        />
        <span className="relative flex size-11 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-primary">
          <Radar className="size-5 animate-pulse" />
        </span>
      </div>

      <p className="mt-5 text-center text-sm font-medium text-foreground">Running trend scan</p>

      <ul className="mx-auto mt-5 max-w-md space-y-2.5">
        {steps.map((step, index) => {
          const done = index < activeIndex;
          if (index > activeIndex) return null;
          return (
            <li
              key={step}
              className={cn(
                "flex animate-rise items-center gap-2.5 text-sm",
                done ? "text-muted-foreground" : "text-foreground",
              )}
            >
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full",
                  done ? "bg-primary-soft text-primary" : "text-primary",
                )}
              >
                {done ? <Check className="size-3" /> : <Loader2 className="size-3.5 animate-spin" />}
              </span>
              <span>{step}</span>
            </li>
          );
        })}
      </ul>

      <div className="mx-auto mt-6 h-1 max-w-md overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function SectionTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {note ? <DemoBadge label={note} /> : null}
    </div>
  );
}
