import { createFileRoute } from "@tanstack/react-router";
import { Clock, TrendingUp } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { insightsDemo } from "@/lib/nova/demo-data";

export const Route = createFileRoute("/app/insights")({
  head: () => ({
    meta: [
      { title: "Insights — NOVA" },
      {
        name: "description",
        content:
          "Track engagement trends, best-performing formats, optimal posting windows and what to do next.",
      },
      { property: "og:title", content: "Insights — NOVA" },
      {
        property: "og:description",
        content: "Engagement trends, top formats and posting windows for youth-brand marketing.",
      },
    ],
  }),
  component: Insights,
});

function Insights() {
  const max = Math.max(...insightsDemo.engagement.map((point) => point.value));

  return (
    <PageShell>
      <PageHeader
        eyebrow="Insights"
        title="What's working, and what to do next"
        description="A read on your content performance: engagement over time, the formats earning attention, and the windows worth posting in."
        demo
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {insightsDemo.kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{kpi.value}</p>
            <p className="mt-1 text-xs text-primary">{kpi.delta} vs last period</p>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Engagement trend</h2>
        </div>
        <div className="mt-6 flex h-40 items-end gap-3">
          {insightsDemo.engagement.map((point) => (
            <div key={point.week} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-primary/70"
                style={{ height: `${(point.value / max) * 100}%` }}
                title={`${point.week}: ${point.value}`}
              />
              <span className="text-[0.65rem] text-muted-foreground">{point.week}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-3 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-sm font-semibold text-foreground">Best-performing formats</h2>
          <ul className="mt-4 space-y-3">
            {insightsDemo.formats.map((format) => (
              <li key={format.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{format.name}</span>
                  <span className="text-foreground">{format.score}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${format.score}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Optimal posting windows</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {insightsDemo.slots.map((slot) => (
              <li key={slot.day} className="rounded-xl bg-surface-2 px-4 py-3">
                <p className="text-sm text-foreground">
                  {slot.day} · {slot.time}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{slot.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-sm font-semibold text-foreground">Recommendations</h2>
        <ul className="mt-4 space-y-2">
          {insightsDemo.recommendations.map((item) => (
            <li key={item} className="rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
