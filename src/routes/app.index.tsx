import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  LineChart,
  Radar,
  Sparkles,
  Wand2,
  type LucideIcon,
} from "lucide-react";

import { DemoBadge, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/lib/nova/workspace-store";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Overview — NOVA marketing workspace" },
      {
        name: "description",
        content:
          "Your NOVA overview: scan trends, generate on-brand content, and see what to act on today.",
      },
      { property: "og:title", content: "Overview — NOVA marketing workspace" },
      {
        property: "og:description",
        content: "Scan trends, generate on-brand content, and see what to act on today.",
      },
    ],
  }),
  component: Overview,
});

const quickActions: {
  to: "/app/trends" | "/app/studio" | "/app/voice" | "/app/insights";
  label: string;
  copy: string;
  icon: LucideIcon;
}[] = [
  {
    to: "/app/trends",
    label: "Scan Trends",
    copy: "See what your audience is actually talking about this week.",
    icon: Radar,
  },
  {
    to: "/app/studio",
    label: "Create Content",
    copy: "Hooks, captions, ad copy and CTAs from one short brief.",
    icon: Wand2,
  },
  {
    to: "/app/voice",
    label: "Define Brand Voice",
    copy: "Set it once so every generation sounds like your brand.",
    icon: Sparkles,
  },
  {
    to: "/app/insights",
    label: "View Insights",
    copy: "Which formats earn attention, and when to post them.",
    icon: LineChart,
  },
];

const opportunities = [
  {
    title: "Turn last week's top comment into a post",
    why: "Audience-authored questions convert better than brand-authored claims.",
    to: "/app/studio" as const,
    cta: "Draft it",
  },
  {
    title: "Two static posts are underperforming",
    why: "Short-form video earns 2.3× the engagement in youth categories.",
    to: "/app/insights" as const,
    cta: "See insights",
  },
  {
    title: "A rising format matches your product",
    why: "Routine-led storytelling gives your product a natural on-camera moment.",
    to: "/app/trends" as const,
    cta: "Scan trends",
  },
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function Overview() {
  const { activity, profile, profileComplete } = useWorkspace();

  return (
    <PageShell>
      <header>
        <p className="text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
          Overview
        </p>
        <h1 className="text-balance-tight mt-3 text-3xl font-semibold sm:text-[2.35rem] sm:leading-[1.1]">
          {greeting()}, Ada.
          <span className="block text-muted-foreground">
            Here's what matters for {profile.brandName || "your brand"} today.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          NOVA watches how youth culture moves, turns it into content you can publish, and keeps
          every word inside your brand voice. Start with a trend scan, or brief the studio directly.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-medium text-foreground">Quick actions</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="group surface-sheen rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <action.icon className="size-4.5" />
              </span>
              <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-foreground">
                {action.label}
                <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{action.copy}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium text-foreground">Marketing opportunities</h2>
            <DemoBadge label="Suggested" />
          </div>
          <div className="mt-3 space-y-3">
            {opportunities.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.why}</p>
                </div>
                <Button asChild variant="secondary" size="sm" className="shrink-0 rounded-lg">
                  <Link to={item.to}>{item.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2">
          <h2 className="text-sm font-medium text-foreground">Recent activity</h2>
          <div className="mt-3 rounded-2xl border border-border bg-surface p-5">
            {activity.length === 0 ? (
              <div className="py-4 text-center">
                <p className="text-sm text-foreground">Nothing here yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your trend scans and generations will show up here.
                </p>
                <Button asChild size="sm" className="mt-4 rounded-lg">
                  <Link to="/app/trends">Run your first scan</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {activity.slice(0, 6).map((item) => (
                  <li key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <p className="text-sm text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {!profileComplete ? (
            <div className="mt-3 rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm font-medium text-foreground">Brand voice is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Content sounds generic until NOVA knows your personality, audience and banned words.
              </p>
              <Button asChild size="sm" variant="secondary" className="mt-4 rounded-lg">
                <Link to="/app/voice">Define brand voice</Link>
              </Button>
            </div>
          ) : null}
        </section>
      </div>
    </PageShell>
  );
}
