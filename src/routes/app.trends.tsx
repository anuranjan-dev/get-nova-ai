import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Loader2, Minus, Radar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DemoBadge, PageHeader, PageShell } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trendCategories } from "@/lib/nova/demo-data";
import { novaClient } from "@/lib/nova/nova-client";
import type { TrendReport } from "@/lib/nova/types";
import { useWorkspace } from "@/lib/nova/workspace-store";

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

function TrendScanner() {
  const { logActivity } = useWorkspace();
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<TrendReport | null>(null);

  const scan = async (value: string) => {
    const next = value.trim();
    if (!next) {
      toast.error("Enter a category or niche first.");
      return;
    }
    setLoading(true);
    try {
      const result = await novaClient.scanTrends({ category: next });
      setReport(result);
      logActivity("trend", `Scanned ${result.category}`, `${result.risingTopics.length} rising topics found`);
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
        description="Enter a category, niche or product type. NOVA returns rising topics, hashtags, audience conversations and ready-to-use content angles."
        demo
      />

      <form
        className="mt-6 flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          void scan(category);
        }}
      >
        <Input
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="e.g. streetwear, energy drinks, student fintech"
          aria-label="Category or niche"
        />
        <Button type="submit" disabled={loading} className="sm:w-40">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Radar className="size-4" />}
          {loading ? "Scanning" : "Scan trends"}
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {trendCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setCategory(item);
              void scan(item);
            }}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            {item}
          </button>
        ))}
      </div>

      {!report && !loading ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <Radar className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium text-foreground">No scan yet</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Pick a category above to see rising topics and the conversations behind them.
          </p>
        </div>
      ) : null}

      {report ? (
        <div className="mt-10 space-y-10">
          <section>
            <SectionTitle title="Rising topics" note={report.category} />
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
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${topic.momentum}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{topic.window}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle title="Content ideas" />
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

function SectionTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {note ? <DemoBadge label={note} /> : null}
    </div>
  );
}
