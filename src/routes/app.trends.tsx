import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, ChevronsUpDown, Copy, Info, Loader2, Minus, Radar } from "lucide-react";
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
    `Scoring relevance and momentum for ${brand || "your brand"}…`,
    "Compiling marketing opportunities…",
  ];
}

const tagStyles: Record<MomentumTag, string> = {
  Exploding: "border-emerald-500/30 bg-emerald-500/12 text-emerald-500",
  Rising: "border-emerald-500/30 bg-emerald-500/12 text-emerald-500",
  Peaking: "border-border-strong bg-surface-2 text-foreground",
  Stable: "border-border bg-surface-2 text-muted-foreground",
  Declining: "border-amber-500/30 bg-amber-500/12 text-amber-600 dark:text-amber-500",
};

/** Clipboard write with a legacy fallback; returns false when both fail. */
async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

function TrendScanner() {
  const { logActivity } = useWorkspace();
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [report, setReport] = useState<TrendReport | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const canScan = category.trim().length > 0;

  const scan = async (nextCategory: string) => {
    const brand = brandName.trim();
    const cat = nextCategory.trim();
    if (!cat) {
      toast.error("Pick a category or niche first.");
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
        `Scanned ${result.category}${result.brandName ? ` for ${result.brandName}` : ""}`,
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
        description="Pick a category to see rising topics, hashtags, audience conversations and ready-to-use content angles. Add a brand name to personalise every recommendation."
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
          <Label htmlFor="brand-name">Brand name (optional)</Label>
          <Input
            id="brand-name"
            value={brandName}
            onChange={(event) => setBrandName(event.target.value)}
            placeholder="e.g. Nike, Gymshark"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="category">Category or niche</Label>
          <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                id="category"
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={pickerOpen}
                className="w-full justify-between font-normal"
              >
                <span className={cn(!category && "text-muted-foreground")}>
                  {category || "Select a category"}
                </span>
                <ChevronsUpDown className="size-4 shrink-0 opacity-60" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search categories…" />
                <CommandList>
                  <CommandEmpty>No category with data yet.</CommandEmpty>
                  <CommandGroup>
                    {trendCategories.map((item) => (
                      <CommandItem
                        key={item}
                        value={item}
                        onSelect={() => {
                          setCategory(item);
                          setPickerOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "size-4",
                            category === item ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {item}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={loading || !canScan} className="w-full sm:w-44">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Radar className="size-4" />}
            {loading ? "Scanning" : "Scan trends"}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Category is required. Add a brand name to personalize results to your brand.
          </p>
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
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors disabled:opacity-50",
              category === item
                ? "border-border-strong bg-surface-2 text-foreground"
                : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
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
            Pick a category to see rising topics and the conversations behind them.
          </p>
        </div>
      ) : null}

      {report && !loading ? (
        <div className="mt-10 space-y-10">
          <section>
            <SectionTitle
              title="Rising topics"
              note={
                report.brandName ? `${report.category} · ${report.brandName}` : report.category
              }
              hint="Score reflects audience momentum, category relevance, and brand fit, out of 100."
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {report.risingTopics.map((topic) => {
                const tag = momentumTag(topic.momentum);
                return (
                  <article key={topic.title} className="rounded-2xl border border-border bg-surface p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-medium text-foreground">{topic.title}</h3>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <Badge variant="outline" className="border-border-strong text-xs">
                          {topic.momentum}/100
                        </Badge>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[0.65rem] font-medium",
                            tagStyles[tag],
                          )}
                        >
                          {tag}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{topic.summary}</p>
                    <div className="mt-3 rounded-xl bg-primary-soft p-3">
                      <p className="text-[0.7rem] font-medium tracking-wide text-primary uppercase">
                        {report.brandName
                          ? `Why this matters for ${report.brandName}`
                          : "Marketing opportunity"}
                      </p>
                      <p className="mt-1 text-sm text-foreground">{topic.brandAngle}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Relevance score</span>
                      <span>{topic.window}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${topic.momentum}%` }} />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section>
            <SectionTitle
              title={report.brandName ? `Content ideas for ${report.brandName}` : "Content ideas"}
            />
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

function SectionTitle({
  title,
  note,
  hint,
}: {
  title: string;
  note?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {hint ? (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label="How the relevance score works"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Info className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">{hint}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </div>
      {note ? <DemoBadge label={note} /> : null}
    </div>
  );
}
