import { ArrowUpRight, BarChart3, Radar, Settings, Sparkles, Wand2 } from "lucide-react";

import { NovaLogo } from "@/components/nova/logo";

const nav = [
  { label: "Overview", icon: Radar },
  { label: "Trend Scanner", icon: Radar },
  { label: "Content Studio", icon: Wand2 },
  { label: "Brand Voice", icon: Sparkles },
  { label: "Insights", icon: BarChart3 },
];

const signals = [
  { title: "Low-effort morning routines", momentum: 92, window: "Rising · 6 days" },
  { title: "\u201cQuiet luxury\u201d skincare shelfies", momentum: 78, window: "Rising · 11 days" },
  { title: "Dorm-room desk resets", momentum: 64, window: "Early · 3 days" },
];

/** Static, non-interactive product preview used in the landing hero. */
export function WorkspacePreview() {
  return (
    <div
      aria-hidden="true"
      className="surface-sheen overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-panel)]"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="size-2 rounded-full bg-border-strong" />
      </div>

      <div className="flex min-h-[22rem] sm:min-h-[26rem]">
        <div className="hidden w-52 shrink-0 flex-col border-r border-border bg-sidebar p-3 sm:flex">
          <NovaLogo className="px-1 pb-4" />
          <p className="px-1 text-[0.6rem] tracking-wider text-muted-foreground uppercase">
            Command center
          </p>
          <div className="mt-2 space-y-0.5">
            {nav.map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 truncate rounded-lg px-2.5 py-1.5 text-xs ${
                  index === 1 ? "bg-sidebar-accent text-foreground" : "text-muted-foreground"
                }`}
              >
                <item.icon className="size-3.5 shrink-0" />
                {item.label}
              </div>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-2 border-t border-border px-2.5 pt-3 text-xs text-muted-foreground">
            <Settings className="size-3.5" /> Settings
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <Radar className="size-3.5" /> Beauty · Gen Z · last 14 days
            </span>
            <span className="rounded-md bg-primary-soft px-2 py-0.5 text-primary">
              12 signals
            </span>
          </div>

          <div className="flex-1 space-y-4 p-5">
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { label: "Cultural signals", value: "12" },
                { label: "Opportunities", value: "5" },
                { label: "Drafts ready", value: "18" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-background p-3">
                  <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-0.5 text-[0.65rem] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {signals.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-xl border border-border bg-background p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="min-w-0 truncate text-xs font-medium text-foreground">
                      {signal.title}
                    </p>
                    <span className="flex shrink-0 items-center gap-1 text-[0.65rem] text-primary">
                      {signal.momentum} <ArrowUpRight className="size-3" />
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${signal.momentum}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[0.65rem] text-muted-foreground">{signal.window}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3.5 py-2.5">
              <span className="text-xs text-muted-foreground">
                Turn top signal into a campaign brief
              </span>
              <span className="rounded-lg bg-primary px-2 py-1 text-[0.65rem] text-primary-foreground">
                Generate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
