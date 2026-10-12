import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronsUpDown, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { PageHeader, PageShell } from "@/components/app/page-header";
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
import { buildReputationReport, type ReputationReport } from "@/lib/nova/reputation-data";
import { trendCategories } from "@/lib/nova/trend-data";
import { useWorkspace } from "@/lib/nova/workspace-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/reputation")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Reputation Check — NOVA" },
      {
        name: "description",
        content:
          "See what audiences love and criticise about your brand, and the concrete fixes that answer each frustration.",
      },
      { property: "og:title", content: "Reputation Check — NOVA" },
      {
        property: "og:description",
        content: "Audience sentiment and suggested fixes for youth-focused brands.",
      },
    ],
  }),
  component: ReputationCheck,
});

const SCAN_MS = 3200;

function scanSteps(brand: string, category: string) {
  return [
    `Collecting ${category} community threads…`,
    `Matching mentions of ${brand}…`,
    "Separating praise from criticism…",
    "Drafting suggested fixes…",
  ];
}

function ReputationCheck() {
  const { logActivity } = useWorkspace();
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [report, setReport] = useState<ReputationReport | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const canScan = brandName.trim().length > 0 && category.trim().length > 0;

  const scan = async () => {
    const brand = brandName.trim();
    const cat = category.trim();
    if (!brand || !cat) {
      toast.error("Add a brand name and pick a category first.");
      return;
    }

    const lines = scanSteps(brand, cat);
    setSteps(lines);
    setStepIndex(0);
    setReport(null);
    setLoading(true);

    const per = SCAN_MS / lines.length;
    timers.current.forEach(clearTimeout);
    timers.current = lines
      .slice(1)
      .map((_, i) => setTimeout(() => setStepIndex(i + 1), per * (i + 1)));

    await new Promise((resolve) => timers.current.push(setTimeout(resolve, SCAN_MS)));

    const result = buildReputationReport(cat, brand);
    setReport(result);
    setLoading(false);
    logActivity(
      "trend",
      `Reputation check for ${brand}`,
      `${result.category} · ${result.frustrations.length} frustrations, ${result.fixes.length} fixes`,
    );
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Reputation Check"
        title="What people actually think about your brand"
        description="Enter your brand and category. NOVA surfaces what audiences love, what frustrates them, and how to fix it."
        demo
      />

      <p className="mt-4 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
        Illustrative sample data — not live-connected to Reddit or Twitter/X yet.
      </p>

      <form
        className="mt-6 grid gap-3 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          void scan();
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="rep-brand">Brand name</Label>
          <Input
            id="rep-brand"
            value={brandName}
            onChange={(event) => setBrandName(event.target.value)}
            placeholder="e.g. Nike, Gymshark"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rep-category">Category</Label>
          <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                id="rep-category"
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
                          className={cn("size-4", category === item ? "opacity-100" : "opacity-0")}
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
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ShieldCheck className="size-4" />
            )}
            {loading ? "Scanning" : "Scan brand"}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Both a brand name and a category are needed to run a reputation check.
          </p>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {trendCategories.map((item) => (
          <button
            key={item}
            type="button"
            disabled={loading}
            onClick={() => setCategory(item)}
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
          <ShieldCheck className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium text-foreground">No check yet</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Add your brand and category to see praise, criticism and the fixes that answer them.
          </p>
        </div>
      ) : null}

      {report && !loading ? (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <section>
            <h2 className="text-lg font-semibold text-foreground">What people love</h2>
            <div className="mt-4 space-y-3">
              {report.loves.map((item) => (
                <QuoteCard key={item.quote} {...item} accent="positive" />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              What people are frustrated about
            </h2>
            <div className="mt-4 space-y-3">
              {report.frustrations.map((item) => (
                <QuoteCard key={item.quote} {...item} accent="negative" />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Suggested fixes</h2>
            <div className="mt-4 space-y-3">
              {report.fixes.map((fix) => (
                <article
                  key={fix.title}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <p className="text-[0.7rem] font-medium tracking-wide text-primary uppercase">
                    Suggested fix
                  </p>
                  <h3 className="mt-1.5 text-sm font-medium text-foreground">{fix.title}</h3>
                  <div className="mt-3 rounded-xl bg-primary-soft p-3">
                    <p className="text-sm text-foreground">{fix.action}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </PageShell>
  );
}

function QuoteCard({
  source,
  quote,
  context,
  accent,
}: {
  source: string;
  quote: string;
  context: string;
  accent: "positive" | "negative";
}) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      <p
        className={cn(
          "text-[0.65rem] font-medium tracking-[0.12em] uppercase",
          accent === "positive"
            ? "text-emerald-600 dark:text-emerald-500"
            : "text-amber-600 dark:text-amber-500",
        )}
      >
        {source}
      </p>
      <blockquote className="mt-2 text-sm text-foreground">“{quote}”</blockquote>
      <p className="mt-2.5 text-sm text-muted-foreground">{context}</p>
    </article>
  );
}

function ScanningPanel({ steps, activeIndex }: { steps: string[]; activeIndex: number }) {
  const progress = steps.length ? ((activeIndex + 1) / steps.length) * 100 : 0;

  return (
    <div className="mt-8 rounded-2xl border border-border bg-surface p-8">
      <div className="relative mx-auto flex size-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary-soft animate-radar" />
        <span
          className="absolute inset-0 rounded-full bg-primary-soft animate-radar"
          style={{ animationDelay: "0.6s" }}
        />
        <span className="relative flex size-11 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-primary">
          <ShieldCheck className="size-5 animate-pulse" />
        </span>
      </div>

      <p className="mt-5 text-center text-sm font-medium text-foreground">
        Running reputation check
      </p>

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
